import type { Metadata } from 'next'
import ThankYou from '@/components/landing/ThankYou'

export const metadata: Metadata = {
  title: 'Gracias por tu consulta | DOMA Sculpt Center',
  robots: { index: false, follow: false },
}

export default function GraciasPage() {
  return <ThankYou />
}
