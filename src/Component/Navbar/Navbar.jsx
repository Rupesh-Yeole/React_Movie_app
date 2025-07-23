import { Link } from "react-router-dom";
import Logo from "../../assets/MovieLogo.png";
import { ThemeContext } from "../../App";
import { useContext } from "react";

function navbar(){

    const {theme, toggleTheme} = useContext(ThemeContext);
    const backGroundColorClass = (theme === "☀︎")? "bg-white" : "bg-black";
    const boxBackgroundColorClass = (theme === "☀︎")? "bg-black" : "bg-white";
    const boxTextColor = (theme === "☀︎") ? "text-white" : "text-black";
    

    return <div className={`flex space-x-8 items-center pl-12 py-4 ${backGroundColorClass}`}>
            <Link to="/">
                <img className="w-[43px] rounded-3xl" src={Logo}></img>
            </Link>

            <Link className={`text-xl font-bold ${boxBackgroundColorClass} p-1.5 rounded-lg ${boxTextColor}`} to="/">
                Home
            </Link>

            <Link className={`text-xl font-bold ${boxBackgroundColorClass} p-1.5 rounded-lg ${boxTextColor}`} to= "watchList">
                watchList
            </Link>

            <div className={`w-[40px] text-xl ${boxTextColor} flex justify-center items-center p-1.5 gap-5 ${boxBackgroundColorClass} rounded-3xl`} to="/">
                <button onClick={toggleTheme} className="hover:scale-110 cursor-pointer">
                    {theme === "☀︎" ? "☀︎" : "⏾"}
                </button>
            </div>
            
        </div>
}

export default navbar;