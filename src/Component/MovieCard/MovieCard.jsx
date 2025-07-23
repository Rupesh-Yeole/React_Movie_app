

function MovieCard({movieObj, watchList, addMovieInWatchlist, removeMovieFromWatchlist}){
    const bannerImage = `https://image.tmdb.org/t/p/original/${movieObj.backdrop_path}`;

    const isMovieInWatchlist = watchList.find((movie) => movie.id == movieObj.id);

    return <div className="relative h-[220px] w-[130px] bg-cover bg-center flex justify-center items-end rounded-lg transition transition-transform duration-300 hover:scale-110" 
            style={{backgroundImage:`url(${bannerImage})`}}> 

        {
            (!isMovieInWatchlist) ? <div onClick={()=>{addMovieInWatchlist(movieObj)}} className="absolute top-1 right-1 bg-black rounded-lg p-0.5 cursor-pointer">
            🤍 </div> : <div onClick={()=>{removeMovieFromWatchlist(movieObj)}} className="absolute top-1 right-1 bg-black rounded-lg p-0.5 cursor-pointer">
            ❤️ </div>
        }

        <div className="bg-black text-white opacity-80 w-full text-xs font-bold text-center rounded-lg">
            {movieObj.title}
        </div>
    </div>
}
export default MovieCard;