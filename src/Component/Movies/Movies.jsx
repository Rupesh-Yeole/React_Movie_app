import { useState, useEffect, useContext } from "react";
import Spinner from "../Common/Spinner";
import axios from "axios";
import MovieCard from "../MovieCard/MovieCard";
import Pagination from "../Pagination/Pagination";
import { ThemeContext } from "../../App";

function Movies({watchList, addMovieInWatchlist, removeMovieFromWatchlist}){

    const {theme, toggleTheme} = useContext(ThemeContext);
    const boxTextColor = (theme === "☀︎") ? "text-black" : "text-gray-300";

    const [MoviesData, setMoviesData]= useState(null);
    const [isLoading, setIsLoading] = useState(true);
    const [PageNumber, updatePageNumber] = useState(1);

    const fetchMoviesData = async()=> {
        try{
            setIsLoading(true);
            const response = await axios.get(`https://api.themoviedb.org/3/trending/movie/day?api_key=433a3d9975078a93cbdc970b6e2d0ff0&page=${PageNumber}`);

            setIsLoading(false);
            setMoviesData(response.data.results);
        }
        catch(err){
            console.log(err);
            setIsLoading(false);
        }
    }

    useEffect(() => {
        fetchMoviesData();
    },[PageNumber])

    return <div className="my-[5vh]">
        <h2 className={`mx-[35%] text-center text-2xl font-extrabold bg-red-400 p-1 ${boxTextColor} shadow-2xl rounded-xl w-[30%]`}> Trending Movies </h2>
        
        <div className="">
            {
                (isLoading) ? <Spinner/>:<div>
                        <div className="my-10 flex flex-wrap gap-10 justify-center item-center ">
                            {
                                MoviesData.map((movieObj)=>{
                                    return <MovieCard watchList={watchList} addMovieInWatchlist={addMovieInWatchlist} removeMovieFromWatchlist={removeMovieFromWatchlist} key={movieObj.id} movieObj={movieObj}/>
                                })
                            }
                        </div>
                    </div> 
            }
        </div>

        <div className="h-[1%] bg-gray-300 rounded-lg">
            <Pagination PageNumber={PageNumber} updatePageNumber={updatePageNumber}/>
        </div>
    </div>
}

export default Movies;