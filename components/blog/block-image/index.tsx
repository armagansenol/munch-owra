import React from "react"
import s from "./block-image.module.scss"

import cn from "clsx"

import { MediaProps } from "@/types"
import { Img } from "@/components/utility/img"

type Props = {
  items: MediaProps[]
}

const BlockImage = (props: Props) => {
  return (
    <div className={s.blockImage}>
      <div className={cn(s.images, { [s.multiple]: props.items.length > 1 })}>
        {props.items.map((item, i) => {
          return (
            <div className={s.imgC} key={i}>
              <Img
                alt="Post Image"
                loading="lazy"
                src={item.src}
                height={parseFloat(item.height as string)}
                width={parseFloat(item.width as string)}
              />
            </div>
          )
        })}
      </div>
    </div>
  )
}

export { BlockImage }
