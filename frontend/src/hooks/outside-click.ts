import { useEffect, useRef } from "react";


const useOutsideClick = (callback:() => void) => {
    const ref = useRef<HTMLDivElement | HTMLFormElement>(null)
  
    useEffect(() => {
    const handleClick = (event:MouseEvent) => {
        if (ref.current && !(ref.current as HTMLDivElement).contains(event.target as Node)) {
            callback()
        }
    }
            document.addEventListener('click', handleClick,true)
    
            return () => {
                document.removeEventListener('click', handleClick,true)
            }
        }, [callback])
    
        return ref;
    }
    export default useOutsideClick

