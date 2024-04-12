import React from "react";

const Movie = ({movie}) => {
    return (
        <div className="movieDisplay">
            <img src={"http://image.tmdb.org/t/p/w500" + movie.poster_path} alt={movie.backdrop_path}/>
            <h3>{movie.title}</h3>
        </div>
    )
}

export default Movie;