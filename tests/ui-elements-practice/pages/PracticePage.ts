import type { Locator, Page } from '@playwright/test';
import { targetUrl } from '../target-url';

export class PracticePage {
  readonly page: Page;

  readonly radioButton: (label: 'Radio1' | 'Radio2' | 'Radio3') => Locator;
  readonly radioLabelText: (label: 'Radio1' | 'Radio2' | 'Radio3') => Locator;
  readonly autocompleteInput: Locator;
  readonly dropdown: Locator;
  readonly checkbox: (label: 'Option1' | 'Option2' | 'Option3') => Locator;

  readonly openWindowButton: Locator;
  readonly openTabLink: Locator;

  readonly nameInput: Locator;
  readonly alertButton: Locator;
  readonly confirmButton: Locator;

  readonly coursesTable: Locator;
  readonly coursesTableRows: Locator;

  readonly hideButton: Locator;
  readonly showButton: Locator;
  readonly displayedTextInput: Locator;

  readonly fixedHeaderTableWrapper: Locator;
  readonly fixedHeaderTable: Locator;
  readonly totalAmount: Locator;

  readonly mouseHoverTrigger: Locator;
  readonly mouseHoverMenu: Locator;
  readonly mouseHoverTopLink: Locator;
  readonly mouseHoverReloadLink: Locator;

  readonly localIframe: Locator;
  readonly portfolioIframe: Locator;

  constructor(page: Page) {
    this.page = page;

    this.radioButton = (label) => page.getByRole('radio', { name: label });
    this.radioLabelText = (label) => page.locator('label').filter({ hasText: label });
    this.autocompleteInput = page.locator('#autocomplete');
    this.dropdown = page.locator('#dropdown-class-example');
    this.checkbox = (label) => page.getByRole('checkbox', { name: label });

    this.openWindowButton = page.locator('#openwindow');
    this.openTabLink = page.locator('#opentab');

    this.nameInput = page.locator('#name');
    this.alertButton = page.locator('#alertbtn');
    this.confirmButton = page.locator('#confirmbtn');

    this.coursesTable = page.locator('table#product');
    this.coursesTableRows = this.coursesTable.locator('tbody tr').filter({ hasNot: page.locator('th') });

    this.hideButton = page.locator('#hide-textbox');
    this.showButton = page.locator('#show-textbox');
    this.displayedTextInput = page.locator('#displayed-text');

    this.fixedHeaderTableWrapper = page.locator('.tableFixHead');
    this.fixedHeaderTable = this.fixedHeaderTableWrapper.locator('table');
    this.totalAmount = page.locator('.totalAmount');

    this.mouseHoverTrigger = page.locator('#mousehover');
    this.mouseHoverMenu = page.locator('.mouse-hover-content');
    this.mouseHoverTopLink = this.mouseHoverMenu.getByRole('link', { name: 'Top' });
    this.mouseHoverReloadLink = this.mouseHoverMenu.getByRole('link', { name: 'Reload' });

    this.localIframe = page.locator('#local-iframe');
    this.portfolioIframe = page.locator('#portfolio-iframe');
  }

  async goto(): Promise<void> {
    await this.page.goto(targetUrl);
  }

  async enterName(name: string): Promise<void> {
    await this.nameInput.fill(name);
  }

  /** Sum of the "Amount" column in the fixed-header table, computed from the rendered DOM. */
  async sumFixedHeaderAmounts(): Promise<number> {
    const values = await this.fixedHeaderTable.locator('tbody tr td:last-child').allTextContents();
    return values.reduce((total, value) => total + Number(value.trim()), 0);
  }
}
