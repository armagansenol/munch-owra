import s from "./breadcrumb.module.scss"

export interface BreadcrumbProps {
  p1: string
  p2: string
}

export default function Breadcrumb(props: BreadcrumbProps) {
  return (
    <div className={s.breadcrumb}>
      <span>Kategoriler</span>
      <span> / </span>
      <span>{props.p1}</span>
      <span> / </span>
      <span>{props.p2}</span>
    </div>
  )
}
