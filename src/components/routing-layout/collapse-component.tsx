import { useState,useRef } from "react";

interface Props{
    label:string,
    children?:React.ReactNode
}
const Collapse = ({label,children}:Props) => {

    const [open, setOPen] = useState(false);
    const contentRef = useRef<HTMLDivElement>(null);

    const toggle = () => {
        setOPen(!open);
      };
      
      return (
        <div className="info-links">
          <button onClick={toggle}><h3>{label}</h3></button>
            <div className="content-parent"
            ref={contentRef} style={open ? { height: (contentRef.current && (contentRef.current.scrollHeight + 30)) +"px" } : { height: "0px" }}>
            <div className="content">{children}</div>
            </div>
        </div>
      );
}

export default Collapse