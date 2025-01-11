import "@/styles/global.scss"
import "@/styles/globals.css"

import { Modal } from "@/components/utility/modal"
import { SmoothLayout } from "@/layouts/smooth"
import { useTheme } from "@/lib/store/theme"
import { NextIntlClientProvider } from "next-intl"
import type { AppProps } from "next/app"
import dynamic from "next/dynamic"
import { Anton, Asap } from "next/font/google"
import { useRouter } from "next/router"
import { QueryClient, QueryClientProvider } from "react-query"

const Cursor = dynamic(() => import("@/components/cursor").then((module) => module.Cursor), {
  ssr: false,
})

const anton = Anton({
  weight: ["400"],
  subsets: ["latin"],
  variable: "--font-anton",
})

const asap = Asap({
  weight: ["400", "500", "600", "700"],
  subsets: ["latin"],
  variable: "--font-asap",
})

const queryClient = new QueryClient()

export default function App({ Component, pageProps }: AppProps) {
  const router = useRouter()
  const theme = useTheme()

  // useReloadOnResize()
  return (
    <QueryClientProvider client={queryClient}>
      <NextIntlClientProvider locale={router.locale} timeZone="Europe/Istanbul" messages={pageProps.messages}>
        <div
          className={`flex min-h-screen flex-col items-stretch justify-between ${asap.variable} ${anton.variable}`}
          style={
            {
              "--theme-primary": theme.primaryColor,
              "--theme-secondary": theme.secondaryColor,
            } as React.CSSProperties
          }
        >
          <SmoothLayout>
            <Component {...pageProps} />
          </SmoothLayout>
          <Modal />
          <Cursor />
        </div>
      </NextIntlClientProvider>
    </QueryClientProvider>
  )
}
