import { useState,useRef } from "react";

interface Props{
    label:React.ReactNode,
    children?:React.ReactNode
    className:string
}
const Collapse = ({label,children,className}:Props) => {

    const [open, setOpen] = useState(false);
    const contentRef = useRef<HTMLDivElement>(null);

    const toggle = () => {
        setOpen(!open);
      };
      
      return (
        <div className={className}>
          <button onClick={toggle}>{label}</button>
            <div className="content-parent"
            ref={contentRef} style={open ? { height: (contentRef.current && (contentRef.current.scrollHeight + 30)) +"px" } : { height: "0px" }}>
            <div className="content">{children}</div>
            </div>
        </div>
      );
}

export default Collapse