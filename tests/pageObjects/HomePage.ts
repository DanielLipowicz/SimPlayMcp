import { Page, test } from '@playwright/test';
import { BasePage } from './BasePage';
import { LoginPage } from './LoginPage';

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
    await this.page.goto('http://localhost:3000/');
    await this.header.ensureEnglish();
    await this.header.expectCompleteVisible();
  }

  async SingInButtonClick(): Promise<LoginPage> {
    return test.step('Open login page', async () => {
      await this.header.signInLink.click();
      const loginPage = new LoginPage(this.page);
      await loginPage.expectVisible();
      return loginPage;
    });
  }
}
