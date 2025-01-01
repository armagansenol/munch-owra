import s from "./home/home.module.scss"

import cx from "clsx"
import { GetStaticPropsContext } from "next"
import { useLocale, useTranslations } from "next-intl"
import dynamic from "next/dynamic"

import { Marquee } from "@/components/animations/marquee"
import { FormContact } from "@/components/form-contact"
import { IconBgStar, IconOk, IconOwraLogo, IconStar } from "@/components/icons"
import { SliderFade } from "@/components/slider-fade"
import { SliderProducts } from "@/components/slider-products"
import { Img } from "@/components/utility/img"
import { DefaultLayout } from "@/layouts/default"

const ParallaxWrapper = dynamic(() => import("@/components/animations/parallax"), {
  ssr: false,
})

const FloatWrapper = dynamic(() => import("@/components/animations/float"), {
  ssr: false,
})

import { routes } from "@/lib/constants"
import i1 from "@/public/img/b-1.png"
import i2 from "@/public/img/b-2.png"
import i3 from "@/public/img/b-3.png"
import i4 from "@/public/img/b-4.png"
import ice1 from "@/public/img/ice-1.png"
import ice2 from "@/public/img/ice-2.png"
import iceCubes from "@/public/img/ice-cubes.png"
import s1 from "@/public/img/s-1.svg"
import { FormType, Locales } from "@/types"

export default function Home() {
  const t = useTranslations("home")
  const locale = useLocale()

  return (
    <DefaultLayout seo={routes[locale as Locales].home.seo}>
      <section className={cx(s.intro, "flex items-center justify-center")}>
        <div className={s.logoC}>
          <IconOwraLogo />
        </div>

        <div className={s.cupC}>
          <FloatWrapper amountY={[-3, 3]} amountRotate={[-4, 4]}>
            <Img className="object-contain -rotate-6" src="/img/cup.png" alt="Ice Cup" height={1000} width={1000} />
          </FloatWrapper>
        </div>

        <div className={s.iceC}>
          <Img src={iceCubes} alt="Ice Cubes" priority={true} />
        </div>

        <div className={cx(s.ice, s.ice1)}>
          <ParallaxWrapper speedY={-1}>
            <Img alt="Ice Cube" className="object-contain rotate-12" src={i3} />
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
            <Img alt="Ice Cube" className="object-contain rotate-12" src={i4} />
          </ParallaxWrapper>
        </div>
      </section>

      <section className={cx(s.greetings, "flex flex-col items-center")}>
        <div className={s.text}>
          <h1 className="flex flex-col">
            <span>{t("headline.p1")}</span>
            <span>{t("headline.p2")}</span>
            <span>{t("headline.p3")}</span>
            <span>{t("headline.p4")}</span>
          </h1>
          <p>{t("description")}</p>
        </div>

        <div className={cx(s.fullImg, "h-screen")}>
          <Img className="object-cover" src={"/img/sample.jpg"} alt="Owra" width={2000} height={2000} />
        </div>

        <div className={s.waveC}>
          <Img src={s1} alt="Ice Cubes" />
        </div>

        <div className={cx(s.iceC, s.ice1)}>
          <ParallaxWrapper speedY={-0.9}>
            <Img className="object-contain" src={ice1} alt="Ice Cube" />
          </ParallaxWrapper>
        </div>

        <div className={cx(s.iceC, s.ice2)}>
          <ParallaxWrapper speedY={-0.6}>
            <Img className="object-contain" src={ice2} alt="Ice Cube" />
          </ParallaxWrapper>
        </div>
      </section>

      <div className={s.marqueeProductsC}>
        <Marquee repeat={5}>
          <div className="flex items-center">
            <h2>Ürünler</h2>
            <span className={s.iconC}>
              <IconStar fill="var(--algerian-colar)" />
            </span>
          </div>
        </Marquee>
      </div>

      <section className="w-screen h-[90vh] tablet:h-[120vh] flex items-center justify-center">
        <SliderProducts />
      </section>

      <section className={s.why}>
        <div className={s.marqueeC}>
          <Marquee repeat={5}>
            <div className="flex items-center">
              <h2>{t("why")}</h2>
              <span className={s.iconC}>
                <IconStar fill="var(--algerian-colar)" />
              </span>
            </div>
          </Marquee>
        </div>

        <div className="flex flex-col items-stretch gap:0 tablet:grid grid-cols-12 tablet:gap-10">
          <div className={cx(s.imgs, "col-span-6 flex items-start justify-end")}>
            <div className="relative flex">
              <div className={s.imgC}>
                <Img
                  className="object-cover"
                  src={"/img/ice-glass-shoot-full.jpg"}
                  alt="Owra"
                  width={1000}
                  height={1000}
                />
              </div>
              <div className={cx(s.iconC, s.icon1)}>
                <ParallaxWrapper speedY={-0.5}>
                  <IconStar fill="var(--algerian-colar)" />
                </ParallaxWrapper>
              </div>
              <div className={cx(s.iconC, s.icon2)}>
                <ParallaxWrapper speedY={-1}>
                  <IconStar fill="var(--algerian-colar)" />
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

      <section className={s.slider}>
        <div className={cx(s.sliderC, "flex items-center justify-center")}>
          <div className={s.bg}>
            <IconBgStar />
          </div>
          <SliderFade autoplay buttonStyles={s.button}>
            <div className="flex flex-col items-center">
              <h3 className={s.title}>{t("prosSlider.s1.title")}</h3>
              <p className={s.description}>{t("prosSlider.s1.description")}</p>
            </div>
            <div className="flex flex-col items-center">
              <h3 className={s.title}>{t("prosSlider.s2.title")}</h3>
              <p className={s.description}>{t("prosSlider.s2.description")}</p>
            </div>
            <div className="flex flex-col items-center">
              <h3 className={s.title}>{t("prosSlider.s3.title")}</h3>
              <p className={s.description}>{t("prosSlider.s3.description")}</p>
            </div>
          </SliderFade>
        </div>

        <div className={cx(s.ice, s.ice1)}>
          <FloatWrapper amountY={[-20, 20]}>
            <Img alt="Ice Cube" className="object-contain" src={i3} />
          </FloatWrapper>
        </div>

        <div className={cx(s.ice, s.ice2)}>
          <FloatWrapper amountY={[-20, 20]}>
            <Img alt="Ice Cube" className="object-contain" src={i1} />
          </FloatWrapper>
        </div>

        <div className={cx(s.ice, s.ice3)}>
          <FloatWrapper amountY={[-20, 20]}>
            <Img alt="Ice Cube" className="object-contain" src={i1} />
          </FloatWrapper>
        </div>

        <div className={cx(s.ice, s.ice4)}>
          <FloatWrapper amountY={[-20, 20]}>
            <Img alt="Ice Cube" className="object-contain" src={i2} />
          </FloatWrapper>
        </div>

        <div className={cx(s.ice, s.ice5)}>
          <FloatWrapper amountY={[-20, 20]}>
            <Img alt="Ice Cube" className="object-contain" src={i4} />
          </FloatWrapper>
        </div>
      </section>

      <section className={cx(s.contact, "flex flex-col-reverse tablet:grid grid-cols-12")}>
        <div className={cx(s.formC, "col-span-6")}>
          <h2>{t("contact.heading")}</h2>
          <FormContact theme="white" formType={FormType.contact} />
        </div>
        <div className="col-span-6">
          <div className={s.imgC}>
            <Img
              className="object-cover"
              src={"/img/ice-glass-commercial-social.jpg"}
              alt="Owra"
              width={1000}
              height={1000}
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
