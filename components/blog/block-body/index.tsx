import { ReactElement } from "react"

type Props = {
  children?: ReactElement
}

const BlockBody = (props: Props) => {
  return <>{props.children}</>
}

export { BlockBody }
