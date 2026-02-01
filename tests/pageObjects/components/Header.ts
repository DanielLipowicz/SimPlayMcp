import { expect, Locator, Page, test } from '@playwright/test';

export class Header {
  private readonly page: Page;
  readonly root: Locator;
  readonly homeButton: Locator;
  readonly navFeatures: Locator;
  readonly navPricing: Locator;
  readonly navCommunity: Locator;
  readonly navCollectors: Locator;
  readonly navKnowledgeHub: Locator;
  readonly switchToEnglishButton: Locator;
  readonly switchToPolishButton: Locator;
  readonly signInLink: Locator;
  readonly createAccountLink: Locator;

  constructor(page: Page) {
    this.page = page;
    this.root = page.getByRole('banner', { name: 'Main navigation header' });
    this.homeButton = this.root.getByRole('button', { name: 'Go to homepage' });
    this.navFeatures = this.root.getByRole('button', { name: 'Navigate to Features section' });
    this.navPricing = this.root.getByRole('button', { name: 'Navigate to Pricing section' });
    this.navCommunity = this.root.getByRole('button', { name: 'Navigate to Community section' });
    this.navCollectors = this.root.getByRole('button', { name: 'Navigate to For Collectors section' });
    this.navKnowledgeHub = this.root.getByRole('button', { name: 'Navigate to Knowledge Hub' });
    this.switchToEnglishButton = this.root.getByRole('button', { name: 'Switch language to English' });
    this.switchToPolishButton = this.root.getByRole('button', { name: 'Switch language to Polski' });
    this.signInLink = this.root.getByRole('link', { name: 'Sign in to your account' });
    this.createAccountLink = this.root.getByRole('link', { name: 'Create a new account' });
  }

  async ensureEnglish(): Promise<void> {
    await test.step('Ensure English language', async () => {
      const canSwitchToEnglish = await this.switchToEnglishButton.isVisible().catch(() => false);
      if (canSwitchToEnglish) {
        await this.switchToEnglishButton.click();
      }
      await expect(this.switchToPolishButton).toBeVisible();
    });
  }

  async expectCompleteVisible(): Promise<void> {
    await expect(this.root).toBeVisible();
    await expect(this.homeButton).toBeVisible();
    await expect(this.navFeatures).toBeVisible();
    await expect(this.navPricing).toBeVisible();
    await expect(this.navCommunity).toBeVisible();
    await expect(this.navCollectors).toBeVisible();
    await expect(this.navKnowledgeHub).toBeVisible();
    await expect(this.switchToPolishButton).toBeVisible();
    await expect(this.signInLink).toBeVisible();
    await expect(this.createAccountLink).toBeVisible();
  }
}
