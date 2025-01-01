import s from "./slider-main.module.scss"

import cx from "clsx"

import { EmblaCarousel } from "@/components/utility/embla-carousel"
import { Img } from "@/components/utility/img"
import { truncateByWords } from "@/lib/utils"
import { CardBlogProps } from "@/types"
import { useEffect, useRef, useState } from "react"

import useEmblaCarousel from "embla-carousel-react"
import { IconArrow } from "../icons"
import { Link } from "../utility/link"
import { routes } from "@/lib/constants"

export interface SliderMainProps {
  items: CardBlogProps[]
}

export default function SliderMain(props: SliderMainProps) {
  const ref = useRef(null)
  const [currentSlide, setCurrentSlide] = useState(0)

  const [emblaRef, emblaApi] = useEmblaCarousel({ loop: true, align: "start" })

  useEffect(() => {
    if (emblaApi) {
      emblaApi.scrollTo(currentSlide)
    }
  }, [emblaApi, currentSlide])

  // const items = [
  //   {
  //     media: { src: "/img/sample.jpg", height: "500", width: "500" },
  //     title: "title",
  //     description: "description",
  //     url: "url",
  //     date: "date",
  //     category: "category",
  //     time: "time",
  //     horizontal: true,
  //   },
  //   {
  //     media: { src: "/img/sample.jpg", height: "500", width: "500" },
  //     title: "title",
  //     description: "description",
  //     url: "url",
  //     date: "date",
  //     category: "category",
  //     time: "time",
  //     horizontal: true,
  //   },
  //   {
  //     media: { src: "/img/sample.jpg", height: "500", width: "500" },
  //     title: "title",
  //     description: "description",
  //     url: "url",
  //     date: "date",
  //     category: "category",
  //     time: "time",
  //     horizontal: true,
  //   },
  //   {
  //     media: { src: "/img/sample.jpg", height: "500", width: "500" },
  //     title: "title",
  //     description: "description",
  //     url: "url",
  //     date: "date",
  //     category: "category",
  //     time: "time",
  //     horizontal: true,
  //   },
  // ]

  function handlePrev() {
    setCurrentSlide((prev) => (prev === 0 ? props.items.length - 1 : prev - 1))
  }

  function handleNext() {
    setCurrentSlide((prev) => (prev + 1) % props.items.length)
  }

  return (
    <div className={cx(s.sliderMain, "flex flex-col tablet:grid grid-cols-12")} ref={ref}>
      <div className={cx(s.text, "tablet:col-span-4")}>
        {props.items.map((item, i) => {
          return (
            <div className={cx(s.itemC, "flex flex-col", { [s.active]: currentSlide === i })} key={i}>
              <p className={s.category}>{item.category}</p>
              <p className={s.time}>{item.time} Dakika Okuma Süresi</p>
              <p className={s.title}>{truncateByWords(item.title, 7)}</p>
              <p className={s.description}>{truncateByWords(item.description, 18)}</p>
              <p className={s.date}>{item.date}</p>
              <Link className={s.link} href={`/${routes.tr.blog.path}/${item.url}`}>
                Devamını Oku
              </Link>
            </div>
          )
        })}
        <nav className={cx(s.nav, "flex items-end justify-between")}>
          <div className={cx(s.buttons, "flex gap-1")}>
            <div className={cx(s.btn, "cursor-pointer flex items-center justify-center")} onClick={handlePrev}>
              <span className={s.icon}>
                <IconArrow fill="var(--science-blue)" rotate={180} />
              </span>
            </div>
            <div className={cx(s.btn, "cursor-pointer flex items-center justify-center")} onClick={handleNext}>
              <span className={s.icon}>
                <IconArrow fill="var(--science-blue)" />
              </span>
            </div>
          </div>
          <small className={s.indicator}>{`${currentSlide + 1} / ${props.items.length}`}</small>
        </nav>
      </div>
      <div className={cx(s.images, "tablet:col-span-8")}>
        <EmblaCarousel emblaRef={emblaRef} emblaApi={emblaApi} type="default">
          {props.items.map((item, i) => {
            return (
              <div className={s.imgC} key={i}>
                <div className={s.img}>
                  <Img
                    className="object-cover"
                    src={item.media.src}
                    alt="Blog Cover Photo"
                    height={1000}
                    width={1000}
                    loading="lazy"
                  />
                </div>
              </div>
            )
          })}
        </EmblaCarousel>
      </div>
    </div>
  )
}
