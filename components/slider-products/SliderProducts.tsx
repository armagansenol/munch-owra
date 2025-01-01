import s from "./slider-products.module.scss"

import { OrthographicCamera } from "@react-three/drei"
import { Canvas } from "@react-three/fiber"
import cx from "clsx"
import { Leva } from "leva"
import { useLocale, useTranslations } from "next-intl"
import { useEffect, useRef, useState } from "react"

import Float from "@/components/animations/float"
import { SliderFade } from "@/components/slider-fade"
import { Img } from "@/components/utility/img"
import { Link } from "@/components/utility/link"
import { Vortex } from "@/components/vortex"
import CursorText from "../cursor/cursor-text"
import { routes } from "@/lib/constants"
import { Locales } from "@/types"

export default function SliderProducts() {
  const t = useTranslations("productSlider")

  const seqs = {
    iceGlass: "ice-glass",
    boba: "boba",
    coffee: "coffee",
  }

  const [currentSlide, setCurrentSlide] = useState(0)

  const handleSelectSlide = (index: number) => {
    setCurrentSlide(index)
  }

  return (
    <div className={cx(s.sliderProducts, "w-full h-full flex items-center justify-center")}>
      <div className={cx(s.sliderC, "z-20")}>
        <SliderFade onSelectSlide={handleSelectSlide}>
          <div className={cx(s.slide, "flex flex-col items-center")}>
            <Float amountY={[-3, 3]}>
              <div className={cx(s.imgC, "scale-110")}>{<Sequence type={seqs.iceGlass} />}</div>
            </Float>
            <div className={s.text}>
              <h3 className={s.title}>{t("s1.title")}</h3>
            </div>
          </div>
          {/* <div className={cx(s.slide, "flex flex-col items-center")}>
            <Float amountY={[-3, 3]}>
              <div className={cx(s.imgC, "scale-105")}>{<Sequence type={seqs.boba} />}</div>
            </Float>
            <div className={s.text}>
              <h3 className={s.title}>{t("s2.title")}</h3>
            </div>
          </div>
          <div className={cx(s.slide, "flex flex-col items-center")}>
            <Float amountY={[-3, 3]}>
              <div className={cx(s.imgC, "scale-125")}>{<Sequence type={seqs.coffee} />}</div>
            </Float>
            <div className={s.text}>
              <h3 className={s.title}>{t("s3.title")}</h3>
            </div>
          </div> */}
        </SliderFade>
      </div>
      <div className="absolute top-0 left-0 right-0 bottom-0 z-0">
        <Canvas dpr={2}>
          <Vortex currentItem={currentSlide} />
          <OrthographicCamera makeDefault zoom={50} near={0.1} far={1000} position={[0, 0, 100]} />
          <Leva hidden />
        </Canvas>
      </div>
      {/* <Link
        className={cx(
          s.cta,
          "absolute bottom-auto tablet:bottom-5 right-2 tablet:right-5 top-2 tablet:top-auto flex items-center gap-2 cursor-pointer"
        )}
        href="/showcase"
      >
        <span>{t("cta.title")}</span>
        <span className={s.iconC}>
          <div className="w-full h-full">
            <IconArrow fill="var(--science-blue)" />
          </div>
        </span>
      </Link> */}
    </div>
  )
}

export function Sequence({ type }: { type: unknown }) {
  const locale = useLocale()
  const PHASE = 22

  const [currentItem, setCurrentItem] = useState(0)

  const intervalRef = useRef<NodeJS.Timeout | null>(null) // Reference to store the interval ID

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
                  src={`/img/sequences/${type}/s_${i}.png`}
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
