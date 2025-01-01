import { ClientOnly } from "@/components/utility/isomorphic"
import { gsap } from "@/lib/gsap"
import { useGSAP } from "@gsap/react"
import { useLocale } from "next-intl"
import { ReactNode, useRef } from "react"
import { useWindowSize } from "usehooks-ts"

interface ParallaxProps {
  children: ReactNode
  speedX?: number
  speedY: number
}

const Parallax = (props: ParallaxProps) => {
  const { children, speedX, speedY } = props
  const ref = useRef<HTMLDivElement | null>(null)
  const windowSize = useWindowSize()
  const locale = useLocale()

  function getElementOffsetTop(element: HTMLElement): number {
    const rect = element.getBoundingClientRect()
    const scrollTop = window.scrollY || document.documentElement.scrollTop
    return rect.top + scrollTop
  }

  useGSAP(
    () => {
      if (!ref.current) return

      gsap.to(".parallax-item", {
        ...(speedX && { xPercent: 100 * speedX }),
        ...(speedY && { yPercent: 100 * speedY }),
        scrollTrigger: {
          id: "parallax",
          start: `top top+=${getElementOffsetTop(ref.current)}px`,
          scrub: true,
          trigger: ref.current,
        },
      })
    },
    { scope: ref, dependencies: [speedX, speedY, windowSize.width, locale] }
  )

  return (
    <div ref={ref} className="inherit-dims">
      <div className="parallax-item">{children}</div>
    </div>
  )
}

interface ParallaxWrapperProps extends ParallaxProps {}

const ParallaxWrapper = (props: ParallaxWrapperProps) => (
  <ClientOnly>
    <Parallax speedX={props.speedX} speedY={props.speedY}>
      {props.children}
    </Parallax>
  </ClientOnly>
)

export default ParallaxWrapper
