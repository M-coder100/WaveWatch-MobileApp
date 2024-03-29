import { IoOptionsOutline } from "react-icons/io5";
import "./styles.css";
import { useEffect, useRef, useState} from "react";

const Tank = ({ tankDetails, percentage, isScrolled }) => {
    const name = tankDetails.name;
    const tagName = tankDetails.tagName;
    const heightCM = tankDetails.heightCM;
    const diameterCM = tankDetails.diameterCM;
    const maxLiters = tankDetails.maxLiters;
    const isMainTank = tankDetails.isMainTank;

    const conicProgressRef = useRef(null);
    const progressBarRef = useRef(null);
    const tankRef = useRef(null);
    let [isContentLoaded, setIsContentLoadedState] = useState(false);

    useEffect(() => {
        conicProgressRef.current.style = `background: conic-gradient(#0099ff, #0400ff ${percentage / 100 * 360}deg, #1d1e22 0deg)`;
        progressBarRef.current.style.width = `${percentage}%`;
        if (!isMainTank) {
            tankRef.current.classList.add("minimal");
        }
        tankRef.current.onclick = () => {
            tankRef.current.classList.toggle("minimal")
        }

        if (isMainTank && isContentLoaded) {
            if (isScrolled) {
                tankRef.current.classList.add("minimal");
            } else {
                tankRef.current.classList.remove("minimal");
            }
        } else {
            setIsContentLoadedState(true);
        }
    }, [tankDetails, isScrolled]);

    return (
        <div className="tankDetails" ref={tankRef} id={isMainTank ? "mainTank" : ""}>
            <div className="infoUpper">
                <div>
                    <span className="tankName">{name}</span>
                    <span className="tankTagName">{tagName}</span>
                </div>
                <button className="moreOptions"><IoOptionsOutline /></button>
            </div>
            <div className="waterPercentage" ref={conicProgressRef}>
                <div><h3 id="waterLevelPercentage">{percentage}</h3>%</div>
                <h4>Filled</h4>
                <div className="minimal">
                    <div id="waterLevelPercentage" className="progressBar" ref={progressBarRef}></div>
                </div>
            </div>
            <div className="waterFlowDetails">
                {
                    (heightCM && diameterCM) ?
                        <>
                            <div><span className="waterLevelInfoValue"><span id="waterLevelLiters">836</span>Liters</span> / <span id="waterLevelMaxLiters">{maxLiters}</span>L</div><div><span className="waterLevelInfoValue"><span id="waterLevelFlowRate">94</span>cm/s</span> Flow rate</div>
                        </> : <span style={{ "textAlign": "center", "color": "yellow" }}>Set tank measurements to get liters and other readings.</span>
                }
            </div>
        </div>
    );
};

export default Tank;
