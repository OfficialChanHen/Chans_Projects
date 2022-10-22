import './App.css';
import {useEffect, useState} from "react";
import PokemonThumbnail from './PokemonThumbnail';
import Search from './Search';

function App() {

  const [allPokemons, setAllPokemons] = useState([])
  const [nextPokemons, setNextPokemons] = useState('https://pokeapi.co/api/v2/pokemon?limit=20') 
  const [prevPokemons, setPrevPokemons] = useState(null) 
  const [getNext, setGetNext] = useState(false)
  const [getPrev, setGetPrev] = useState(false)

  const createPokemonObject = (result) => {
    result.map(async (pokemon) => {
      const res = await fetch(pokemon.url)
      const data = await res.json() // individiual pokemon

      setAllPokemons(currentList => [...currentList, data].sort((a, b) => (a.id > b.id) ? 1 : ((b.id > a.id) ? -1 : 0)))
    })
  }

  const getNextPokemons = async () => {
    const res = await fetch(nextPokemons)
    const data = await res.json() // array of pokemons

    setNextPokemons(data.next) // reference to next array of pokemons
    setPrevPokemons(data.previous) // reference to prev array of pokemons
    
    createPokemonObject(data.results)
  }

  const getPreviousPokemons = async () => {
    const res = await fetch(prevPokemons)
    const data = await res.json()

    setNextPokemons(data.next) // reference to next array of pokemons
    setPrevPokemons(data.previous) // reference to previous array of pokemons

    createPokemonObject(data.results)
  }

  const changePokemons = (getNext, getPrev) => {
    if(getNext) {
      setAllPokemons([])
      getNextPokemons()
    } else if(getPrev && prevPokemons != null) {
      setAllPokemons([])
      getPreviousPokemons()
    }

    setGetNext(false)
    setGetPrev(false)
    
  }

  useEffect(() => {
    changePokemons(getNext, getPrev)
  }, [])

  return (
    <div className="app-container">
      <img className="pokemon-logo"
      src="https://upload.wikimedia.org/wikipedia/commons/thumb/9/98/International_Pok%C3%A9mon_logo.svg/2560px-International_Pok%C3%A9mon_logo.svg.png"
      alt="Pokemon Logo">
      </img>
      <Search className ="search-button"/>
      <div className="pokemon-container">
        <div className="all-container">
          { allPokemons.map((pokemon, index) => 
            <PokemonThumbnail 
            id={pokemon.id}
            name={pokemon.name}
            image={pokemon.sprites.front_default}
            shinyImage={pokemon.sprites.front_shiny}
            types={pokemon.types}
            key={index}
            />
            )}
        </div>
        <div className="page-controls">
          <button className="previous-page"
          onClick={() => changePokemons(false, true)}>
            Previous
          </button>
          <button className="next-page"
          onClick={() => changePokemons(true, false)}>
            Next
          </button>
        </div>
      </div>
    </div>
  );
}

export default App;
