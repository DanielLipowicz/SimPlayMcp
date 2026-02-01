import { expect, Locator, Page, test } from '@playwright/test';
import { BasePage } from './BasePage';
import { config } from '../config';

class VehicleCard {
  readonly nameHeading: Locator;

  constructor(nameHeading: Locator) {
    this.nameHeading = nameHeading;
  }

  async expectVisible(): Promise<void> {
    await expect(this.nameHeading).toBeVisible();
  }
}

export class DashboardPage extends BasePage {
  readonly root: Locator;
  readonly welcomeHeading: Locator;
  readonly vehiclesSection: Locator;
  readonly vehiclesHeading: Locator;
  readonly vehicleNameHeadings: Locator;
  readonly userMenuButton: Locator;
  readonly logoutMenuItem: Locator;

  constructor(page: Page) {
    super(page);
    this.root = page.getByRole('main', { name: 'User dashboard' });
    this.welcomeHeading = this.root.getByRole('heading', { name: 'Welcome, User!' });
    this.vehiclesSection = this.root.getByRole('region', { name: 'Vehicle management section' });
    this.vehiclesHeading = this.vehiclesSection.getByRole('heading', { name: 'My Vehicles' });
    this.vehicleNameHeadings = this.vehiclesSection.getByRole('heading', { level: 3 });
    this.userMenuButton = page.getByRole('button', { name: 'Welcome, User' });
    this.logoutMenuItem = page.getByRole('menuitem', { name: /Log out|Logout|Sign out/ });
  }

  static async create(page: Page): Promise<DashboardPage> {
    const dashboardPage = new DashboardPage(page);
    await test.step('Open dashboard page', async () => {
      await dashboardPage.goTo();
    });
    return dashboardPage;
  }

  async expectVisible(): Promise<void> {
    await this.header.ensureEnglish();
    await expect(this.root).toBeVisible();
    await expect(this.welcomeHeading).toBeVisible();
    await expect(this.vehiclesSection).toBeVisible();
    await expect(this.vehiclesHeading).toBeVisible();
  }

  async goTo(): Promise<void> {
    await this.page.goto(`${config.baseUrl}/dashboard`);
    await this.expectVisible();
  }

  getVehicleCard(index: number): VehicleCard {
    return new VehicleCard(this.vehicleNameHeadings.nth(index));
  }

  async expectVehicleCount(count: number): Promise<void> {
    await expect(this.vehicleNameHeadings).toHaveCount(count);
  }

  async expectAllVehiclesVisible(): Promise<void>;
  async expectAllVehiclesVisible(vehicleNames: string[]): Promise<void>;
  async expectAllVehiclesVisible(vehicleNames?: string[]): Promise<void> {
    const expectedCount = vehicleNames?.length;
    const vehicleCount = expectedCount ?? (await this.vehicleNameHeadings.count());

    if (expectedCount !== undefined) {
      await expect(this.vehicleNameHeadings).toHaveCount(expectedCount);
    }

    for (let index = 0; index < vehicleCount; index += 1) {
      const vehicleCard = this.getVehicleCard(index);
      await vehicleCard.expectVisible();
      if (vehicleNames) {
        await expect(vehicleCard.nameHeading).toHaveText(vehicleNames[index]);
      }
    }
  }

  async logout(): Promise<void> {
    await this.userMenuButton.click();
    await this.logoutMenuItem.click();
    await expect(this.header.signInLink).toBeVisible();
  }

  async closeDialogIfVisible(): Promise<void> {
    const closeDialog = this.page.getByRole('button', { name: 'Close' });
    if (await closeDialog.isVisible().catch(() => false)) {
      await test.step('Closing dialog', async () => {
        await closeDialog.click();
      });
    }
  }
}
