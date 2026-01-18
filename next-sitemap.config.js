/** @type {import('next-sitemap').IConfig} */
module.exports = {
  siteUrl: 'https://www.comparefi.in', // strictly use the www version
  generateRobotsTxt: true,

  exclude: [
    '/admin',
    '/admin/*',
    '/api/*',
  ],

  robotsTxtOptions: {
    policies: [
      {
        userAgent: '*',
        allow: '/',
        disallow: ['/admin', '/api'],
      },
    ],
  },
};