import { expect, Locator, Page, test } from '@playwright/test';

export class Header {
  readonly root: Locator;
  readonly homeButton: Locator;
  readonly mainNav: Locator;
  readonly navFeatures: Locator;
  readonly navFutureFeatures: Locator;
  readonly navHowServiceAlertsWork: Locator;
  readonly navKnowledgeHub: Locator;
  readonly navMyVehicles: Locator;
  readonly navUpcomingEvents: Locator;
  readonly navDashboard: Locator;
  readonly languageSwitcher: Locator;
  readonly languageSwitcherChevron: Locator;
  readonly switchToEnglishButton: Locator;
  readonly switchToPolishButton: Locator;
  readonly signInLink: Locator;
  readonly createAccountLink: Locator;

  constructor(page: Page) {
    this.root = page.getByRole('banner', { name: 'Main navigation header' });
    this.homeButton = this.root.getByRole('button', { name: 'Go to homepage' });
    this.mainNav = this.root.getByRole('navigation', { name: 'Main navigation menu' });
    this.navFeatures = this.mainNav.getByRole('button', { name: 'Navigate to Features section' });
    this.navFutureFeatures = this.mainNav.getByRole('button', { name: 'Navigate to Future features' });
    this.navHowServiceAlertsWork = this.mainNav.getByRole('button', {
      name: 'Navigate to How service alerts work',
    });
    this.navKnowledgeHub = this.mainNav.getByRole('button', { name: 'Navigate to Knowledge Hub' });
    this.navMyVehicles = this.mainNav.getByRole('button', { name: 'Navigate to My vehicles' });
    this.navUpcomingEvents = this.mainNav.getByRole('button', { name: 'Navigate to Upcoming events' });
    this.navDashboard = this.mainNav.getByRole('button', { name: 'Navigate to Dashboard' });
    this.languageSwitcher = this.root.locator(
      '.header-desktop .language-switcher .language-switcher__group .language-switcher__flag-btn',
    );
    this.languageSwitcherChevron = this.root.locator(
      '.header-desktop .language-switcher .language-switcher__chevron-btn',
    );
    this.switchToEnglishButton = this.root.getByLabel('Switch language to English');
    this.switchToPolishButton = this.root.getByRole('button', { name: 'Zmień na polski' });
    this.signInLink = this.root.getByRole('link', { name: 'Sign in to your account' });
    this.createAccountLink = this.root.getByRole('link', { name: 'Create a new account' });
  }

  async ensureEnglish(): Promise<void> {
    await test.step('Ensure English language', async () => {
      const currentLanguage = await this.languageSwitcher.textContent();
      if (currentLanguage !== '🇬🇧') {
        await this.switchToEnglish();
      }
      expect(await this.languageSwitcher.textContent()).toEqual('🇬🇧');
    });
  }

  async switchToEnglish(): Promise<void> {
    await this.languageSwitcherChevron.click();
    await this.switchToEnglishButton.click();
    expect(await this.languageSwitcher.textContent()).toEqual('🇬🇧');
  }

  /** Header as shown to anonymous visitors (e.g. home before login). */
  async expectCompleteVisible(): Promise<void> {
    await expect(this.root).toBeVisible();
    await expect(this.homeButton).toBeVisible();
    await expect(this.navFeatures).toBeVisible();
    await expect(this.navFutureFeatures).toBeVisible();
    await expect(this.navHowServiceAlertsWork).toBeVisible();
    await expect(this.navKnowledgeHub).toBeVisible();
    await expect(this.switchToPolishButton).toBeVisible();
    await expect(this.signInLink).toBeVisible();
    await expect(this.createAccountLink).toBeVisible();
  }

  /** Extra main-nav items only present when the user is signed in (see live a11y tree). */
  async expectAuthenticatedNavVisible(): Promise<void> {
    await expect(this.navMyVehicles).toBeVisible();
    await expect(this.navUpcomingEvents).toBeVisible();
    await expect(this.navDashboard).toBeVisible();
  }
}
