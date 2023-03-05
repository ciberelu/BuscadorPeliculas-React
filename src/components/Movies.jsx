const ListOfMovies = ({movies})=>{
    return (
        <ul className="movies">
                {
                  movies.map(movie => (
                    <li className="movie" key={movie.id}>
                      <h3>{movie.title}</h3>
                      <p>{movie.year}</p>
                      <img src={movie.poster} alt="Poster de la pelicula" />
                    </li>
                  ))
                }
        </ul>
    )
}

const NoMovies = ()=>{
    return (
    <p>No se encontraron peliculas</p>
    )

}

const Movies = ({movies})=>{

    const hasMovies = movies?.length > 0;
    return (
    hasMovies ? 
        <ListOfMovies movies = {movies}/>
        :
        <NoMovies/>
    )
}

export default Movies;