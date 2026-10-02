import { useState, useEffect } from 'react'
import './CGLogo.css'

// Artwork is drawn on a 24×20 grid; `size` is its width in px (height follows the
// aspect ratio). Rendering at 24 maps each unit to a whole CSS px.
export default function CGLogo({ size = 24, color = '#23233B', trigger = 0 }) {
  const [winking, setWinking] = useState(false)

  useEffect(() => {
    if (trigger > 0 && !winking) setWinking(true)
  }, [trigger])

  function handleAnimationEnd() {
    setWinking(false)
  }

  return (
    <svg
      width={size}
      height={(size * 20) / 24}
      viewBox="0 0 24 20"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      {/* C shape */}
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M8.1437 3.57299C7.98592 3.73078 7.73153 3.7279 7.55305 3.59397C6.44526 2.76264 4.86621 2.85088 3.85846 3.85869C2.75401 4.9632 2.75401 6.75397 3.85846 7.85848C4.86621 8.86629 6.44526 8.95453 7.55305 8.1232C7.73153 7.98927 7.98592 7.9864 8.1437 8.14418L9.71496 9.71553C9.87274 9.87332 9.87334 10.1306 9.7052 10.2773C7.40393 12.2851 3.90758 12.1931 1.71584 10.0012C-0.571946 7.71331 -0.571946 4.00386 1.71584 1.71594C3.90758 -0.475931 7.40393 -0.567948 9.70521 1.43989C9.87334 1.58659 9.87274 1.84385 9.71496 2.00164L8.1437 3.57299Z"
        fill={color}
      />
      {/* Circle / eye — winks on hover */}
      <path
        className={`cg-eye${winking ? ' cg-eye--wink' : ''}`}
        onAnimationEnd={handleAnimationEnd}
        fillRule="evenodd"
        clipRule="evenodd"
        d="M17.9798 8.68687C19.5418 8.68687 20.8081 7.4206 20.8081 5.85859C20.8081 4.29657 19.5418 3.0303 17.9798 3.0303C16.4178 3.0303 15.1515 4.29657 15.1515 5.85859C15.1515 7.4206 16.4178 8.68687 17.9798 8.68687ZM17.9798 11.7172C21.2154 11.7172 23.8384 9.09419 23.8384 5.85859C23.8384 2.62298 21.2154 0 17.9798 0C14.7442 0 12.1212 2.62298 12.1212 5.85859C12.1212 9.09419 14.7442 11.7172 17.9798 11.7172Z"
        fill={color}
      />
      {/* Bottom smile arc */}
      <path
        className={`cg-smile${winking ? ' cg-smile--wink' : ''}`}
        fillRule="evenodd"
        clipRule="evenodd"
        d="M14.6961 14.1414C14.9192 14.1414 15.0972 14.3233 15.1281 14.5443C15.3241 15.944 16.5261 17.0211 17.9798 17.0211C19.4334 17.0211 20.6355 15.944 20.8315 14.5443C20.8624 14.3233 21.0403 14.1414 21.2635 14.1414H23.4343C23.6575 14.1414 23.8398 14.3229 23.8246 14.5455C23.617 17.5926 21.0795 20 17.9798 20C14.88 20 12.3425 17.5926 12.1349 14.5455C12.1197 14.3229 12.3021 14.1414 12.5252 14.1414H14.6961Z"
        fill={color}
      />
    </svg>
  )
}
