'use client'

import { Medico, AntesDespues } from '@/types/database'
import MedicalProfileTemplate from '@/components/templates/MedicalProfileTemplate'

interface DoctorLandingProps {
  medico: Medico
  galeria: AntesDespues[]
}

export default function DoctorLanding({ medico, galeria }: DoctorLandingProps) {
  return <MedicalProfileTemplate medico={medico} galeria={galeria} />
}
