import React from "react";

const Movie = ({movie, onClick}) => {
    return (
        <div className="movie">
            <div className="movieDisplay" onClick={() => onClick(movie)}>
                <img src={"https://image.tmdb.org/t/p/w500" + movie.poster_path} alt={movie.backdrop_path}/>
                <div className="movieTitle">
                    <div className="titleText">{movie.title}</div>
                </div>

            </div>
        </div>
    )
}

export default Movie;