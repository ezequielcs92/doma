'use client'

import { motion } from 'framer-motion'
import { cn } from '@/lib/utils'

export default function SectionLabel({
  children,
  className,
}: {
  children: React.ReactNode
  className?: string
}) {
  return (
    <motion.span
      initial={{ opacity: 0, y: 10 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      className={cn(
        'inline-flex items-center gap-2 px-5 py-2 rounded-full bg-doma-light/40 text-doma-violet font-bold text-xs uppercase tracking-widest border border-doma-light',
        className
      )}
    >
      <span className="w-2 h-2 rounded-full bg-doma-accent animate-pulse" />
      {children}
    </motion.span>
  )
}
