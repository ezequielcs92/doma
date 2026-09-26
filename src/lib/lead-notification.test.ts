import { describe, expect, it } from 'vitest'

import { buildLeadEmail } from './lead-notification'

const lead = {
  nombre: 'Maria <b>Perez</b>',
  email: 'maria@example.com',
  telefono: '+54 9 11 3025-3305',
  mensaje: 'Hola\nQuiero una evaluacion',
  procedimiento: 'Lipoescultura HD',
  medico_id: 'web-general',
}

describe('buildLeadEmail', () => {
  it('includes the lead data and escapes HTML', () => {
    const email = buildLeadEmail(lead)

    expect(email.subject).toBe('Nueva consulta web: Maria <b>Perez</b> – Lipoescultura HD')
    expect(email.text).toContain('Origen: Formulario general')
    expect(email.html).toContain('Maria &lt;b&gt;Perez&lt;/b&gt;')
    expect(email.html).toContain('Hola<br>Quiero una evaluacion')
    expect(email.html).not.toContain('<b>Perez</b>')
  })
})
