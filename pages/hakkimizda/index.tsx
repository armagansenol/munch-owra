import s from "./about.module.scss"

import cx from "clsx"
import { GetStaticPropsContext } from "next"
import { useLocale, useTranslations } from "next-intl"
import dynamic from "next/dynamic"

import { Marquee } from "@/components/animations/marquee"
import { Button } from "@/components/button"
import {
  IconArrow,
  IconFiller,
  IconInnovation,
  IconQuality,
  IconStar,
  IconTrust,
  StickerPremiumMix,
} from "@/components/icons"
import { Img } from "@/components/utility/img"
import { Link } from "@/components/utility/link"
import { DefaultLayout } from "@/layouts/default"
import { routes } from "@/lib/constants"
import { Locales } from "@/types"

import chocoshell from "@/public/img/chocoshell.png"
import freshburst from "@/public/img/freshburst.png"
import nutrifusion from "@/public/img/nutrifusion.png"
import royalcrisp from "@/public/img/royalcrisp.png"

const ParallaxWrapper = dynamic(() => import("@/components/animations/parallax"), {
  ssr: false,
})

export default function About() {
  const t = useTranslations("about")
  const locale = useLocale()

  return (
    <DefaultLayout seo={routes[locale as Locales].about.seo}>
      <div className={cx(s.intro, "flex flex-col tablet:grid tablet:grid-cols-12 items-center")}>
        <div className={cx(s.imgC, "col-span-6 rounded-md overflow-hidden")}>
          <Img className="object-cover" src={"/img/about-1.jpg"} alt="Ice Glass" width={1000} height={1000} />
        </div>
        <div className={cx(s.text, "col-span-6")}>
          <h1>
            <span>
              {t.rich("intro.heading.p1", {
                strong: (chunks) => <strong className="font-semibold italic">{chunks}</strong>,
              })}
            </span>
            <span>
              {t.rich("intro.heading.p2", {
                strong: (chunks) => <strong className="font-semibold italic">{chunks}</strong>,
              })}
            </span>
          </h1>
          <p>{t("intro.text")}</p>
        </div>
      </div>
      <section className={s.marqueeC}>
        <div className={s.sticker}>
          <StickerPremiumMix fillPrimary="var(--red-dit)" fillSecondary="var(--steamed-milk)" />
        </div>
        <Marquee repeat={5}>
          <div className="flex items-center">
            <h2>{t("marquee")}</h2>
          </div>
        </Marquee>
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
          <Img className="object-cover" src={"/img/about-2.jpg"} alt="Owra" width={2000} height={2000} />
        </div>
        <div className={cx(s.items, "grid grid-cols-1 tablet:grid-cols-4")}>
          <div className="flex flex-col items-center justify-start">
            <span className={s.iconC}>
              <IconQuality fill="var(--red-dit)" />
            </span>
            <h3>{t("values.quality.heading")}</h3>
            <p>{t("values.quality.text")}</p>
          </div>
          <div className="flex flex-col items-center justify-start">
            <span className={s.iconC}>
              <IconStar fill="var(--red-dit)" />
            </span>
            <h3>{t("values.fun.heading")}</h3>
            <p>{t("values.fun.text")}</p>
          </div>
          <div className="flex flex-col items-center justify-start">
            <span className={s.iconC}>
              <IconTrust fill="var(--red-dit)" />
            </span>
            <h3>{t("values.trust.heading")}</h3>
            <p>{t("values.trust.text")}</p>
          </div>
          <div className="flex flex-col items-center justify-start">
            <span className={s.iconC}>
              <IconInnovation fill="var(--red-dit)" />
            </span>
            <h3>{t("values.innovation.heading")}</h3>
            <p>{t("values.innovation.text")}</p>
          </div>
        </div>
      </section>
      <section className={cx(s.franchise, "flex flex-col items-center")}>
        <div className={s.otherDelights}>
          <Marquee repeat={5}>
            <div className="flex items-center">
              <h2>{t("marquee2")}</h2>
            </div>
          </Marquee>
        </div>
        <div className={s.links}>
          <Link href="https://chillowra.com" className={cx(s.link, "block cursor-pointer")}>
            <div className="flex items-center justify-between">
              <h2>Chill Owra</h2>
              <span className={s.iconC}>
                <IconArrow fill="var(--cedar-wood-finish)" />
              </span>
            </div>
          </Link>
        </div>
        <div className={s.text}>
          <p>
            <span className="font-medium">Owra</span> is more than just a brand;{" "}
            <span className="italic">it&apos;s a lifestyle</span>. We&apos;re here to make every moment of your life{" "}
            <span className="italic">more enjoyable and special</span>.
          </p>
          <p>
            <span className="font-medium">Join us</span> and add a little more joy to your life with Owra.
          </p>
        </div>
        <div className={cx(s.boxes, "flex")}>
          <div>
            <Img src={nutrifusion} alt="Nutrifusion Product" />
          </div>
          <div>
            <Img src={royalcrisp} alt="Royalcrisp Product" />
          </div>
          <div>
            <Img src={freshburst} alt="Freshburst Product" />
          </div>
          <div>
            <Img src={chocoshell} alt="Chocoshelf Product" />
          </div>
        </div>
      </section>
      <section className={cx(s.career, "flex flex-col-reverse tablet:grid grid-cols-1 tablet:grid-cols-2")}>
        <div className={cx(s.text, "flex flex-col items-start justify-center")}>
          <h4>{t.rich("career.title", { strong: (chunks) => <strong className="font-semibold">{chunks}</strong> })}</h4>
          <p>{t("career.text")}</p>
          <Link className={s.cta} href="mailto:career@owra.co">
            <Button theme="white">{t("career.cta")}</Button>
          </Link>
        </div>
        <div>
          <div className={s.imgC}>
            <Img className="object-cover" src={"/img/home-2.jpg"} alt="Owra" width={1000} height={1000} />
          </div>
        </div>
        <div className={s.fillerBottom}>
          <IconFiller />
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
