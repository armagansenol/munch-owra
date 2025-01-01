import s from "./embla.module.scss"

import cx from "clsx"
import { EmblaCarouselType, EmblaOptionsType } from "embla-carousel"
import { EmblaViewportRefType } from "embla-carousel-react"
import React, { ReactNode } from "react"

interface Props {
  children: ReactNode[] | ReactNode
  options?: EmblaOptionsType
  emblaRef?: EmblaViewportRefType
  emblaApi?: EmblaCarouselType | undefined
  scrollTo?: number
  type?: "default" | "fade"
}

const EmblaCarousel = (props: Props) => {
  const { children, emblaRef, type = "default" } = props

  return (
    <div className={cx({ [s.emblaDefault]: type === "default", [s.emblaFade]: type === "fade" })}>
      <div className={s.emblaViewport} ref={emblaRef}>
        <div className={s.emblaContainer}>
          {Array.isArray(children) ? (
            <>
              {children?.map((item, i) => (
                <div className={s.emblaSlide} key={i}>
                  <div className={s.emblaSlideContent}>{item}</div>
                </div>
              ))}
            </>
          ) : (
            <div>{children}</div>
          )}
        </div>
      </div>
    </div>
  )
}

export default EmblaCarousel
