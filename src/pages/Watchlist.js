import React from "react";
import { useAuth } from "../hooks/AuthProvider";
import Movie from "../Components/Movie";
import { useQuery } from "react-query";


// This function is used to get the watchlist from the user and displaying it
function Watchlist() {
    const api_key = process.env.REACT_APP_TMDB_API_KEY
    const auth = useAuth();
    const session_id = auth.sessionId
    const username = auth.username

    // Needs a try catch
    const fetchWatchlist = async () => {
        const data = await fetch(`https://api.themoviedb.org/3/account/20848641/watchlist/movies?api_key=${api_key}&session_id=${session_id}`);
        const dataJ = await data.json(); 
        return dataJ.results; 
    };
    
    const {data: movies, status} = useQuery("movies", fetchWatchlist)

    // This will be the display for the movies in the watchlist, will take that as a param after other method fetches data from API
    return(
      <div>
        <h1>{username}'s Watchlist</h1> 
        <div className="movieList">
        {status === "error" && <p>Error fetching data</p>}
        {status === "loading" && <p>Fetching data...</p>}
        {status === "success" && 
            movies.map((movie) => {
              return <Movie key={movie.id} movie={movie}/>
            })
        } 
        </div>
        <div className={'inputContainer'}>
            <input className={'inputButton'} type="button" onClick={() => auth.logOut()} value={'Log out'} />
        </div>
      </div>
    )
    
}

export default Watchlist