import { BrowserContext, Page } from '@playwright/test';
import { Footer } from './components/Footer';
import { Header } from './components/Header';

export abstract class BasePage {
  protected readonly page: Page;
  readonly header: Header;
  readonly footer: Footer;

  protected constructor(page: Page) {
    this.page = page;
    this.header = new Header(page);
    this.footer = new Footer(page);
  }

  get context(): BrowserContext {
    return this.page.context();
  }

  async storageState(path: string): Promise<void> {
    await this.page.context().storageState({ path });
  }
}
