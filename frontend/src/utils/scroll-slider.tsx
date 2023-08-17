
const scrollBack = (scroll: React.RefObject<HTMLDivElement>) => {
    if(scroll.current){
        scroll.current.scrollLeft -= 500
    }

}

const scrollForward = (scroll: React.RefObject<HTMLDivElement>) => {
    if(scroll.current){
        scroll.current.scrollLeft += 500
    }

}


export {scrollBack,scrollForward} 