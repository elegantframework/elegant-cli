~~~~~~> To Launch 1.2
    

- write 2 blogs posts.. One documenting the first docusauras launch.. announcing with a screenshot before migration to 1.2
    - 2nd blog post announces 1.2

- create a splash landing page

- update build-rss.js

- update footer links.. remove any tw references

- do a code scan for tw and delete

- update primary blue to match new purple?

~~~~~~> Post launch

- add back the brand policy generator page

- Reenable algolia search.. Write a doc on how to use algolia with elegant

- Reenable blog email signup.. Write a doc on how to connect that service up

- Re enable versioning.. Write a doc on how to use versioning

- Re add cypress and e2e testing back

~~~~~~~ General

- make docs sidebar links collapsible like laravel.com

- add links to the footer.. Add env vars for the values

- add built with elegant link to blog

- make the trademark page dynamic with env variables

- find more content to swap out for env variables

- remove any references to TW

- add e2e test that verify's the index, docs, and blog pages load



- Remove useless code

- create a proper meta head component and insert it into the index page

- Upgrade eslint and all other packages to their latest

- move components to a proper nextjs format. Do need a layout and header folder?

- Upgrade components to tsx, write tests



POST Features to add and blog how to's

- Next PWA
- Next offline mode
- Sitemaps . doc on submitting to webmaster tools
- GA
- Plausible
- Next blogging with comments
- Terms of service template
- Privacy Policy template for GDPR
- Blog comments from the next demo repos



IH Feedback -

    - add mailchimp connection
    - checkout ghost blogging - Open source, has a bunch of neat features
    - tina could provide a cms ui admin panel for us
    - research hugo and astro for docs
    - research hashnode
    - research https://versoly.com/ more... Maybe we can link up?
    - checkout buffer to schedule social media posts

Dang feedback - Landing page isn't clear to users what our product is




~~~~~~~~~> Review and delete

    - set up demo.elegant site?

    - update the main readme file with some better looking content.. A screenshot... Currently dull and boring

    - Add a main readme to the Elegant github page

~~~~~~~~~~~~>

- document how I created the logo?

- document using the pwa icons generator

- update the seo title of the docs site.. Look at env vars, name and description.. We could do Hello World - Elegant - The CMS framework 

    - Write up a final doc of deploying to Vercel with screenshots
        - Move the images to a final dir in the project.. Consult the fillify docs for why the folder is named the way it is.. Has to do with the redirects

- Set up and post on ih... Post on startup school.. Post on medium

- Document how a user creates a new doc file

- Create an e2e test that goes to the local host url and verifys the doc exists.. This help validate any future upgrades

- List some inital features of v1 under the Why Elegant tab


- Add the doc footer back.. Add NPM, IH, and GitHub links for now as placeholders

- Write a doc on jest testing.. (Since this is a feature of Elegant, and not included in docusaurus)

- Expand on the idea in the docs that Elegant is SEO friendly, lightining fast, and cheap and easy to host.

- Figure out how to take args.. --docs blog
- No args is a full basic scaffold

- Add args to docs init cli command.. --demo for a small amount of docs, --full for all the docs

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

- Blog on medium





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