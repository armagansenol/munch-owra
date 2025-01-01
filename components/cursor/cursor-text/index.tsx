"use client"

import { useCursorStore } from "@/lib/store/cursor"

export interface CursorTextProps {
  children: React.ReactNode
}

export default function CursorText({ children }: CursorTextProps) {
  const { events } = useCursorStore()
  return <div {...events.cursorEmail}>{children}</div>
}
