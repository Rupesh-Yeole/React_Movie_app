import {useState,useEffect} from "react";
import genreIdMapping from "../../Configuration/GenreIdMapping.js";
import {useContext} from "react";
import { ThemeContext } from "../../App";

function WatchList({watchList = [],removeMovieFromWatchlist}){

    const {theme, toggleTheme} = useContext(ThemeContext);
    const backGroundColorClass = (theme === "☀︎")? "bg-white" : "bg-black";
    const textColorClass = (theme === "☀︎") ? "text-black" : "text-gray-200";

    const [watchListMoviesInDisplay, setWatchListMoviesInDisplay]=useState([...watchList]);
    const [selectedGenre, setSelectedGenre] = useState("All Genres");

    useEffect(() => {
        // Whenever watchList prop updates, reflect it in local state
        setWatchListMoviesInDisplay([...watchList]);
    }, [watchList]);

    const genres = new Set();

    watchListMoviesInDisplay.forEach((movie)=>{
        genres.add(genreIdMapping[movie.genre_ids[0]]);
    })

    const onMovieFilter = (e) =>{
        const searchValue = e.target.value.toLowerCase();
        const moviesToDisplay = watchList.filter((movie) =>{
            return movie.title.toLowerCase().startsWith(searchValue);
        })
        
        setWatchListMoviesInDisplay(moviesToDisplay);
    }

    const filterMovies = (genre)=>{
        setSelectedGenre(genre);
        if (genre === "All Genres"){
            setWatchListMoviesInDisplay([...watchList]);
        }
        else{
            const moviesToDisplay = watchList.filter((movie) =>{
                return genreIdMapping[movie.genre_ids[0]] === genre;
            })
            setWatchListMoviesInDisplay(moviesToDisplay);
        }
    }

    const genreArray = Array.from(genres);
    genreArray.unshift("All Genres");

    return <div className={backGroundColorClass}>

        <div className="my-auto flex justify-center">
            <h2 className={`text-md md:text-2xl bg-yellow-500 p-1 ${textColorClass} shadow-md font-extrabold w-[30%] text-center rounded-lg`}>WatchList</h2>
        </div>

        <div className="my-5 flex flex-wrap items-center justify-center gap-3 cursor-pointer">
            {
                genreArray.map((genre)=>{
                    return <div key={genre} onClick={()=> filterMovies(genre)} className={`
                        ${selectedGenre !== genre ? "bg-transparent border border-red-400":"bg-red-400"} bg-red-400 ${textColorClass} font-bold rounded-lg px-4 py-2 min-h-[30px] w-[30vw] md:w-[112px] flex justify-center items-center md:flex-nowrap shadow-md text-sm md:text-base`}>{genre}</div>  
                })
            }
            
        </div>

        <div className="my-[5vh] flex justify-center">
            <input onChange={onMovieFilter} type="text" placeholder="Search Movies" className={`max-h-[6vh] w-[40%] border text-center rounded-xl`}></input>
        </div>
        
        <div className="my-[7vh] border-3 border-yellow-300 rounded-2xl overflow-x-auto">
            <table className="min-w-full text-sm md:text-base">
                <thead className="text-center text-black bg-yellow-300 shadow-md rounded-lg">
                <tr>
                    <th className="w-[50vw] md:w-[30%] rounded-tl-lg">Movie Name</th>
                    <th className="w-[20vw] md:w-[10%]">Rating</th>
                    <th className="w-[25vw] md:w-[15%]">Popularity</th>
                    <th className="w-[30vw] md:w-[20%]">Genre</th>
                    <th className="w-[10vw] md:w-[5%] rounded-tr-lg"></th>
                </tr>
                </thead>
                <tbody>
                {watchListMoviesInDisplay.map((movie) => (
                    <tr key={movie.id}>
                        <td className="py-[8px]">
                            <div
                            className="mx-auto flex justify-center items-end h-[20vh] w-[80%] rounded-lg p-1 bg-cover bg-center"
                            style={{ backgroundImage: `url(https://image.tmdb.org/t/p/original/${movie.backdrop_path})` }}
                            >
                            <div className="bg-black opacity-85 p-2 rounded-lg text-xs md:text-sm text-white font-bold">
                                {movie.title}
                            </div>
                            </div>
                        </td>
                        <td className="text-center font-bold py-[10px]">{movie.vote_average}</td>
                        <td className="text-center font-bold py-[10px]">{movie.popularity}</td>
                        <td className="text-center font-bold py-[10px]">{genreIdMapping[movie.genre_ids[0]]}</td>
                        <td className="text-center">
                            <div
                            onClick={() => removeMovieFromWatchlist(movie)}
                            className="bg-black text-white h-[80%] w-[70%] flex justify-center items-center rounded-xl p-1 cursor-pointer"
                            >
                            🗑️
                            </div>
                        </td>
                    </tr>
                ))}
                </tbody>
            </table>
        </div>

    </div>
}

export default WatchList;