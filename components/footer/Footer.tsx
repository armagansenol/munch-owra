import s from "./footer.module.scss"

import { gsap, ScrollTrigger } from "@/lib/gsap"
import { useGSAP } from "@gsap/react"
import cx from "clsx"
import { useTranslations } from "next-intl"
import { useRef } from "react"

import { useSingle } from "@/api/queries/contact"
import { useAll } from "@/api/queries/social-media"
import { IconFacebook, IconInstagram, IconLinkedin, IconTiktok, IconX, IconYoutube } from "@/components/icons"
import { Link } from "@/components/utility/link"
import { SocialMedia } from "@/types"

export default function Footer() {
  const ref = useRef(null)
  const { data: contact } = useSingle()
  const { data: socialMedia } = useAll()
  const t = useTranslations("footer")

  useGSAP(
    () => {
      const tl = gsap.timeline({ paused: true })

      tl.from(
        ".logo-c",
        {
          yPercent: 100,
          scale: 0.9,
        },
        "s"
      ).from(
        ".ice-c",
        {
          yPercent: -80,
          scale: 1.05,
        },
        "s"
      )

      ScrollTrigger.create({
        animation: tl,
        trigger: ref.current,
        scrub: true,
        end: "bottom bottom",
      })
    },
    { scope: ref, dependencies: [contact, socialMedia, t], revertOnUpdate: true }
  )

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
        <div
          className={cx(s.copyright, "flex flex-col items-center justify-between tablet:flex-row tablet:items-end ")}
        >
          <span>© {t("copyright.year")}</span>
          <span className={cx(s.social, "flex")}>
            {socialMedia?.map((item, i) => {
              return (
                <Link className={s.iconC} href={item.url} key={i}>
                  {icons[item.name as SocialMedia]}
                </Link>
              )
            })}
          </span>
          <span>
            Made by{" "}
            <Link className="underline" href="https://bytemywork.com">
              Byte My Work
            </Link>
          </span>
        </div>
      </nav>
    </footer>
  )
}
