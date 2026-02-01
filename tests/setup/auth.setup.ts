import { test as setup } from '@playwright/test';
import { HomePage } from '../pageObjects/HomePage';
import { standardUser } from '../testData/StandardUser';
import { config } from '../config';

setup('authenticate standard user', async ({ page }) => {
  const homePage = await HomePage.create(page);
  const loginPage = await homePage.SingInButtonClick();
  await loginPage.login(standardUser.email, standardUser.password);
  await loginPage.storageState(config.StandardUserStorageState);
  console.log('Storage state saved to', config.StandardUserStorageState);
});
