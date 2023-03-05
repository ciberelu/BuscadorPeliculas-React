import { useState, useEffect, useRef, useCallback } from 'react'
import './App.css'
import Movies from './components/Movies';
import { useMovies } from './hooks/useMovies';

import debounce from 'just-debounce-it';


function useSearch (){
  const [search, setSearch] = useState("");
  const [error, setError] = useState(null);
  const isFirstRender = useRef(true)

  useEffect (()=>{
    if (isFirstRender.current) {
      isFirstRender.current = search === ""
      return
    }

    if (search === "") {
      setError("Ingresa una pelicula")
      return
    }

    if (search.length < 3) {
      
      setError("Ingresa mas de 3 caracteres")
      return
    }

    setError(null)
  }, [search])

  return {search, setSearch, error}


}

function App() {
  const {search, setSearch, error} = useSearch();
  const [sort, setSort] = useState(false)
  
  const {mappedMovies, getMovies, loading, sortedMovies } = useMovies({search, sort});
  
  const debounceGetMovies = useCallback(debounce(({search}) =>{
    getMovies({search})

  }, 2000),[]) 
  
  
  const handleSubmit = (e) => {
    e.preventDefault();
    getMovies({search})
    
  }


  const handleChange = (e) =>{
    const newSearch = e.target.value;
    setSearch(newSearch)
    debounceGetMovies({search: newSearch})
    
  }

  const handleSort = (e) =>{
    setSort(!sort)
    
  }
  
  

  return (
    <div className='page'>

      

      <header>
        <h1>BUSCADOR DE PELICULAS</h1>
        <form action="" onSubmit={handleSubmit}>
          <input type="text" onChange={handleChange} placeholder='Avengers, Matrix, Star Wars'/>
          <input type="checkbox" name="" onChange={handleSort} value={sort} id="" />
          <button>Buscar</button>
        </form>
        {
          error && <p style={{color: "red"}}>{error}</p>
        }
      </header>

      <main>
        {
          loading ? <p>Cargando...</p> : <Movies movies={mappedMovies}/>
        }
        
      </main>




    </div>
  )
}

export default App
