import { useStaticQuery, graphql } from "gatsby"

export const useMenuQuery = () => {
  const data = useStaticQuery(graphql`
    query HeaderQuery {
      site {
        siteMetadata {
          title
        }
      }
      wpMenu(name: { eq: "Primary" }) {
        menuItems {
          nodes {
            label
            uri
            parentId
            id
          }
        }
      }
    }
  `)
  return data
}
