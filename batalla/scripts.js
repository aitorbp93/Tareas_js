// Función para mostrar la lista de Pokémon en index.html
function mostrarPokemon() {
    const pokemonList = document.getElementById("pokemon-list");
    pokemons.forEach(pokemon => {
        const divPokemon = document.createElement("div");
        divPokemon.className = "pokemon-card";
        divPokemon.innerHTML = `
            <img src="${pokemon.img}" alt="${pokemon.name}">
            <p><strong>${pokemon.name}</strong></p>
            <p>Tipos: ${pokemon.types.join(', ')}</p>
            <button onclick="seleccionarPokemon(${pokemon.id})">Seleccionar</button>
        `;
        pokemonList.appendChild(divPokemon);
    });
}

// Función para seleccionar el Pokémon del jugador
function seleccionarPokemon(id) {
    const pokemonSeleccionado = pokemons.find(pokemon => pokemon.id === id);
    sessionStorage.setItem("pokemonJugador", JSON.stringify(pokemonSeleccionado));
    alert(`Has seleccionado a ${pokemonSeleccionado.name}`);
}

// Función para continuar a la siguiente pantalla (vs.html)
function continuar() {
    if (sessionStorage.getItem("pokemonJugador")) {
        window.location.href = 'vs.html';
    } else {
        alert("Por favor, selecciona un Pokémon antes de continuar.");
    }
}

// Función para mostrar enfrentamiento en vs.html
function mostrarEnfrentamiento() {
    const jugador = JSON.parse(sessionStorage.getItem("pokemonJugador"));
    const oponente = pokemons[Math.floor(Math.random() * pokemons.length)];
    sessionStorage.setItem("pokemonOponente", JSON.stringify(oponente));

    const vsContainer = document.getElementById("vs-container");
    vsContainer.innerHTML = `
        <div class="pokemon-card">
            <img src="${jugador.img}" alt="${jugador.name}">
            <p>${jugador.name}</p>
        </div>
        <h2>VS</h2>
        <div class="pokemon-card">
            <img src="${oponente.img}" alt="${oponente.name}">
            <p>${oponente.name}</p>
        </div>
    `;
}

// Función para iniciar el combate y pasar a battle.html
function iniciarCombate() {
    window.location.href = 'battle.html';
}

// Función para mostrar los Pokémon en battle.html y el área de combate
function mostrarCombate() {
    const jugador = JSON.parse(sessionStorage.getItem("pokemonJugador"));
    const oponente = JSON.parse(sessionStorage.getItem("pokemonOponente"));

    const combatArea = document.getElementById("combat-area");
    combatArea.innerHTML = `
        <div class="pokemon-card">
            <h3>Jugador</h3>
            <img src="${jugador.img}" alt="${jugador.name}">
            <p>${jugador.name}</p>
            <p>Tipos: ${jugador.types.join(', ')}</p>
        </div>
        <div class="pokemon-card">
            <h3>Máquina</h3>
            <img src="${oponente.img}" alt="${oponente.name}">
            <p>${oponente.name}</p>
            <p>Tipos: ${oponente.types.join(', ')}</p>
        </div>
    `;
}

// Ejecuta las funciones según la pantalla actual
if (document.getElementById("pokemon-list")) mostrarPokemon();
if (document.getElementById("vs-container")) mostrarEnfrentamiento();
if (document.getElementById("combat-area")) mostrarCombate();
