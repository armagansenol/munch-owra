import s from "./loading-screen.module.scss"

import cx from "clsx"

import { Html, useProgress } from "@react-three/drei"

export function LoadingScreen() {
  const { progress } = useProgress()

  return (
    <Html center>
      <div className={cx(s.loadingScreen, "w-screen h-screen flex items-center justify-center")}>
        <span>Loading {progress.toFixed(2)}%</span>
      </div>
    </Html>
  )
}
