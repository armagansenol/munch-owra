import s from "./custom-cursor.module.scss"

import useMousePosition from "@/hooks/use-mouse-position"
import { gsap } from "@/lib/gsap"
import { useGSAP } from "@gsap/react"
import cx from "clsx"
import { useRef, useState } from "react"
import { useIsomorphicLayoutEffect, useMediaQuery } from "usehooks-ts"

import { useCursorStore } from "@/lib/store/cursor"
import { useLenisStore } from "@/lib/store/lenis"
import { breakpoints } from "@/lib/utils"
import { CursorType } from "@/types"
import { useTranslations } from "next-intl"

export default function Cursor() {
  const isMobile = useMediaQuery(`(max-width: ${breakpoints.tablet}px)`)
  const t = useTranslations("cursor")

  const ref = useRef(null)
  const cursorStore = useCursorStore()
  const mouse = useMousePosition()
  const { lenis } = useLenisStore()

  const [cursorUi, setCursorUi] = useState<CursorType>(CursorType.default)

  // control visibility
  useIsomorphicLayoutEffect(() => {
    const handleMouseOver = () => {
      if (!cursorStore.visible) cursorStore.toggleVisibility()
    }

    const handleMouseEnter = () => {
      if (!cursorStore.visible) cursorStore.toggleVisibility()
    }

    const handleMouseLeave = () => {
      if (cursorStore.visible) cursorStore.toggleVisibility()
    }

    document.body.addEventListener("mouseenter", handleMouseEnter)
    document.body.addEventListener("mouseover", handleMouseOver)
    document.body.addEventListener("mouseleave", handleMouseLeave)

    return () => {
      document.body.removeEventListener("mouseenter", handleMouseEnter)
      document.body.removeEventListener("mouseover", handleMouseOver)
      document.body.removeEventListener("mouseleave", handleMouseLeave)
    }
  }, [cursorStore])

  useGSAP(
    () => {
      if (!cursorStore.visible) return

      const quickX = gsap.quickSetter(ref.current, "x", "px")
      const quickY = gsap.quickSetter(ref.current, "y", "px")

      quickX(mouse.x ?? 0)
      quickY(mouse.y ?? 0)
    },
    {
      scope: ref,
      dependencies: [mouse, cursorStore.visible],
    }
  )

  useGSAP(
    () => {
      if (!cursorStore.visible) return
      setCursorUi(cursorStore.type)
    },
    {
      scope: ref,
      dependencies: [cursorStore.type],
    }
  )

  useIsomorphicLayoutEffect(() => {
    lenis?.on("scroll", () => {
      if (cursorStore.type !== CursorType.default) {
        cursorStore.reset()
      }
    })
  }, [lenis])

  if (isMobile) return

  return (
    <div
      className={cx(s.cursor, {
        [s.visible]: cursorStore.visible,
      })}
      ref={ref}
    >
      <div className={cx(s.c, "c", "flex items-center", [s[cursorUi]])}>
        <span
          className={cx(s.text, "text", { [s.active]: cursorUi === CursorType.email || cursorUi === CursorType.view })}
        >
          {cursorStore.type === CursorType.view ? "View" : t("discover")}
        </span>
      </div>
    </div>
  )
}
