import s from "./slider-fade.module.scss"

import cx from "clsx"
import { EmblaCarouselType } from "embla-carousel"
import Autoplay from "embla-carousel-autoplay"
import Fade from "embla-carousel-fade"
import useEmblaCarousel from "embla-carousel-react"
import { ReactNode, useCallback, useEffect, useState } from "react"

import { EmblaCarousel } from "@/components/utility/embla-carousel"
import { NextButton, PrevButton } from "@/components/utility/embla-carousel/buttons"
import { IconArrow } from "../icons"

export interface SliderFadeProps {
  children: ReactNode[] | ReactNode
  autoplay?: boolean
  onSelectSlide?: (index: number) => void
  buttonStyles?: string
}

export default function SliderFade(props: SliderFadeProps) {
  const { children, autoplay = false, onSelectSlide } = props
  const [emblaRef, emblaApi] = useEmblaCarousel({ loop: true, duration: 30 }, [
    Fade(),
    ...(autoplay
      ? [
          Autoplay({
            playOnInit: true,
            delay: 5000,
            stopOnInteraction: false,
            stopOnMouseEnter: true,
            stopOnLastSnap: true,
          }),
        ]
      : []),
  ])

  const [prevBtnDisabled, setPrevBtnDisabled] = useState(true)
  const [nextBtnDisabled, setNextBtnDisabled] = useState(true)
  const [scrollSnaps, setScrollSnaps] = useState<number[]>([])

  const scrollPrev = useCallback(() => emblaApi && emblaApi.scrollPrev(), [emblaApi])
  const scrollNext = useCallback(() => emblaApi && emblaApi.scrollNext(), [emblaApi])
  const scrollTo = useCallback((index: number) => emblaApi && emblaApi.scrollTo(index), [emblaApi])

  const onInit = useCallback((emblaApi: EmblaCarouselType) => {
    setScrollSnaps(emblaApi.scrollSnapList())
  }, [])

  const onSelect = useCallback(
    (emblaApi: EmblaCarouselType) => {
      setPrevBtnDisabled(!emblaApi.canScrollPrev())
      setNextBtnDisabled(!emblaApi.canScrollNext())

      const selectedIndex = emblaApi.selectedScrollSnap()

      // Call the callback to notify the parent of the current index
      if (onSelectSlide) {
        onSelectSlide(selectedIndex)
      }
    },
    [onSelectSlide]
  )

  useEffect(() => {
    if (!emblaApi) return

    onInit(emblaApi)
    onSelect(emblaApi)
    emblaApi.on("reInit", onInit)
    emblaApi.on("reInit", onSelect)
    emblaApi.on("select", onSelect)
  }, [emblaApi, onInit, onSelect])

  return (
    <div className={s.sliderFade}>
      <EmblaCarousel emblaRef={emblaRef} emblaApi={emblaApi} type="fade">
        {children}
      </EmblaCarousel>
      {Array.isArray(children) && (
        <>
          <ButtonPrev className={props.buttonStyles} scroll={scrollPrev} disabled={prevBtnDisabled} />
          <ButtonNext className={props.buttonStyles} scroll={scrollNext} disabled={nextBtnDisabled} />
        </>
      )}
    </div>
  )
}

interface ButtonProps {
  scroll: () => void | undefined
  disabled: boolean
  className?: string
}

export function ButtonPrev(props: ButtonProps) {
  return (
    <PrevButton
      className={cx(s.prev, "flex items-center justify-center cursor-pointer", props.className)}
      onClick={props.scroll}
      disabled={props.disabled}
    >
      {/* <ArrowLeftIcon className="w-full h-full" /> */}
      <IconArrow fill="var(--science-blue)" rotate={180} />
    </PrevButton>
  )
}

export function ButtonNext(props: ButtonProps) {
  return (
    <NextButton
      className={cx(s.next, "flex items-center justify-center cursor-pointer", props.className)}
      onClick={props.scroll}
      disabled={props.disabled}
    >
      {/* <ArrowRightIcon className="w-full h-full" /> */}
      <IconArrow fill="var(--science-blue)" />
    </NextButton>
  )
}
