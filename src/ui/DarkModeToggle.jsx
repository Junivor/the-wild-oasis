import ButtonIcon from "./ButtonIcon.jsx";
import {HiOutlineMoon, HiOutlineSun} from "react-icons/hi";
import {useDarkMode} from "../context/DarkModeProvider.jsx";


function DarkModeToggle() {
    const { isDarkMode, toggleDarkMode } = useDarkMode()
    return (
        <ButtonIcon onClick={toggleDarkMode}>
            { isDarkMode ? <HiOutlineSun /> : <HiOutlineMoon /> }
        </ButtonIcon>
    );
}

export default DarkModeToggle;