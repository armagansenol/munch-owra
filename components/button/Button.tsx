import { ReactNode } from "react"
import s from "./button.module.scss"

import cx from "clsx"
import { Size } from "@/types"

export interface ButtonProps {
  children: ReactNode
  size?: Size
  theme?: "blue" | "white"
}

export default function Button(props: ButtonProps) {
  const { children, theme = "blue", size = "md" } = props

  return (
    <div
      className={cx(s.button, [s[theme]], [s[size]], "w-full h-full flex items-center justify-center cursor-pointer")}
    >
      <span>{children}</span>
    </div>
  )
}
