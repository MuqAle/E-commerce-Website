import { Link } from "react-router-dom"

const ErrorPage = () => {

    return(
    <div className="empty">
        <p>Uh Oh! Could Not Find Page</p>
        <button style={{width:'270px'}}><Link to={'/'}>Back To Home Page</Link></button>
    </div>
    )
    
}

export default ErrorPage