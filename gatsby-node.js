/**
 * Implement Gatsby's Node APIs in this file.
 *
 * See: https://www.gatsbyjs.com/docs/reference/config-files/gatsby-node/
 */

/**
 * @type {import('gatsby').GatsbyNode['createPages']}
 */

const path = require("path")

const getTemplatePath = templateType => {
  switch (templateType) {
    case "About Page":
      return path.resolve("./src/templates/aboutPage.jsx")
    case "Faq Page":
      return path.resolve("./src/templates/faqPage.jsx")
    case "Landing Page":
      return path.resolve("./src/templates/frontPage.jsx")
    case "blog":
      return path.resolve("./src/templates/blogPage.jsx")
    case "blog-post":
      return path.resolve("./src/templates/blogPost.jsx")
    default:
      return null
  }
}

exports.createPages = async ({ graphql, actions }) => {
  const { createPage } = actions

  // Query for the page data and the front page data
  const result = await graphql(`
    query {
      allWpPage {
        edges {
          node {
            id
            slug
            template {
              templateName
            }
          }
        }
      }
      allWpPost {
        edges {
          node {
            id
            slug
          }
        }
      }
      frontPage: wpPage(slug: { eq: "landing" }) {
        id
      }
    }
  `)

  // Create pages based on their template type
  result.data.allWpPage.edges.forEach(({ node }) => {
    const templateType = node.template.templateName
    const templatePath = getTemplatePath(templateType)
    if (templatePath) {
      createPage({
        path: node.slug,
        component: templatePath,
        context: {
          id: node.id,
        },
      })
    }
  })

  // Create individual blog post pages
  result.data.allWpPost.edges.forEach(({ node }) => {
    createPage({
      path: `/blog/${node.slug}`,
      component: getTemplatePath("blogPost"),
      context: {
        id: node.id,
      },
    })
  })

  // Create the front page using the landingPageTemplate
  if (result.data.frontPage) {
    createPage({
      path: "/",
      component: path.resolve("./src/templates/frontPage.jsx"),
      context: {
        id: result.data.frontPage.id,
      },
    })
  }
}
