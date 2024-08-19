<p align="center">
  <a href="https://www.elegantframework.com">
    <picture>
      <img src="https://github.com/elegantframework/elegant-cli/assets/10189130/742ed0af-bdd7-4d97-83e1-0530f7bed34a" height="200">
    </picture>
    <h1 align="center">Elegant</h1>
  </a>
</p>

<p align="center">
  <a href="https://www.npmjs.com/package/elegant-cli">
    <img src="https://img.shields.io/npm/v/elegant-cli.svg?style=flat" alt="npm version">
  </a>
  <a href="https://github.com/elegantframework/elegant/actions">
    <img src="https://github.com/elegantframework/elegant/actions/workflows/install_and_test_elegant_core.yml/badge.svg" alt="Build Status">
  </a>
  <a href="https://github.com/facebook/jest">
    <img src="https://img.shields.io/badge/tested_with-jest-99424f.svg" alt="Tested with Jest">
  </a>
  <a href="LICENSE.md">
    <img src="https://img.shields.io/packagist/l/laravel/framework" alt="License">
  </a>
  <a href="CONTRIBUTING.md#pull-requests">
    <img src="https://img.shields.io/badge/PRs-welcome-brightgreen.svg" alt="PRs Welcome">
  </a>
  <a href="https://discord.gg/PwY38x4uvV">
    <img src="https://img.shields.io/discord/1115406043766329344.svg" alt="Discord Chat" />
  </a>
</p>

**Build SEO-friendly websites, super fast full-stack web applications, and much more with Elegant.**


**👩🏻‍💻 Developer Ready**: An all-in-one web application and blogging solution. All the features you need are included right out of the box.

**💰 Simple Hosting**: Deploy your application on the latest and most affordable serverless tech. No need for any complicated server setups or vendor-locked services.

**🖼️ Content Creation**: Create amazing content with a next-level rich text editor. Perfect for writing blog posts, user guides, and documentation.

**✅ Professional Themes**: Use our professionally crafted themes that are built with Tailwind CSS, or create your own.

**📡 3rd Party Services**: Connect up your favorite services and grow your audience. Analytics services, Newsletter Subscription providers, and more. 

---

## Table of Contents

- [What is Elegant?](#what-is-elegant)
- [Screenshot](#screenshot)
- [Demo](#demo)
- [Features](#features)
- [Install](#install)
- [Hosting and Deployments](#deploying)
- [Creating Content](#creating_content)
- [Growing Your Audience](#growing_your_audience)
  - [Analytics](#analytics)
  - [Newsletter Subscriptions](#newsletter_subscriptions)
- [Core Features](#core_features)
  - [Database Support](#database_support)
  - [Sitemaps](#sitemaps)
  - [Robots.txt](#robots_txt)
  - [Rich Snippets](#rich_snippets)
- [Full Documentation](#documentation)
- [Community](#community)
- [Contributing](#contributing)
  - [Feature Suggestions](#feature_suggestions)
  - [Reporting Issues](#reporting_issues)
  - [Good First Issues](#good_first_issues)
- [Stay Up-To-Date](#stay_up_to_date)
- [License](#license)

## <a name="what-is-elegant">What is Elegant?</a>

Elegant is a community-driven project for building, deploying, and maintaining websites easily. 

Built with Next.js, Tailwind CSS, TipTap, and more. Elegant is perfect for blogging, documentation websites, or just about any type of web application.

## <a name="screenshot">Screenshot</a>

![ezgif-2-2b841a89fd](https://github.com/elegantframework/elegant-cli/assets/10189130/74001fe1-b6ae-46ad-b736-164df13fea22)

## <a name="demo">Demo</a>

**With Base Theme**

Online Demo: [https://demo.myelegant.app/](https://demo.myelegant.app/)

Admin Demo: [https://demo.myelegant.app/admin](https://demo.myelegant.app/admin)

## <a name="features">Features</a>

-     Postgres for a database.
-     Works with Vercel Storage, Neon, Supabase, and more.
- 📊 Prisma as our ORM.
- 🔤 100% written in TypeScript.

## <a name="install">Install</a>

To get started using Elegant, simply install our CLI tool:

```
npm install elegant-cli
```

Next, run the initialization command to create your website:
```
npx elegant-init
```

Visit [https://www.elegantframework.com/docs/installation](https://www.elegantframework.com/docs/installation) for the complete installation guide.

## <a name="deploying">Hosting and Deployments</a>

Deploying your Elegant application to production is a breeze with Vercel or any other serverless hosting provider.

Because Elegant is built with the lightweight Next.js framework, your application will run ultra-fast, and at the most affordable monthly hosting costs.

Read the full [Elegant Deployment Guide](https://www.elegantframework.com/docs/deployment).

## <a name="creating_content">Creating Content</a>

Elegant gives you complete control over your content creation experience with an included content editor for creating and editing documents.

![elegant_content_editor-U4MT](https://github.com/elegantframework/elegant-cli/assets/10189130/a7118506-2a1d-4e60-81e4-9e55edced2df)

The content editor is where you will write content, add images, and links, and even embed YouTube videos.

Read the complete guide on [Creating Content here](https://www.elegantframework.com/docs/creating-content#writing-content).

## <a name="growing_your_audience">Growing Your Audience</a>

We have taken care of most of the boilerplate setup code needed to launch the perfect web application so that you can focus on what is important to you.

Growing your audience is simple with our included native integrations into the most commonly used 3rd party services.

### <a name="analytics">Analytics</a>

Track your website traffic, and measure your traffic sources to understand which marketing and social channels are most effective.

Google Analytics is automatically configured with all new Elegant applications, so you can start tracking your web application user traffic immediately.

To start using Google Analytics with your Elegant application, simply provide a Google Analytics ID string to the NEXT_PUBLIC_GOOGLE_ANALYTICS_ID environment variable in your .env file.

```
NEXT_PUBLIC_GOOGLE_ANALYTICS_ID="G-4G410MD92K"
```

### <a name="newsletter_subscriptions">Newsletter Subscriptions</a>

Elegant makes it easy to grow your email subscriber lists with included newsletter sign-up templates, and native subscription services.

ConvertKit is automatically configured with all new Elegant applications so you may start using it immediately. 

If you are interested in using ConvertKit with your Elegant application, you may simply provide an action URL string to the NEXT_PUBLIC_CONVERTKIT_ACTION_URL environment variable in your .env file.

```
NEXT_PUBLIC_CONVERTKIT_ACTION_URL="https://app.convertkit.com/forms/21224410/subscriptions"
```

## <a name="core_features">Core Features</a>

### <a name="database_support">Serverless Database Support</a>


### <a name="sitemaps">Sitemaps</a>

A sitemap is a special file that helps search engines like Google understand the structure of a website. It’s like a map that shows all the pages on a website and how they’re connected to each other.

Elegant is configured right out of the box to generate a sitemap.xml file for your web application automatically.

To learn more, view the complete [Sitemap Guide Here](https://www.elegantframework.com/docs/sitemaps). 

### <a name="robots_txt">Robots.txt</a>

A robots.txt file is a simple text file that tells search engine crawlers which parts of your web application they are allowed to access and index.

Elegant is configured right out of the box to generate a robots.txt for your web application automatically.

Below is a snippet of our robots.txt for our documentation website.

```
# *
User-agent: *
Allow: /

# Host
Host: https://www.elegantframework.com

# Sitemaps
Sitemap: https://www.elegantframework.com/sitemap.xml
```

To learn more, view the complete [Robots.txt Guide Here](https://www.elegantframework.com/docs/robots-txt). 

### <a name="rich_snippets">Rich Snippets</a>

Rich snippets are a way to provide additional information about a webpage to search engines, like Google, so that they can better understand the content and context of the page. This information can then be displayed in search engine results, making it easier for users to understand what the page is about and whether it’s relevant to their search query.

We have built Elegant to automatically add the most essential [Rich Snippets](https://www.elegantframework.com/docs/rich-snippets) to your web pages.

## <a name="documentation">Full Documentation</a>

You can find the complete version of the Elegant documentation at [https://elegantframework.com/docs](https://elegantframework.com/docs)

## <a name="community">Community</a>

The Elegant community can be found on [GitHub Discussions](https://github.com/orgs/elegantframework/discussions), where you can ask questions, voice ideas, and share your projects.

To chat with other community members you can join the [Elegant Discord](https://discord.gg/PwY38x4uvV).

Our [Code of Conduct](https://github.com/elegantframework/elegant-cli/blob/v2.3/CODE_OF_CONDUCT.md) applies to all Elegant community channels.

## <a name="contributing">Contributing</a>

We've built Elegant because we feel that developers should be more empowered to create better websites and content. We hope that other startups and organizations can benefit from the project. We are thankful for any contributions from the community.

If you're interested in contributing to the Elegant project, please read our [contributing docs](https://github.com/elegantframework/docs/blob/main/CONTRIBUTING.md) **before submitting a pull request**.


### <a name="feature_suggestions">Feature Suggestions</a>

Elegant is a community-driven project, and open to all suggestions and ideas that help to empower developers everywhere.

Visit our [Feature Request](https://github.com/elegantframework/elegant-cli/issues/new?assignees=&labels=&projects=&template=feature_request.md&title=) page to submit your feedback.

### <a name="reporting_issues">Reporting Issues</a>

Bugs and user friction are our top priority. If you experience any issues or friction during your experience with Elegant, please submit a [Bug Report](https://github.com/elegantframework/elegant-cli/issues/new?assignees=&labels=&projects=&template=bug_report.md&title=).

### <a name="good_first_issues">Good First Issues</a>

We have a list of [good first issues](https://github.com/elegantframework/elegant-cli/labels/good%20first%20issue) that contain bugs and features that have a relatively limited scope. This is a great place to get started, gain experience, and get familiar with our contribution process.


## <a name="stay_up_to_date">Stay Up-To-Date</a>

The Elegant project is constantly evolving and improving daily. You can keep up and show your support by hitting the **Star** button! We appreciate it! 😊

![support-elegant-with-a-star-on-github](https://github.com/elegantframework/elegant-cli/assets/10189130/28132259-174b-43ac-a850-8437298885be)


## <a name="license">License</a>

The Elegant Framework is open-sourced software licensed under the [MIT license](https://opensource.org/license/mit/).
