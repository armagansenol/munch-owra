import s from "./contact.module.scss"

import cx from "clsx"
import { GetServerSidePropsContext } from "next"
import { useLocale, useTranslations } from "next-intl"

import { single } from "@/api/queries/contact"
import { FormContact } from "@/components/form-contact"
import { DefaultLayout } from "@/layouts/default"
import { routes } from "@/lib/constants"
import { ContactData, FormType, Locales } from "@/types"

interface ContactProps {
  contactData: ContactData
}

export default function Contact(props: ContactProps) {
  const { contactData } = props
  const t = useTranslations("contact")
  const locale = useLocale()

  return (
    <DefaultLayout seo={routes[locale as Locales].contact.seo}>
      <section className={cx(s.contact, "grid grid-cols-1 tablet:grid-cols-2")}>
        <div className={s.text}>
          <h1>{t("heading")}</h1>
          <div className={cx(s.items, "flex flex-col items-center tablet:items-start")}>
            <div className="flex flex-col">
              <h3>{t("contactInfo.phone")}</h3>
              <p>{contactData.phone}</p>
            </div>
            <div className="flex flex-col">
              <h3>{t("contactInfo.email")}</h3>
              <p>{contactData.email}</p>
            </div>
            <div className="flex flex-col">
              <h3>{t("contactInfo.address")}</h3>
              <p>{contactData.address}</p>
            </div>
          </div>
        </div>
        <div className={s.formContactC}>
          <FormContact formType={FormType.contact} />
        </div>
      </section>
    </DefaultLayout>
  )
}

export async function getServerSideProps({ locale }: GetServerSidePropsContext) {
  const contactData = await single()

  return {
    props: {
      contactData,
      messages: (await import(`@/messages/${locale}.json`)).default,
    },
  }
}
