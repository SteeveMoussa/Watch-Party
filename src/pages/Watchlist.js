import React, { useState, useEffect, setState } from "react";
import { useAuth } from "../hooks/AuthProvider";

// This function is used to get the watchlist from the user and displaying it
function Watchlist() {
    const [movies, setMovies] = useState([]);
    const fetchWatchlist = async () => {
        // const data = await fetch(`https://api.themoviedb.org/3/account/20848641/watchlist/movies?api_key={}`);
        const data = await fetch(`https://api.themoviedb.org/3/trending/all/day?api_key={}`);
        const dataJ = await data.json(); // fetching data from API in JSON Format
        setMovies(dataJ.results); //storing that data in the state
      };
       
    useEffect(() => {
      // fetchWatchlist(); //calling the fetchTrending function only during the initial rendering of the app.
    }, []);
    
    const auth = useAuth();

    // This will be the display for the movies in the watchlist, will take that as a param after other method fetches data from API
    return(
      <div>
        <h1>{auth.username}'s Watchlist</h1> 
      </div>
    )
    
}

export default Watchlist