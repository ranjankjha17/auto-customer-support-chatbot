'use client'

import { useEffect, useRef } from 'react'
import { useIntersectionObserver } from '@/lib/hooks/use-intersection-observer'

interface ChatScrollAnchorProps {
  trackVisibility?: boolean
}

export function ChatScrollAnchor({ trackVisibility }: ChatScrollAnchorProps) {
  const anchorRef = useRef<HTMLDivElement>(null)
  const entry = useIntersectionObserver(anchorRef, {
    threshold: trackVisibility ? 0.1 : 1,
    freezeOnceVisible: false,
  })

  useEffect(() => {
    if (trackVisibility && !entry?.isIntersecting) {
      anchorRef.current?.scrollIntoView({
        block: 'start',
        behavior: 'smooth',
      })
    }
  }, [entry?.isIntersecting, trackVisibility])

  return <div ref={anchorRef} className="h-px w-full" />
}