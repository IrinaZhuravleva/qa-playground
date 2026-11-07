# Instructions

- Following Playwright test failed.
- Explain why, be concise, respect Playwright best practices.
- Provide a snippet of code with the fix, if possible.

# Test info

- Name: ui-elements-practice/web-table.spec.ts >> Web Table Example >> lists 10 courses, all by the same instructor
- Location: tests/ui-elements-practice/web-table.spec.ts:19:3

# Error details

```
Error: expect(received).toBe(expected) // Object.is equality

Expected: "Rahul Shetty"
Received: "John Smith"
```

# Page snapshot

```yaml
- generic [active] [ref=e1]:
  - heading "Practice Page" [level=1] [ref=e2]
  - generic [ref=e3]:
    - group "Radio Button Example" [ref=e5]:
      - generic [ref=e7] [cursor=pointer]:
        - radio [ref=e8]
        - text: Radio1
      - generic [ref=e9] [cursor=pointer]:
        - radio [ref=e10]
        - text: Radio2
      - generic [ref=e11] [cursor=pointer]:
        - radio [ref=e12]
        - text: Radio3
    - group "Suggession Class Example" [ref=e14]:
      - textbox "Type to Select Countries" [ref=e16]
    - group "Dropdown Example" [ref=e18]:
      - combobox [ref=e20]:
        - option "Select" [selected]
        - option "Option1"
        - option "Option2"
        - option "Option3"
    - group "Checkbox Example" [ref=e22]:
      - generic [ref=e24] [cursor=pointer]:
        - checkbox [ref=e25]
        - text: Option1
      - generic [ref=e26] [cursor=pointer]:
        - checkbox [ref=e27]
        - text: Option2
      - generic [ref=e28] [cursor=pointer]:
        - checkbox [ref=e29]
        - text: Option3
  - generic [ref=e30]:
    - group "Switch Window Example" [ref=e32]:
      - button "Open Window" [ref=e34] [cursor=pointer]
    - group "Switch Tab Example" [ref=e36]:
      - link "Open Tab" [ref=e38] [cursor=pointer]:
        - /url: https://www.qaclickacademy.com
    - group "Switch To Alert Example" [ref=e40]:
      - textbox "Enter Your Name" [ref=e42]
      - button "Alert" [ref=e43] [cursor=pointer]
      - button "Confirm" [ref=e44] [cursor=pointer]
  - generic [ref=e45]:
    - group "Web Table Example" [ref=e47]:
      - table [ref=e49]:
        - rowgroup [ref=e50]:
          - row [ref=e51]:
            - columnheader "Instructor" [ref=e52]
            - columnheader "Course" [ref=e53]
            - columnheader "Price" [ref=e54]
          - row [ref=e55]:
            - cell "John Smith" [ref=e56]
            - cell "Selenium Webdriver with Java Basics + Advanced + Interview Guide" [ref=e57]
            - cell "30" [ref=e58]
          - row [ref=e59]:
            - cell "John Smith" [ref=e60]
            - cell "Learn SQL in Practical + Database Testing from Scratch" [ref=e61]
            - cell "25" [ref=e62]
          - row [ref=e63]:
            - cell "John Smith" [ref=e64]
            - cell "Appium (Selenium) - Mobile Automation Testing from Scratch" [ref=e65]
            - cell "30" [ref=e66]
          - row [ref=e67]:
            - cell "John Smith" [ref=e68]
            - cell "WebSecurity Testing for Beginners-QA knowledge to next level" [ref=e69]
            - cell "20" [ref=e70]
          - row [ref=e71]:
            - cell "John Smith" [ref=e72]
            - cell "Learn JMETER from Scratch - (Performance + Load) Testing Tool" [ref=e73]
            - cell "25" [ref=e74]
          - row [ref=e75]:
            - cell "John Smith" [ref=e76]
            - cell "WebServices / REST API Testing with SoapUI" [ref=e77]
            - cell "35" [ref=e78]
          - row [ref=e79]:
            - cell "John Smith" [ref=e80]
            - cell "QA Expert Course :Software Testing + Bugzilla + SQL + Agile" [ref=e81]
            - cell "25" [ref=e82]
          - row [ref=e83]:
            - cell "John Smith" [ref=e84]
            - cell "Master Selenium Automation in simple Python Language" [ref=e85]
            - cell "25" [ref=e86]
          - row [ref=e87]:
            - cell "John Smith" [ref=e88]
            - cell "Advanced Selenium Framework Pageobject, TestNG, Maven, Jenkins,C" [ref=e89]
            - cell "20" [ref=e90]
          - row [ref=e91]:
            - cell "John Smith" [ref=e92]
            - cell "Write effective QA Resume that will turn to interview call" [ref=e93]
            - cell "0" [ref=e94]
    - generic [ref=e95]:
      - group "Element Displayed Example" [ref=e96]:
        - button "Hide" [ref=e98] [cursor=pointer]
        - button "Show" [ref=e99] [cursor=pointer]
        - textbox "Hide/Show Example" [ref=e100]
      - group "Web Table Fixed header" [ref=e101]:
        - table [ref=e104]:
          - rowgroup [ref=e105]:
            - row [ref=e106]:
              - columnheader "Name" [ref=e107]
              - columnheader "Position" [ref=e108]
              - columnheader "City" [ref=e109]
              - columnheader "Amount" [ref=e110]
          - rowgroup [ref=e111]:
            - row [ref=e112]:
              - cell "Alex" [ref=e113]
              - cell "Engineer" [ref=e114]
              - cell "Chennai" [ref=e115]
              - cell "28" [ref=e116]
            - row [ref=e117]:
              - cell "Ben" [ref=e118]
              - cell "Mechanic" [ref=e119]
              - cell "Bengaluru" [ref=e120]
              - cell "23" [ref=e121]
            - row [ref=e122]:
              - cell "Dwayne" [ref=e123]
              - cell "Manager" [ref=e124]
              - cell "Kolkata" [ref=e125]
              - cell "48" [ref=e126]
            - row [ref=e127]:
              - cell "Ivory" [ref=e128]
              - cell "Receptionist" [ref=e129]
              - cell "Chennai" [ref=e130]
              - cell "18" [ref=e131]
            - row [ref=e132]:
              - cell "Jack" [ref=e133]
              - cell "Engineer" [ref=e134]
              - cell "Pune" [ref=e135]
              - cell "32" [ref=e136]
            - row [ref=e137]:
              - cell "Joe" [ref=e138]
              - cell "Postman" [ref=e139]
              - cell "Chennai" [ref=e140]
              - cell "46" [ref=e141]
            - row [ref=e142]:
              - cell "Raymond" [ref=e143]
              - cell "Businessman" [ref=e144]
              - cell "Mumbai" [ref=e145]
              - cell "37" [ref=e146]
            - row [ref=e147]:
              - cell "Ronaldo" [ref=e148]
              - cell "Sportsman" [ref=e149]
              - cell "Chennai" [ref=e150]
              - cell "31" [ref=e151]
            - row [ref=e152]:
              - cell "Smith" [ref=e153]
              - cell "Cricketer" [ref=e154]
              - cell "Delhi" [ref=e155]
              - cell "33" [ref=e156]
        - generic [ref=e157]: "Total Amount Collected: 296"
  - group "Mouse Hover Example" [ref=e160]:
    - button "Mouse Hover" [ref=e163] [cursor=pointer]
  - group "iFrame Example" [ref=e165]:
    - iframe [ref=e167]:
      - generic [ref=f1e1]:
        - heading "Registration form" [level=2] [ref=f1e2]
        - generic [ref=f1e3]:
          - generic [ref=f1e4]:
            - generic [ref=f1e5]: Name
            - textbox "Name" [ref=f1e6]:
              - /placeholder: Enter name
          - generic [ref=f1e7]:
            - generic [ref=f1e8]: Country
            - combobox "Country" [ref=f1e9]:
              - option "-- select --" [selected]
              - option "UK"
              - option "USA"
              - option "Germany"
          - generic [ref=f1e10]:
            - checkbox "I agree to the terms" [ref=f1e11]
            - generic [ref=f1e12]: I agree to the terms
          - button "Submit" [ref=f1e13]
        - paragraph
        - table [ref=f1e14]:
          - caption [ref=f1e15]: Premier League
          - rowgroup [ref=f1e16]:
            - row [ref=f1e17]:
              - columnheader "Club" [ref=f1e18]
              - columnheader "Points" [ref=f1e19]
          - rowgroup [ref=f1e20]:
            - row [ref=f1e21]:
              - cell "Liverpool" [ref=f1e22]
              - cell "84" [ref=f1e23]
            - row [ref=f1e24]:
              - cell "Arsenal" [ref=f1e25]
              - cell "74" [ref=f1e26]
            - row [ref=f1e27]:
              - cell "Chelsea" [ref=f1e28]
              - cell "69" [ref=f1e29]
  - group "External iFrame Example" [ref=e169]:
    - iframe [ref=e171]:
      - main [ref=f2e3]:
        - generic [ref=f2e4]:
          - link "Irina Zhuravleva portfolio home" [ref=f2e5]:
            - /url: "#top"
            - generic [ref=f2e9]: Irina Zhuravleva
          - generic [ref=f2e10]:
            - group "Language" [ref=f2e11]:
              - button "Switch language to English" [pressed] [ref=f2e12] [cursor=pointer]: EN
              - button "Switch language to French" [ref=f2e13] [cursor=pointer]: FR
            - button "Open menu" [ref=f2e14] [cursor=pointer]
        - generic [ref=f2e16]:
          - generic [ref=f2e17]:
            - paragraph [ref=f2e18]: QA Automation Engineer
            - heading "Testing with engineering discipline and product empathy" [level=1] [ref=f2e22]:
              - generic [ref=f2e23]: Testing with engineering discipline
              - generic [ref=f2e24]: and product empathy
            - paragraph [ref=f2e25]: "I care about automation that earns trust: tests should be stable, purposeful, and genuinely helpful when something breaks. I love practical coverage, thoughtful debugging data, and working side by side with developers early on, shift-left style, so quality problems never reach users. I’m curious by nature: I go to IT meetups and conferences, follow industry news, and share what I learn in articles with practical takeaways. I enjoy bringing the best practices of leading tech companies into my own projects, especially in security and AI."
            - group "Testing focus" [ref=f2e26]:
              - generic [ref=f2e27]: "Focus:"
              - strong [ref=f2e28]: stable Playwright suites, security checks, LLM/AI feature evaluation, fast release feedback
            - generic [ref=f2e29]:
              - link "Selected work" [ref=f2e30]:
                - /url: "#work"
              - link "LinkedIn profile" [ref=f2e34]:
                - /url: https://www.linkedin.com/in/irina-zhuravleva-23576925b/
              - link "Medium profile" [ref=f2e39]:
                - /url: https://medium.com/@iravizion
              - link "GitHub profile" [ref=f2e42]:
                - /url: https://github.com/IrinaZhuravleva
          - img "Portrait of Irina Zhuravleva" [ref=f2e47]
        - generic [ref=f2e48]:
          - generic [ref=f2e49]:
            - paragraph [ref=f2e50]: Principles
            - heading "How I approach quality" [level=2] [ref=f2e54]
            - paragraph [ref=f2e55]: A few principles that shape how I approach testing, engineering, and the products I help build.
          - generic [ref=f2e56]:
            - article [ref=f2e57]:
              - generic [ref=f2e58]: "01"
              - generic [ref=f2e59]:
                - heading "Build with purpose" [level=3] [ref=f2e60]
                - paragraph [ref=f2e61]: Good testing is not about finding as many bugs as possible. It is about understanding what we are building, why it matters, and where the real risks are. I believe QA should help teams build better products, not simply validate them at the end of development.
            - article [ref=f2e62]:
              - generic [ref=f2e63]: "02"
              - generic [ref=f2e64]:
                - heading "Own the outcome" [level=3] [ref=f2e65]
                - paragraph [ref=f2e66]: I take ownership of quality from requirements to release. I like to understand the bigger picture, ask questions early, identify risks, and work closely with developers and product teams to solve problems rather than simply report them.
            - article [ref=f2e67]:
              - generic [ref=f2e68]: "03"
              - generic [ref=f2e69]:
                - heading "Automate what matters" [level=3] [ref=f2e70]
                - paragraph [ref=f2e71]: Automation should make teams faster and more confident, not create another maintenance burden. I focus on building reliable, maintainable test frameworks that provide fast feedback and cover the scenarios where automation brings the most value.
            - article [ref=f2e72]:
              - generic [ref=f2e73]: "04"
              - generic [ref=f2e74]:
                - heading "Keep improving" [level=3] [ref=f2e75]
                - paragraph [ref=f2e76]: There is always a better way to test something. I enjoy exploring new tools, improving frameworks, refining processes and learning from failures. From migrating Cypress to Playwright to working with AI-powered products, I am always looking for opportunities to make testing more effective.
            - article [ref=f2e77]:
              - generic [ref=f2e78]: "05"
              - generic [ref=f2e79]:
                - heading "Think beyond the happy path" [level=3] [ref=f2e80]
                - paragraph [ref=f2e81]: Real users do not always follow the happy path. I pay particular attention to edge cases, integrations, data integrity, accessibility, security and unexpected behaviour. Good quality means thinking about how a system can fail, not only how it is supposed to work.
            - article [ref=f2e82]:
              - generic [ref=f2e83]: "06"
              - generic [ref=f2e84]:
                - heading "Share knowledge and Stay curious" [level=3] [ref=f2e85]
                - paragraph [ref=f2e86]: For me, continuous learning is part of the job. I enjoy mentoring junior QA engineers and developing stronger automation and testing practices, while learning new technologies — from cloud infrastructure and Kubernetes to AI quality and LLM evaluation.
        - region [ref=f2e87]:
          - generic [ref=f2e88]:
            - paragraph [ref=f2e89]: Case Studies
            - heading "Project experience" [level=2] [ref=f2e92]
          - generic [ref=f2e93]:
            - button "AI-Powered CV Tailoring Platform — showing resume details, press to see the case study" [ref=f2e94] [cursor=pointer]:
              - generic [ref=f2e95]:
                - article [ref=f2e96]:
                  - generic [ref=f2e97]:
                    - generic [ref=f2e98]:
                      - heading "AI-Powered CV Tailoring Platform" [level=3] [ref=f2e99]
                      - generic [ref=f2e100]: Senior QA Automation Engineer & Team Lead
                    - generic [ref=f2e101]:
                      - generic [ref=f2e102]: Project Description
                      - paragraph [ref=f2e103]: "Quality assurance for an internal AI platform centered on an LLM-based resume-tailoring pipeline (built with LangGraph). Covered end-to-end test automation, accessibility and security hardening, and CI/CD reliability for a product shipping fast-moving AI features to production on Kubernetes. Also led a cross-functional team of four (two backend engineers, one frontend engineer, one QA engineer): planning, task distribution, releases, and communication with the customer."
                    - generic [ref=f2e104]:
                      - generic [ref=f2e105]: Achievements
                      - list [ref=f2e106]:
                        - listitem [ref=f2e107]: Built an end-to-end Playwright + BDD (Cucumber/Gherkin) test suite and registered scenarios in Azure DevOps Test Plans.
                        - listitem [ref=f2e108]: Fixed WCAG accessibility violations, including color-contrast and link-name issues.
                        - listitem [ref=f2e109]: Added OWASP-aligned security test coverage across access control, injection, and authentication risks.
                        - listitem [ref=f2e110]: Introduced an automated post-deploy smoke-test stage (E2E health check) into the Azure DevOps CI/CD pipeline deploying to Kubernetes.
                        - listitem [ref=f2e111]: "Led a cross-functional team of four (two backend, one frontend, one QA engineer): planning, task distribution, release management, and communication with the customer."
                    - paragraph [ref=f2e112]: Playwright · BDD/Cucumber · Gherkin · TypeScript · Python · Azure DevOps (Pipelines, Test Plans) · Kubernetes · Docker · LangGraph · WCAG · OWASP
                    - generic [ref=f2e113]: Click to see the case study
                - article [aria-hidden] [ref=f2e117]:
                  - generic [ref=f2e118]:
                    - generic [ref=f2e119]:
                      - heading [level=3] [ref=f2e120]: AI-Powered CV Tailoring Platform
                      - generic [ref=f2e121]: Senior QA Automation Engineer & Team Lead
                    - generic [ref=f2e122]:
                      - generic [ref=f2e123]: Challenge
                      - paragraph [ref=f2e124]: A new internal platform using an LLM pipeline to tailor resumes to job postings had no end-to-end coverage, unresolved accessibility issues, and no automated way to confirm a release was healthy right after deployment.
                    - generic [ref=f2e125]:
                      - generic [ref=f2e126]: Solution
                      - paragraph [ref=f2e127]: Built an end-to-end Playwright + BDD (Cucumber/Gherkin) suite and registered every scenario in the team’s test management system, fixed WCAG accessibility violations (color contrast, link naming), added OWASP-aligned security checks, and introduced an automated post-deploy smoke-test stage into the Kubernetes-based CI/CD pipeline.
                    - generic [ref=f2e128]:
                      - generic [ref=f2e129]: Results
                      - paragraph [ref=f2e130]: "Release confidence for an LLM-driven product: every deploy is now smoke-tested automatically, accessibility and security gaps are caught before they reach users, and QA scenarios stay traceable in the test-management system instead of living only in test code."
                    - paragraph [ref=f2e131]: Playwright · BDD/Cucumber · Gherkin · TypeScript · Python · Azure DevOps (Pipelines, Test Plans) · Kubernetes · Docker · LangGraph · WCAG · OWASP
                    - generic [ref=f2e132]: Click to go back
            - button "Medical Software Certification (IEC 62304) — showing resume details, press to see the case study" [ref=f2e136] [cursor=pointer]:
              - generic [ref=f2e137]:
                - article [ref=f2e138]:
                  - generic [ref=f2e139]:
                    - generic [ref=f2e140]:
                      - heading "Medical Software Certification (IEC 62304)" [level=3] [ref=f2e141]
                      - generic [ref=f2e142]: Senior QA Engineer
                    - generic [ref=f2e143]:
                      - generic [ref=f2e144]: Project Description
                      - paragraph [ref=f2e145]: Preparation of test documentation for a medical software product undergoing certification under IEC 62304 (Class A). Responsible for quickly onboarding to the product within a two-month timeline, analysing regulatory requirements, and creating a complete set of test artifacts, including test plans, test cases, traceability matrices, and risk-aligned test coverage. Ensured compliance with medical software lifecycle standards and contributed to establishing a structured, certification-ready testing process.
                    - generic [ref=f2e146]:
                      - generic [ref=f2e147]: Achievements
                      - list [ref=f2e148]:
                        - listitem [ref=f2e149]: Defined test strategy, created Test Plan, traceability matrices, and structured test suites, ensuring regulatory compliance (IEC 62304).
                        - listitem [ref=f2e150]: Enabled successful certification by delivering a full test solution from scratch under tight deadlines, without a provided environment, while coordinating with parallel client-side development; developed detailed test cases from the Software/UI Verification Plan covering all requirements and risks.
                    - paragraph [ref=f2e151]: Jira · Xray · Confluence · Postman · Google Drive
                    - generic [ref=f2e152]: Click to see the case study
                - article [aria-hidden] [ref=f2e156]:
                  - generic [ref=f2e157]:
                    - generic [ref=f2e158]:
                      - heading [level=3] [ref=f2e159]: Medical Software Certification (IEC 62304)
                      - generic [ref=f2e160]: Senior QA Engineer
                    - generic [ref=f2e161]:
                      - generic [ref=f2e162]: Challenge
                      - paragraph [ref=f2e163]: A medical software product needed a complete, certification-ready test documentation set for IEC 62304 (Class A), with no existing environment or test framework in place and only a two-month window to onboard and deliver.
                    - generic [ref=f2e164]:
                      - generic [ref=f2e165]: Solution
                      - paragraph [ref=f2e166]: Defined the test strategy and built the full framework and documentation set from scratch — test plans, traceability matrices, structured test suites, and detailed test cases derived from the Software and UI Verification Plans — while coordinating with a parallel client-side development team.
                    - generic [ref=f2e167]:
                      - generic [ref=f2e168]: Results
                      - paragraph [ref=f2e169]: A certification-ready testing process that enabled the product to pass IEC 62304 certification, delivered on a tight timeline with no pre-existing environment.
                    - paragraph [ref=f2e170]: Jira · Xray · Confluence · Postman · Google Drive
                    - generic [ref=f2e171]: Click to go back
            - button "Microsite-Building Platform — showing resume details, press to see the case study" [ref=f2e175] [cursor=pointer]:
              - generic [ref=f2e176]:
                - article [ref=f2e177]:
                  - generic [ref=f2e178]:
                    - generic [ref=f2e179]:
                      - heading "Microsite-Building Platform" [level=3] [ref=f2e180]
                      - generic [ref=f2e181]: Automation QA Engineer
                    - generic [ref=f2e182]:
                      - generic [ref=f2e183]: Project Description
                      - paragraph [ref=f2e184]: Develop a platform for building microsites for form submissions, focusing on building automated testing frameworks, implementing CI/CD workflows, and ensuring system reliability through manual and automated testing. Worked as the sole QA engineer on the project.
                    - generic [ref=f2e185]:
                      - generic [ref=f2e186]: Achievements
                      - list [ref=f2e187]:
                        - listitem [ref=f2e188]: Built testing frameworks for 10 microsites from scratch using Playwright.
                        - listitem [ref=f2e189]: Built CI/CD workflows using Azure DevOps pipelines and GitLab.
                        - listitem [ref=f2e190]: Implemented load testing using Artillery.
                    - paragraph [ref=f2e191]: Playwright · Gherkin · TypeScript · Azure DevOps · Confluence · AWS · Docker · GitLab · Artillery · React · Next.js · Tailwind CSS · PrimeReact · Postman · Swagger
                    - generic [ref=f2e192]: Click to see the case study
                - article [aria-hidden] [ref=f2e196]:
                  - generic [ref=f2e197]:
                    - generic [ref=f2e198]:
                      - heading [level=3] [ref=f2e199]: Microsite-Building Platform
                      - generic [ref=f2e200]: Automation QA Engineer
                    - generic [ref=f2e201]:
                      - generic [ref=f2e202]: Challenge
                      - paragraph [ref=f2e203]: A new platform for building form-submission microsites had no test coverage at all, and as the only QA engineer on the project I needed to keep pace as 10 separate sites shipped in parallel.
                    - generic [ref=f2e204]:
                      - generic [ref=f2e205]: Solution
                      - paragraph [ref=f2e206]: Built Playwright UI test frameworks for each microsite from the ground up, added load testing with Artillery, and stood up CI/CD pipelines on Azure DevOps and GitLab alongside manual regression testing.
                    - generic [ref=f2e207]:
                      - generic [ref=f2e208]: Results
                      - paragraph [ref=f2e209]: All 10 microsites shipped with automated UI coverage and repeatable pipelines, giving the team fast, load-tested feedback before every release.
                    - paragraph [ref=f2e210]: Playwright · Gherkin · TypeScript · Azure DevOps · Confluence · AWS · Docker · GitLab · Artillery · React · Next.js · Tailwind CSS · PrimeReact · Postman · Swagger
                    - generic [ref=f2e211]: Click to go back
            - button "ERP System (NetSuite) — showing resume details, press to see the case study" [ref=f2e215] [cursor=pointer]:
              - generic [ref=f2e216]:
                - article [ref=f2e217]:
                  - generic [ref=f2e218]:
                    - generic [ref=f2e219]:
                      - heading "ERP System (NetSuite)" [level=3] [ref=f2e220]
                      - generic [ref=f2e221]: Senior Automation QA Engineer
                    - generic [ref=f2e222]:
                      - generic [ref=f2e223]: Project Description
                      - paragraph [ref=f2e224]: Testing and quality assurance for the company’s ERP system. Focused on functional and regression testing, automation framework maintenance and refactoring (Playwright, TypeScript), API testing, and ensuring data integrity across business processes such as employee time tracking, project database management, and sales order processing.
                    - generic [ref=f2e225]:
                      - generic [ref=f2e226]: Achievements
                      - list [ref=f2e227]:
                        - listitem [ref=f2e228]: Started refactoring the existing Playwright-based automated test suite, improving maintainability and execution stability.
                        - listitem [ref=f2e229]: Utilized SQL queries to validate data in the database.
                        - listitem [ref=f2e230]: Conducted testing of integrations with the Oracle NetSuite API.
                    - paragraph [ref=f2e231]: Playwright-BDD · Gherkin · TypeScript · Azure DevOps · Confluence · Atlassian (Jira, Bitbucket) · Oracle NetSuite · Postman · Swagger
                    - generic [ref=f2e232]: Click to see the case study
                - article [aria-hidden] [ref=f2e236]:
                  - generic [ref=f2e237]:
                    - generic [ref=f2e238]:
                      - heading [level=3] [ref=f2e239]: ERP System (NetSuite)
                      - generic [ref=f2e240]: Senior Automation QA Engineer
                    - generic [ref=f2e241]:
                      - generic [ref=f2e242]: Challenge
                      - paragraph [ref=f2e243]: The existing Playwright suite covering core NetSuite workflows — time tracking, project databases, sales orders — had grown hard to maintain, and unstable runs were slowing down regression cycles.
                    - generic [ref=f2e244]:
                      - generic [ref=f2e245]: Solution
                      - paragraph [ref=f2e246]: Refactored the automation framework for maintainability and execution stability, added SQL-based checks to validate data directly against the database, and extended coverage to the Oracle NetSuite API integration.
                    - generic [ref=f2e247]:
                      - generic [ref=f2e248]: Results
                      - paragraph [ref=f2e249]: A steadier, easier-to-extend regression suite and stronger confidence that time tracking, project data, and sales orders stayed correct across releases.
                    - paragraph [ref=f2e250]: Playwright-BDD · Gherkin · TypeScript · Azure DevOps · Confluence · Atlassian (Jira, Bitbucket) · Oracle NetSuite · Postman · Swagger
                    - generic [ref=f2e251]: Click to go back
            - button "Lab Specimen-Tracking Platform — showing resume details, press to see the case study" [ref=f2e255] [cursor=pointer]:
              - generic [ref=f2e256]:
                - article [ref=f2e257]:
                  - generic [ref=f2e258]:
                    - generic [ref=f2e259]:
                      - heading "Lab Specimen-Tracking Platform" [level=3] [ref=f2e260]
                      - generic [ref=f2e261]: Automation QA Engineer
                    - generic [ref=f2e262]:
                      - generic [ref=f2e263]: Project Description
                      - paragraph [ref=f2e264]: Validated a full-cycle IT platform for laboratory specimen tracking, including integration with sample preparation and sequencing equipment, to ensure compliance with functional requirements and deliver a high-quality product.
                    - generic [ref=f2e265]:
                      - generic [ref=f2e266]: Achievements
                      - list [ref=f2e267]:
                        - listitem [ref=f2e268]: Made the case for migrating from Cypress to Playwright (currently in progress) and refactored the existing test base by replacing hardcoded values with dynamic test data.
                        - listitem [ref=f2e269]: Refactored the existing codebase following the DRY principle.
                        - listitem [ref=f2e270]: Built CI/CD workflows with GitHub Actions.
                    - paragraph [ref=f2e271]: Gherkin · Cucumber · Cypress · GitHub · TestRail · Jira · AWS (Cognito, S3 bucket) · PostgreSQL · Postman · Swagger
                    - generic [ref=f2e272]: Click to see the case study
                - article [aria-hidden] [ref=f2e276]:
                  - generic [ref=f2e277]:
                    - generic [ref=f2e278]:
                      - heading [level=3] [ref=f2e279]: Lab Specimen-Tracking Platform
                      - generic [ref=f2e280]: Automation QA Engineer
                    - generic [ref=f2e281]:
                      - generic [ref=f2e282]: Challenge
                      - paragraph [ref=f2e283]: A platform tracking specimens through lab preparation and sequencing equipment ran on a Cypress suite built with hardcoded values, making it fragile as integrations and requirements kept growing.
                    - generic [ref=f2e284]:
                      - generic [ref=f2e285]: Solution
                      - paragraph [ref=f2e286]: Made the case for migrating from Cypress to Playwright, refactored the test base to use dynamic test data instead of hardcoded values following the DRY principle.
                    - generic [ref=f2e287]:
                      - generic [ref=f2e288]: Results
                      - paragraph [ref=f2e289]: A cleaner, more reliable codebase and a smoother migration path, delivered while keeping the equipment-integration platform compliant with its functional requirements.
                    - paragraph [ref=f2e290]: Gherkin · Cucumber · Cypress · GitHub · TestRail · Jira · AWS (Cognito, S3 bucket) · PostgreSQL · Postman · Swagger
                    - generic [ref=f2e291]: Click to go back
            - button "Laboratory Management System — showing resume details, press to see the case study" [ref=f2e295] [cursor=pointer]:
              - generic [ref=f2e296]:
                - article [ref=f2e297]:
                  - generic [ref=f2e298]:
                    - generic [ref=f2e299]:
                      - heading "Laboratory Management System" [level=3] [ref=f2e300]
                      - generic [ref=f2e301]: Manual QA Engineer
                    - generic [ref=f2e302]:
                      - generic [ref=f2e303]: Project Description
                      - paragraph [ref=f2e304]: Performed manual testing of a laboratory management system, ensuring all features functioned as expected and met business requirements.
                    - generic [ref=f2e305]:
                      - generic [ref=f2e306]: Achievements
                      - list [ref=f2e307]:
                        - listitem [ref=f2e308]: Managed requirements analysis and clarification.
                        - listitem [ref=f2e309]: Ran smoke, sanity, and regression testing for releases.
                        - listitem [ref=f2e310]: Created test-specific documentation (test cases, bug reports).
                    - paragraph [ref=f2e311]: Postman · Swagger · Azure DevOps · Confluence
                    - generic [ref=f2e312]: Click to see the case study
                - article [aria-hidden] [ref=f2e316]:
                  - generic [ref=f2e317]:
                    - generic [ref=f2e318]:
                      - heading [level=3] [ref=f2e319]: Laboratory Management System
                      - generic [ref=f2e320]: Manual QA Engineer
                    - generic [ref=f2e321]:
                      - generic [ref=f2e322]: Challenge
                      - paragraph [ref=f2e323]: A laboratory management system needed rigorous verification before every release, with no established QA process or documentation practice in place.
                    - generic [ref=f2e324]:
                      - generic [ref=f2e325]: Solution
                      - paragraph [ref=f2e326]: Owned requirements analysis and clarification end-to-end, ran functional, smoke, sanity, and regression testing for every release, and built out test cases and bug reports as reusable documentation.
                    - generic [ref=f2e327]:
                      - generic [ref=f2e328]: Results
                      - paragraph [ref=f2e329]: A repeatable release-testing process and documentation trail that gave the team confidence features met business requirements before shipping.
                    - paragraph [ref=f2e330]: Postman · Swagger · Azure DevOps · Confluence
                    - generic [ref=f2e331]: Click to go back
        - region [ref=f2e335]:
          - generic [ref=f2e336]:
            - generic [ref=f2e337]:
              - paragraph [ref=f2e338]: Recommendations
              - heading "What people say about working with me" [level=2] [ref=f2e342]
            - link "See on LinkedIn" [ref=f2e343]:
              - /url: https://www.linkedin.com/in/irina-zhuravleva-23576925b/details/recommendations/
          - generic [ref=f2e347]:
            - article [ref=f2e348]:
              - generic [ref=f2e350]:
                - strong [ref=f2e351]: Vladislav Ishkov
                - text: Lead Test Automation Engineer, Quantori
              - paragraph [ref=f2e352]: “What truly sets Irina apart is her exceptional ability to grow — fast. She consistently stays ahead of the curve, picking up new technologies, frameworks, and tools with remarkable speed and turning them into real, production-ready solutions almost immediately.”
              - generic [ref=f2e353]: LinkedIn recommendation
            - article [ref=f2e358]:
              - generic [ref=f2e360]:
                - strong [ref=f2e361]: Morgan Rodgers
                - text: Senior Software Engineer, PreventionGenetics
              - paragraph [ref=f2e362]: “Irina quickly got up to speed on the quirks of our code base and processes, and she was consistently able to adapt and grow as the project evolved. She became the backbone of our manual and automated end to end testing efforts, and her work with Playwright and TypeScript gave our team confidence in the apps that we were shipping.”
              - generic [ref=f2e363]: LinkedIn recommendation
        - region [ref=f2e368]:
          - generic [ref=f2e369]:
            - paragraph [ref=f2e370]: Repositories
            - heading "Published QA automation work" [level=2] [ref=f2e374]
          - generic [ref=f2e375]:
            - link "QA Playground repository" [ref=f2e376]:
              - /url: https://github.com/IrinaZhuravleva/qa-playground/tree/main/tests/ui-elements-practice
              - generic [ref=f2e377]:
                - generic [ref=f2e378]: Playwright / TypeScript / GitHub Actions / Allure / Docker
                - heading "QA Playground" [level=3] [ref=f2e379]
                - paragraph [ref=f2e380]: "Playwright + TypeScript test suite with two parts. UI E2E: a hosted UI-elements practice page, run across Chromium, Firefox and WebKit. AI evals (Resume Refactor): an LLM app that rewrites a resume for a job description, tested with a golden set, deterministic checks (fact preservation, no invented skills, prompt injection, edge cases) and an LLM-as-judge with a rubric, calibrated on known good and bad rewrites. Nightly and per-PR GitHub Actions runs, plus an Allure dashboard with pass/fail history."
            - link "Tech Daily repository" [ref=f2e384]:
              - /url: https://github.com/IrinaZhuravleva/tech-daily
              - generic [ref=f2e385]:
                - generic [ref=f2e386]: Python / Playwright / TypeScript / GitHub Actions / GitHub Pages
                - heading "Tech Daily" [level=3] [ref=f2e387]
                - paragraph [ref=f2e388]: "Personal news feed that collects articles from 15 RSS sources (AI, security, testing, development), sorts them into categories, and publishes a searchable, filterable page to GitHub Pages every day. Playwright + TypeScript E2E tests run against mocked data for stable results: filters and counters, search, empty and error states, image fallback, and a mobile layout check, plus a contract test for the real scraped data. The tests run in GitHub Actions before each deploy, so a failing test blocks publishing."
            - link "Flashcards Words repository" [ref=f2e392]:
              - /url: https://gitlab.com/IrinaZhuravleva/english-flashcards
              - generic [ref=f2e393]:
                - generic [ref=f2e394]: React / TypeScript / Python / Playwright / Allure
                - heading "Flashcards Words" [level=3] [ref=f2e395]
                - paragraph [ref=f2e396]: Vocabulary flashcards app with React, Vite, and TypeScript, covered by Python + Playwright E2E tests, Allure results, and GitLab CI deploy/rollback jobs.
        - region [ref=f2e400]:
          - generic [ref=f2e401]:
            - paragraph [ref=f2e402]: Articles
            - heading "Published writing" [level=2] [ref=f2e406]
          - generic [ref=f2e407]:
            - link "How Spotify scales code health across 190,000 repos with always-on rewrites and AI Oct 16, 2026 Published" [ref=f2e408]:
              - /url: https://medium.com/@iravizion/how-spotify-scales-code-health-across-190-000-repos-with-always-on-rewrites-and-ai-c7e78bf801b5
              - generic [ref=f2e412]:
                - heading "How Spotify scales code health across 190,000 repos with always-on rewrites and AI" [level=3] [ref=f2e413]
                - paragraph [ref=f2e414]: Oct 16, 2026
              - generic [ref=f2e415]: Published
            - 'link "Building a software factory: how Uber is re-architecting engineering around AI agents Oct 13, 2026 Published" [ref=f2e419]':
              - /url: https://medium.com/@iravizion/building-a-software-factory-how-uber-is-re-architecting-engineering-around-ai-agents-41c2ce2474cb
              - generic [ref=f2e423]:
                - 'heading "Building a software factory: how Uber is re-architecting engineering around AI agents" [level=3] [ref=f2e424]'
                - paragraph [ref=f2e425]: Oct 13, 2026
              - generic [ref=f2e426]: Published
            - link "How Meta replaced code freezes with risk-aware gating and landed more changes with fewer outages Oct 12, 2026 Published" [ref=f2e430]:
              - /url: https://medium.com/@iravizion/how-meta-replaced-code-freezes-with-risk-aware-gating-and-landed-more-changes-with-fewer-outages-3848e8aa35ac
              - generic [ref=f2e434]:
                - heading "How Meta replaced code freezes with risk-aware gating and landed more changes with fewer outages" [level=3] [ref=f2e435]
                - paragraph [ref=f2e436]: Oct 12, 2026
              - generic [ref=f2e437]: Published
          - button "Read more" [ref=f2e441]
        - generic [ref=f2e442]:
          - generic [ref=f2e443]:
            - paragraph [ref=f2e444]: Available for QA automation roles
            - heading "Let’s talk about practical, maintainable test coverage." [level=2] [ref=f2e445]
          - generic [ref=f2e446]:
            - link "LinkedIn" [ref=f2e447]:
              - /url: https://www.linkedin.com/in/irina-zhuravleva-23576925b/
            - link "Medium" [ref=f2e452]:
              - /url: https://medium.com/@iravizion
            - link "GitHub" [ref=f2e455]:
              - /url: https://github.com/IrinaZhuravleva
          - paragraph [ref=f2e459]: © 2026 Irina Zhuravleva. All rights reserved.
  - group "Resume Refactor (AI) Example" [ref=e173]:
    - iframe [ref=e175]:
      - generic [ref=f3e1]:
        - heading "Resume Refactor" [level=1] [ref=f3e2]
        - paragraph [ref=f3e3]: Paste your resume and a job description. The model rewrites the resume for that job.
        - note [ref=f3e4]: "Demo mode: no model server, answers are generated by a mock."
        - generic [ref=f3e5]:
          - generic [ref=f3e6]:
            - generic [ref=f3e7]: Resume
            - textbox "Resume" [ref=f3e8]:
              - /placeholder: Paste your resume
          - generic [ref=f3e9]:
            - generic [ref=f3e10]: Job description
            - textbox "Job description" [ref=f3e11]:
              - /placeholder: Paste the job description
        - button "Refactor" [ref=f3e12]
        - status
        - alert
        - heading "Result" [level=2] [ref=f3e13]
```

# Test source

```ts
  1  | import { test, expect } from '@playwright/test';
  2  | import { PracticePage } from './pages/PracticePage';
  3  | 
  4  | test.describe('Web Table Example', () => {
  5  |   test.beforeEach(async ({ page }) => {
  6  |     await new PracticePage(page).goto();
  7  |   });
  8  | 
  9  |   test('has the expected header columns', async ({ page }) => {
  10 |     const practice = new PracticePage(page);
  11 | 
  12 |     await expect(practice.coursesTable.locator('tr').first().locator('th')).toHaveText([
  13 |       'Instructor',
  14 |       'Course',
  15 |       'Price',
  16 |     ]);
  17 |   });
  18 | 
  19 |   test('lists 10 courses, all by the same instructor', async ({ page }) => {
  20 |     const practice = new PracticePage(page);
  21 | 
  22 |     await expect(practice.coursesTableRows).toHaveCount(10);
  23 | 
  24 |     const instructors = await practice.coursesTableRows.locator('td:first-child').allTextContents();
  25 |     for (const instructor of instructors) {
> 26 |       expect(instructor).toBe('Rahul Shetty');
     |                          ^ Error: expect(received).toBe(expected) // Object.is equality
  27 |     }
  28 |   });
  29 | 
  30 |   test('contains a known course at the expected price', async ({ page }) => {
  31 |     const practice = new PracticePage(page);
  32 | 
  33 |     const jmeterRow = practice.coursesTableRows.filter({ hasText: 'JMETER' });
  34 |     await expect(jmeterRow).toHaveCount(1);
  35 |     await expect(jmeterRow.locator('td').last()).toHaveText('25');
  36 |   });
  37 | 
  38 |   test('the free resume-writing course is priced at 0', async ({ page }) => {
  39 |     const practice = new PracticePage(page);
  40 | 
  41 |     const resumeRow = practice.coursesTableRows.filter({ hasText: 'QA Resume' });
  42 |     await expect(resumeRow.locator('td').last()).toHaveText('0');
  43 |   });
  44 | });
  45 | 
```