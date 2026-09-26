import { describe, expect, it } from 'vitest'

import { toE164 } from './conversion'

describe('toE164', () => {
  it('normalizes Argentine phone formats', () => {
    expect(toE164('+54 9 11 3025-3305')).toBe('+5491130253305')
    expect(toE164('11 3025-3305')).toBe('+5491130253305')
    expect(toE164('011 3025 3305')).toBe('+5491130253305')
    expect(toE164('5491130253305')).toBe('+5491130253305')
  })
})
