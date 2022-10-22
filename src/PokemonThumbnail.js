import {React, useState, useEffect} from 'react'

const PokemonThumbnail = ({id, name, image, shinyImage, types}) => {

    const [pokemonImage, setPokemonImage] = useState([image])
    const [isShiny, setIsShiny] = useState(false)

    const printAllTypes = (types) => {
        let allTypes = ""
        let i = 0;

        while(i < types.length - 1) {
            allTypes = types[i].type.name + ", "
            i++;
        }

        allTypes = allTypes + types[types.length - 1].type.name

        return allTypes
    }

    const handleClick = () => {
        const message = name + " is a " + printAllTypes(types) + " type"
        alert(message.toUpperCase())
    }

    useEffect(() => {
        if(isShiny) {
            setPokemonImage(shinyImage)
        } else {
            setPokemonImage(image)
        }
    }, [isShiny])
    
    const style = `thumb-container ${types[0].type.name}`
    return (
    <div className={style}>
        <div className="number">
            <small>#0{id}</small>
        </div>
        <img 
        src={pokemonImage} 
        alt={name} 
        onClick={() => handleClick()}/>
        <div className="detail-wrapper">
            <h3>{(isShiny ? "Shiny " : "") + name.charAt(0).toUpperCase() + name.slice(1)}</h3>
            <small>Type: {printAllTypes(types)}</small>
        </div>
        <div>
            <button className="shiny-button" onClick={() => setIsShiny(!isShiny)}>
                <img 
                src="https://pngimg.com/uploads/star/star_PNG1597.png" 
                alt="shiny star">
                </img>
            </button>
        </div>
    </div>
  )
}

export default PokemonThumbnail