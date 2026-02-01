import { test } from "@playwright/test";
import { standardUser } from "./testData/StandardUser";
import { DashboardPage } from "./pageObjects/DashboardPage";
import { config } from "./config";

test.describe("Scenario 2: verify vehicles without login", () => {
  test.use({ storageState: config.StandardUserStorageState });

  test("Scenario 2: verify vehicles without login", async ({ page }) => {
    const user = standardUser;

    const dashboardPage = new DashboardPage(page);
    await dashboardPage.goTo();

    await dashboardPage.closeDialogIfVisible();

    await test.step("Verify vehicles", async () => {
      await dashboardPage.expectVehicleCount(user.ownedVehicles.length);
      await dashboardPage.expectAllVehiclesVisible(user.ownedVehicleNames);
    });
    await test.step("Close page", async () => {
      await page.close();
    });
  });
});
