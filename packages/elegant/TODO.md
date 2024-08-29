
- finish the docs /docs/[] page
    - finish sidebar
    - finish navigation menu

- fix prose not loading dark mode fonts and auto link heading svg images on posts

- add mobile nav back to frontend header

- discard button on post needs to do something.

- existing post on save should reload the url

- add pageviews to main blog articles list page

- add tags to the blog frontend

- add a newsletter signup page like mankini.. Include note to check the email for confirmation like laravel news does
- create newsletter signup success page.

- we need to kick a new build off somehow or purge the vercel cache when new content is published

- ensure that the project builds locally when you set up a new database that hasn't had any migrations pushed to it yet.. Currently throwing an error during build because it is trying to look at the users table, but that table doesn't exist yet  ... Could a try catch fix this?

- create an auto ci/cd migration script --> https://www.prisma.io/docs/orm/prisma-client/deployment/deploy-database-changes-with-prisma-migrate

- document setting up r2 in the readme
    - document that user needs to add their production urls to the cors policy for production
- document prisma
    - document setting up prisma, upgrades, etc.
    - document prisma studio
- document setting up auth.js and the env encryption key
- document launching to production ... The db is gonna need to be migrated


- finish adding error handling to admin onboard field

- set seo metadata
    - all of the jsonid tags from the old layout files need to be migrated
    - update the existing SEO component to use the new metadata code instead of nextseo?

- rss feed
- sitemap

- fix dark mode.. It should match the demo site

- delete next.svg logo

- add google analytics back

- admin navigation lock?


- add some initial dashboard functionality
    - a welcome message to a new user


-- Elegant 5 should update the cli
    - create a 'create-elegant-app' package like next.js
    -  cli should be able to take args to install repos or core example package that we create such as the current docs theme, a launch theme, etc.