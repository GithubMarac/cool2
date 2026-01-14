import { test, expect } from '@playwright/test';

test.describe('Coolinarika Clone E2E', () => {
  
  test('homepage should load and display recipes', async ({ page }) => {
    await page.goto('http://localhost:3000/recepti');
    await expect(page).toHaveTitle(/Svi Recepti/);
    

    const cards = page.locator('article');
    await expect(cards.first()).toBeVisible();
  });

  test('navigation to details page should work', async ({ page }) => {
    await page.goto('http://localhost:3000/recepti');

    await page.click('article a'); 

    await expect(page.locator('h1')).toBeVisible();
    await expect(page.getByText('Sastojci')).toBeVisible();
  });

});