import './App.css'
import {BrowserRouter, Routes, Route} from "react-router-dom"; 
import Home from "./Pages/Home/home";
import WatchList from "./Pages/WatchList/WatchList";
import Navbar from "./Component/Navbar/Navbar";
import { createContext, useEffect, useState } from 'react';

export const ThemeContext = createContext();

function App() {

  const [theme, setTheme] = useState("☀︎");

  const toggleTheme = () =>{
    if (theme === "☀︎"){
      setTheme("⏾")
    }else{
      setTheme("☀︎")
    }
  }
  useEffect(() => {
    document.body.classList.remove("bg-white", "bg-black", "text-white", "text-black");

    if (theme === "☀︎") {
      document.body.classList.add("bg-white", "text-black");
    } else {
      document.body.classList.add("bg-black", "text-white");
    }
  }, [theme]);

  const [watchList, setInWatchlist] = useState(()=>{
    const watchListItems = localStorage.getItem("watchList");
    return watchListItems ? JSON.parse(watchListItems) : [];
  });

  useEffect(() => {
    localStorage.setItem("watchList", JSON.stringify(watchList));
  }, [watchList]);

  const addMovieInWatchlist = (movie)=>{
    setInWatchlist([...watchList, movie]);
  }

  const removeMovieFromWatchlist = (movieToRemove)=>{
    const updatedWatchlist = watchList.filter((movie) =>{
      return movie.id != movieToRemove.id;
    })

    setInWatchlist(updatedWatchlist);
  }

  //pages path added using router dom
  return (
    <>
    <ThemeContext.Provider value={{theme:theme, toggleTheme}}>
      <BrowserRouter>
        <Navbar/>

        <Routes>
          <Route path="/" 
              element={<Home watchList={watchList} addMovieInWatchlist={addMovieInWatchlist} removeMovieFromWatchlist={removeMovieFromWatchlist}/>}
          >
          </Route>
          <Route path="/watchList" 
            element={<WatchList 
              watchList={watchList}
              addMovieInWatchlist={addMovieInWatchlist}
              removeMovieFromWatchlist={removeMovieFromWatchlist} />}></Route>
        </Routes>
      </BrowserRouter>
    </ThemeContext.Provider>
    </>
  )
}

export default App
