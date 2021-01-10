module.exports = {
  siteMetadata: {
    title: `dfaiv-dev`,
    author: {
      name: `dfaiv`,
      summary: ``,
    },
    description: `Dev Notes - Your Mileage May Vary`,
    siteUrl: `https://blog.dfaiv.dev`,
    social: {
      twitter: `[none-yet]`,
    },
  },
  plugins: [
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        path: `${__dirname}/content/blog`,
        name: `blog`,
      },
    },
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        path: `${__dirname}/content/assets`,
        name: `assets`,
      },
    },
    {
      resolve: `gatsby-transformer-remark`,
      options: {
        plugins: [
          {
            resolve: `gatsby-remark-images`,
            options: {
              maxWidth: 630,
            },
          },
          {
            resolve: `gatsby-remark-responsive-iframe`,
            options: {
              wrapperStyle: `margin-bottom: 1.0725rem`,
            },
          },
          {
            resolve: `gatsby-remark-external-links`
          },
          `gatsby-remark-prismjs`,
          `gatsby-remark-copy-linked-files`,
          `gatsby-remark-smartypants`,
        ],
      },
    },
    `gatsby-transformer-sharp`,
    `gatsby-plugin-sharp`,
    {
      resolve: `gatsby-plugin-google-gtag`,
      options: {
        // You can add multiple tracking ids and a pageview event will be fired for all of them.
        trackingIds: [
          "G-WHQ3QKPM3K"
        ],
      },
    },
    `gatsby-plugin-feed`,
    {
      resolve: `gatsby-plugin-manifest`,
      options: {
        name: `dfaiv-dev`,
        short_name: `dfaiv-dev`,
        start_url: `/`,
        background_color: `#ffffff`,
        theme_color: `#ff92fb`,
        display: `minimal-ui`,
        icon: `content/assets/dfaiv-dev-trainglify-01.png`,
      },
    },
    `gatsby-plugin-react-helmet`,
    `gatsby-plugin-netlify`,
    {
      resolve: `gatsby-plugin-disqus`,
      options: {
        shortname: `dfaiv-dev-blog`
      }
    }
    // this (optional) plugin enables Progressive Web App + Offline functionality
    // To learn more, visit: https://gatsby.dev/offline
    // `gatsby-plugin-offline`,
  ],
}
