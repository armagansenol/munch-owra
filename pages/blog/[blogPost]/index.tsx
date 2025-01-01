import s from "./post.module.scss"

import cx from "clsx"
import { GetServerSideProps } from "next"
import { useLocale } from "next-intl"
import { useState } from "react"
import { useIsomorphicLayoutEffect } from "usehooks-ts"

import { single } from "@/api/queries/blog"
import { Marquee } from "@/components/animations/marquee"
import { SliderMain } from "@/components/slider-main"
import { Img } from "@/components/utility/img"
import { Link } from "@/components/utility/link"
import { DefaultLayout } from "@/layouts/default"
import { routes } from "@/lib/constants"
import { BlogProps, Locales } from "@/types"

type Props = BlogProps

const BlogPost = (props: Props) => {
  const locale = useLocale()
  const [copied, setCopied] = useState(false)

  useIsomorphicLayoutEffect(() => {
    const timeout = setTimeout(() => {
      setCopied(false)
    }, 1000)

    return () => clearTimeout(timeout)
  }, [copied])

  return (
    <DefaultLayout seo={routes[locale as Locales].blog.seo}>
      <section className={cx(s.intro, "flex flex-col tablet:grid grid-cols-12")}>
        <Link className={cx(s.back, "underline")} href={`/${routes.tr.blog.path}`}>
          Geri Dön
        </Link>
        <div className={cx(s.info, "flex flex-col col-start-1 tablet:col-start-7 col-end-13 tablet:col-end-12")}>
          <Link className={s.category} href={`/${routes[locale as Locales].blog.path}`}>
            Blog
          </Link>

          <small className={s.time}>{props.blog.time} Dakika Okuma Süresi</small>

          <h1 className={s.title}>{props.blog.title}</h1>

          <p className={s.description}>{props.blog.description}</p>

          <small className={s.date}>{props.blog.date}</small>
        </div>

        <div className={s.banner}>
          <Img
            alt="Blog Banner"
            className="object-cover"
            priority={true}
            src={props.blog.media.src}
            height={2000}
            width={2000}
          />
        </div>
      </section>

      <section className={cx(s.body, "grid grid-cols-12")}>
        <div
          className={cx(s.content, "flex flex-col col-start-1 col-end-13 tablet:col-start-4 tablet:col-end-10")}
          dangerouslySetInnerHTML={{ __html: props.blog.content as TrustedHTML }}
        ></div>
      </section>

      <section className={s.other}>
        <div className={s.marquee}>
          <Marquee duration={30} repeat={4} inverted>
            <h5>Sıradaki İçerik</h5>
          </Marquee>
        </div>

        <div className={s.sliderC}>
          <SliderMain items={props.nextblogs} />
        </div>
      </section>
    </DefaultLayout>
  )
}

export default BlogPost

export const getServerSideProps: GetServerSideProps = async (context) => {
  const blogPost = context.params?.blogPost as string

  const data = await single(blogPost)

  if (!blogPost) {
    return {
      notFound: true,
    }
  }

  return {
    props: data,
  }
}
