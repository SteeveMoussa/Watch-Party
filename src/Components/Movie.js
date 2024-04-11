import React from "react";

const Movie = ({movie}) => {
    return (
        <div className="movieDisplay">
            <h3>{movie.title}</h3>
            <img src={"http://image.tmdb.org/t/p/w500" + movie.poster_path} alt={movie.backdrop_path}/>
        </div>
    )
}

export default Movie;