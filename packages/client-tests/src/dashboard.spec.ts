import { expect, test } from '@playwright/test'

test('smokes', async ({ page }) => {
  await page.goto('/')
  await expect(page).toHaveTitle('Vite + React + TS')
  await expect(page.getByText('Users')).toBeVisible()
})
