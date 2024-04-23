import { IoInvertMode, IoMenu } from "react-icons/io5";
import "./styles.css";

const Navbar = () => {
    return (
        <nav>
            <div className="navOption left">
                <IoMenu />
            </div>
            <h3>WaveWatch</h3>
            <div className="navOption right" id="toggleDarkMode">
                <IoInvertMode/>
            </div>
        </nav>
    )
}
export default Navbar;