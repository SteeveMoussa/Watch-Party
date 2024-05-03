import React from "react";

const Movie = ({movie}) => {
    return (
        <div className="movieDisplay card">
            <img src={"http://image.tmdb.org/t/p/w500" + movie.poster_path} alt={movie.backdrop_path}/>
            <div className="movieTitle">
                <h5>{movie.title}</h5>
            </div>
        </div>
    )
}

export default Movie;