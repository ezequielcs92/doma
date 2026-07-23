'use client'

import { useState } from 'react'
import Image from 'next/image'

interface BeforeAfterSliderProps {
  before: string
  after: string
  alt?: string
}

export default function BeforeAfterSlider({ before, after, alt = 'Resultado' }: BeforeAfterSliderProps) {
  const [position, setPosition] = useState(50)

  return (
    <div
      className="relative aspect-[4/3] rounded-2xl overflow-hidden cursor-col-resize select-none"
    >
      {/* After image (full width, behind) */}
      <Image src={after} alt={`${alt} - Después`} fill className="object-cover" />

      {/* Before image (clipped) */}
      <div
        className="absolute inset-0"
        style={{ clipPath: `inset(0 ${100 - position}% 0 0)` }}
      >
        <Image
          src={before}
          alt={`${alt} - Antes`}
          fill
          className="object-cover"
        />
      </div>

      <input
        type="range"
        min="0"
        max="100"
        value={position}
        onChange={(event) => setPosition(Number(event.target.value))}
        aria-label={`Comparar antes y después: ${alt}`}
        className="absolute inset-0 z-30 w-full h-full opacity-0 cursor-col-resize"
      />

      {/* Slider line */}
      <div
        className="absolute top-0 bottom-0 w-[3px] bg-white shadow-lg z-10 pointer-events-none"
        style={{ left: `${position}%`, transform: 'translateX(-50%)' }}
      >
        {/* Handle */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-white shadow-lg flex items-center justify-center">
          <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
            <path d="M7 4L3 10L7 16" stroke="#6C2BD9" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
            <path d="M13 4L17 10L13 16" stroke="#6C2BD9" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </div>
      </div>

      {/* Labels */}
      <div className="absolute top-4 left-4 px-3 py-1.5 rounded-full bg-white/90 text-doma-dark text-xs font-bold uppercase z-20">
        Antes
      </div>
      <div className="absolute top-4 right-4 px-3 py-1.5 rounded-full bg-doma-accent text-white text-xs font-bold uppercase z-20">
        Después
      </div>
    </div>
  )
}
