import s from "./home/home.module.scss"

import cx from "clsx"
import { GetStaticPropsContext } from "next"
import { useLocale, useTranslations } from "next-intl"
import dynamic from "next/dynamic"

import { Marquee } from "@/components/animations/marquee"
import { FormContact } from "@/components/form-contact"
import { GridSpecs } from "@/components/grid-specs"
import { IconFiller, StickerPremiumMix } from "@/components/icons"
import { SliderProducts } from "@/components/slider-products"
import { Img } from "@/components/utility/img"
import { Link } from "@/components/utility/link"
import { DefaultLayout } from "@/layouts/default"
import { routes } from "@/lib/constants"
import { FormType, Locales } from "@/types"

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

export default function Home() {
  const t = useTranslations("home")
  const locale = useLocale()

  return (
    <DefaultLayout seo={routes[locale as Locales].home.seo}>
      <section className={cx(s.intro, "flex flex-col lg:flex-row items-center justify-between")}>
        <div className={s.textC}>
          <div className={s.text}>
            <h1 className="text-center lg:text-left">
              {t.rich("intro.heading", {
                strong: (chunks) => <strong className="font-bold italic">{chunks}</strong>,
              })}
            </h1>
            <p className="text-center lg:text-left">{t("intro.description")}</p>
            <Link
              className={cx(s.cta, "flex items-center justify-center cursor-pointer mx-auto lg:mx-0")}
              href="/urunler"
            >
              <LetterSwapForward
                label={`${t("intro.cta")}`}
                reverse={false}
                className="font-bold"
                transition={{
                  type: "spring",
                  duration: 0.5,
                }}
                staggerDuration={0.01}
              />
            </Link>
          </div>
        </div>
        <div className={s.boxes}>
          <div className="relative">
            <div className={cx(s.box, s.box1)}>
              <ParallaxWrapper speedY={-0.2}>
                <Img alt="Box" className="object-contain rotate-[16deg]" src={royalcrisp} />
              </ParallaxWrapper>
            </div>
            <div className={cx(s.box, s.box2)}>
              <ParallaxWrapper speedY={-0.2}>
                <Img alt="Box" className="object-contain -rotate-[9deg]" src={freshburst} />
              </ParallaxWrapper>
            </div>
            <div className={cx(s.box, s.box3)}>
              <ParallaxWrapper speedY={-0.2}>
                <Img alt="Box" className="object-contain rotate-[12deg]" src={chocoshell} />
              </ParallaxWrapper>
            </div>
            <div className={cx(s.box, s.box4)}>
              <ParallaxWrapper speedY={-0.3}>
                <Img alt="Box" className="object-contain -rotate-[12deg]" src={nutrifusion} />
              </ParallaxWrapper>
            </div>
          </div>
        </div>
      </section>
      <section className={cx(s.specs)}>
        <GridSpecs primaryFill="var(--red-dit)" secondaryFill="var(--steamed-milk)" productImage={nutrifusion.src} />
        <div className={cx(s.munch, s.munch1, "w-10 h-10")}>
          <ParallaxWrapper speedY={-0.5}>
            <Img className="object-contain" src={"/img/munchies/m-1.png"} alt="Owra" width={200} height={200} />
          </ParallaxWrapper>
        </div>
        <div className={cx(s.munch, s.munch2, "w-10 h-10")}>
          <ParallaxWrapper speedY={-0.5}>
            <Img className="object-contain" src={"/img/munchies/m-2.png"} alt="Owra" width={200} height={200} />
          </ParallaxWrapper>
        </div>
        <div className={cx(s.munch, s.munch3, "w-10 h-10")}>
          <ParallaxWrapper speedY={-0.5}>
            <Img className="object-contain" src={"/img/munchies/m-3.png"} alt="Owra" width={200} height={200} />
          </ParallaxWrapper>
        </div>
        <div className={cx(s.munch, s.munch4, "w-10 h-10")}>
          <ParallaxWrapper speedY={-0.5}>
            <Img className="object-contain" src={"/img/munchies/m-4.png"} alt="Owra" width={200} height={200} />
          </ParallaxWrapper>
        </div>
        <div className={cx(s.munch, s.munch5, "w-10 h-10")}>
          <ParallaxWrapper speedY={-0.5}>
            <Img className="object-contain" src={"/img/munchies/m-5.png"} alt="Owra" width={200} height={200} />
          </ParallaxWrapper>
        </div>
        <div className={cx(s.munch, s.munch6, "w-10 h-10")}>
          <ParallaxWrapper speedY={-0.5}>
            <Img className="object-contain" src={"/img/munchies/m-6.png"} alt="Owra" width={200} height={200} />
          </ParallaxWrapper>
        </div>
        <div className={cx(s.munch, s.munch7, "w-10 h-10")}>
          <ParallaxWrapper speedY={-0.5}>
            <Img className="object-contain" src={"/img/munchies/m-7.png"} alt="Owra" width={200} height={200} />
          </ParallaxWrapper>
        </div>
        <div className={cx(s.munch, s.munch8, "w-10 h-10")}>
          <ParallaxWrapper speedY={-0.5}>
            <Img className="object-contain" src={"/img/munchies/m-8.png"} alt="Owra" width={200} height={200} />
          </ParallaxWrapper>
        </div>
        <div className={cx(s.munch, s.munch9, "w-10 h-10")}>
          <ParallaxWrapper speedY={-0.5}>
            <Img className="object-contain" src={"/img/munchies/m-9.png"} alt="Owra" width={200} height={200} />
          </ParallaxWrapper>
        </div>
        <div className={cx(s.munch, s.munch10, "w-10 h-10")}>
          <ParallaxWrapper speedY={-0.5}>
            <Img className="object-contain" src={"/img/munchies/m-10.png"} alt="Owra" width={200} height={200} />
          </ParallaxWrapper>
        </div>
        <div className={cx(s.munch, s.munch11, "w-10 h-10")}>
          <ParallaxWrapper speedY={-0.5}>
            <Img className="object-contain" src={"/img/munchies/m-11.png"} alt="Owra" width={200} height={200} />
          </ParallaxWrapper>
        </div>
        <div className={cx(s.munch, s.munch12, "w-10 h-10")}>
          <ParallaxWrapper speedY={-0.5}>
            <Img className="object-contain" src={"/img/munchies/m-12.png"} alt="Owra" width={200} height={200} />
          </ParallaxWrapper>
        </div>
        <div className={cx(s.munch, s.munch13, "w-10 h-10")}>
          <ParallaxWrapper speedY={-0.5}>
            <Img className="object-contain" src={"/img/munchies/m-13.png"} alt="Owra" width={200} height={200} />
          </ParallaxWrapper>
        </div>
      </section>
      <div className={s.marqueeProductsC}>
        <Marquee repeat={5}>
          <div className="flex items-center">
            <h2>{t("marqueeProducts")}</h2>
          </div>
        </Marquee>
      </div>
      <SliderProducts />
      <section className={cx(s.why, "flex flex-col lg:flex-row items-center")}>
        <div className="w-full lg:w-1/2">
          <div className={cx(s.imgs, "flex items-start justify-center lg:justify-end")}>
            <div className="relative">
              <div className={s.imgC}>
                <Img className="object-cover" src={"/img/home-1.jpg"} alt="Owra" width={1000} height={1000} />
              </div>
              <div className={s.iconC}>
                <ParallaxWrapper speedY={-0.5}>
                  <StickerPremiumMix fillPrimary="var(--magentle)" fillSecondary="var(--steamed-milk)" />
                </ParallaxWrapper>
              </div>
            </div>
          </div>
        </div>
        <div className={cx(s.text, "w-full lg:w-1/2 text-center lg:text-left mt-8 lg:mt-0")}>
          <h1>
            {t.rich("why.heading", { strong: (chunks) => <strong className="font-bold italic">{chunks}</strong> })}
          </h1>
          <p>{t("why.description")}</p>
          <Link className={cx(s.cta, "flex items-center justify-center mx-auto lg:mx-0")} href="/urunler">
            <LetterSwapForward
              label={`${t("why.cta")}`}
              reverse={false}
              className="font-bold"
              transition={{
                type: "spring",
                duration: 0.5,
              }}
              staggerDuration={0.01}
            />
          </Link>
        </div>
      </section>
      <section className={cx(s.contact, "flex flex-col-reverse lg:grid lg:grid-cols-12 items-center")}>
        <div className={s.fillerTop}>
          <IconFiller />
        </div>
        <div className={cx(s.formC, "w-full lg:col-span-6 text-center lg:text-left px-4 lg:px-0")}>
          <h2>
            {t.rich("contact.heading", {
              strong: (chunks) => <strong className="font-bold italic">{chunks}</strong>,
              br: () => <br />,
            })}
          </h2>
          <FormContact theme="white" formType={FormType.contact} />
        </div>
        <div className="w-full lg:col-span-6">
          <div className={s.imgC}>
            <Img className="object-cover" src={"/img/home-2.jpg"} alt="Owra" width={1000} height={1000} />
          </div>
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
