const contenedorPokemons = document.getElementById("contenedor-pokemons");
const botonIniciarBatalla = document.getElementById("iniciar-batalla");

// Función para guardar en localStorage
function guardarEnLocalStorage(nombre, valor) {
    localStorage.setItem(nombre, valor);
    console.log(`Valor ${nombre} guardado en localStorage:`, localStorage.getItem(nombre));
}

// Genera las tarjetas de cada Pokémon en pantalla
listaPokemons.forEach(pokemon => {
  const divPokemon = document.createElement("div");
  divPokemon.classList.add("tarjeta-pokemon");
  divPokemon.innerHTML = `
    <img src="${pokemon.img}" alt="${pokemon.name}">
    <h2>${pokemon.name}</h2>
    <p>Tipos: ${pokemon.types.join(", ")}</p>
    <p>Ataque: ${pokemon.attack}</p>
    <p>Defensa: ${pokemon.defense}</p>
    <p>HP: ${pokemon.hp}</p>
    <button class="boton-seleccionar">Seleccionar</button>
  `;
  
  const botonSeleccionar = divPokemon.querySelector(".boton-seleccionar");
  botonSeleccionar.addEventListener("click", () => seleccionarPokemon(pokemon, divPokemon));
  contenedorPokemons.appendChild(divPokemon);
});

function seleccionarPokemon(pokemon, divPokemon) {
  guardarEnLocalStorage("pokemonJugador", pokemon.name); // Guarda solo el nombre del Pokémon en localStorage
  document.querySelectorAll(".tarjeta-pokemon").forEach(div => div.classList.remove("seleccionado"));
  divPokemon.classList.add("seleccionado");
  botonIniciarBatalla.disabled = false;
}

botonIniciarBatalla.addEventListener("click", () => {
  window.location.href = "pantalla2.html";
});
