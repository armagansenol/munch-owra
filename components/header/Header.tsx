import s from "./header.module.scss"

import { Cross2Icon, HamburgerMenuIcon } from "@radix-ui/react-icons"
import cx from "clsx"
import { useLocale, useTranslations } from "next-intl"
import { useEffect, useRef, useState } from "react"

import { Marquee } from "@/components/animations/marquee"
import { IconOwraLogo, IconPointer } from "@/components/icons"
import { LocaleSwitcher } from "@/components/locale-switcher"
import { Img } from "@/components/utility/img"
import { Link } from "@/components/utility/link"
import { routes } from "@/lib/constants"
import { useLenisStore } from "@/lib/store/lenis"
import { useModalStore } from "@/lib/store/modal"
import { Locales } from "@/types"

export default function Header() {
  const ref = useRef(null)
  const modalStore = useModalStore()
  const { lenis } = useLenisStore()
  const [hamburgerOpen, setHamburgerOpen] = useState(false)
  const locale = useLocale()
  const t = useTranslations("header")

  function closeMenu() {
    setHamburgerOpen(false)
  }

  useEffect(() => {
    return hamburgerOpen ? lenis?.stop() : lenis?.start()
  }, [hamburgerOpen, lenis])

  function handleModal() {
    modalStore.setIsOpen(true)
    modalStore.setContent(
      <div className={s.modalContent}>
        <div className={cx(s.modalContentHeader, "flex items-center justify-between")}>
          <p>{t("modal.heading")}</p>
          <span className={cx(s.iconC, "cursor-pointer")} onClick={() => modalStore.setIsOpen(false)}>
            <Cross2Icon className="w-full h-full" />
          </span>
        </div>

        <div className={cx(s.content, "flex flex-col items-center tablet:items-start")}>
          <p>{t("modal.content.p1")}</p>
          <p>{t("modal.content.p2")}</p>
          <Link className={s.buttonDrop} href="mailto:sales@owra.co">
            {t("modal.button.text")}
          </Link>
        </div>

        <div className={s.iceC}>
          <Img alt="Ice Cube Sitting" src={"/img/ice-3.png"} height={500} width={500} className="object-contain" />
        </div>
      </div>
    )
  }

  return (
    <>
      <div className={cx(s.marquee, "cursor-pointer")} onClick={handleModal}>
        <Marquee repeat={10}>
          <div className={cx(s.feelingThirsty, "flex items-center")}>
            <small>{t("modal.heading")}</small>
            <span className={s.iconC}>
              <IconPointer fill="var(--white)" />
            </span>
          </div>
        </Marquee>
      </div>

      <header className={cx(s.header, "flex items-center justify-between")} ref={ref}>
        <Link className={cx(s.logoC, "cursor-pointer")} href="/" onClick={closeMenu}>
          <IconOwraLogo fill="var(--algerian-colar)" />
        </Link>

        <div
          className={cx(s.trigger, "block tablet:hidden", { [s.active]: hamburgerOpen })}
          onClick={() => setHamburgerOpen((prev) => !prev)}
        >
          {hamburgerOpen ? <Cross2Icon className="w-full h-full" /> : <HamburgerMenuIcon className="w-full h-full" />}
        </div>

        <nav
          className={cx(
            s.navC,
            "flex flex-col tablet:flex-row items-center justify-center tablet:justify-between flex-1 gap-5",
            {
              [s.active]: hamburgerOpen,
            }
          )}
        >
          <div className="flex flex-col tablet:flex-row items-center justify-between tablet:justify-center gap-5 tablet:gap-10">
            <div className={s.navItem} onClick={closeMenu}>
              <Link href={`/${routes[locale as Locales].about.path}`}>{routes[locale as Locales].about.ui}</Link>
            </div>
            <div className={s.navItem} onClick={closeMenu}>
              <Link href={`/${routes[locale as Locales].products.path}`}>{routes[locale as Locales].products.ui}</Link>
            </div>
            <div className={s.navItem} onClick={closeMenu}>
              <Link href={`/${routes[locale as Locales].blog.path}`}>{routes[locale as Locales].blog.ui}</Link>
            </div>
          </div>

          <div className="flex flex-col tablet:flex-row items-center justify-between tablet:justify-center gap-5 tablet:gap-10">
            {/* <div className={s.navItem} onClick={closeMenu}>
              <Link href={`/${routes[locale as Locales].franchise.path}`}>
                {routes[locale as Locales].franchise.ui}
              </Link>
            </div> */}
            <div className={s.navItem} onClick={closeMenu}>
              <Link href={`/${routes[locale as Locales].contact.path}`}>{routes[locale as Locales].contact.ui}</Link>
            </div>
            <div className={s.navItem}>
              <LocaleSwitcher />
            </div>
          </div>
        </nav>
      </header>
    </>
  )
}
