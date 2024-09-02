- add cache busting and auth
    -- to posts
        - look at the image blur url stuff

    -- take a look at vercels pages using generate static params with db getters



- update r2 to an image storage api route
    - create interface
    - add vercel blob storage as well

- admin sign in page error message doesnt look good in dark mode

- finish the docs /docs/[] page
    - finish sidebar
    - finish navigation menu

- add some initial dashboard functionality
    - a welcome message to a new user on first log in
    - on the initial load of a new site, it should prompt you to create your first collection.
    - if collections exists, look for recent post data
    - if post data exists, so the most recent posts first.. or maybe load the page view data?

- fix prose not loading dark mode fonts and auto link heading svg images on posts

- add mobile nav back to frontend header

- discard button on post needs to do something.

- add pageviews to main blog articles list page
    - pageviews only increment on page refresh.. Won't increment when navigating from the blog list page

- add tags to the blog frontend

- add a newsletter signup page like mankini.. Include note to check the email for confirmation like laravel news does
- create newsletter signup success page.

- ensure that the project builds locally when you set up a new database that hasn't had any migrations pushed to it yet.. Currently throwing an error during build because it is trying to look at the users table, but that table doesn't exist yet  ... Could a try catch fix this?

- create fresh db migration before deploying

- create an auto ci/cd migration script --> https://www.prisma.io/docs/orm/prisma-client/deployment/deploy-database-changes-with-prisma-migrate

- document setting up r2 in the readme
    - document that user needs to add their production urls to the cors policy for production
- document prisma
    - document setting up prisma, upgrades, etc.
    - document prisma studio
- document setting up auth.js and the env encryption key
- document launching to production ... The db is gonna need to be migrated

- prerender and download the content for static rendering using the isr functions

- set seo metadata
    - all of the jsonid tags from the old layout files need to be migrated
    - update the existing SEO component to use the new metadata code instead of nextseo?

- rss feed
- sitemap

- delete next.svg logo

- add google analytics back

- admin navigation lock?



- add better session checking to db calls and admin profile component like the vercel platforms does.. They have a nice looking auth.ts setup that looks extra tight and secure
    - i was able to accidentally session stuff by having a session already in production set, and then running a migration that dumped the db and forced the setup of a new site .. The old session kept me logged in; but blank data was loaded

-- Elegant 5 should update the cli
    - create a 'create-elegant-app' package like next.js
    -  cli should be able to take args to install repos or core example package that we create such as the current docs theme, a launch theme, etc.