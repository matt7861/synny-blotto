require("dotenv").config({
  path: ".env",
})

/**
 * @type {import('gatsby').GatsbyConfig}
 */
module.exports = {
  siteMetadata: {
    title: `Synny Blotto`,
    description: `Synny Blotto full site`,
    author: `@matt7861`,
  },
  plugins: [
    {
      resolve: "gatsby-source-wordpress",
      options: {
        // url: process.env.NODE_ENV === 'production' ? PRODUCTION_URL : LOCAL_URL,
        // url: 'http://blank-canvas.local/graphql',
        url: process.env.WPGRAPHQL_URL,
        schema: {
          typePrefix: "Wp", // your prefix
          perPage: 20, // nodes per page
          requestConcurrency: 5,
          previewRequestConcurrency: 2,
          timeout: 90000,
        },
      },
    },
    `gatsby-plugin-image`,
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        name: `images`,
        path: `${__dirname}/src/images`,
      },
    },
    `gatsby-transformer-sharp`,
    `gatsby-plugin-sharp`,
    {
      resolve: `gatsby-plugin-manifest`,
      options: {
        name: `gatsby-starter-default`,
        short_name: `starter`,
        start_url: `/`,
        background_color: `#663399`,
        // This will impact how browsers show your PWA/website
        // https://css-tricks.com/meta-theme-color-and-trickery/
        // theme_color: `#663399`,
        display: `minimal-ui`,
        icon: `src/images/gatsby-icon.png`, // This path is relative to the root of the site.
      },
    },
    {
      resolve: `gatsby-plugin-google-fonts`,
      options: {
        fonts: [`Fira Sans\:300, 400`, `Overpass\:400`],
        display: `swap`,
      },
    },
  ],
}
