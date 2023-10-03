

const accountSignUp = () => {
    return(
           <form> 
              <label>
                  First Name
                  <input id="sign-up-first-name"/>
              </label>
              <label>
                  Last Name
                  <input id="sign-up-last-name"/>
              </label>
              <label>
                  Email
                  <input className="sign-up-email"/>
              </label>
              <label>
                  Password
                  <input className="sign-up-password"/>
              </label>
          </form>
    )
}

export default accountSignUp