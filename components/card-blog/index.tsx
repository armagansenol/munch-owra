import s from "./card-blog.module.scss"

import cn from "clsx"
import { useLocale } from "next-intl"

import { Img } from "@/components/utility/img"
import { Link } from "@/components/utility/link"
import { routes } from "@/lib/constants"
import { CardBlogProps, Locales } from "@/types"
import LetterSwapForward from "../letter-swap-forward"

type Props = CardBlogProps

const CardBlog = (props: Props) => {
  const locale = useLocale()

  return (
    <Link
      href={`${routes[locale as Locales].blog.path}/${props.url}`}
      className={cn(s.cardBlog, "cursor-pointer", { [s.horizontal]: props.horizontal })}
    >
      <div className={s.imgC}>
        <Img
          className="object-cover"
          src={props.media.src}
          alt="Blog Cover Photo"
          height={800}
          width={800}
          loading="lazy"
        />
      </div>
      <div className={s.text}>
        <p className={s.category}>{props.category}</p>
        <p className={s.time}>{props.time}</p>
        <p className={s.title}>{props.title}</p>
        <p className={s.description}>{props.description}</p>
        <p className={s.date}>{props.date}</p>
        <p className={s.cta}>
          <LetterSwapForward
            label={`${locale === "tr" ? "Devamını Oku" : "Read More"}`}
            reverse={false}
            className="font-bold"
            transition={{
              type: "spring",
              duration: 0.5,
            }}
            staggerDuration={0.01}
          />
        </p>
      </div>
      <div></div>
    </Link>
  )
}
export { CardBlog }
