- Create an e2e test that goes to the local host url and verifys the doc exists.. This help validate any future upgrades

- Finish the install doc.
    - At the end of the doc, pick back up with 'Next, you're ready to [start taking your next steps into the Laravel ecosystem](#next-steps). '

    - Follow into a config section. Document how we use .env files .... Do we need to consider next here?

    - Document how a user creates a new doc file


- List some inital features of v1 under the Why Elegant tab

- Create some inital docs

    - Prologue - dir
        - Release Notes
        - Contribution guide
    - Getting Started - dir
        Installation.md
        Configuration


~~~~~~~~~> To offically release v1-alpha

    - Finish install doc
    - Write method to take a --dir arg on init
    - Install and configure jest intergration test
    - Write test to init the docs.. Use the arg above to set and destory the test doc during testing
x`
    - Features that would be nice, but not required are below
        - Add versioning
        - Add a github build step
        - Have the build verified as passing
        - Add a badge and other bling to the repo readme's

    - Create an official github release

~~~~~~~~~~~~>


- Figure out how to take args.. --docs blog
- No args is a full basic scaffold

- Add args to docs init cli command.. --demo for a small amount of docs, --full for all the docs

- Write some tests for the initial cli command? To verify it's good and put a build status on the repo

- Add jest to the e2e testing to the docs piece?

-- DOCUMENT THE DOCS FEATURES!!! How to create pages and stuff. How to set and change config

- Add sitemap config to docusarus
- Add google analytics config to docusarus
- Add doc versions
- Add site translations
- Add algolia config

- Enable doc versions.
    - Go back and update any doc links to use the versioning url
    - Document how a user would set up their own versioning 

- Set up site translations
    - Document how a user would set up translations

- Take a look back at the example docusaurus docs site, and bring over alot of those features.. How to update your site, the category.json file, markdown features.

- A regular docs init command should download our docs site, but a summarized version of the docs as an example for devs
    - THe docusarus built site should have our Elegant Readme


- Add built in 508 compliance and testing  - Axe, Jest, Storybook.. Use Aria-labels

- Update docusarus cli commands to be elegant commands
- Use docusaurus dev build and other cli commands
- Document those cli commands





- Document full features included out of the box in the future

    - Perfect SEO score 100
    - Instant Loading
    - Low hosting costs
    - 100% uptime and availability
    - Preview urls (Vercel)
    - 100% responsive design. Mobile/ Desktop friendly
    - Works on any device, any browser
    - Built in sitemaps
    - Built in Google Analytics support