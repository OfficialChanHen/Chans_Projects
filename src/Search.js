import React, {useState} from 'react'

const Search = () => {
  const [pokemonName, setPokemonName] = useState("")

  const searchPokemon = (event) => {
    event.preventDefault()
    console.log(pokemonName.toLowerCase())
  }

  return (
    <form 
    style={{marginRight : 78, marginBottom : 10}} 
    onSubmit={searchPokemon}>
      <label>Search A Pokémon: 
        <input style={{marginLeft : 5}}
        type="text"
        value={pokemonName}
        onChange={(e) => setPokemonName(e.target.value)} />
      </label>
      <input style={{marginLeft : 5}} type="submit"/>
    </form>
  )
}

export default Search