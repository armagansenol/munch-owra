import s from "./home/home.module.scss"

import cx from "clsx"
import { GetStaticPropsContext } from "next"
import { useLocale, useTranslations } from "next-intl"
import dynamic from "next/dynamic"

import { Marquee } from "@/components/animations/marquee"
import { FormContact } from "@/components/form-contact"
import { GridSpecs } from "@/components/grid-specs"
import { IconFiller, IconOk, IconStickerPremiumMix } from "@/components/icons"
import { SliderProducts } from "@/components/slider-products"
import { Img } from "@/components/utility/img"
import { DefaultLayout } from "@/layouts/default"

import chocoshell from "@/public/img/chocoshell.png"
import freshburst from "@/public/img/fb.png"
import nutrifusion from "@/public/img/nutrifusion.png"
import royalcrisp from "@/public/img/royalcrisp.png"

const ParallaxWrapper = dynamic(() => import("@/components/animations/parallax"), {
  ssr: false,
})

const FloatWrapper = dynamic(() => import("@/components/animations/float"), {
  ssr: false,
})

import { routes } from "@/lib/constants"
import { FormType, Locales } from "@/types"

export default function Home() {
  const t = useTranslations("home")
  const locale = useLocale()

  return (
    <DefaultLayout seo={routes[locale as Locales].home.seo}>
      <section className={cx(s.intro, "flex flex-col lg:flex-row items-center justify-between")}>
        <div className="lg:w-1/2 space-y-6 mb-8 lg:mb-0 p-10">
          <h1 className="text-4xl lg:text-5xl font-bold text-brown-800 leading-tight">
            Stay Vital <span className="text-[#8B4513]">Every Day</span>,<br />
            Snack Natural with{" "}
            <span className="text-[#8B4513]">
              Every
              <br />
              Bite.
            </span>
          </h1>
          <p className="text-brown-700 text-lg max-w-md">
            A daily dose of energy and wellness, powered by nature&apos;s finest selection.
          </p>
          <button className="px-6 py-3 border-2 border-brown-800 text-brown-800 hover:bg-brown-800 hover:text-white transition-colors rounded-md">
            See All Products
          </button>
        </div>
        <div className="lg:w-1/2 relative h-[400px] lg:h-[500px]">
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
              <ParallaxWrapper speedY={-0.2}>
                <Img alt="Box" className="object-contain -rotate-[12deg]" src={nutrifusion} />
              </ParallaxWrapper>
            </div>
          </div>
        </div>
      </section>
      <section className={cx(s.specs, "flex flex-col items-center")}>
        <div className={s.fillerTop}>
          <IconFiller />
        </div>
        <GridSpecs productImage={nutrifusion.src} />
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
      <section className={s.why}>
        <div className="flex flex-col items-stretch gap:0 tablet:grid grid-cols-12 tablet:gap-10">
          <div className={cx(s.imgs, "col-span-6 flex items-start justify-end")}>
            <div className="relative">
              <div className={s.imgC}>
                <Img className="object-cover" src={"/img/home-1.jpg"} alt="Owra" width={1000} height={1000} />
              </div>
              <div className={s.iconC}>
                <ParallaxWrapper speedY={-0.5}>
                  <IconStickerPremiumMix fillPrimary="var(--magentle)" fillSecondary="var(--steamed-milk)" />
                </ParallaxWrapper>
              </div>
            </div>
          </div>
          <div className={cx(s.text, "flex flex-col items-center justify-center tablet:items-start col-span-6")}>
            <p>{t("pros.description")}</p>
            <ul>
              <li>
                <h5>
                  <span className={s.iconC}>
                    <IconOk />
                  </span>
                  {t("pros.items.i1.title")}
                </h5>
                <p>{t("pros.items.i1.description")}</p>
              </li>
              <li>
                <h5>
                  <span className={s.iconC}>
                    <IconOk />
                  </span>
                  {t("pros.items.i2.title")}
                </h5>
                <p>{t("pros.items.i2.description")}</p>
              </li>
              <li>
                <h5>
                  <span className={s.iconC}>
                    <IconOk />
                  </span>
                  {t("pros.items.i3.title")}
                </h5>
                <p>{t("pros.items.i3.description")}</p>
              </li>
              <li>
                <h5>
                  <span className={s.iconC}>
                    <IconOk />
                  </span>
                  {t("pros.items.i4.title")}
                </h5>
                <p>{t("pros.items.i4.description")}</p>
              </li>
            </ul>
          </div>
        </div>
      </section>
      <section className={cx(s.contact, "flex flex-col-reverse tablet:grid grid-cols-12")}>
        <div className={s.fillerTop}>
          <IconFiller />
        </div>
        <div className={cx(s.formC, "col-span-6")}>
          <h2>{t("contact.heading")}</h2>
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
