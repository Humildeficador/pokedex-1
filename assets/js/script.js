async function pokemon() {

  const pokemonUl = document.querySelector("#pokemon-list");

  for (let i = 1; i <= 151; i++) {
    const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${i}`)
    const json = await response.json();
    console.log(json.types[0].type.name)

    const pokeLi = document.createElement("li");
    pokeLi.classList.add("poke-card")

    const pokeBox = document.createElement("div");
    pokeBox.classList.add("poke-box")

    const pokeImg = document.createElement("img");
    pokeImg.setAttribute("src", json.sprites.other["official-artwork"].front_default)
    pokeImg.classList.add("poke-img")

    const pokeInfo = document.createElement("div");
    pokeInfo.classList.add("poke-info")

    const pokeNumberId = document.createElement("p");
    pokeNumberId.classList.add("poke-id")

    const pokeName = document.createElement("div");
    pokeName.classList.add("poke-name")

    const pokeTypeList = document.createElement("ul");
    pokeTypeList.classList.add("poke-type--list")

    const pokeTypeElementMain = document.createElement("li");
    pokeTypeElementMain.classList.add(json.types[0].type.name)





    pokemonUl.append(pokeLi)
    pokeLi.append(pokeBox)
    pokeBox.append(pokeImg)
    pokeBox.append(pokeInfo)

    pokeInfo.append(pokeNumberId)
    let paddedNumber = json.id.toString().padStart(4, '0')
    pokeNumberId.innerHTML = `N° ${paddedNumber}`

    pokeInfo.append(pokeName)
    pokeName.innerHTML = capitalize(json.name)


    /* POKE-TYPE-LIST */
    pokeInfo.append(pokeTypeList)
    pokeTypeList.append(pokeTypeElementMain)
    pokeTypeElementMain.innerHTML = capitalize(json.types[0].type.name);

    if (json.types[1]) {
      const pokeTypeElementSecondary = document.createElement("li");
      pokeTypeElementSecondary.classList.add(json.types[1].type.name)

      pokeTypeList.append(pokeTypeElementSecondary)
      pokeTypeElementSecondary.innerHTML = capitalize(json.types[1].type.name);
    }


  }


}

pokemon();

/* Letra maiúscula*/

const capitalize = (str) => {
  return str.charAt(0).toUpperCase() + str.slice(1, str.length);
}