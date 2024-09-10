/** @type {import('next-sitemap').IConfig} */
module.exports = {
    siteUrl: process.env.NEXT_PUBLIC_APP_URL || "",
    generateRobotsTxt: true,
    exclude: [
        "/admin",
        "*.ico",
       "/server-sitemap-index.xml" 
    ],
    robotsTxtOptions: {
        additionalSitemaps: [
          "/server-sitemap-index.xml"
        ],
    },
};