import s from "./grid-specs.module.scss"

import cx from "clsx"

import { IconFiller, StickerFiberSource, StickerNonGluten, StickerPremiumMix } from "@/components/icons"
import { Img } from "@/components/utility/img"

export interface GridSpecsProps {
  productImage: string
  primaryFill: string
  secondaryFill: string
}

export default function GridSpecs(props: GridSpecsProps) {
  return (
    <div className={cx(s.gridSpecs, "flex flex-col items-center")}>
      <div className={s.fillerTop}>
        <IconFiller />
      </div>
      <h2 className={cx(s.greetingsTitle, "mb-20")}>
        <span>Gluten-free, fiber-rich, </span>
        and bursting with taste—snack time
        <span> just got better!</span>
      </h2>
      <div className={cx(s.grid, "grid grid-cols-12 grid-rows-12 gap-5")}>
        <div
          className={cx(
            s.gridItem,
            s.item1,
            "col-span-6 row-span-5 col-start-1 col-end-7 row-start-1 row-end-6 rounded-lg"
          )}
        >
          <div className={s.premiumMix}>
            <StickerPremiumMix fillPrimary={props.primaryFill} fillSecondary={props.secondaryFill} />
          </div>
          <p>The finest flavors of nature, perfectly blended in every bite.</p>
        </div>
        <div
          className={cx(
            s.gridItem,
            s.item2,
            "col-span-6 row-span-7 col-start-1 col-end-7 row-start-6 row-end-13 rounded-lg"
          )}
        >
          <div className={s.nonGluten}>
            <StickerNonGluten fillPrimary={props.primaryFill} fillSecondary={props.secondaryFill} />
          </div>
          <p>Light and delicious—your perfect healthy choice.</p>
        </div>
        <div
          className={cx(
            s.gridItem,
            s.item3,
            "col-span-6 row-span-12 col-start-7 col-end-13 row-start-1 row-end-13 rounded-lg"
          )}
        >
          <div className={s.inner}>
            <div className={s.innerContent}>
              <p>Rich in fiber, full of energy—keeping you vibrant all day.</p>
            </div>
            <div className={s.imgC}>
              <Img alt="Box" className="object-contain" src={props.productImage} height={500} width={500} />
            </div>
          </div>
          <div className={s.fiberSource}>
            <StickerFiberSource fillPrimary={props.primaryFill} fillSecondary={props.secondaryFill} />
          </div>
        </div>
      </div>
    </div>
  )
}
