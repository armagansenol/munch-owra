import s from "./grid-specs.module.scss"

import cx from "clsx"

export interface GridSpecsProps {}

export default function GridSpecs(props: GridSpecsProps) {
  return (
    <div className={cx(s.gridSpecs, "flex flex-col items-center py-28")}>
      <h2 className={cx(s.greetingsTitle, "mb-20")}>
        <span>Gluten-free, fiber-rich, </span>
        and bursting with taste—snack time
        <span> just got better!</span>
      </h2>
      <div className={cx(s.grid, "grid grid-cols-12 grid-rows-12 gap-5")}>
        <div
          className={cx(
            s.gridItem,
            "col-span-6 row-span-6 col-start-1 col-end-7 row-start-1 row-end-7 rounded-lg py-5 px-20 flex items-center"
          )}
        >
          <p>The finest flavors of nature, perfectly blended in every bite.</p>
        </div>
        <div
          className={cx(
            s.gridItem,
            "col-span-6 row-span-6 col-start-1 col-end-7 row-start-7 row-end-13 rounded-lg py-10 px-20 flex items-end"
          )}
        >
          <p>Light and delicious—your perfect healthy choice.</p>
        </div>
        <div
          className={cx(
            s.gridItem,
            "col-span-6 row-span-12 col-start-7 col-end-13 row-start-1 row-end-13 rounded-lg px-20 flex items-center"
          )}
        >
          <p>Rich in fiber, full of energy—keeping you vibrant all day..</p>
        </div>
      </div>
    </div>
  )
}
