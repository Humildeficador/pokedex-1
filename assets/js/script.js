import { PokeCard } from "./PokeCard/PokeCard.js"
import { userStorage } from "./storage/userStorage.js"
import { capitalize, padding } from "./utils/utils.js"

async function fetchPokemon() {
  try {
    if (userStorage.get()?.length === 151) return userStorage.get()
    const response = await fetch('https://pokeapi.co/api/v2/pokemon?limit=151')
    if (response.status !== 200) throw new Error('Internal Server Error')
    const { results } = await response.json()
    return await fetchPokemonURL(results)
  } catch (error) {
    if (error instanceof Error) return console.error(error.message)
    return console.error(error.message)
  }
}

async function fetchPokemonURL(pokeList) {
  const pokemons = []
  try {
    for (const { url } of pokeList) {
      const response = await fetch(url)
      if (response.status !== 200) throw new Error('Internal Server Error')
      const pokemon = await response.json()

      pokemons.push({
        id: `N° ${padding(pokemon.id)}`,
        name: capitalize(pokemon.name),
        sprite: pokemon.sprites.other["official-artwork"].front_default,
        types: pokemon.types.map(({ type: { name } }) => name)
      })
    }

    userStorage.set(pokemons)
    return pokemons
  } catch (error) {
    if (error instanceof Error) return console.error(error.message)
    return console.error(error.message)
  }
}

function init() {
  const pokeList = document.querySelector('#pokemon-list')
  fetchPokemon()
    .then((pokemons) => {
      for (const pokemon of pokemons) {
        const pokeCard = new PokeCard(pokemon)
        pokeList.appendChild(pokeCard)
      }
    })
    .catch((error) => {
      if (error instanceof Error) return console.error(error.message)
      return console.error(error.message)
    })
}

init()

window.addEventListener('load', () => {
  document.body.removeChild(document.querySelector('.loadingIcon'))
})