"use client"

import { useCursorStore } from "@/lib/store/cursor"

export interface CursorViewProps {
  children: React.ReactNode
}

export default function CursorView({ children }: CursorViewProps) {
  const { events } = useCursorStore()
  return <div {...events.cursorView}>{children}</div>
}
