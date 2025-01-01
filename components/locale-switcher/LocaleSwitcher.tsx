import s from "./locale-switcher.module.scss"

import cx from "clsx"
import gsap from "gsap"
import { useRouter } from "next/router"
import { useState } from "react"

const LocaleSwitcher = () => {
  const { locale, locales, push, pathname, query, asPath } = useRouter()
  const [selectedLocale, setSelectedLocale] = useState(locale)

  const switchLocale = (newLocale: string) => {
    gsap.to("body", {
      opacity: 0,
      duration: 0.2,
      onComplete: () => {
        setSelectedLocale(newLocale)
        push({ pathname, query }, asPath, { locale: newLocale })
        gsap.to("body", {
          delay: 0.4,
          opacity: 1,
          duration: 0.4,
        })
      },
    })
  }

  // useEffect(() => {
  //   setSelectedLocale(locale)
  // }, [locale])

  return (
    <div className={cx(s.localeSwitcher, "flex items-center")}>
      {locales?.map((loc) => (
        <div
          className={cx(s.locale, "cursor-pointer", { [s.active]: selectedLocale === loc })}
          key={loc}
          onClick={() => switchLocale(loc)}
        >
          {loc}
        </div>
      ))}
    </div>
  )
}

export default LocaleSwitcher
