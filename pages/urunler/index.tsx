import s from "./products.module.scss"

import cx from "clsx"
import { GetServerSidePropsContext } from "next"
import { useLocale, useTranslations } from "next-intl"

import { all } from "@/api/queries/product-group"
import { Img } from "@/components/utility/img"
import { Link } from "@/components/utility/link"
import { DefaultLayout } from "@/layouts/default"
import { routes } from "@/lib/constants"
import { Locales, ProductCard } from "@/types"

export interface ProductsProps {
  productGroups: ProductCard[]
}

export default function Products(props: ProductsProps) {
  const locale = useLocale()
  const t = useTranslations()

  return (
    <DefaultLayout seo={routes[locale as Locales].products.seo}>
      <section className={cx(s.intro, "flex items-center justify-center")}>
        <h1>{t("products.productGroups")}</h1>
      </section>
      <section className={cx(s.products, "flex items-center justify-center flex-wrap gap-10")}>
        {props.productGroups &&
          props.productGroups.map((item, i) => {
            return (
              <Link
                href={`/${routes[locale as Locales].products.path}/${item.url}`}
                className={cx(s.product, "flex flex-col items-center cursor-pointer")}
                key={i}
              >
                <div className={s.imgC}>
                  <Img className="object-contain" src={item.img} height={500} width={500} alt="Product Visual" />
                </div>
                <p>{item.name}</p>
              </Link>
            )
          })}
      </section>
    </DefaultLayout>
  )
}

export async function getServerSideProps({ locale }: GetServerSidePropsContext) {
  const productGroups = await all(locale as Locales)

  if (!productGroups) {
    return {
      notFound: true,
    }
  }

  return {
    props: {
      messages: (await import(`@/messages/${locale}.json`)).default,
      productGroups,
    },
  }
}
