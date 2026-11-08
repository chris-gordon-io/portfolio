import fs from 'node:fs/promises'
import path from 'node:path'
import { execFile } from 'node:child_process'
import { Buffer } from 'node:buffer'

/**
 * Dev-only endpoints for the page editor (src/editor). Writes edited content
 * straight into src/content so changes ship with the next git push / Vercel
 * deploy. Never part of the production build.
 *
 *   POST /__editor/save     { theme?, pages?: { [slug]: page } }
 *   POST /__editor/upload   raw file body, ?name=<filename> → { src }
 *   GET  /__editor/status   → { undeployed: [paths changed since last commit] }
 */
export default function editorPlugin() {
  let root
  const recentWrites = new Map()

  async function writeJson(file, data) {
    recentWrites.set(file, Date.now())
    await fs.writeFile(file, JSON.stringify(data, null, 2) + '\n')
  }

  function readBody(req) {
    return new Promise((resolve, reject) => {
      const chunks = []
      req.on('data', c => chunks.push(c))
      req.on('end', () => resolve(Buffer.concat(chunks)))
      req.on('error', reject)
    })
  }

  function send(res, status, body) {
    res.statusCode = status
    res.setHeader('Content-Type', 'application/json')
    res.end(JSON.stringify(body))
  }

  return {
    name: 'portfolio-editor',
    apply: 'serve',
    configResolved(config) {
      root = config.root
    },
    // The editor already holds what it just saved; skip the hot reload it would trigger
    handleHotUpdate(ctx) {
      const t = recentWrites.get(ctx.file)
      if (t && Date.now() - t < 2000) {
        recentWrites.delete(ctx.file)
        return []
      }
    },
    configureServer(server) {
      const contentDir = path.join(root, 'src/content')
      const uploadDir = path.join(root, 'public/images/uploads')

      server.middlewares.use('/__editor/save', async (req, res) => {
        if (req.method !== 'POST') return send(res, 405, { error: 'POST only' })
        try {
          const { theme, pages = {} } = JSON.parse((await readBody(req)).toString())
          const written = []
          if (theme) {
            await writeJson(path.join(contentDir, 'theme.json'), theme)
            written.push('theme')
          }
          for (const [slug, page] of Object.entries(pages)) {
            if (!/^[a-z0-9-]+$/.test(slug)) throw new Error(`Bad page slug: ${slug}`)
            await writeJson(path.join(contentDir, 'pages', `${slug}.json`), page)
            written.push(slug)
          }
          send(res, 200, { written })
        } catch (err) {
          send(res, 400, { error: err.message })
        }
      })

      server.middlewares.use('/__editor/upload', async (req, res) => {
        if (req.method !== 'POST') return send(res, 405, { error: 'POST only' })
        try {
          const url = new URL(req.url, 'http://x')
          const raw = path.basename(url.searchParams.get('name') || 'image')
          const ext = path.extname(raw).toLowerCase()
          if (!['.png', '.jpg', '.jpeg', '.webp', '.gif', '.svg', '.avif'].includes(ext)) {
            throw new Error('Images only (png, jpg, webp, gif, svg, avif)')
          }
          const base = path.basename(raw, path.extname(raw)).toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '') || 'image'
          await fs.mkdir(uploadDir, { recursive: true })
          let name = `${base}${ext}`
          for (let n = 2; await fs.stat(path.join(uploadDir, name)).then(() => true, () => false); n++) {
            name = `${base}-${n}${ext}`
          }
          await fs.writeFile(path.join(uploadDir, name), await readBody(req))
          send(res, 200, { src: `/images/uploads/${name}` })
        } catch (err) {
          send(res, 400, { error: err.message })
        }
      })

      server.middlewares.use('/__editor/status', (req, res) => {
        execFile('git', ['status', '--porcelain', '--', 'src/content', 'public/images/uploads'], { cwd: root }, (err, stdout) => {
          if (err) return send(res, 200, { undeployed: null })
          send(res, 200, { undeployed: stdout.split('\n').filter(Boolean).map(l => l.slice(3)) })
        })
      })
    },
  }
}
