const preventScroll = (event: TouchEvent) => {
    event.preventDefault();
  }; 
  
  const disableScrollModal = (modal:boolean) => {
    const body = document.querySelector("body")
    if(body){
        body.style.overflow = modal ? 'hidden' : 'visible';
        modal ? body.addEventListener("touchmove", preventScroll, { passive: false }) : body.removeEventListener("touchmove", preventScroll)
       
    }
    return () => {
      document.body.removeEventListener("touchmove", preventScroll)
    }
  }

export default disableScrollModal