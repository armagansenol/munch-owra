import s from "./footer.module.scss"

import cx from "clsx"
import { useTranslations } from "next-intl"
import { useRef } from "react"

import { useSingle } from "@/api/queries/contact"
import { useAll } from "@/api/queries/social-media"
import {
  IconFacebook,
  IconInstagram,
  IconLinkedin,
  IconOwraLogo,
  IconTiktok,
  IconX,
  IconYoutube,
} from "@/components/icons"
import { Link } from "@/components/utility/link"
import { SocialMedia } from "@/types"

export default function Footer() {
  const ref = useRef(null)
  const { data: contact } = useSingle()
  const { data: socialMedia } = useAll()
  const t = useTranslations("footer")

  const icons: Record<SocialMedia, JSX.Element> = {
    [SocialMedia.tiktok]: <IconTiktok fill={"var(--cedar-wood-finish)"} />,
    [SocialMedia.linkedin]: <IconLinkedin fill={"var(--cedar-wood-finish)"} />,
    [SocialMedia.facebook]: <IconFacebook fill={"var(--cedar-wood-finish)"} />,
    [SocialMedia.instagram]: <IconInstagram fill={"var(--cedar-wood-finish)"} />,
    [SocialMedia.x]: <IconX fill={"var(--cedar-wood-finish)"} />,
    [SocialMedia.youtube]: <IconYoutube fill={"var(--cedar-wood-finish)"} />,
  }

  return (
    <footer className={cx(s.footer, "flex flex-col items-stretch justify-center")} ref={ref}>
      <nav className={cx(s.nav, "flex flex-col items-stretch gap-10 tablet:gap-20")}>
        <div className={cx(s.row, "flex flex-col items-center tablet:flex-row tablet:items-start")}>
          <div className={cx(s.col, "flex flex-col")}>
            <Link className={cx(s.logoC, "cursor-pointer")} href="/">
              <IconOwraLogo fill="var(--cedar-wood-finish)" />
            </Link>
          </div>
          <div className={cx(s.col, "flex flex-col")}>
            <div className={s.navItem}>
              <h6>{t("salesAndOrders")}</h6>
              <p>{contact?.phone}</p>
            </div>
            <div className={s.navItem}>
              <h6>{t("generalQuestions")}</h6>
              <p>{contact?.email}</p>
            </div>
          </div>
          <div className={cx(s.col, "flex flex-col")}>
            <div className={s.navItem}>
              <h6>{t("address")}</h6>
              <p>{contact?.address}</p>
            </div>
          </div>
        </div>
        <div className={cx(s.copyright, "flex flex-col items-center justify-between tablet:flex-row tablet:items-end")}>
          <span>© {t("copyright.year")}</span>
          <span className={cx(s.social, "flex")}>
            {socialMedia?.map((item, i) => {
              return (
                <Link className={cx(s.iconC, "cursor-pointer")} href={item.url} key={i}>
                  {icons[item.name as SocialMedia]}
                </Link>
              )
            })}
          </span>
          <span>
            <Link className="underline" href="https://storkmotion.com">
              Stork Motion
            </Link>
          </span>
        </div>
      </nav>
    </footer>
  )
}
