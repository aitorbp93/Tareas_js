const contenedorPokemons = document.getElementById("contenedor-pokemons");
const botonIniciarBatalla = document.getElementById("iniciar-batalla");
const botonSeleccionarAleatorio = document.getElementById("seleccionar-aleatorio"); // Botón de selección aleatoria

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

// Función para seleccionar un Pokémon y actualizar la interfaz
function seleccionarPokemon(pokemon, divPokemon) {
  guardarEnLocalStorage("pokemonJugador", pokemon.name); // Guarda solo el nombre del Pokémon en localStorage
  document.querySelectorAll(".tarjeta-pokemon").forEach(div => div.classList.remove("seleccionado"));
  divPokemon.classList.add("seleccionado");
  botonIniciarBatalla.disabled = false;
}

// Lógica para el botón de selección aleatoria
botonSeleccionarAleatorio.addEventListener("click", () => {
  // Selecciona un Pokémon al azar de la lista
  const pokemonAleatorio = listaPokemons[Math.floor(Math.random() * listaPokemons.length)];
  // Encuentra el elemento de la tarjeta correspondiente al Pokémon aleatorio
  const divAleatorio = Array.from(contenedorPokemons.children).find(div => div.querySelector("h2").innerText === pokemonAleatorio.name);
  
  // Llama a la función para seleccionar el Pokémon aleatorio
  seleccionarPokemon(pokemonAleatorio, divAleatorio);
  
  // Desplaza la pantalla hasta el Pokémon seleccionado (opcional)
  divAleatorio.scrollIntoView({ behavior: 'smooth', block: 'center' });
});

botonIniciarBatalla.addEventListener("click", () => {
  window.location.href = "pantalla2.html";
});
