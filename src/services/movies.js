import { useState } from "react";

const endpoint = `https://www.omdbapi.com/?apikey=7af1c40b&s=`



export const searchMovies = async ({search}) =>{
    

    if (search === "") return 

    try{
        const response = await fetch(`${endpoint}${search}`);
        const data = await response.json();
        
        const movies = data.Search;
        
        return  movies?.map((movie)=>({
            id: movie.imdbID,
            title: movie.Title,
            year: movie.Year,
            poster: movie.Poster
  
    }))

    }catch(e){
        throw new Error("Error al buscar la pelicula")
        
    }
    


}