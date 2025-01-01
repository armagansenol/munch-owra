import s from "./about.module.scss"

import cx from "clsx"
import { GetStaticPropsContext } from "next"
import { useLocale, useTranslations } from "next-intl"
import dynamic from "next/dynamic"

import { Marquee } from "@/components/animations/marquee"
import { Button } from "@/components/button"
import { IconInnovation, IconQuality, IconStar, IconTrust } from "@/components/icons"
import { Img } from "@/components/utility/img"
import { Link } from "@/components/utility/link"
import { DefaultLayout } from "@/layouts/default"
import { routes } from "@/lib/constants"
import { Locales } from "@/types"

import ice1 from "@/public/img/ice-1.png"
import ice3 from "@/public/img/ice-3.png"
import ice4 from "@/public/img/ice-4.png"

const ParallaxWrapper = dynamic(() => import("@/components/animations/parallax"), {
  ssr: false,
})

export default function About() {
  const t = useTranslations("about")
  const locale = useLocale()

  return (
    <DefaultLayout seo={routes[locale as Locales].about.seo}>
      <div className={cx(s.intro, "flex flex-col tablet:grid tablet:grid-cols-12 items-center")}>
        <div className={cx(s.imgC, "col-span-6")}>
          <Img
            className="object-contain"
            src={"/img/ice-glass-commercial.png"}
            alt="Ice Glass"
            width={2000}
            height={2000}
          />
        </div>
        <div className={cx(s.text, "col-span-6")}>
          <h1>
            <span>{t("intro.heading.p1")}</span>
            <span>{t("intro.heading.p2")}</span>
          </h1>
          <p>{t("intro.text")}</p>
        </div>
      </div>

      <section className={s.marqueeC}>
        <Marquee repeat={5}>
          <div className="flex items-center">
            <h2>{t("marquee")}</h2>
            <span className={s.iconC}>
              <IconStar fill="var(--science-blue)" />
            </span>
          </div>
        </Marquee>
        <div className={cx(s.iceC, s.ice1)}>
          <ParallaxWrapper speedY={-0.9}>
            <Img className="object-contain" src={ice1} alt="Ice Cube" />
          </ParallaxWrapper>
        </div>
      </section>

      <section className={cx(s.purpose, "grid grid-cols-1 tablet:grid-cols-2")}>
        <div className="flex flex-col items-center justify-center">
          <h2>{t("mission.heading")}</h2>
          <p>{t("mission.text")}</p>
        </div>
        <div className="flex flex-col items-center justify-center">
          <h2>{t("vision.heading")}</h2>
          <p>{t("vision.text")}</p>
        </div>
      </section>

      <section className={s.pros}>
        <div className={s.imgC}>
          <Img className="object-cover" src={"/img/ice-glass-shoot-full.jpg"} alt="Owra" width={2000} height={2000} />
        </div>
        <div className={cx(s.items, "grid grid-cols-1 tablet:grid-cols-4")}>
          <div className="flex flex-col items-center justify-start">
            <span className={s.iconC}>
              <IconQuality fill="var(--science-blue)" />
            </span>
            <h3>{t("values.quality.heading")}</h3>
            <p>{t("values.quality.text")}</p>
          </div>
          <div className="flex flex-col items-center justify-start">
            <span className={s.iconC}>
              <IconStar fill="var(--science-blue)" />
            </span>
            <h3>{t("values.fun.heading")}</h3>
            <p>{t("values.fun.text")}</p>
          </div>
          <div className="flex flex-col items-center justify-start">
            <span className={s.iconC}>
              <IconTrust fill="var(--science-blue)" />
            </span>
            <h3>{t("values.trust.heading")}</h3>
            <p>{t("values.trust.text")}</p>
          </div>
          <div className="flex flex-col items-center justify-start">
            <span className={s.iconC}>
              <IconInnovation fill="var(--science-blue)" />
            </span>
            <h3>{t("values.innovation.heading")}</h3>
            <p>{t("values.innovation.text")}</p>
          </div>
        </div>
      </section>

      {/* <section className={cx(s.franchise, "flex flex-col items-center")}>
        <p>{t("franchise.text")}</p>
        <Link className={s.cta} href={`/${routes[locale as Locales].franchise.path}`}>
          <Button>{t("franchise.cta")}</Button>
        </Link>
        <div className={cx(s.iceC, s.ice1)}>
          <ParallaxWrapper speedY={-1.5}>
            <Img className="object-contain" src={ice4} alt="Ice Cube" />
          </ParallaxWrapper>
        </div>

        <div className={cx(s.iceC, s.ice2)}>
          <ParallaxWrapper speedY={-0.6}>
            <Img className="object-contain" src={ice3} alt="Ice Cube" />
          </ParallaxWrapper>
        </div>
      </section> */}

      <section className={cx(s.career, "flex flex-col-reverse tablet:grid grid-cols-1 tablet:grid-cols-2 gap-10")}>
        <div className={cx(s.text, "flex flex-col items-center justify-center")}>
          <p>{t("career.text")}</p>
          <Link className={s.cta} href="mailto:career@owra.co">
            <Button theme="white">{t("career.cta")}</Button>
          </Link>
        </div>
        <div>
          <div className={s.imgC}>
            <Img
              className="object-cover"
              src={"/img/ice-glass-commercial-social.jpg"}
              alt="Owra"
              width={2000}
              height={2000}
            />
          </div>
        </div>
      </section>
    </DefaultLayout>
  )
}

export async function getStaticProps({ locale }: GetStaticPropsContext) {
  return {
    props: {
      messages: (await import(`@/messages/${locale}.json`)).default,
    },
  }
}
