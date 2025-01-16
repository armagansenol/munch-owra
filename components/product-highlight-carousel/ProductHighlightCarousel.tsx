"use client"

import s from "./product-highlight-carousel.module.scss"

import cn from "clsx"
import { EmblaCarouselType, EmblaOptionsType } from "embla-carousel"
import useEmblaCarousel from "embla-carousel-react"
import { useCallback, useEffect, useState } from "react"

import { IconArrow } from "@/components/icons"
import { Img } from "@/components/utility/img"
import { Link } from "@/components/utility/link"

export interface RelatedProduct {
  id: number
  name: string
  image: string
  url: string
}

export interface ProductHighlightCarouselProps {
  items: RelatedProduct[]
  options?: EmblaOptionsType
}

export default function ProductHighlightCarousel({ items, options }: ProductHighlightCarouselProps) {
  const [emblaRef, emblaApi] = useEmblaCarousel(options)
  const [currentSlide, setCurrentSlide] = useState(0)

  const onSelect = useCallback(() => {
    if (!emblaApi) return
    setCurrentSlide(emblaApi.selectedScrollSnap())

    // Add any other logic you want to execute when the slide changes
    // console.log("Slide changed to:", emblaApi.selectedScrollSnap())
  }, [emblaApi])

  useEffect(() => {
    if (!emblaApi) return
    onSelect()
    emblaApi.on("select", onSelect)
    return () => {
      emblaApi.off("select", onSelect)
    }
  }, [emblaApi, onSelect])

  const [scrollSnaps, setScrollSnaps] = useState<number[]>([])

  const scrollPrev = useCallback(() => emblaApi && emblaApi.scrollPrev(), [emblaApi])
  const scrollNext = useCallback(() => emblaApi && emblaApi.scrollNext(), [emblaApi])

  const onInit = useCallback((emblaApi: EmblaCarouselType) => {
    setScrollSnaps(emblaApi.scrollSnapList())
  }, [])

  useEffect(() => {
    if (!emblaApi) return

    onInit(emblaApi)
    emblaApi.on("reInit", onInit)
    emblaApi.on("reInit", onSelect)
    emblaApi.on("select", onSelect)
  }, [emblaApi, onInit, onSelect])

  return (
    <div className={s.productHighlightCarousel}>
      <div className="relative">
        <div className="overflow-hidden" ref={emblaRef}>
          <div className="flex touch-pan-y touch-pinch-zoom">
            {items.map((item, i) => {
              return (
                <div className={cn(s.slide, "flex flex-col items-center justify-between gap-6")} key={i}>
                  <Link
                    href={`/`}
                    prefetch={true}
                    className={cn(s.card, "flex flex-col items-center justify-between", {
                      [s.active]: i === currentSlide,
                    })}
                  >
                    <div className={s.imgC}>
                      <Img
                        className="object-contain"
                        src={item.image}
                        height={500}
                        width={500}
                        alt="Picture of a Cookie Package"
                      />
                    </div>
                    <p>{item.name}</p>
                  </Link>
                </div>
              )
            })}
          </div>
        </div>
      </div>
      <div className={cn(s.prevBtn, "flex items-center justify-center cursor-pointer")} onClick={scrollPrev}>
        <div className={s.iconC}>
          <IconArrow fill="var(--steamed-milk)" rotate={180} />
        </div>
      </div>
      <div className={cn(s.nextBtn, "flex items-center justify-center cursor-pointer")} onClick={scrollNext}>
        <div className={s.iconC}>
          <IconArrow fill="var(--steamed-milk)" />
        </div>
      </div>
    </div>
  )
}
