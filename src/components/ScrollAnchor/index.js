import { useEffect, useRef } from "react";
import "./styles.css";
const ScollAnchor = ({onclick}) => {
    const anchorRef = useRef(null);

    useEffect(() => {
        anchorRef.current.onclick = onclick;
    }, [anchorRef])
    
    return (
        <a className="scrollAnchor" ref={anchorRef}>
            <svg width="30" height="30" viewBox="0 0 31 30" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M1 29L15.5 20L30 29" strokeWidth="2" style={{ "--i": "1" }} />
                <path d="M1 20L15.5 11L30 20" strokeWidth="2" style={{ "--i": "2" }} />
                <path d="M1 11L15.5 2L30 11" strokeWidth="2" style={{ "--i": "3" }} />
            </svg>
        </a>
    )
}
export default ScollAnchor;