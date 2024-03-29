import "./styles.css";
import { useEffect, useRef } from "react";

const Backdrop = ({percentage = 0, isScrolled}) => {
    const wave1 = useRef(null);
    const wave2 = useRef(null);
    const wave3 = useRef(null);
    const wave4 = useRef(null);
    const waves = [wave1, wave2, wave3, wave4];
    const backdropRef = useRef(null);

    useEffect(() => {
        if (!wave1) return;
        waves.forEach(wave => {
            if (isScrolled) {
                backdropRef.current.classList.add("scrolled");
                wave.current.style = `--waterLevelPercentage: ${50}vh`;
            } else {
                backdropRef.current.classList.remove("scrolled");
                wave.current.style = `--waterLevelPercentage: ${percentage}vh`;
            } 
        })

        function scrollHandler() {
            const value = window.scrollY;
            wave1.current.style.backgroundPositionX = 400 + value * 4 + "px";
            wave2.current.style.backgroundPositionX = 300 + value * -4 + "px";
            wave3.current.style.backgroundPositionX = 200 + value * 2 + "px";
            wave4.current.style.backgroundPositionX = 100 + value * -2 + "px";
        }
        setInterval(scrollHandler, 1000);
    }, [wave1, wave2, wave3, wave4, backdropRef, percentage, isScrolled])


    return (
        <div className="waterLevelBackdrop" ref={backdropRef}>
            <div ref={wave1} className="wave" id="wave1" style={{"--i": "1"}}></div>
            <div ref={wave2} className="wave" id="wave2" style={{"--i": "2"}}></div>
            <div ref={wave3} className="wave" id="wave3" style={{"--i": "3"}}></div>
            <div ref={wave4} className="wave" id="wave4" style={{"--i": "4"}}></div>
            <div className="fillUpBG"></div>
        </div>
    )
} 
export default Backdrop;