import React, { useState, useEffect, setState } from "react";
import { useAuth } from "../hooks/AuthProvider";
import Movie from "../Components/Movie";

// This function is used to get the watchlist from the user and displaying it
function Watchlist() {
    const [movies, setMovies] = useState([]);
    const api_key = process.env.REACT_APP_TMDB_API_KEY
    const session_id = localStorage.getItem("sessionId")

    // Needs a try catch
    const fetchWatchlist = async () => {
        const data = await fetch(`https://api.themoviedb.org/3/account/20848641/watchlist/movies?api_key=${api_key}&session_id=${session_id}`);
        const dataJ = await data.json(); 
        setMovies(dataJ.results); 
        console.log(dataJ.results)
      };
       
    useEffect(() => {
      fetchWatchlist(); //calling the fetchTrending function only during the initial rendering of the app.
    }, []);
    
    const auth = useAuth();


    // This will be the display for the movies in the watchlist, will take that as a param after other method fetches data from API
    return(
      <div>
        <h1>{auth.username}'s Watchlist</h1> 
        {
          movies.map((movie) => {
            return <Movie key={movie.id} movie={movie}/>
        })}
        <div className={'inputContainer'}>
            <input className={'inputButton'} type="button" onClick={() => auth.logOut()} value={'Log out'} />
        </div>
      </div>
    )
    
}

export default Watchlist