const styleSheet = new CSSStyleSheet();

const loadCss = fetch('./assets/js/PokeCard/PokeCard.css')
  .then(res => res.text())
  .then(css => styleSheet.replace(css))

export class PokeCard extends HTMLElement {
  #id = ''
  #name = ''
  #sprite = ''
  #types = []

  constructor({ id, name, sprite, types }) {
    super()

    this.#id = id
    this.#name = name
    this.#sprite = sprite
    this.#types = types

    this.attachShadow({ mode: 'open' })
    this.#createPokeCard()
  }

  #createPokeCard() {
    loadCss.then(() => {
      this.shadowRoot.adoptedStyleSheets = [styleSheet]
    })

    const box = document.createElement('div')
    const info = document.createElement('div')
    const pokeId = document.createElement('p')
    const pokeName = document.createElement('p')
    const pokemonTypeList = document.createElement('ul')
    const sprite = new Image(205, 205)

    box.classList.add('poke-box')
    pokeId.classList.add('poke-id')
    pokeName.classList.add('poke-name')
    pokemonTypeList.classList.add('pokemon-type-list')

    pokeId.appendChild(document.createTextNode(this.#id))
    pokeName.appendChild(document.createTextNode(this.#name))

    sprite.fetchPriority = "high"
    sprite.src = this.#sprite
    sprite.alt = this.#name

    const pokemonTypeItems = this.#types.map((type) => {
      const el = document.createElement('li')
      const typeNode = document.createTextNode(type)

      el.classList.add('pokemon-type-item', type)
      el.appendChild(typeNode)

      return el
    })

    box.append(sprite, info)
    info.append(pokeId, pokeName, pokemonTypeList)
    pokemonTypeList.append(...pokemonTypeItems)

    this.shadowRoot.appendChild(box)
  }
}

customElements.define('poke-card', PokeCard)