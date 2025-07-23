import Banner from "../../Component/Banner/Banner";
import Movies from "../../Component/Movies/Movies";
import { useContext } from "react";
import { ThemeContext } from "../../App";

function Home({watchList, addMovieInWatchlist, removeMovieFromWatchlist}){

    const {theme} = useContext(ThemeContext); 
    const backGroundColorClass = (theme === "☀︎")? "bg-white" : "bg-black";

    return <div className={backGroundColorClass}>
        <Banner />
        <Movies watchList={watchList} addMovieInWatchlist={addMovieInWatchlist} removeMovieFromWatchlist={removeMovieFromWatchlist}/>
    </div>

}

export default Home;