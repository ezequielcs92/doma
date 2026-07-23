import { expect, test } from '@playwright/test'

async function rejectAnalyticsIfVisible(page: import('@playwright/test').Page) {
  const rejectButton = page.getByRole('button', { name: 'Rechazar analytics' })
  if (await rejectButton.isVisible()) {
    await rejectButton.click()
  }
}

test('navigates through the public site', async ({ page }) => {
  await page.goto('/')
  await expect(page.getByRole('heading', { name: /Resultados naturales/ })).toBeVisible()
  await rejectAnalyticsIfVisible(page)

  await page.getByRole('link', { name: 'Tratamientos', exact: true }).first().click()
  await expect(page).toHaveURL(/\/tratamientos$/)
  await expect(page.getByRole('heading', { name: /Procedimientos de/ })).toBeVisible()
})

test('does not send analytics before consent', async ({ page }) => {
  let analyticsRequests = 0
  await page.route('**/api/analytics', async (route) => {
    analyticsRequests += 1
    await route.fulfill({ status: 204 })
  })

  await page.goto('/')
  await expect(page.getByRole('button', { name: 'Aceptar analytics' })).toBeVisible()
  expect(analyticsRequests).toBe(0)

  await page.getByRole('button', { name: 'Aceptar analytics' }).click()
  await expect.poll(() => analyticsRequests).toBe(1)
})

test('mobile navigation closes with Escape', async ({ page }) => {
  await page.setViewportSize({ width: 390, height: 844 })
  await page.goto('/')
  await rejectAnalyticsIfVisible(page)

  const menuButton = page.getByRole('button', { name: 'Abrir menú' })
  await menuButton.click()
  await expect(page.getByRole('navigation', { name: 'Navegación móvil' })).toBeVisible()

  await page.keyboard.press('Escape')
  await expect(page.getByRole('navigation', { name: 'Navegación móvil' })).toBeHidden()
})

test('contact form requires privacy consent and sends selected procedure', async ({ page }) => {
  let submittedPayload: Record<string, unknown> | null = null
  await page.route('**/api/leads', async (route) => {
    submittedPayload = route.request().postDataJSON() as Record<string, unknown>
    await route.fulfill({
      status: 201,
      contentType: 'application/json',
      body: JSON.stringify({ success: true }),
    })
  })

  await page.goto('/contacto')
  await rejectAnalyticsIfVisible(page)
  await page.locator('#general-nombre').fill('Maria Perez')
  await page.locator('#general-email').fill('maria@example.com')
  await page.locator('#general-telefono').fill('+54 9 11 3025-3305')
  await page.locator('#general-procedimiento').selectOption('lipoescultura-hd')
  await page.locator('#general-mensaje').fill('Quiero coordinar una evaluación.')

  const submitButton = page.getByRole('button', { name: 'Solicitar Evaluación Gratuita' })
  const consent = page.locator('input[name="privacyAccepted"]')
  await submitButton.click()
  expect(
    await consent.evaluate((element) => (element as HTMLInputElement).validity.valueMissing)
  ).toBe(true)
  expect(submittedPayload).toBeNull()

  await consent.check()
  await submitButton.click()
  await expect(page.getByRole('heading', { name: '¡Consulta Enviada!' })).toBeVisible()
  expect(submittedPayload).toMatchObject({
    procedimiento: 'lipoescultura-hd',
    privacyAccepted: true,
  })
})
