function handleSettingsPopup() {
    const tanks = [...document.querySelector(".tanksMinimal").children, ...document.querySelectorAll(".tankNameContainer")];
    tanks.forEach(tank => {
        tank.onclick = () => new Popup(`
            <details class="setting inline" open>
                <summary>Tank Name</summary>
                <input type="text" placeholder="None" id="ST_TANK_NAME"/>
            </details>
            <details class="setting inline" open>
                <summary>Tank Tag Name</summary>
                <input type="text" placeholder="None" id="ST_TANK_TAG_NAME"/>
            </details>
            <details class="setting" open>
                <summary>Tank Dimensions</summary>
                <ul>
                    <li><label for="ST_TANK_HEIGHT">Height</label><input type="number" id="ST_TANK_HEIGHT" placeholder="cm"/></li>
                    <li><label for="ST_TANK_DIAMETER">Diameter</label><input type="number" id="ST_TANK_DIAMETER" placeholder="cm"/></li>
                    <li><label for="ST_TANK_MAX_LITERS">Max Liters</label><input type="number" id="ST_TANK_MAX_LITERS" placeholder="L"/></li>
                </ul>
            </details>
            <details class="setting" open>
                <summary>
                    <span>Smart Flow</span>
                    <label class="toggle">
                        <input type="checkbox" id="ST_TANK_SMARTFLOW_CHECKBOX"/>
                        <span class="slider round"></span>
                    </label>
                </summary>
                <ul>
                    <li><label for="ST_TANK_SMARTFLOW_MIN">Minimum</label><input type="number" id="ST_TANK_SMARTFLOW_MIN" placeholder="%"/></li>
                    <li><label for="ST_TANK_SMARTFLOW_TOL">Tolerance</label><input type="number" id="ST_TANK_SMARTFLOW_TOL" placeholder="%"/></li>
                    <li><label for="ST_TANK_SMARTFLOW_MAX">Maximum</label><input type="number" id="ST_TANK_SMARTFLOW_MAX" placeholder="%"/></li>
                </ul>
            </details>
            <div class="info">
                <ion-icon name="information-circle"></ion-icon>
                <p>This data is essential for calculating percentages and enabling SmartFlow within the controller.</p>
            </div>
        `, tank.querySelector(".tankName").textContent, (setInputValue, windowTitle) => {
            const settings = getSetting`tanks`.then(tanks => tanks.filter(tank => tank.tankName == windowTitle)[0]);
            settings.then(data => {
                setInputValue("ST_TANK_NAME", data.tankName);
                setInputValue("ST_TANK_TAG_NAME", data.tankTagName);
                setInputValue("ST_TANK_HEIGHT", data.height);
                setInputValue("ST_TANK_DIAMETER", data.diameter);
                setInputValue("ST_TANK_MAX_LITERS", data.maxLiters);
                setInputValue("ST_TANK_SMARTFLOW_MIN", data.smartFlow.min);
                setInputValue("ST_TANK_SMARTFLOW_TOL", data.smartFlow.tol);
                setInputValue("ST_TANK_SMARTFLOW_MAX", data.smartFlow.max);

                setInputValue("ST_TANK_SMARTFLOW_CHECKBOX", data.smartFlow.isActive, true);
            })
        });
    })
    const settings = [...document.querySelectorAll("#settings .setting")];
    settings.forEach(setting => {
        setting.onclick = e => {
            if (e.target.tagName == "LABEL" || e.target.tagName == "INPUT") {
                if (e.target.tagName == "INPUT") setIndicatorColorUI(e.target.checked ? 3 : 4);
                return;
            }

            const windowTitle = setting.querySelector(".settingName").textContent;
            let popupString = "In Progress...";

            switch (windowTitle.toLowerCase()) {
                case "smart flow":
                    popupString = `
                        <details class="setting" open>
                            <summary>
                                <span>Tank 1</span>
                                <label class="toggle">
                                    <input type="checkbox" id="ST_TANK_SMARTFLOW_CHECKBOX1"/>
                                    <span class="slider round"></span>
                                </label>
                            </summary>
                            <ul>
                                <li><label for="ST_TANK_SMARTFLOW_MIN1">Minimum</label><input type="number" id="ST_TANK_SMARTFLOW_MIN1" placeholder="%"/></li>
                                <li><label for="ST_TANK_SMARTFLOW_TOL1">Tolerance</label><input type="number" id="ST_TANK_SMARTFLOW_TOL1" placeholder="%"/></li>
                                <li><label for="ST_TANK_SMARTFLOW_MAX1">Maximum</label><input type="number" id="ST_TANK_SMARTFLOW_MAX1" placeholder="%"/></li>
                            </ul>
                        </details>
                        <details class="setting" open>
                            <summary>
                                <span>Tank 2</span>
                                <label class="toggle">
                                    <input type="checkbox" id="ST_TANK_SMARTFLOW_CHECKBOX2"/>
                                    <span class="slider round"></span>
                                </label>
                            </summary>
                            <ul>
                                <li><label for="ST_TANK_SMARTFLOW_MIN2">Minimum</label><input type="number" id="ST_TANK_SMARTFLOW_MIN2" placeholder="%"/></li>
                                <li><label for="ST_TANK_SMARTFLOW_TOL2">Tolerance</label><input type="number" id="ST_TANK_SMARTFLOW_TOL2" placeholder="%"/></li>
                                <li><label for="ST_TANK_SMARTFLOW_MAX2">Maximum</label><input type="number" id="ST_TANK_SMARTFLOW_MAX2" placeholder="%"/></li>
                            </ul>
                        </details>
                        <details class="setting" open>
                            <summary>
                                <span>Tank 3</span>
                                <label class="toggle">
                                    <input type="checkbox" id="ST_TANK_SMARTFLOW_CHECKBOX3"/>
                                    <span class="slider round"></span>
                                </label>
                            </summary>
                            <ul>
                                <li><label for="ST_TANK_SMARTFLOW_MIN3">Minimum</label><input type="number" id="ST_TANK_SMARTFLOW_MIN3" placeholder="%"/></li>
                                <li><label for="ST_TANK_SMARTFLOW_TOL3">Tolerance</label><input type="number" id="ST_TANK_SMARTFLOW_TOL3" placeholder="%"/></li>
                                <li><label for="ST_TANK_SMARTFLOW_MAX1">Maximum</label><input type="number" id="ST_TANK_SMARTFLOW_MAX3" placeholder="%"/></li>
                            </ul>
                        </details>
                        <div class="info">
                            <ion-icon name="information-circle"></ion-icon>
                            <p>This data is needed to faciliate SmartFlow within the controller.</p>
                        </div>
                    `
                    break;

            }
            new Popup(popupString, windowTitle, setInputValue => {
                const settings = getSetting`tanks`.then(tanks => tanks.map(tank => tank.smartFlow));
                settings.then(data => {
                    setInputValue("ST_TANK_SMARTFLOW_MIN1", data[0].min);
                    setInputValue("ST_TANK_SMARTFLOW_MIN2", data[1].min);
                    setInputValue("ST_TANK_SMARTFLOW_MIN3", data[2].min);
                    setInputValue("ST_TANK_SMARTFLOW_TOL1", data[0].tol);
                    setInputValue("ST_TANK_SMARTFLOW_TOL2", data[1].tol);
                    setInputValue("ST_TANK_SMARTFLOW_TOL3", data[2].tol);
                    setInputValue("ST_TANK_SMARTFLOW_MAX1", data[0].max);
                    setInputValue("ST_TANK_SMARTFLOW_MAX2", data[1].max);
                    setInputValue("ST_TANK_SMARTFLOW_MAX3", data[2].max);

                    setInputValue("ST_TANK_SMARTFLOW_CHECKBOX1", data[0].isActive, true);
                    setInputValue("ST_TANK_SMARTFLOW_CHECKBOX2", data[1].isActive, true);
                    setInputValue("ST_TANK_SMARTFLOW_CHECKBOX3", data[2].isActive, true);
                })
            });
        }
    })
}
function handleSmartFlowChanges() {
    const smartFlowToggle = document.getElementById("smartFlowToggle");
    const isSmartFlowActive = getSetting`isSmartFlowActive`;
    isSmartFlowActive.then(isActive => {
        smartFlowToggle.checked = isActive;
        if (isActive) setIndicatorColorUI(3);
    });
}
function handleTankCarousel() {
    const tankCarouselBackBtn = document.querySelector(".tankCarousel .control.left");
    const tankCarouselNextBtn = document.querySelector(".tankCarousel .control.right");
    const tankCarousel = document.querySelector(".tankCarousel");
    const pagination = document.querySelector(".pagination");

    let tankCarouselPos = 0;
    tankCarouselNextBtn.onclick = () => {
        if (tankCarouselPos == 2) return;
        tankCarouselPos += 1;
        [...pagination.children].forEach(child => child.classList.remove("active"));
        pagination.children[tankCarouselPos].classList.add("active");
        tankCarousel.children[tankCarouselPos].scrollIntoView({ behavior: "smooth" });
    }
    tankCarouselBackBtn.onclick = () => {
        if (tankCarouselPos == 0) return;
        tankCarouselPos -= 1;
        [...pagination.children].forEach(child => child.classList.remove("active"));
        pagination.children[tankCarouselPos].classList.add("active");
        tankCarousel.children[tankCarouselPos].scrollIntoView({ behavior: "smooth" });
    }
}
function handlePumpBtnPress() {
    const pumpOnBtn = document.getElementById("on");
    const pumpOffBtn = document.getElementById("off");
    pumpOnBtn.onclick = () => setSmartFlowState(false, 1);
    pumpOffBtn.onclick = () => setSmartFlowState(false, 2);
}
function handleTankUI(interval) {
    const tanks = [...document.querySelectorAll(".tankCarousel .tank")];
    const tanksMinimal = [...document.querySelectorAll(".tanksMinimal .tank")];

    getSetting`tanks`.then(tanksSettings => {
        setInterval(() => {
            let tankPercentages =  getTankPerecentages();
            for (let i = 0; i < tanks.length; i++) {
                let tankClass = new TankUI(tanks[i], tanksMinimal[i]);
                let tankLiters = Math.floor(tanksSettings[i].maxLiters * tankPercentages[i]/100);
                tankClass.percentage = tankPercentages[i];
                tankClass.liters = tankLiters;
            }
        }, interval);
    })
}
function init() {
    handleSettingsPopup();
    handleSmartFlowChanges();
    handleTankCarousel();
    handlePumpBtnPress();

    handleTankUI(1000);
}


// Utility Functions
function setIndicatorColorUI(colorCode = 4, shadowColorCode = false) {
    document.body.style = `--pumpStateColor: var(--semantic${colorCode}); --pumpStateShadowColor: var(--semantic${shadowColorCode ? shadowColorCode : colorCode});`;
}
function setSmartFlowState(boolean, colorCode, shadowColorCode) {
    const smartFlowToggle = document.getElementById("smartFlowToggle");
    smartFlowToggle.checked = boolean;
    setIndicatorColorUI(colorCode, shadowColorCode);
}
function getTankPerecentages() {
    const data = [Math.floor(Math.random()*1000)/10, Math.floor(Math.random()*1000)/10, Math.floor(Math.random()*1000)/10];
    return data;
}
async function getSetting (settingName) {
    const settings = await fetch("/settings.json").then(res => res.json())
    return settings[settingName];
}


// Class Objects:
class TankUI {
    constructor (tankRoot, tankMinimalRoot) {
        this.tankPercentagePlaceholder = tankRoot.querySelector(".tankPercentage");
        this.tankLitersPlaceholder = tankRoot.querySelector(".tankLiters");
        this.tankBGPercentage = tankRoot.querySelector(".circleInner");
        
        this.tankPercentagePlaceholderMinimal = tankMinimalRoot.querySelector(".tankPercentage");
        this.tankBGPercentageMinimal = tankMinimalRoot.querySelector(".tankFill");
    }
    set percentage (value) {
        this.tankPercentagePlaceholder.textContent = value+"%";
        this.tankPercentagePlaceholderMinimal.textContent = value+"%";
        
        let percentageToDeg = 360*value/100;
        this.tankBGPercentage.style = `background: conic-gradient(var(--accent1), var(--accent2) ${percentageToDeg}deg, transparent ${percentageToDeg}deg)`; 
        this.tankBGPercentageMinimal.style = `height: ${value}%`; 
    }
    set liters (value) {
        this.tankLitersPlaceholder.textContent = value+"L";
    }
}
class Popup {
    setInputValue(idStr, data, isToggle = false) {
        if (isToggle) {
            document.getElementById(idStr).checked = data;
            return;
        }
        document.getElementById(idStr).value = data;
    }

    constructor(htmlString, windowTitle, setInputValue) {
        const popupWindow = document.querySelector(".popupWindow");
        document.getElementById("popupRoot").innerHTML = htmlString;
        document.getElementById("popupWindowTitle").innerHTML = windowTitle;

        setInputValue(this.setInputValue, windowTitle);

        popupWindow.classList.add("show");
        popupWindow.querySelector("#settingsBackBtn").onclick = () => {
            popupWindow.classList.remove("show");
        }
    }
}

document.addEventListener("DOMContentLoaded", init);