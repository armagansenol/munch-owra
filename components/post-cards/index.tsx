import { useRef, useState } from "react"
import s from "./post-cards.module.scss"

import cn from "clsx"

import { CardBlog } from "@/components/card-blog"
// import { Searchbox } from "@/components/searchbox"
// import { Sort } from "@/components/sort"

// import { OptionProps } from "@/types"
import { ScrollTrigger, gsap } from "@/lib/gsap"
import { CardBlogProps, OptionProps } from "@/types"
import { useIsomorphicLayoutEffect } from "usehooks-ts"
import { LoadingSpinner } from "../utility/loading-spinner"

const LIMIT = 100

const PostCards = () => {
  const ref = useRef(null)

  const [limit, setLimit] = useState(LIMIT)
  const [keyword, setKeyword] = useState("")
  const [sort, setSort] = useState<OptionProps | null>(null)
  // const { data: posts, isLoading } = useAll(limit, keyword, sort)

  const isLoading = false
  const posts: CardBlogProps[] = []

  // infinite fetch
  //   useIsomorphicLayoutEffect(() => {
  //     const ctx = gsap.context((self) => {
  //       const selector = self.selector
  //       if (!selector) return

  //       console.log(selector(".list"))

  //       ScrollTrigger.create({
  //         markers: true,
  //         start: "top center",
  //         end: "bottom center",
  //         id: "infinite",
  //         trigger: selector(".list"),
  //         onLeave: () => {
  //           setLimit((prev) => prev + LIMIT)
  //         },
  //       })
  //     }, ref)

  //     return () => ctx.revert()
  //   }, [isLoading])

  // footer reveal calculations
  useIsomorphicLayoutEffect(() => {
    const ctx = gsap.context(() => {
      ScrollTrigger.refresh()
    })

    return () => ctx.revert()
  }, [isLoading])

  return (
    <div className={s.items} ref={ref}>
      {/* <div className={s.filter}>
        <div>
          <Sort
            label="SORT BY"
            sort={sort}
            setSort={setSort}
            options={[
              { label: "Newest to Latest", value: "NEWEST_TO_LATEST" },
              { label: "Latest to Newest", value: "LATEST_TO_NEWEST" },
            ]}
          />
        </div>
        <div>
          <Searchbox keyword={keyword} setKeyword={setKeyword} />
        </div>
      </div> */}
      {isLoading ? (
        <div className={cn(s.loadingScreen, "flex-center")}>
          <div className={s.loadingSpinnerC}>
            <LoadingSpinner />
          </div>
        </div>
      ) : (
        <>
          {posts ? (
            <div className={cn(s.list, "list")}>
              {posts?.map((item) => {
                return (
                  <div key={item.id}>
                    <CardBlog {...item} />
                  </div>
                )
              })}
            </div>
          ) : (
            <div className={cn(s.loadingScreen, "flex-center")}>CONTENT NOT FOUND</div>
          )}
        </>
      )}
    </div>
  )
}

export default PostCards
