async function fetchPokemon(id) {
  try {
    const res = await fetch(`https://pokeapi.co/api/v2/pokemon/${id}`)
    if (!res.ok) throw new Error('Falha ao buscar o pokemon')
    const data = await res.json()
    console.log(data)
    return data
  } catch (err) {
    return null
  }
}

function renderPokemonImage(pokemon) {
  const { name, id, sprites } = pokemon

  if (!pokemon || !sprites.front_default) return

  const ul = document.querySelector('#pokemon-list')

  const li = document.createElement('li')
  li.className = 'poke-card'

  const box = document.createElement('div')
  box.className = 'poke-box'

  const img = document.createElement('img')
  img.src = sprites.other["official-artwork"].front_default
  img.alt = name

  const info = document.createElement('div')
  info.className = 'poke-info'

  const pokeId = document.createElement('p')
  pokeId.className = 'poke-id'
  pokeId.textContent = `N° ${padding(id)}`

  const pokeName = document.createElement('p')
  pokeName.className = 'poke-name'
  pokeName.textContent = capitalize(name)

  const pokemonTypeList = document.createElement('ul')
  pokemonTypeList.className = 'pokemonType-list'

  const pokemonType = document.createElement('li')
  pokemonType.classList.add('pokemon-type', `${pokemon.types[0].type.name}`)
  pokemonType.textContent = capitalize(pokemon.types[0].type.name)

  
  li.appendChild(box)
  box.appendChild(img)
  box.appendChild(info)
  info.appendChild(pokeId)
  info.appendChild(pokeName)
  info.appendChild(pokemonTypeList)
  pokemonTypeList.appendChild(pokemonType)
  ul.appendChild(li)
  
  if (pokemon.types[1]) {
    const pokemonSecondType = document.createElement('li')
    pokemonSecondType.classList.add('pokemon-type', `${pokemon.types[1].type.name}`)
    pokemonSecondType.textContent = capitalize(pokemon.types[1].type.name)
    pokemonTypeList.appendChild(pokemonSecondType)
  }
}

function capitalize(str) {
  return str.slice(0, 1).toUpperCase() + str.slice(1)
}

function padding(id) {
  return id.toString().padStart(4, '0')
}

async function loadPokemons() {
  const promises = []

  for (let i = 1; i <= 151; i++) {
    promises.push(fetchPokemon(i))
  }

  const pokemons = await Promise.all(promises)
  pokemons.forEach(renderPokemonImage)
}

loadPokemons()