import { expect, test } from "@playwright/test";
import { HomePage } from "../../pageObjects/HomePage";
import { RegisterPage } from "../../pageObjects/RegisterPage";

test.describe("User Login and Regestering", () => {
  test("Home page visual verification", async ({ page }) => {
    const homePage = await HomePage.create(page);
    await homePage.goTo();
    await expect(homePage.getPage()).toHaveScreenshot();
  });

  test("Register page visual verification", async ({ page }) => {
    const homePage = await HomePage.create(page);
    const registerPage = await homePage.RegisterButtonClick();
    await expect(registerPage.getPage()).toHaveScreenshot();
  });

  test("Login page visual verification", async ({ page }) => {
    const homePage = await HomePage.create(page);
    const loginPage = await homePage.LoginButtonClick();
    await expect(loginPage.getPage()).toHaveScreenshot();
  });
});
