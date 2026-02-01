import { expect, Locator, Page, test } from '@playwright/test';
import { BasePage } from './BasePage';
import { DashboardPage } from './DashboardPage';

export class LoginPage extends BasePage {
  readonly root: Locator;
  readonly heading: Locator;
  readonly emailInput: Locator;
  readonly passwordInput: Locator;
  readonly submitButton: Locator;
  readonly registerLink: Locator;

  constructor(page: Page) {
    super(page);
    this.root = page.getByRole('main', { name: 'Login page' });
    this.heading = this.root.getByRole('heading', { name: 'Sign in to your account' });
    this.emailInput = this.root.getByRole('textbox', { name: 'Enter your email' });
    this.passwordInput = this.root.getByRole('textbox', { name: 'Enter your password' });
    this.submitButton = this.root.getByRole('button', { name: 'Sign in to your account' });
    this.registerLink = this.root.getByRole('link', { name: 'Create a new account' });
  }

  async expectVisible(): Promise<void> {
    await this.header.ensureEnglish();
    await expect(this.root).toBeVisible();
    await expect(this.heading).toBeVisible();
    await expect(this.emailInput).toBeVisible();
    await expect(this.passwordInput).toBeVisible();
    await expect(this.submitButton).toBeVisible();
    await expect(this.registerLink).toBeVisible();
  }

  async fillEmail(email: string): Promise<void> {
    await this.emailInput.fill(email);
  }

  async fillPassword(password: string): Promise<void> {
    await this.passwordInput.fill(password);
  }

  async submit(): Promise<void> {
    await this.submitButton.click();
  }

  async login(email: string, password: string): Promise<DashboardPage> {
    return test.step('Sign in', async () => {
      await this.fillEmail(email);
      await this.fillPassword(password);
      await this.submit();
      const dashboardPage = new DashboardPage(this.page);
      await dashboardPage.expectVisible();
      return dashboardPage;
    });
  }
}
