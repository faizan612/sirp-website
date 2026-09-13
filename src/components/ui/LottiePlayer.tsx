'use client'

import { useState, useEffect } from 'react'
import Lottie from 'lottie-react'

interface LottiePlayerProps {
  src: string
  loop?: boolean
  className?: string
}

export function LottiePlayer({ src, loop = true, className }: LottiePlayerProps) {
  const [animationData, setAnimationData] = useState<object | null>(null)

  useEffect(() => {
    setAnimationData(null)
    fetch(src)
      .then((r) => r.json())
      .then(setAnimationData)
      .catch(() => null)
  }, [src])

  if (!animationData) return null

  return (
    <Lottie
      animationData={animationData}
      loop={loop}
      autoplay
      className={className}
    />
  )
}
