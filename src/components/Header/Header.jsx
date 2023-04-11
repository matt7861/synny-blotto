import { Link } from "gatsby"
import React from "react"
import logo from "../../images/synny-blotto-logo.png"
import { useMenuQuery } from "../../hooks/useMenuQuery"

export const Header = () => {
  const { site, wpMenu } = useMenuQuery()

  return (
    <header>
      <Link to="/">
        <img src={logo} alt={site.siteMetaData} />
      </Link>

      <ul>
        {wpMenu.menuItems.nodes.map(menuItem => (
          <li key={menuItem.id}>
            <Link to={menuItem.uri}>{menuItem.label}</Link>
          </li>
        ))}
      </ul>
    </header>
  )
}
