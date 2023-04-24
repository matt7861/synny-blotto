import React from "react"
import { useFooterQuery } from "../../hooks/useFooterQuery"
import { isInternalLink } from "../../hooks/isInternalLink"
import { Link } from "gatsby"

export const Footer = () => {
  const {
    wp: {
      acfOptionsThemeOptions: {
        options: { linkColumn },
      },
    },
  } = useFooterQuery()

  return (
    <div>
      {linkColumn?.map((column, index) => (
        <div key={index}>
          <h3>{column.title}</h3>
          <ul>
            {column.links?.map((linkItem, linksIndex) => (
              <li key={linksIndex}>
                {isInternalLink(linkItem.link.url) ? (
                  <Link to={linkItem.link.url}>{linkItem.link.title}</Link>
                ) : (
                  <a
                    href={linkItem.link.url}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    {linkItem.link.title}
                  </a>
                )}
              </li>
            ))}
          </ul>
        </div>
      ))}
    </div>
  )
}
