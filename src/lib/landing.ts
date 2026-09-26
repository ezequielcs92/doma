// Treatments shown on the Google Ads landing (/evaluacion). Copy comes from
// the client-approved website texts. `formValue` must match an option of the
// procedure select in ContactForm. Ads can deep-link a treatment with
// /evaluacion?tratamiento=<slug> to preselect it and tailor the headline.
export type LandingTreatment = {
  slug: string
  name: string
  formValue: string
  description: string
  highlights: string[]
}

export const LANDING_TREATMENTS: LandingTreatment[] = [
  {
    slug: 'lipoescultura-hd',
    name: 'Lipoescultura HD',
    formValue: 'Lipoescultura HD',
    description:
      'Definición corporal de alta precisión que permite resaltar la musculatura y mejorar el contorno corporal de forma natural.',
    highlights: ['Mayor definición muscular', 'Recuperación más rápida', 'Resultados naturales'],
  },
  {
    slug: 'abdominoplastia',
    name: 'Abdominoplastia',
    formValue: 'Abdominoplastia',
    description:
      'Elimina el exceso de piel y grasa abdominal para lograr un abdomen más firme y plano. Ideal para flacidez, diástasis o cambios post embarazo.',
    highlights: ['Técnicas avanzadas', 'Resultados duraderos', 'Definición corporal 360'],
  },
  {
    slug: 'body-lifting',
    name: 'Body Lifting',
    formValue: 'Body Lifting',
    description:
      'Cirugía integral que redefine el contorno corporal trabajando múltiples zonas en una misma intervención.',
    highlights: ['Combinación de técnicas', 'Mayor definición corporal', 'Resultados armónicos'],
  },
  {
    slug: 'mommy-makeover',
    name: 'Mommy Makeover',
    formValue: 'Mommy Makeover',
    description:
      'Combina diferentes cirugías (abdomen, mamas, glúteos) para recuperar la figura post embarazo en una sola intervención.',
    highlights: ['Varias zonas en una cirugía', 'Recuperación unificada', 'Resultados armónicos'],
  },
  {
    slug: 'cirugia-mamaria',
    name: 'Cirugía Mamaria',
    formValue: 'Cirugia Mamaria',
    description:
      'Procedimientos para mejorar la forma, el tamaño, el volumen y la armonía de las mamas, adaptados a cada paciente.',
    highlights: ['Aumento mamario', 'Mastopexia', 'Recambio de implantes'],
  },
  {
    slug: 'cirugia-glutea',
    name: 'Cirugía Glútea',
    formValue: 'Cirugia Glutea',
    description:
      'Procedimientos para mejorar la forma, proyección y volumen de los glúteos con un contorno armónico y natural.',
    highlights: ['Implantes glúteos', 'Transferencia glútea', 'Resultados naturales'],
  },
  {
    slug: 'cirugia-facial',
    name: 'Cirugía Facial',
    formValue: 'Cirugia Facial',
    description:
      'Procedimientos para rejuvenecer y armonizar el rostro, mejorando la apariencia sin perder naturalidad.',
    highlights: ['Blefaroplastia', 'Lifting facial', 'Lifting de cejas'],
  },
  {
    slug: 'medicina-estetica',
    name: 'Medicina Estética',
    formValue: 'Medicina Estetica',
    description:
      'Tratamientos no quirúrgicos para mejorar la calidad de la piel, prevenir el envejecimiento y realzar la armonía facial.',
    highlights: ['Ácido hialurónico', 'Toxina botulínica', 'Bioestimuladores'],
  },
]

export function findLandingTreatment(slug: string | undefined) {
  return LANDING_TREATMENTS.find((treatment) => treatment.slug === slug)
}
