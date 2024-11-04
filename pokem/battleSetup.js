// Función para obtener el valor desde localStorage
function obtenerDeLocalStorage(nombre) {
    return localStorage.getItem(nombre);
}

// Recupera el nombre del Pokémon seleccionado por el jugador
const nombrePokemonJugador = obtenerDeLocalStorage("pokemonJugador");
console.log("Nombre del Pokémon Jugador desde localStorage:", nombrePokemonJugador);

// Busca el Pokémon en la lista usando el nombre
const pokemonJugador = listaPokemons.find(pokemon => pokemon.name === nombrePokemonJugador);
console.log("Objeto Pokémon Jugador:", pokemonJugador);

// Verifica si el Pokémon del jugador existe; si no, redirige a la pantalla de selección
if (!pokemonJugador) {
    alert("No has seleccionado un Pokémon. Regresando a la pantalla de selección.");
    window.location.href = "pantalla1.html";
}

// Selecciona un Pokémon aleatorio del array para el oponente
const pokemonOponente = listaPokemons[Math.floor(Math.random() * listaPokemons.length)];
localStorage.setItem("pokemonOponente", pokemonOponente.name); // Guarda solo el nombre del oponente en localStorage

console.log("Nombre del Pokémon Oponente desde localStorage:", pokemonOponente.name);
console.log("Objeto Pokémon Oponente:", pokemonOponente);

// Muestra los datos en la pantalla VS
document.getElementById("pokemon-jugador").innerHTML = `
  <img src="${pokemonJugador.img}" alt="${pokemonJugador.name}">
  <h2>${pokemonJugador.name}</h2>
  <p>Tipos: ${pokemonJugador.types.join(", ")}</p>
  <p>Ataque: ${pokemonJugador.attack}</p>
  <p>Defensa: ${pokemonJugador.defense}</p>
  <p>HP: ${pokemonJugador.hp}</p>
`;

document.getElementById("pokemon-oponente").innerHTML = `
  <img src="${pokemonOponente.img}" alt="${pokemonOponente.name}">
  <h2>${pokemonOponente.name}</h2>
  <p>Tipos: ${pokemonOponente.types.join(", ")}</p>
  <p>Ataque: ${pokemonOponente.attack}</p>
  <p>Defensa: ${pokemonOponente.defense}</p>
  <p>HP: ${pokemonOponente.hp}</p>
`;

document.getElementById("comenzar-batalla").addEventListener("click", () => {
  window.location.href = "pantalla3.html";
});
