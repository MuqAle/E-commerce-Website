const preventScroll = (event: Event) => {
    event.preventDefault()
  }; 
  
  const disableScrollModal = (modal:boolean) => {
    const body = document.querySelector("body")
    const signUpForm = document.querySelector('.sign-up-form-scroll')

    const scrollHandler: EventListenerOrEventListenerObject = (event) => {
      preventScroll(event)
    } 

    if(body){
        body.style.overflow = modal ? 'hidden' : 'visible';
        modal ? body.addEventListener("touchmove", scrollHandler, { passive: false }) : body.removeEventListener("touchmove", scrollHandler)
        if (signUpForm){
          signUpForm.removeEventListener("touchmove", scrollHandler)
        }
       
    }
    return () => {
      document.body.removeEventListener("touchmove", scrollHandler)
    }
  }

export default disableScrollModal