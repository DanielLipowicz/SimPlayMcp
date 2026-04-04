import { Page, test } from '@playwright/test';
import { BasePage } from './BasePage';
import { LoginPage } from './LoginPage';
import { config } from '../config';
import { RegisterPage } from './RegisterPage';

export class HomePage extends BasePage {
  constructor(page: Page) {
    super(page);
  }

  static async create(page: Page): Promise<HomePage> {
    const homePage = new HomePage(page);
    await test.step('Open home page', async () => {
      await homePage.goTo();
    });
    return homePage;
  }

  async goTo(): Promise<void> {
    await this.page.goto(`${config.baseUrl}/`);
    await this.header.ensureEnglish();
    await this.header.expectCompleteVisible();
  }

  getPage(): Page {
    return this.page;
  }

  async RegisterButtonClick(): Promise<RegisterPage> {
    return test.step('Open register page', async () => {
      await this.header.createAccountLink.click();
      const registerPage = new RegisterPage(this.page);
      await registerPage.expectVisible();
      return registerPage;
    });
  }

  async LoginButtonClick(): Promise<LoginPage> {
    return test.step('Open login page', async () => {
      await this.header.signInLink.click();
      const loginPage = new LoginPage(this.page);
      await loginPage.expectVisible();
      return loginPage;
    });
  }
}
