const preventScroll = (event: TouchEvent) => {
    event.preventDefault()
  }; 
  
  const disableScrollModal = (modal:boolean) => {
    const body = document.querySelector("body")
    const signUpForm = document.querySelector('.sign-up-form-scroll')
    if(body){
        body.style.overflow = modal ? 'hidden' : 'visible';
        modal ? body.addEventListener("touchmove", preventScroll, { passive: false }) : body.removeEventListener("touchmove", preventScroll)
        if (signUpForm){
          signUpForm.removeEventListener("touchmove", preventScroll)
        }
       
    }
    return () => {
      document.body.removeEventListener("touchmove", preventScroll)
    }
  }

export default disableScrollModal