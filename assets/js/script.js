async function pokemon() {

  const pokemonUl = document.querySelector("#pokemon-list");

  for (let i = 1; i <= 151; i++) {
    const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${i}`)
    const json = await response.json();

    const pokeLi = document.createElement("li");
    const pokeBox = document.createElement("div");
    const pokeImg = document.createElement("img");
    const pokeInfo = document.createElement("div");
    const pokeNumberId = document.createElement("p");
    const pokeName = document.createElement("div");
    const pokeTypeList = document.createElement("ul");

    pokeLi.classList.add("poke-card")
    pokeBox.classList.add("poke-box")
    pokeImg.classList.add("poke-img")
    pokeImg.setAttribute("src", json.sprites.other["official-artwork"].front_default)
    pokeInfo.classList.add("poke-info")
    pokeNumberId.classList.add("poke-id")
    pokeName.classList.add("poke-name")
    pokeTypeList.classList.add("poke-type--list")

    pokemonUl.append(pokeLi)
    pokeLi.append(pokeBox)
    pokeBox.append(pokeImg)
    pokeBox.append(pokeInfo)
    pokeInfo.append(pokeNumberId)
    pokeInfo.append(pokeName)
    pokeName.innerHTML = capitalize(json.name)
    pokeInfo.append(pokeTypeList)

    let paddedNumber = json.id.toString().padStart(4, '0')
    pokeNumberId.innerHTML = `N° ${paddedNumber}`
    
    /* POKE-TYPE-LIST */

    for (let { type } of json.types) {

      const pokeType = document.createElement("li");
      pokeType.innerHTML = capitalize(type.name);
      pokeType.classList.add(type.name);
      pokeTypeList.append(pokeType);

    }
  }
}

pokemon();

/* Letra maiúscula*/

const capitalize = (str) => {
  return str.charAt(0).toUpperCase() + str.slice(1, str.length);
}