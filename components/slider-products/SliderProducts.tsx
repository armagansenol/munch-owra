import s from "./slider-products.module.scss"

import cx from "clsx"
import { useLocale } from "next-intl"
import { useEffect, useRef, useState } from "react"

import Float from "@/components/animations/float"
import { Marquee } from "@/components/animations/marquee"
import CursorText from "@/components/cursor/cursor-text"
import { IconArrow, IconWavyBg, IconWavyBgVertical } from "@/components/icons"
import { SliderFade } from "@/components/slider-fade"
import { Img } from "@/components/utility/img"
import { Link } from "@/components/utility/link"
import { routes } from "@/lib/constants"
import { Locales } from "@/types"

export default function SliderProducts() {
  const [currentSlide, setCurrentSlide] = useState(0)

  const products = {
    nutrifusion: {
      type: "nutrifusion",
      color: "var(--red-dit)",
      marquee: "NUTRIFUSION",
    },
    freshburst: {
      type: "freshburst",
      color: "var(--appetizing-asparagus)",
      marquee: "FRESHBURST",
    },
    royalcrisp: {
      type: "royalcrisp",
      color: "var(--pico-orange)",
      marquee: "ROYALCRISP",
    },
    chocoshell: {
      type: "chocoshell",
      color: "var(--magentle)",
      marquee: "CHOCO SHELL",
    },
  }

  return (
    <div className={s.sliderProductsC} onClick={() => setCurrentSlide((prev) => (prev + 1) % 4)}>
      <div className={cx(s.sliderProducts, "relative w-full h-full flex items-center justify-center")}>
        <div className={cx(s.sliderC, "relative z-20")}>
          <SliderFade>
            <div className={cx(s.slide, "flex flex-col items-center")}>
              <Float amountY={[-3, 3]}>
                <div className={cx(s.imgC, "scale-110")}>
                  {<Sequence type={Object.values(products)[currentSlide].type} />}
                </div>
              </Float>
            </div>
          </SliderFade>
        </div>
        <div className={cx(s.prevBtn, "flex items-center justify-center cursor-pointer")}>
          <div className={s.iconC}>
            <IconArrow fill={Object.values(products)[currentSlide].color} rotate={180} />
          </div>
        </div>
        <div className={cx(s.nextBtn, "flex items-center justify-center cursor-pointer")}>
          <div className={s.iconC}>
            <IconArrow fill={Object.values(products)[currentSlide].color} />
          </div>
        </div>
        <div className={cx(s.bg, "absolute top-0 left-0 right-0 bottom-0 z-0 hidden tablet:block")}>
          <div className="w-full h-full hidden tablet:block">
            <IconWavyBg fill={Object.values(products)[currentSlide].color} />
          </div>
          <div className="w-full h-full block tablet:hidden">
            <IconWavyBgVertical fill={Object.values(products)[currentSlide].color} />
          </div>
        </div>
      </div>
      <div
        className={s.marqueeC}
        style={{ "--text-color": Object.values(products)[currentSlide].color } as React.CSSProperties}
      >
        <Marquee repeat={10} duration={5}>
          <div className="flex items-center">
            <h2>{Object.values(products)[currentSlide].marquee}</h2>
          </div>
        </Marquee>
      </div>
    </div>
  )
}

export function Sequence({ type }: { type: string }) {
  const locale = useLocale()
  const PHASE = 22

  const [currentItem, setCurrentItem] = useState(0)

  const intervalRef = useRef<NodeJS.Timeout | null>(null)

  const startLoop = () => {
    if (intervalRef.current) return

    intervalRef.current = setInterval(() => {
      setCurrentItem((prev) => (prev + 1) % PHASE)
    }, 100)
  }

  const stopLoop = () => {
    if (intervalRef.current) {
      clearInterval(intervalRef.current)
      intervalRef.current = null
    }
  }

  useEffect(() => {
    return () => stopLoop()
  }, [])

  return (
    <div className="w-full h-full relative" onMouseEnter={startLoop} onMouseLeave={stopLoop}>
      <CursorText>
        {Array.from({ length: PHASE }).map((_, i) => {
          return (
            <div key={i}>
              <Link
                href={`/${routes[locale as Locales].products.path}`}
                className={cx(s.item, "cursor-pointer absolute top-0 left-0 bottom-0 right-0", {
                  [s.active]: currentItem === i,
                })}
              >
                <Img
                  priority={true}
                  className="object-contain"
                  alt="Product Visual"
                  src={`/img/sequences/${type}/${i + 1}.png`}
                  height={1000}
                  width={1000}
                />
              </Link>
            </div>
          )
        })}
      </CursorText>
    </div>
  )
}
