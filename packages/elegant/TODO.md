-- GO Live --

 - update docs for v4 .. see below items

    - continue into the Elegant CMS section
        - show new welcome screen
            --> Welcome should require db, auth, and r2 ... The docs should point to those pages for setting up

        - document the root admin set up

    - prisma
        - document setting up prisma, upgrades, etc.

        - document launching to production ... The db is gonna need to be migrated
        -- document setting up the db url key in github --> https://www.prisma.io/docs/orm/prisma-client/deployment/deploy-database-changes-with-prisma-migrate --> https://docs.github.com/en/actions/security-for-github-actions/security-guides/using-secrets-in-github-
        



    - tiptap

    - full-stack next.js

    - cloudflare r2
        - document setting up r2 in the readme
            - document that user needs to add their production urls to the cors policy for production

    - add a supabase page.. Add it to the nav
        - show how to configure the project to work with supabase

    - add a neon page ---> Do the same from above

    - document enabling vercel analytics and turning it on for your project




     - create a new "Getting Started" video for v4.0 for the installation page.


- add a .env secret check to the admin panel; show welcome if it doesn't exist

 - add v4 url to .com version selector

 - create a 4.0.0 alpha release

 - make announcement about it and new changes

 - set v4 as the default branch

- migrate and update any homepage and other static page content from .com such as pricing page
    - migrate any header footer content

- update release notes and upgrade guide.

--- Post live --

- task list css is not loading on a new line 

- look at the image blur url stuff in vercels code
-- take a look at vercels pages using generate static params with db getters

- add a newsletter signup page like mankini.. Include note to check the email for confirmation like laravel news does
- create newsletter signup success page.

- test google analytics and vercel analytics on production urls

- no auth token set in the env will break things.. You can log in and stuff, but the backend throws errors

- respond to people on GH.. Look at how prisma does it

- figure out production migrations.. update the supabase url in GH

- when launching elegantframework.com-v4 to production; I wasn't shown the welcome page when I hadn't configured R2 yet.


- ensure that the project builds locally when you set up a new database that hasn't had any migrations pushed to it yet.. Currently throwing an error during build because it is trying to look at the users table, but that table doesn't exist yet  ... Could a try catch fix this?



- prerender and download the content for static rendering using the isr functions

- set seo metadata
    - all of the jsonid tags from the old layout files need to be migrated
    - update the existing SEO component to use the new metadata code instead of nextseo?

- it would be cool to set seo metadata in the layout.tsx file dynamically from database driven content that is set in the admin/settings panel; such as twitter url, and other info.. Similar to how the author seo content is powered.




- verify the below if now still an issue
    - i was able to accidentally session stuff by having a session already in production set, and then running a migration that dumped the db and forced the setup of a new site .. The old session kept me logged in; but blank data was loaded

-- Elegant 5 should update the cli
    - create a 'create-elegant-app' package like next.js
    -  cli should be able to take args to install repos or core example package that we create such as the current docs theme, a launch theme, etc.