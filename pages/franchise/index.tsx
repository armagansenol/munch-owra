import s from "./franchise.module.scss"

import { single } from "@/api/queries/franchise"
import { routes } from "@/lib/constants"
import { gsap, ScrollTrigger } from "@/lib/gsap"
import { ContactData, FormType, Locales } from "@/types"
import { useGSAP } from "@gsap/react"
import cx from "clsx"
import { GetServerSidePropsContext } from "next"
import { useLocale, useTranslations } from "next-intl"
import { useRef } from "react"

import { Marquee } from "@/components/animations/marquee"
import { Button } from "@/components/button"
import { FormContact } from "@/components/form-contact"
import { Img } from "@/components/utility/img"
import { DefaultLayout } from "@/layouts/default"
import { useLenisStore } from "@/lib/store/lenis"

const ParallaxWrapper = dynamic(() => import("@/components/animations/parallax"), {
  ssr: false,
})

import i1 from "@/public/img/b-1.png"
import i2 from "@/public/img/b-2.png"
import i3 from "@/public/img/b-3.png"
import i4 from "@/public/img/b-4.png"
import dynamic from "next/dynamic"

export interface FranchiseProps {
  contactData: ContactData
}

export default function Franchise(props: FranchiseProps) {
  const { contactData } = props
  const prosRef = useRef(null)
  const { lenis } = useLenisStore()
  const t = useTranslations("franchise")
  const locale = useLocale()

  useGSAP(
    () => {
      if (ScrollTrigger.isTouch) {
        return
      }

      const a = document.querySelector(".sticky-pin")?.getBoundingClientRect().height
      const b = document.querySelector(".img-c")?.getBoundingClientRect().height

      if (!a || !b) return

      const tl = gsap.timeline().to(".img-c", {
        y: `${a - b}px`,
      })

      ScrollTrigger.create({
        animation: tl,
        trigger: ".sticky-pin",
        scrub: 0.5,
        start: "top+=25% center",
        end: `bottom-=25% center`,
      })
    },
    {
      scope: prosRef,
      dependencies: [locale],
    }
  )

  return (
    <DefaultLayout seo={routes[locale as Locales].about.seo}>
      <section className={cx(s.intro, "flex flex-col items-center")}>
        <h1>{t("intro.heading")}</h1>
        <p>{t("intro.text")}</p>
        <button
          type="button"
          className={s.cta}
          onClick={() => {
            lenis?.scrollTo(`#franchise`, { duration: 1.5 })
          }}
        >
          <Button>{t("intro.cta")}</Button>
        </button>

        <div className={cx(s.ice, s.ice1)}>
          <ParallaxWrapper speedY={-1}>
            <Img alt="Ice Cube" className="object-contain rotate-6" src={i3} />
          </ParallaxWrapper>
        </div>

        <div className={cx(s.ice, s.ice2)}>
          <ParallaxWrapper speedY={-1}>
            <Img alt="Ice Cube" className="object-contain -rotate-6" src={i1} />
          </ParallaxWrapper>
        </div>

        <div className={cx(s.ice, s.ice3)}>
          <ParallaxWrapper speedY={-1}>
            <Img alt="Ice Cube" className="object-contain -rotate-12" src={i1} />
          </ParallaxWrapper>
        </div>

        <div className={cx(s.ice, s.ice4)}>
          <ParallaxWrapper speedY={-1}>
            <Img alt="Ice Cube" className="object-contain rotate-6" src={i2} />
          </ParallaxWrapper>
        </div>

        <div className={cx(s.ice, s.ice5)}>
          <ParallaxWrapper speedY={-1}>
            <Img alt="Ice Cube" className="object-contain rotate-[30deg]" src={i4} />
          </ParallaxWrapper>
        </div>
      </section>

      <section className={s.marqueeC}>
        <Marquee repeat={5}>
          <div className={cx(s.imgs, "flex items-center")}>
            <div className={s.imgC}>
              <Img
                className="object-cover"
                src={"/img/ice-glass-shoot-full.jpg"}
                alt="Owra"
                width={2000}
                height={2000}
              />
            </div>
            <div className={s.imgC}>
              <Img
                className="object-cover"
                src={"/img/ice-glass-shoot-full.jpg"}
                alt="Owra"
                width={2000}
                height={2000}
              />
            </div>
          </div>
        </Marquee>
      </section>

      <section className={cx(s.why, "flex flex-col items-center flex-wrap")}>
        <h2>{t("why.heading")}</h2>
        <div className={cx(s.items, "flex flex-wrap items-start justify-center")}>
          <div className="flex flex-col items-center justify-start">
            <h3>{t("why.items.i1.heading")}</h3>
            <p>{t("why.items.i1.text")}</p>
          </div>
          <div className="flex flex-col items-center justify-start">
            <h3>{t("why.items.i2.heading")}</h3>
            <p>{t("why.items.i3.text")}</p>
          </div>
          <div className="flex flex-col items-center justify-start">
            <h3>{t("why.items.i3.heading")}</h3>
            <p>{t("why.items.i3.text")}</p>
          </div>
          <div className="flex flex-col items-center justify-start">
            <h3>{t("why.items.i4.heading")}</h3>
            <p>{t("why.items.i4.text")}</p>
          </div>
          <div className="flex flex-col items-center justify-start">
            <h3>{t("why.items.i5.heading")}</h3>
            <p>{t("why.items.i5.text")}</p>
          </div>
        </div>
      </section>

      <section className={cx(s.advantages, "grid grid-cols-1 tablet:grid-cols-2")} ref={prosRef}>
        <div>
          <div className={cx(s.imgC, "img-c")}>
            <Img className="object-cover" src={"/img/franchise.jpg"} alt="Owra" width={2000} height={2000} />
          </div>
        </div>
        <div className={cx(s.text, "sticky-pin", "flex flex-col")}>
          <h2>{t("advantages.heading")}</h2>
          <div className={cx(s.items, "flex flex-col items-center tablet:items-start")}>
            <div className="flex flex-col">
              <h3>{t("advantages.items.i1.heading")}</h3>
              <p>{t("advantages.items.i1.text")}</p>
            </div>
            <div className="flex flex-col">
              <h3>{t("advantages.items.i2.heading")}</h3>
              <p>{t("advantages.items.i3.text")}</p>
            </div>
            <div className="flex flex-col">
              <h3>{t("advantages.items.i3.heading")}</h3>
              <p>{t("advantages.items.i3.text")}</p>
            </div>
            <div className="flex flex-col">
              <h3>{t("advantages.items.i4.heading")}</h3>
              <p>{t("advantages.items.i4.text")}</p>
            </div>
          </div>
        </div>
      </section>

      <section id="franchise" className={cx(s.contact, "grid grid-cols-1 tablet:grid-cols-2")}>
        <div className={s.text}>
          <h5>{t("contact.heading")}</h5>
          <p>{t("contact.text")}</p>
          <div className={cx(s.items, "flex flex-col items-center tablet:items-start")}>
            <div className="flex flex-col">
              <h3>{t("contact.contactInfo.phone")}</h3>
              <p>{contactData.phone}</p>
            </div>
            <div className="flex flex-col">
              <h3>{t("contact.contactInfo.email")}</h3>
              <p>{contactData.email}</p>
            </div>
            <div className="flex flex-col">
              <h3>{t("contact.contactInfo.address")}</h3>
              <p>{contactData.address}</p>
            </div>
          </div>
        </div>
        <div className={s.formContactC}>
          <FormContact formType={FormType.franchise} />
        </div>
      </section>
    </DefaultLayout>
  )
}

export async function getServerSideProps({ locale }: GetServerSidePropsContext) {
  const contactData = await single()

  return {
    props: {
      contactData,
      messages: (await import(`@/messages/${locale}.json`)).default,
    },
  }
}
