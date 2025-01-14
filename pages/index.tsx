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
import { DefaultLayout } from "@/layouts/default"

import chocoshell from "@/public/img/chocoshell.png"
import freshburst from "@/public/img/freshburst.png"
import nutrifusion from "@/public/img/nutrifusion.png"
import royalcrisp from "@/public/img/royalcrisp.png"

const ParallaxWrapper = dynamic(() => import("@/components/animations/parallax"), {
  ssr: false,
})

const FloatWrapper = dynamic(() => import("@/components/animations/float"), {
  ssr: false,
})

import { Link } from "@/components/utility/link"
import { routes } from "@/lib/constants"
import { FormType, Locales } from "@/types"

export default function Home() {
  const t = useTranslations("home")
  const locale = useLocale()

  return (
    <DefaultLayout seo={routes[locale as Locales].home.seo}>
      <section className={cx(s.intro, "flex flex-col lg:flex-row items-center justify-between")}>
        <div className={cx(s.text, "tablet:w-1/2")}>
          <h1>
            {t.rich("intro.heading", {
              strong: (chunks) => <strong className="font-bold italic">{chunks}</strong>,
            })}
          </h1>
          <p>{t("intro.description")}</p>
          <Link className={cx(s.cta, "flex items-center justify-center")} href="/products">
            {t("intro.cta")}
          </Link>
        </div>
        <div className="tablet:w-1/2 relative h-[400px] lg:h-[500px]">
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
            <h2>OUR MISCHIEVOUS MIXES</h2>
          </div>
        </Marquee>
      </div>
      <SliderProducts />
      <section className={cx(s.why, "flex items-center")}>
        <div className="tablet:w-1/2">
          <div className={cx(s.imgs, "col-span-6 flex items-start justify-end")}>
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
        <div className={cx(s.text, "tablet:w-1/2")}>
          <h1>
            {t.rich("why.heading", { strong: (chunks) => <strong className="font-bold italic">{chunks}</strong> })}
          </h1>
          <p>{t("why.description")}</p>
          <Link className={cx(s.cta, "flex items-center justify-center")} href="/products">
            {t("why.cta")}
          </Link>
        </div>
      </section>
      <section className={cx(s.contact, "flex flex-col-reverse tablet:grid grid-cols-12 items-center")}>
        <div className={s.fillerTop}>
          <IconFiller />
        </div>
        <div className={cx(s.formC, "col-span-6")}>
          <h2>
            {t.rich("contact.heading", {
              strong: (chunks) => <strong className="font-bold italic">{chunks}</strong>,
              br: () => <br />,
            })}
          </h2>
          <FormContact theme="white" formType={FormType.contact} />
        </div>
        <div className="col-span-6">
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
