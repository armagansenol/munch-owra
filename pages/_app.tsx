import "@/styles/global.scss"
import "@/styles/globals.css"

import { Modal } from "@/components/utility/modal"
import { SmoothLayout } from "@/layouts/smooth"
import { useTheme } from "@/lib/store/theme"
import { NextIntlClientProvider } from "next-intl"
import type { AppProps } from "next/app"
import { Dela_Gothic_One } from "next/font/google"
import { useRouter } from "next/router"
import { QueryClient, QueryClientProvider } from "react-query"
import dynamic from "next/dynamic"

const Cursor = dynamic(() => import("@/components/cursor").then((module) => module.Cursor), {
  ssr: false,
})

const delaGothicOne = Dela_Gothic_One({
  weight: ["400"],
  subsets: ["latin"],
  variable: "--font-dela-gothic-one",
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
          className={`flex min-h-screen flex-col items-stretch justify-between ${delaGothicOne.variable}`}
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
