import s from "./product.module.scss"

import cx from "clsx"
import { GetServerSidePropsContext } from "next"
import { useLocale, useTranslations } from "next-intl"
import { useState } from "react"
import { useIsomorphicLayoutEffect } from "usehooks-ts"

import { single } from "@/api/queries/product-detail"
import GridSpecs from "@/components/grid-specs/GridSpecs"
import { Img } from "@/components/utility/img"
import { Link } from "@/components/utility/link"
import { DefaultLayout } from "@/layouts/default"
import { routes } from "@/lib/constants"
import { useTheme } from "@/lib/store/theme"
import { Locales, Product } from "@/types"
import { IconArrow } from "@/components/icons"

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
          <Link href={`/${routes[locale as Locales].products.path}`}>{t("products.breadcrumb")}</Link>
          <span> / </span>
          <span className={s.productName}>{props.product.name}</span>
        </div>
      </section>
      <section className={cx(s.product, "flex flex-col tablet:grid grid-cols-12")}>
        <div className="col-span-6 flex flex-col-reverse tablet:grid grid-cols-12 gap-4">
          <div
            className={cx(s.imgs, "col-span-2 flex flex-row tablet:flex-col justify-center tablet:justify-start gap-4")}
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
              <div
                className={cx(s.prevBtn, "flex items-center justify-center cursor-pointer")}
                onClick={() =>
                  setCurrentItem((prev) => (prev - 1 + props.product.images.length) % props.product.images.length)
                }
              >
                <div className={s.iconC}>
                  <IconArrow fill={props.product.backgroundColor} rotate={180} />
                </div>
              </div>
              <div
                className={cx(s.nextBtn, "flex items-center justify-center cursor-pointer")}
                onClick={() => setCurrentItem((prev) => (prev + 1) % props.product.images.length)}
              >
                <div className={s.iconC}>
                  <IconArrow fill={props.product.backgroundColor} />
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className={cx(s.info, "col-span-6")}>
          <div className={s.name}>{props.product.name}</div>
          <div className={s.size}>{props.product.size}</div>
          <div className={s.desc}>{props.product.description}</div>
          <div className={cx(s.other)}>
            <div className={s.title}>{t("products.ingredients")}</div>
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
      <section>
        <GridSpecs
          primaryFill="var(--magentle)"
          secondaryFill="var(--steamed-milk)"
          productImage={props.product.images[currentItem].img}
        />
      </section>
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
