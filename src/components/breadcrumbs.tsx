import { useLocation, Link } from "react-router-dom"
import capitalize from "../utils/capitalize"

export default function Breadcrumbs() {
  const location = useLocation()

  let currentLink = ''

  const crumbs = location.pathname.split('/')
    .filter(crumb => crumb !== '')
    .map(crumb => {
      currentLink += `/${crumb}`
      
      const crumbName = capitalize(crumb)

      return (
        <div className="crumb" key={crumb}>
            <Link to={currentLink}>{crumbName}</Link>
        </div>
      )
    })

  return (
    <div className="breadcrumbs">
        <Link to={'/'}>Home /</Link>
        {crumbs}
    </div>
  )
}