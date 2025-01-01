import { ClientOnly } from "@/components/utility/isomorphic"
import { ScrollTrigger, gsap } from "@/lib/gsap"
import { useGSAP } from "@gsap/react"
import { useLocale } from "next-intl"
import { ReactNode, useRef } from "react"

interface FloatProps {
  children: ReactNode
  amountY?: number[]
  amountRotate?: number[]
}

const Float = (props: FloatProps) => {
  const { children, amountY = [-10, 10], amountRotate = [-3, 3] } = props
  const ref = useRef(null)
  const locale = useLocale()

  useGSAP(
    () => {
      const tl = gsap.timeline({ paused: true }).to(ref.current, {
        yPercent: gsap.utils.random(amountY),
        rotate: gsap.utils.random(amountRotate),
        duration: 4,
        repeat: -1,
        yoyo: true,
        yoyoEase: "none",
      })

      ScrollTrigger.create({
        animation: tl,
        trigger: ref.current,
        toggleActions: "play pause play pause",
      })
    },
    {
      dependencies: [amountRotate, amountY, locale],
    }
  )

  return (
    <div className="inherit-dims will-change-transform" ref={ref}>
      {children}
    </div>
  )
}

interface FloatWrapperProps extends FloatProps {}

const FloatWrapper = (props: FloatWrapperProps) => (
  <ClientOnly>
    <Float amountY={props.amountY} amountRotate={props.amountRotate}>
      {props.children}
    </Float>
  </ClientOnly>
)

export default FloatWrapper
