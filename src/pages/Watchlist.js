import React, { useState } from "react";
import { useAuth } from "../hooks/AuthProvider";
import Movie from "../Components/Movie";
import { useQuery } from "react-query";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faRightFromBracket } from "@fortawesome/free-solid-svg-icons";


// This function is used to get the watchlist from the user and displaying it
function Watchlist() {
    const api_key = process.env.REACT_APP_TMDB_API_KEY
    const auth = useAuth();
    const session_id = auth.sessionId
    const username = auth.username
    const [movie, setMovie] = useState()
    const [description, setDescription] = useState("")
    const [showModal, setShowModal] = useState(false)

    // Needs a try catch
    const fetchWatchlist = async () => {
        // const data = await fetch(`https://api.themoviedb.org/3/account/20848641/watchlist/movies?api_key=${api_key}&session_id=${session_id}`);
        const data = await fetch(`https://api.themoviedb.org/3/movie/popular?api_key=${api_key}&session_id=${session_id}`);

        const dataJ = await data.json(); 
        return dataJ.results; 
    };

    const displayModal = (movie) => {
      setMovie(movie)
      setShowModal(!showModal)
    }
    
    const {data: movies, status} = useQuery("movies", fetchWatchlist)

    // This will be the display for the movies in the watchlist, will take that as a param after other method fetches data from API
    return(
      <div className="wrapper">
        <div className="header">
          <h1 className="title">{username}'s Watchlist</h1> 
          <div className="logout" onClick={() => auth.logOut()}>
            <FontAwesomeIcon icon={faRightFromBracket} />
          </div>
        </div>
        <div className="content">
          <div className="movieList">
            {status === "error" && <p>Error fetching data</p>}
            {status === "loading" && <p>Fetching data...</p>}
            {status === "success" && 
                movies.map((movie) => {
                  return <Movie key={movie.id} movie={movie} onClick={displayModal}/>
                })
            } 
          </div>
          {showModal &&
            <div className="movieDescription">
                  <div className="popup">
                    <div className="close" onClick={() => setShowModal(false)}>x</div>
                    <h1>{movie.title}</h1>
                    <h2>Synopsis</h2>
                    <div className="descriptionText">
                      {movie.overview}  
                    </div>
                  </div>
            </div>
          }
        </div>

        <div className="footer">

        </div>
      </div>
    )
    
}

export default Watchlist