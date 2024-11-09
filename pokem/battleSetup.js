function obtenerDeLocalStorage(nombre) {
  return localStorage.getItem(nombre);
}

const nombrePokemonJugador = obtenerDeLocalStorage("pokemonJugador");
const pokemonJugador = listaPokemons.find(pokemon => pokemon.name === nombrePokemonJugador);

if (!pokemonJugador) {
  alert("No has seleccionado un Pokémon. Regresando a la pantalla de selección.");
  window.location.href = "pantalla1.html";
}

const pokemonOponente = listaPokemons[Math.floor(Math.random() * listaPokemons.length)];
localStorage.setItem("pokemonOponente", pokemonOponente.name);

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
