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

  readonly coursesIframe: Locator;
  readonly portfolioIframe: Locator;

  constructor(page: Page) {
    this.page = page;

    // The radios/checkboxes have no accessible name: their <label for="..."> targets an
    // id that doesn't exist on the input, and a *present* (even if broken) `for` attribute
    // suppresses the browser's fallback to implicit wrapping-label association. That rules
    // out getByRole(..., { name }) — see a11y-findings.spec.ts for a test documenting this.
    // Radios only carry a `value`; checkboxes at least kept a real (if mislabeled) id.
    const radioValueByLabel = { Radio1: 'radio1', Radio2: 'radio2', Radio3: 'radio3' } as const;
    const checkboxIdByLabel = {
      Option1: 'checkBoxOption1',
      Option2: 'checkBoxOption2',
      Option3: 'checkBoxOption3',
    } as const;

    this.radioButton = (label) =>
      page.locator(`input.radioButton[value="${radioValueByLabel[label]}"]`);
    this.radioLabelText = (label) => page.locator('label').filter({ hasText: label });
    this.autocompleteInput = page.locator('#autocomplete');
    this.dropdown = page.locator('#dropdown-class-example');
    this.checkbox = (label) => page.locator(`#${checkboxIdByLabel[label]}`);

    this.openWindowButton = page.locator('#openwindow');
    this.openTabLink = page.locator('#opentab');

    this.nameInput = page.locator('#name');
    this.alertButton = page.locator('#alertbtn');
    this.confirmButton = page.locator('#confirmbtn');

    // Note: the source markup reuses id="product" on two different <table> elements
    // (a real bug in the practice page). We disambiguate by DOM order / container.
    this.coursesTable = page.locator('table#product').first();
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

    this.coursesIframe = page.locator('#courses-iframe');
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
