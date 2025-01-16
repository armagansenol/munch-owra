import s from "./about.module.scss"

import cx from "clsx"
import { GetStaticPropsContext } from "next"
import { useLocale, useTranslations } from "next-intl"
import dynamic from "next/dynamic"

import { Marquee } from "@/components/animations/marquee"
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

const LetterSwapForward = dynamic(() => import("@/components/letter-swap-forward"), {
  ssr: false,
})

export default function About() {
  const t = useTranslations("about")
  const locale = useLocale()

  return (
    <DefaultLayout seo={routes[locale as Locales].about.seo}>
      <div className={cx(s.intro, "flex flex-col tablet:grid tablet:grid-cols-12 items-center")}>
        <div className={cx(s.imgC, "col-span-6 rounded-md overflow-hidden")}>
          <Img className="object-cover" src={"/img/about-1.jpg"} alt="Products" width={1000} height={1000} />
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
          <ParallaxWrapper speedY={-0.2}>
            <StickerPremiumMix fillPrimary="var(--red-dit)" fillSecondary="var(--steamed-milk)" />
          </ParallaxWrapper>
        </div>
        <Marquee repeat={5}>
          <div className="flex items-center">
            <h2>{t("marquee")}</h2>
          </div>
        </Marquee>
      </section>
      <section className={cx(s.purpose, "grid grid-cols-1 tablet:grid-cols-2 gap-8 tablet:gap-0")}>
        <div className="flex flex-col items-center justify-center p-4 tablet:p-0 text-center">
          <h2 className="mb-4">{t("mission.heading")}</h2>
          <p>{t("mission.text")}</p>
        </div>
        <div className="flex flex-col items-center justify-center p-4 tablet:p-0 text-center">
          <h2 className="mb-4">{t("vision.heading")}</h2>
          <p>{t("vision.text")}</p>
        </div>
      </section>
      <section className={s.pros}>
        <div className={cx(s.imgC, "overflow-hidden")}>
          <ParallaxWrapper speedY={0.5}>
            <div className="h-[120%] -translate-y-[40%]">
              <Img className="object-cover" src={"/img/about-2.jpg"} alt="Products" width={2000} height={2000} />
            </div>
          </ParallaxWrapper>
        </div>
        <div className={cx(s.items, "grid grid-cols-1 tablet:grid-cols-4 gap-0 tablet:gap-4")}>
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
      <section className={cx(s.franchise, "flex flex-col items-center px-4 tablet:px-0")}>
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
              <h2>Owra</h2>
              <span className={s.iconC}>
                <IconArrow fill="var(--cedar-wood-finish)" />
              </span>
            </div>
          </Link>
        </div>
        <div className={s.text}>
          <p>
            {t.rich("franchise.text.p1", {
              strong: (chunks) => <strong className="font-semibold italic">{chunks}</strong>,
            })}
          </p>
          <p>
            {t.rich("franchise.text.p2", {
              strong: (chunks) => <strong className="font-semibold italic">{chunks}</strong>,
            })}
          </p>
        </div>
        <div className={cx(s.boxes, "flex justify-center gap-4")}>
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
        <div className={cx(s.text, "flex flex-col items-center tablet:items-start justify-center")}>
          <h4>
            {t.rich("career.title", { strong: (chunks) => <strong className="font-semibold italic">{chunks}</strong> })}
          </h4>
          <p>{t("career.text")}</p>
          <Link className={s.cta} href="mailto:career@owra.co">
            <LetterSwapForward
              label={`${t("career.cta")}`}
              reverse={false}
              transition={{
                type: "spring",
                duration: 0.5,
              }}
              staggerDuration={0.01}
            />
          </Link>
        </div>
        <div className={s.imgC}>
          <Img className="object-cover" src={"/img/home-2.jpg"} alt="Owra" width={1000} height={1000} />
        </div>
        <div className={s.fillerBottom}>
          <IconFiller />
        </div>
        <div className={cx(s.munch, s.munch1, "w-10 h-10")}>
          <ParallaxWrapper speedY={-1}>
            <Img className="object-contain" src={"/img/munchies/m-10.png"} alt="Owra" width={200} height={200} />
          </ParallaxWrapper>
        </div>
        <div className={cx(s.munch, s.munch2, "w-10 h-10")}>
          <ParallaxWrapper speedY={-1}>
            <Img className="object-contain" src={"/img/munchies/m-8.png"} alt="Owra" width={200} height={200} />
          </ParallaxWrapper>
        </div>
        <div className={cx(s.munch, s.munch3, "w-10 h-10")}>
          <ParallaxWrapper speedY={-1}>
            <Img className="object-contain" src={"/img/munchies/m-12.png"} alt="Owra" width={200} height={200} />
          </ParallaxWrapper>
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
