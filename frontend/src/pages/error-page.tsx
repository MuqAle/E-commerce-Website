import { Link } from "react-router-dom"


const ErrorPage = () => {

    return(
    <div className="empty">
        <p>Uh Oh! Could Not Find Page</p>
        <Link to={'/'}><button style={{width:'270px'}}>Back To Home Page</button></Link>
    </div>
    )
    
}

export default ErrorPage