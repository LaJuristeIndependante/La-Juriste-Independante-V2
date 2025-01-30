/** @type {import('next-sitemap').IConfig} */
const config = {
    siteUrl: "https://www.lajuristeindependante.com",
    generateRobotsTxt: true,
    sitemapSize: 5000,
    changefreq: "daily",
    priority: 0.7,
    exclude: ["/admin", "/dashboard"],
    robotsTxtOptions: {
        policies: [
            { userAgent: "*", allow: "/" },
            { userAgent: "*", disallow: ["/admin", "/dashboard"] },
        ],
    },
};

module.exports = config;
