import { expect, Locator, Page, test } from '@playwright/test';
import { BasePage } from './BasePage';
import { config } from '../config';
import { LoginPage } from './LoginPage';

export class RegisterPage extends BasePage {
  readonly root: Locator;
  readonly heading: Locator;
  readonly form: Locator;
  readonly fullNameInput: Locator;
  readonly emailInput: Locator;
  readonly passwordInput: Locator;
  readonly confirmPasswordInput: Locator;
  readonly submitButton: Locator;
  readonly googleSignInButton: Locator;
  readonly signInLink: Locator;

  constructor(page: Page) {
    super(page);
    this.root = page.getByRole('main', { name: 'Registration page' });
    this.heading = this.root.getByRole('heading', { name: 'Create your account' });
    this.form = this.root.getByRole('form', { name: 'User registration form' });
    this.fullNameInput = this.form.getByRole('textbox', { name: 'Enter your full name' });
    this.emailInput = this.form.getByRole('textbox', { name: 'Enter your email' });
    this.passwordInput = this.form.getByRole('textbox', { name: 'Create a password' });
    this.confirmPasswordInput = this.form.getByRole('textbox', { name: 'Confirm your password' });
    this.submitButton = this.form.getByRole('button', { name: 'Create your account' });
    this.googleSignInButton = this.root.getByRole('button', { name: 'Sign in with your Google account' });
    this.signInLink = this.root.getByRole('link', { name: 'Sign in to existing account' });
  }

  /**
   * Opens `/register` directly (same origin as `config.baseUrl`).
   */
  static async open(page: Page): Promise<RegisterPage> {
    const registerPage = new RegisterPage(page);
    await test.step('Open register page', async () => {
      await page.goto(`${config.baseUrl}/register`);
      await registerPage.header.ensureEnglish();
      await registerPage.expectVisible();
    });
    return registerPage;
  }

  /**
   * Clicks “Create a new account” on the login page (caller must already be on `LoginPage`).
   */
  static async create(loginPage: LoginPage): Promise<RegisterPage> {
    return test.step('Open register page from login', async () => {
      await loginPage.registerLink.click();
      const registerPage = new RegisterPage(loginPage.page);
      await registerPage.expectVisible();
      return registerPage;
    });
  }

  getPage(): Page {
    return this.page;
  }

  async expectVisible(): Promise<void> {
    await this.header.ensureEnglish();
    await expect(this.root).toBeVisible();
    await expect(this.heading).toBeVisible();
    await expect(this.form).toBeVisible();
    await expect(this.fullNameInput).toBeVisible();
    await expect(this.emailInput).toBeVisible();
    await expect(this.passwordInput).toBeVisible();
    await expect(this.confirmPasswordInput).toBeVisible();
    await expect(this.submitButton).toBeVisible();
    await expect(this.googleSignInButton).toBeVisible();
    await expect(this.signInLink).toBeVisible();
  }

  async fillFullName(name: string): Promise<void> {
    await this.fullNameInput.fill(name);
  }

  async fillEmail(email: string): Promise<void> {
    await this.emailInput.fill(email);
  }

  async fillPassword(password: string): Promise<void> {
    await this.passwordInput.fill(password);
  }

  async fillConfirmPassword(password: string): Promise<void> {
    await this.confirmPasswordInput.fill(password);
  }

  async submit(): Promise<void> {
    await this.submitButton.click();
  }
}
