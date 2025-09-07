import { useState, useEffect, useRef } from "react";
import placeholderImage from "../../assets/imagePlaceholder.png";
import { getRandomValue } from "../../utils";
import axios from "axios";

function Banner(){
    const [BannerImage, setBannerImage] = useState(placeholderImage);
    const [movieName, setMovieName]  = useState("");
    const intervalRef = useRef(null); //keeping a track of intervals

    const fetchMovieData = async () => {

        try{
            const response = await axios.get("https://api.themoviedb.org/3/trending/movie/day?api_key=433a3d9975078a93cbdc970b6e2d0ff0");

            const movies = response.data.results;

            const requiredMovieIndex = getRandomValue (0, movies.length - 1);

            const movie = movies[requiredMovieIndex];

            const bannerImage = `https://image.tmdb.org/t/p/original/${movie.backdrop_path}`;
            const movieTitle = movie.title

            setBannerImage(bannerImage);
            setMovieName(movieTitle);
        }
        catch(err){
            console.log(err);
        }
    }

    //starting a time interval for carousel
    const startInterval = () =>{
        if (!intervalRef.current){
            intervalRef.current = setInterval(()=>{
                fetchMovieData();
            },4500);
        }
    };

    // stopping a time interval for carousel
    const stopInterval = () => {
        if (intervalRef.current) {
            clearInterval(intervalRef.current);
            intervalRef.current = null;
        }
    };

    useEffect(() =>{
        //loading first image immediately
        fetchMovieData();
        startInterval();

        const handleVisibilityChange = ()=>{
            if (document.visibilityState === "visible"){
                startInterval();
            }else{
                stopInterval();
            }
        }

        document.addEventListener("visibilityChange", handleVisibilityChange);

        return () => {
            stopInterval();
            document.removeEventListener("visibilitychange", handleVisibilityChange);
        }
    },[]);
    
    return (
        <div className="mx-auto md:w-[70%] md:h-[70vh] w-[25rem] h-[15rem] rounded-lg bg-cover bg-center flex justify-center items-end transition-transform duration-300 hover:scale-[1.02]" 
        style={{backgroundImage:`url(${BannerImage})`}}>

            <div className="font-xl font-bold p-2 text-white bg-black opacity-70 rounded-lg">
                {movieName}
            </div>
        </div>
    );

}
export default Banner;