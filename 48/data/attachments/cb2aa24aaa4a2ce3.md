# Instructions

- Following Playwright test failed.
- Explain why, be concise, respect Playwright best practices.
- Provide a snippet of code with the fix, if possible.

# Test info

- Name: ui-elements-practice/iframe.spec.ts >> External iFrame Example >> the external iframe renders the portfolio page
- Location: tests/ui-elements-practice/iframe.spec.ts:113:3

# Error details

```
Error: expect(locator).toBeVisible() failed

Locator: locator('#portfolio-iframe').contentFrame().locator('h1')
Expected: visible
Timeout: 15000ms
Error: element(s) not found

Call log:
  - Expect "toBeVisible" locator('#portfolio-iframe').contentFrame().locator('h1') with timeout 15000ms
  - waiting for locator('#portfolio-iframe').contentFrame().locator('h1')

```

```yaml
- heading "Practice Page" [level=1]
- group "Radio Button Example":
  - text: Radio Button Example
  - radio
  - text: Radio1
  - radio
  - text: Radio2
  - radio
  - text: Radio3
- group "Suggession Class Example":
  - text: Suggession Class Example
  - textbox "Type to Select Countries"
- group "Dropdown Example":
  - text: Dropdown Example
  - combobox:
    - option "Select" [selected]
    - option "Option1"
    - option "Option2"
    - option "Option3"
- group "Checkbox Example":
  - text: Checkbox Example
  - checkbox
  - text: Option1
  - checkbox
  - text: Option2
  - checkbox
  - text: Option3
- group "Switch Window Example":
  - text: Switch Window Example
  - button "Open Window"
- group "Switch Tab Example":
  - text: Switch Tab Example
  - link "Open Tab":
    - /url: https://www.qaclickacademy.com
- group "Switch To Alert Example":
  - text: Switch To Alert Example
  - textbox "Enter Your Name"
  - button "Alert"
  - button "Confirm"
- group "Web Table Example":
  - text: Web Table Example
  - table:
    - rowgroup:
      - row "Instructor Course Price":
        - columnheader "Instructor"
        - columnheader "Course"
        - columnheader "Price"
      - row "Rahul Shetty Selenium Webdriver with Java Basics + Advanced + Interview Guide 30":
        - cell "Rahul Shetty"
        - cell "Selenium Webdriver with Java Basics + Advanced + Interview Guide"
        - cell "30"
      - row "Rahul Shetty Learn SQL in Practical + Database Testing from Scratch 25":
        - cell "Rahul Shetty"
        - cell "Learn SQL in Practical + Database Testing from Scratch"
        - cell "25"
      - row "Rahul Shetty Appium (Selenium) - Mobile Automation Testing from Scratch 30":
        - cell "Rahul Shetty"
        - cell "Appium (Selenium) - Mobile Automation Testing from Scratch"
        - cell "30"
      - row "Rahul Shetty WebSecurity Testing for Beginners-QA knowledge to next level 20":
        - cell "Rahul Shetty"
        - cell "WebSecurity Testing for Beginners-QA knowledge to next level"
        - cell "20"
      - row "Rahul Shetty Learn JMETER from Scratch - (Performance + Load) Testing Tool 25":
        - cell "Rahul Shetty"
        - cell "Learn JMETER from Scratch - (Performance + Load) Testing Tool"
        - cell "25"
      - row "Rahul Shetty WebServices / REST API Testing with SoapUI 35":
        - cell "Rahul Shetty"
        - cell "WebServices / REST API Testing with SoapUI"
        - cell "35"
      - row "Rahul Shetty QA Expert Course :Software Testing + Bugzilla + SQL + Agile 25":
        - cell "Rahul Shetty"
        - cell "QA Expert Course :Software Testing + Bugzilla + SQL + Agile"
        - cell "25"
      - row "Rahul Shetty Master Selenium Automation in simple Python Language 25":
        - cell "Rahul Shetty"
        - cell "Master Selenium Automation in simple Python Language"
        - cell "25"
      - row "Rahul Shetty Advanced Selenium Framework Pageobject, TestNG, Maven, Jenkins,C 20":
        - cell "Rahul Shetty"
        - cell "Advanced Selenium Framework Pageobject, TestNG, Maven, Jenkins,C"
        - cell "20"
      - row "Rahul Shetty Write effective QA Resume that will turn to interview call 0":
        - cell "Rahul Shetty"
        - cell "Write effective QA Resume that will turn to interview call"
        - cell "0"
- group "Element Displayed Example":
  - text: Element Displayed Example
  - button "Hide"
  - button "Show"
  - textbox "Hide/Show Example"
- group "Web Table Fixed header":
  - text: Web Table Fixed header
  - table:
    - rowgroup:
      - row "Name Position City Amount":
        - columnheader "Name"
        - columnheader "Position"
        - columnheader "City"
        - columnheader "Amount"
    - rowgroup:
      - row "Alex Engineer Chennai 28":
        - cell "Alex"
        - cell "Engineer"
        - cell "Chennai"
        - cell "28"
      - row "Ben Mechanic Bengaluru 23":
        - cell "Ben"
        - cell "Mechanic"
        - cell "Bengaluru"
        - cell "23"
      - row "Dwayne Manager Kolkata 48":
        - cell "Dwayne"
        - cell "Manager"
        - cell "Kolkata"
        - cell "48"
      - row "Ivory Receptionist Chennai 18":
        - cell "Ivory"
        - cell "Receptionist"
        - cell "Chennai"
        - cell "18"
      - row "Jack Engineer Pune 32":
        - cell "Jack"
        - cell "Engineer"
        - cell "Pune"
        - cell "32"
      - row "Joe Postman Chennai 46":
        - cell "Joe"
        - cell "Postman"
        - cell "Chennai"
        - cell "46"
      - row "Raymond Businessman Mumbai 37":
        - cell "Raymond"
        - cell "Businessman"
        - cell "Mumbai"
        - cell "37"
      - row "Ronaldo Sportsman Chennai 31":
        - cell "Ronaldo"
        - cell "Sportsman"
        - cell "Chennai"
        - cell "31"
      - row "Smith Cricketer Delhi 33":
        - cell "Smith"
        - cell "Cricketer"
        - cell "Delhi"
        - cell "33"
  - text: "Total Amount Collected: 296"
- group "Mouse Hover Example":
  - text: Mouse Hover Example
  - button "Mouse Hover"
- group "iFrame Example":
  - text: iFrame Example
  - iframe
- group "External iFrame Example":
  - text: External iFrame Example
  - iframe
- group "Resume Refactor (AI) Example":
  - text: Resume Refactor (AI) Example
  - iframe
```

# Test source

```ts
  18  |     await frame.locator('#iframe-name').fill('John');
  19  |     await frame.locator('#iframe-country').selectOption('uk');
  20  |     await frame.locator('#iframe-agree').check();
  21  |     await frame.locator('#iframe-submit').click();
  22  | 
  23  |     await expect(frame.locator('#iframe-result')).toHaveText('Submitted: John - uk');
  24  |   });
  25  | 
  26  |   test('the form inside the iframe can be filled and submitted (user-facing locators)', async ({ page }) => {
  27  |     const frame = new PracticePage(page).localIframe.contentFrame();
  28  | 
  29  |     await frame.getByLabel('Name').fill('Anna');
  30  |     await frame.getByLabel('Country').selectOption({ label: 'Germany' });
  31  |     await frame.getByRole('checkbox').check();
  32  |     await frame.getByRole('button', { name: 'Submit' }).click();
  33  | 
  34  |     await expect(frame.getByText('Submitted: Anna - de')).toBeVisible();
  35  |   });
  36  | 
  37  |   test('form fields inside the iframe reflect their state', async ({ page }) => {
  38  |     const frame = new PracticePage(page).localIframe.contentFrame();
  39  | 
  40  |     await expect(frame.getByPlaceholder('Enter name')).toBeEmpty();
  41  |     await expect(frame.getByRole('checkbox')).not.toBeChecked();
  42  | 
  43  |     await frame.getByRole('checkbox').check();
  44  |     await expect(frame.getByRole('checkbox')).toBeChecked();
  45  | 
  46  |     await frame.getByLabel('Name').fill('John');
  47  |     await expect(frame.getByLabel('Name')).toHaveValue('John');
  48  |   });
  49  | 
  50  |   test('submitting an empty name shows a validation error', async ({ page }) => {
  51  |     const frame = new PracticePage(page).localIframe.contentFrame();
  52  | 
  53  |     await expect(frame.getByRole('alert')).toBeHidden();
  54  |     await frame.getByRole('button', { name: 'Submit' }).click();
  55  | 
  56  |     await expect(frame.getByRole('alert')).toHaveText('Please enter your name');
  57  |     await expect(frame.locator('#iframe-result')).toBeEmpty();
  58  |   });
  59  | 
  60  |   test('submitting without accepting the terms is rejected', async ({ page }) => {
  61  |     const frame = new PracticePage(page).localIframe.contentFrame();
  62  | 
  63  |     await frame.getByLabel('Name').fill('John');
  64  |     await frame.getByRole('button', { name: 'Submit' }).click();
  65  | 
  66  |     await expect(frame.locator('#iframe-result')).toHaveText('Please accept the terms');
  67  |   });
  68  | 
  69  |   test('the table inside the iframe can be queried by cell and row', async ({ page }) => {
  70  |     const frame = new PracticePage(page).localIframe.contentFrame();
  71  | 
  72  |     await expect(frame.getByRole('cell', { name: 'Liverpool' })).toBeVisible();
  73  | 
  74  |     const liverpoolRow = frame.getByRole('row').filter({ hasText: 'Liverpool' });
  75  |     await expect(liverpoolRow.getByRole('cell').nth(1)).toHaveText('84');
  76  |   });
  77  | 
  78  |   test('the iframe can be reached by its name attribute via page.frame()', async ({ page }) => {
  79  |     const practice = new PracticePage(page);
  80  |     await expect(practice.localIframe).toBeVisible();
  81  | 
  82  |     const frame = page.frame({ name: 'iframe-name' });
  83  |     expect(frame).not.toBeNull();
  84  |     await expect(frame!.locator('h2')).toHaveText('Registration form');
  85  |   });
  86  | 
  87  |   test('the frame finishes loading and resolves to the local iframe page', async ({ page }) => {
  88  |     const frame = page.frame({ name: 'iframe-name' });
  89  |     expect(frame).not.toBeNull();
  90  | 
  91  |     await frame!.waitForLoadState('domcontentloaded');
  92  | 
  93  |     expect(frame!.url()).toMatch(/\/iframe\.html$/);
  94  |     expect(frame!.parentFrame()).toBe(page.mainFrame());
  95  |     expect(await frame!.title()).toBe('iFrame Content');
  96  |   });
  97  | });
  98  | 
  99  | // The portfolio is a live external site (an SPA), so these checks only assert on stable
  100 | // structure (a visible h1 and the main landmark), never on marketing copy. A failure
  101 | // here is a signal to re-verify the site manually, not a regression in our own code.
  102 | test.describe('External iFrame Example', () => {
  103 |   test.beforeEach(async ({ page }) => {
  104 |     await new PracticePage(page).goto();
  105 |   });
  106 | 
  107 |   test('the iframe points at the portfolio site', async ({ page }) => {
  108 |     const practice = new PracticePage(page);
  109 | 
  110 |     await expect(practice.portfolioIframe).toHaveAttribute('src', 'https://irina-zhuravleva-qa.surge.sh/');
  111 |   });
  112 | 
  113 |   test('the external iframe renders the portfolio page', async ({ page }) => {
  114 |     const practice = new PracticePage(page);
  115 |     await practice.portfolioIframe.scrollIntoViewIfNeeded();
  116 |     const frame = practice.portfolioIframe.contentFrame();
  117 | 
> 118 |     await expect(frame.locator('h1')).toBeVisible({ timeout: 15_000 });
      |                                       ^ Error: expect(locator).toBeVisible() failed
  119 |     await expect(frame.getByRole('main')).toBeVisible();
  120 |   });
  121 | 
  122 |   test('the external iframe can be reached by its name attribute via page.frame()', async ({ page }) => {
  123 |     const practice = new PracticePage(page);
  124 |     await expect(practice.portfolioIframe).toBeVisible();
  125 | 
  126 |     const frame = page.frame({ name: 'portfolio-iframe' });
  127 |     expect(frame).not.toBeNull();
  128 |     await expect(frame!.locator('h1')).toBeVisible({ timeout: 15_000 });
  129 |   });
  130 | });
  131 | 
```