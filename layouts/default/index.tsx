import s from "./default-layout.module.scss"

import cx from "clsx"
import { useRouter } from "next/router"
import { ReactNode, useEffect } from "react"

import { CustomHead } from "@/components/utility/custom-head"

import { Footer } from "@/components/footer"
import { Header } from "@/components/header"
import { baseUrl } from "@/lib/constants"
import { useCursorStore } from "@/lib/store/cursor"
import { useLenisStore } from "@/lib/store/lenis"
import { CursorType, Seo } from "@/types"

type Props = {
  children: ReactNode
  seo: Seo
  theme?: "dark" | "light"
}

const DefaultLayout = ({ children, seo, theme = "light" }: Props) => {
  const router = useRouter()
  const cursorStore = useCursorStore()
  const { lenis } = useLenisStore()

  useEffect(() => {
    if (cursorStore.type !== CursorType.default) cursorStore.reset()
  }, [])

  useEffect(() => {
    lenis?.scrollTo(0, { immediate: true })
  }, [lenis])

  return (
    <div className={cx(s.defaultLayout, `theme-${theme}`)}>
      <CustomHead
        {...(seo &&
          Object.assign(seo, {
            canonical: `${baseUrl}${router.pathname}`,
            keywords: ["ice", "coffee", "ice glass", "bubble tea"],
          }))}
      />
      <Header />
      <main>{children}</main>
      <Footer />
    </div>
  )
}

export { DefaultLayout }
