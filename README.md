# Portfolio

## Editing project pages

Case-study pages (Motorway, Toyota, Tu, Benchmark) are built from JSON in `src/content/pages/`, and global component spacing lives in `src/content/theme.json`.

1. `npm run dev`, open a project page, click **Edit page** (bottom right).
2. Click any text to type into it. Click a block to edit its content and spacing, or to move, duplicate or delete it. Use **+** or the **Add** tab to insert blocks. **Global styles** changes spacing for every block of a type.
3. **Save** (⌘S) writes the JSON files. Uploaded images go to `public/images/uploads/`.
4. Commit and push to deploy on Vercel.

The editor only runs on the dev server. It is never included in the production build.

---

# React + Vite

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react) uses [Oxc](https://oxc.rs)
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react-swc) uses [SWC](https://swc.rs/)

## React Compiler

The React Compiler is not enabled on this template because of its impact on dev & build performances. To add it, see [this documentation](https://react.dev/learn/react-compiler/installation).

## Expanding the ESLint configuration

If you are developing a production application, we recommend using TypeScript with type-aware lint rules enabled. Check out the [TS template](https://github.com/vitejs/vite/tree/main/packages/create-vite/template-react-ts) for information on how to integrate TypeScript and [`typescript-eslint`](https://typescript-eslint.io) in your project.
