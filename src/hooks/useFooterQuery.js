import { useStaticQuery, graphql } from "gatsby"

export const useFooterQuery = () => {
  const data = useStaticQuery(graphql`
    query FooterLinksQuery {
      wp {
        acfOptionsThemeOptions {
          options {
            linkColumn {
              title
              links {
                link {
                  target
                  title
                  url
                }
              }
            }
          }
        }
      }
    }
  `)
  return data
}
