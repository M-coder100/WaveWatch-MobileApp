import AppLayout from "./components/AppLayout";
import Tank from "./components/Tank";
import Backdrop from "./components/Backdrop";
import Navbar from "./components/Navbar";
import ScollAnchor from "./components/ScrollAnchor";
import { useEffect, useRef, useState } from "react";

const App = () => {
    let percentage = 76;
    let [isScrolled, setScrollState] = useState(false);
    const tankContainerRef = useRef(null);

    const tankDetails = [
        {
            name: "Tank 1",
            tagName: "Upper Tank",
            isMainTank: true,
            heightCM: 100,
            diameterCM: 60,
            maxLiters: 1000,
            smartFlow: {
                min: 10,
                max: 90,
                tol: 50
            }
        },
        {
            name: "Tank 2",
            tagName: "Bottom Tank",
            isMainTank: false,
            heightCM: 100,
            diameterCM: 60,
            maxLiters: 1000,
            smartFlow: {
                min: 10,
                max: 90,
                tol: 50
            }
        },
        {
            name: "Tank 3",
            tagName: "Not Set",
            isMainTank: false,
            heightCM: 100,
            diameterCM: 60,
            maxLiters: 1000,
        }
    ]
    const options = {
        rootMargin: '0px',
        threshold: 1.0
    }
    const tanks = (
        <div className="tankContainer" ref={tankContainerRef}>
            {
                tankDetails.map((tankDetail, index) =>
                    <Tank
                        tankDetails={tankDetail}
                        key={index}
                        percentage={percentage}
                        isScrolled={isScrolled}
                    />
                )
            }
        </div>
    )

    const callBackFn = entries => {
        const [entry] = entries;
        let scrollAnchor = document.querySelector(".scrollAnchor");
        if (entry.isIntersecting) {
            scrollAnchor.style.display = "block";
            setScrollState(false);
            window.scrollTo(0, 0);
        } else {   
            scrollAnchor.style.display = "none";
            setScrollState(true);
            window.scrollTo(0, window.innerHeight - 315);
        }
    }

    useEffect(() => {
        const observer = new IntersectionObserver(callBackFn, options);
        observer.observe(tankContainerRef.current);
    }, [tankContainerRef])

    return (
        <>
            <AppLayout
                nav={<Navbar />}
                tanks={tanks}
                carousel={""}
                scrollAnchor={<ScollAnchor onclick={scrollAnchorClickHandler} />}
            />
            <Backdrop percentage={percentage} isScrolled={isScrolled} />
        </>
    )
    function scrollAnchorClickHandler() {
        setScrollState(true);
        window.scrollTo(0, window.innerHeight - 310);
    }
    function refreshBackdrop() {
        percentage++;
    }
}
export default App;