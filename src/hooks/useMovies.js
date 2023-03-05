
import { useState, useRef, useMemo } from "react";
import { searchMovies } from "../services/movies";


export function useMovies ({search, sort}){
    
    const [mappedMovies, setMappedMovies] = useState([])
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState(null) 

    const previousSearch = useRef(search)

    
    //se le paso por parametro el search para memorizar la funcion y generarla cuando se monta el componenete
    //al no pasarle dependencia no se vuelve a montar la funcion
    const getMovies = useMemo(()=>{
        return async ({search})=>{
            if (previousSearch.current === search) return
    
            try{
                setLoading(true)
                setError(null)
                previousSearch.current = search
                const movies = await searchMovies({search})
                setMappedMovies(movies)
            }catch(e){
                setError(e.message)
            }finally{
                setLoading(false)
            }
            
        }
    }, [])  



    //uso usememo para que el cuerpo de esta funcion solo se ejecute cuando cambie el sort o las movies
    const sortedMovies = useMemo(()=>{
        return sort && mappedMovies?.length > 0
        ? [...mappedMovies].sort((a, b) => a.title.localeCompare (b.title))   
        : mappedMovies     
    }, [sort, mappedMovies]) 
        

    
    return {mappedMovies:sortedMovies, getMovies, loading, error}

  }