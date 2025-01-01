import { Img } from "@/components/utility/img"
import { Video } from "@/components/utility/video"
import { MediaProps } from "@/types"

interface MediaComponentProps {
  media: MediaProps
  priority?: boolean
}

export default function MediaComponent(props: MediaComponentProps) {
  const { media, priority = false } = props

  const mediaComponents = {
    image: (
      <Img
        alt="Slider Content Visual"
        className="object-cover"
        src={media.src}
        priority={priority}
        height={parseFloat(media.height as string) ?? 1000}
        width={parseFloat(media.width as string) ?? 1000}
      />
    ),
    video: <Video className="object-cover" primaryVideoUrl={media.src as string} />,
  }

  if (media.type) {
    return mediaComponents[media.type]
  }
}
