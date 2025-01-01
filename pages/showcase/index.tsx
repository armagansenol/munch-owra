import dynamic from "next/dynamic"

const PopSlider = dynamic(() => import("@/components/pop-slider"), {
  ssr: false,
})

export default function Showcase() {
  return (
    <div className="w-screen h-screen">
      <PopSlider />
    </div>
  )
}
