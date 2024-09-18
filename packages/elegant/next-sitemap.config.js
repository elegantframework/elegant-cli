/** @type {import('next-sitemap').IConfig} */
module.exports = {
    siteUrl: process.env.NEXT_PUBLIC_APP_URL || "",
    generateRobotsTxt: true,
    exclude: [
        "/admin",
        "*.ico",
       "/server-sitemap.xml" 
    ],
    robotsTxtOptions: {
        additionalSitemaps: [
          `${process.env.NEXT_PUBLIC_APP_URL || ""}/server-sitemap.xml`
        ],
    },
};