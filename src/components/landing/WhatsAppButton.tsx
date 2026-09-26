'use client'

import { MessageCircle } from 'lucide-react'
import { trackWhatsAppClick } from '@/lib/conversion'
import { whatsappUrl } from '@/lib/site'
import { cn } from '@/lib/utils'

// WhatsApp link with a prefilled message. Each click counts as a secondary
// Google Ads conversion (Google only sees the click, not the message).
export default function WhatsAppButton({
  message,
  className,
  children = 'Hablar por WhatsApp',
}: {
  message: string
  className?: string
  children?: React.ReactNode
}) {
  return (
    <a
      href={whatsappUrl(message)}
      target="_blank"
      rel="noopener noreferrer"
      onClick={() => trackWhatsAppClick()}
      className={cn('inline-flex items-center justify-center gap-2', className)}
    >
      <MessageCircle className="w-5 h-5" />
      {children}
    </a>
  )
}
