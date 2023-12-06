import { useLocation, Link } from "react-router-dom"
import capitalize from "../utils/capitalize"


export default function Breadcrumbs({name}:{name:string | null}) {
  const location = useLocation()

  let currentLink = ''
  let crumbName
  const crumbs = location.pathname.split('/')
    .filter(crumb => crumb !== '')
    .map((crumb,i) => {
      if(i === 1){
        crumbName = capitalize(name)
      }else{
        currentLink += `/${crumb}`
        crumbName = capitalize(crumb)
      }
      
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