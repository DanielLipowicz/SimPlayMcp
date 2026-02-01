import { test, expect } from '@playwright/test';
import { HomePage } from './pageObjects/HomePage';
import { standardUser } from './testData/StandardUser';

test('Scenario 1: login, verify vehicles, logout', async ({ page }) => {
  const user = standardUser;

  const homePage = await HomePage.create(page);
  const loginPage = await homePage.SingInButtonClick();
  const dashboardPage = await loginPage.login(user.email, user.password);

  await dashboardPage.closeDialogIfVisible();


  await test.step('Verify vehicles', async () => {
    await dashboardPage.expectVehicleCount(user.ownedVehicles.length);
    await dashboardPage.expectAllVehiclesVisible(user.ownedVehicleNames);
  });
  await test.step('Logout', async () => {
   await dashboardPage.logout();
  });
  await test.step('Close page', async () => {
    await page.close();
  });
});
