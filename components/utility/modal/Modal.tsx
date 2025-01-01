import s from "./modal.module.scss"

import { ScrollTrigger, gsap } from "@/lib/gsap"
import { useGSAP } from "@gsap/react"
import { useRef } from "react"
import cx from "clsx"

import { useLenisStore } from "@/lib/store/lenis"
import { useModalStore } from "@/lib/store/modal"

const Modal = () => {
  const { isOpen, content } = useModalStore()
  const lenis = useLenisStore()
  const ref = useRef(null)
  const duration = 0.4

  useGSAP(
    () => {
      if (isOpen) {
        lenis.setIsStopped(true)
        gsap.to(ref.current, {
          duration,
          opacity: 1,
          pointerEvents: "auto",
        })
      } else {
        gsap.to(ref.current, {
          duration,
          opacity: 0,
          pointerEvents: "none",
          onComplete: () => {
            lenis.setIsStopped(false)
            ScrollTrigger.refresh()
          },
        })
      }
    },
    {
      dependencies: [isOpen],
    }
  )

  return (
    <div className={cx(s.modal, "flex items-center justify-center")} ref={ref}>
      {/* <div className={cx(s.iconClose, "cursor-pointer")} onClick={closeModal}>
        <IconClose fill="var(--white)" />
      </div> */}
      <div>{content}</div>
    </div>
  )
}

export default Modal
