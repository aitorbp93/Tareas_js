const contenedorPokemons = document.getElementById("contenedor-pokemons");
const botonIniciarBatalla = document.getElementById("iniciar-batalla");
const botonSeleccionarAleatorio = document.getElementById("seleccionar-aleatorio");

function guardarEnLocalStorage(nombre, valor) {
    localStorage.setItem(nombre, valor);
}

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
  guardarEnLocalStorage("pokemonJugador", pokemon.name);
  document.querySelectorAll(".tarjeta-pokemon").forEach(div => div.classList.remove("seleccionado"));
  divPokemon.classList.add("seleccionado");
  botonIniciarBatalla.disabled = false;
}

botonSeleccionarAleatorio.addEventListener("click", () => {
  const pokemonAleatorio = listaPokemons[Math.floor(Math.random() * listaPokemons.length)];
  const divAleatorio = Array.from(contenedorPokemons.children).find(div => div.querySelector("h2").innerText === pokemonAleatorio.name);
  seleccionarPokemon(pokemonAleatorio, divAleatorio);
  divAleatorio.scrollIntoView({ behavior: 'smooth', block: 'center' });
});

botonIniciarBatalla.addEventListener("click", () => {
  window.location.href = "pantalla2.html";
});
