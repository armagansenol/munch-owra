import s from "./product.module.scss"

import cx from "clsx"
import { GetServerSidePropsContext } from "next"
import { useLocale, useTranslations } from "next-intl"
import { useState } from "react"
import { useIsomorphicLayoutEffect } from "usehooks-ts"

import { single } from "@/api/queries/product-detail"
import { Marquee } from "@/components/animations/marquee"
import { IconStar } from "@/components/icons"
import { SliderProducts } from "@/components/slider-products"
import { Img } from "@/components/utility/img"
import { Link } from "@/components/utility/link"
import { DefaultLayout } from "@/layouts/default"
import { routes } from "@/lib/constants"
import { useTheme } from "@/lib/store/theme"
import { Locales, Product } from "@/types"

export interface ProductGroupProps {
  product: Product
}

export default function ProductGroup(props: ProductGroupProps) {
  const [currentItem, setCurrentItem] = useState(0)
  const theme = useTheme()
  const locale = useLocale()
  const t = useTranslations()

  useIsomorphicLayoutEffect(() => {
    theme.setColors(props.product.textColor, props.product.backgroundColor)
    return () => theme.resetColors()
  }, [props.product.textColor, props.product.backgroundColor])

  return (
    <DefaultLayout seo={routes[locale as Locales].products.seo}>
      <section className={cx(s.intro, "flex flex-col justify-center")}>
        <div className={s.breadcrumb}>
          <Link href={`/${routes[locale as Locales].products.path}`}>{t("products.productGroups")}</Link>
          <span> / </span>
          <span>{props.product.name}</span>
        </div>
      </section>
      <section className={cx(s.product, "flex flex-col tablet:grid grid-cols-12 gap-0 tablet:gap-20")}>
        <div className="col-span-6 flex flex-col-reverse tablet:grid grid-cols-12 gap-2 tablet:gap-4">
          <div
            className={cx(s.imgs, "col-span-2 flex flex-row tablet:flex-col justify-center tablet:justify-start gap-2")}
          >
            {props.product.images.map((item, i) => {
              return (
                <div
                  className={cx(s.imgC, "cursor-pointer", { [s.active]: currentItem === i })}
                  key={i}
                  onClick={() => setCurrentItem(i)}
                >
                  <Img className="object-contain" src={item.img} height={500} width={500} alt="Product Visual" />
                </div>
              )
            })}
          </div>
          <div className="col-span-10">
            <div className={s.mainImgC}>
              <Img
                className="object-contain"
                src={props.product.images[currentItem].img}
                height={500}
                width={500}
                alt="Product Visual"
              />
            </div>
          </div>
        </div>
        <div className={cx(s.info, "col-span-6")}>
          <div className={s.volume}>{props.product.volume}</div>
          <div className={s.name}>{props.product.name}</div>
          <div className={s.size}>{props.product.size}</div>
          <div className={s.desc}>{props.product.description}</div>
          <div className={cx(s.other)}>
            <div className={s.title}>{t("products.otherOptions")}</div>
            <div className={cx(s.items, "flex items-center justify-center tablet:justify-start gap-3 flex-wrap")}>
              {props.product.other.map((item, i) => {
                return (
                  <Link
                    href={`/${routes[locale as Locales].products.path}/${item.url}`}
                    className={cx(s.imgC, "cursor-pointer")}
                    key={i}
                  >
                    <Img className="object-contain" src={item.image} height={500} width={500} alt="Product Visual" />
                  </Link>
                )
              })}
            </div>
          </div>
        </div>
      </section>
      <section className="w-screen py-10 pb-0 tablet:pb-10 bg-[var(--theme-secondary)]">
        <div className={cx(s.marqueeC, "mb-10")}>
          <Marquee repeat={5}>
            <div className="flex items-center">
              <h2>{t("products.otherProducts")}</h2>
              <span className={s.iconC}>
                <IconStar fill="var(--theme-primary)" />
              </span>
            </div>
          </Marquee>
        </div>
        <div className="px-0 tablet:px-10">
          <div className="h-[90vh] tablet:h-[120vh] rounded-none tablet:rounded-xl overflow-hidden">
            <SliderProducts />
          </div>
        </div>
      </section>
      {/* <section className={cx(s.franchise, "flex flex-col items-center")}>
        <p>{t("productDetail.franchise.text")}</p>
        <Link className={s.cta} href={`/${routes[locale as Locales].franchise.path}`}>
          <Button>{t("productDetail.franchise.cta")}</Button>
        </Link>
      </section> */}
      {/* <section className={cx(s.contact, "flex flex-col-reverse tablet:grid grid-cols-12")}>
        <div className={cx(s.formC, "col-span-6")}>
          <h2>{t("contact.heading")}</h2>
          <FormContact theme="white" formType={FormType.contact} />
        </div>
        <div className="col-span-6">
          <div className={s.imgC}>
            <Img className="object-cover" src={"/img/sample.jpg"} alt="Owra" width={2000} height={2000} />
          </div>
        </div>
      </section> */}
    </DefaultLayout>
  )
}

export async function getServerSideProps({ query, locale }: GetServerSidePropsContext) {
  const product = await single(locale as Locales, query.product as string)

  if (!product) {
    return {
      notFound: true,
    }
  }

  return {
    props: {
      productName: query.product,
      product,
      messages: (await import(`@/messages/${locale}.json`)).default,
    },
  }
}
