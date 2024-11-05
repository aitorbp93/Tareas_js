// Recuperar los nombres de los Pokémon seleccionados
const nombrePokemonJugador = localStorage.getItem("pokemonJugador");
const nombrePokemonOponente = localStorage.getItem("pokemonOponente");

// Buscar los objetos completos de los Pokémon
const pokemonJugador = listaPokemons.find(pokemon => pokemon.name === nombrePokemonJugador);
const pokemonOponente = listaPokemons.find(pokemon => pokemon.name === nombrePokemonOponente);

// Configuración de las imágenes en la pantalla de batalla
document.getElementById("imagen-jugador").src = pokemonJugador.img;
document.getElementById("imagen-jugador").alt = pokemonJugador.name;

document.getElementById("imagen-oponente").src = pokemonOponente.img;
document.getElementById("imagen-oponente").alt = pokemonOponente.name;

// Variables de vida y estadísticas
let vidaJugador = pokemonJugador.hp;
let vidaOponente = pokemonOponente.hp;
let enDefensaJugador = false;
let enDefensaOponente = false;

const barraVidaJugador = document.getElementById("vida-jugador");
const barraVidaOponente = document.getElementById("vida-oponente");
const textoVidaJugador = document.getElementById("texto-vida-jugador");
const textoVidaOponente = document.getElementById("texto-vida-oponente");
const mensajesCombate = document.getElementById("mensajes-combate");

// Seleccionar el botón de reiniciar batalla
const botonReiniciarBatalla = document.getElementById("reiniciar-batalla");

// Función para mostrar mensajes de combate
function mostrarMensaje(mensaje) {
  mensajesCombate.innerText = mensaje;
}

// Función para actualizar las barras de vida visualmente y el texto de vida actual
function actualizarBarraVida(barra, vida, vidaTotal, texto) {
  let porcentaje = (vida / vidaTotal) * 100;
  barra.style.width = `${porcentaje}%`;
  barra.style.backgroundColor = porcentaje > 50 ? "green" : porcentaje > 20 ? "orange" : "red";
  texto.innerText = `${vida} / ${vidaTotal}`; // Muestra vida actual y total
}

// Inicialización de las barras de vida al inicio
actualizarBarraVida(barraVidaJugador, vidaJugador, pokemonJugador.hp, textoVidaJugador);
actualizarBarraVida(barraVidaOponente, vidaOponente, pokemonOponente.hp, textoVidaOponente);

// Función para mostrar el botón al final de la batalla
function mostrarBotonReiniciar() {
  botonReiniciarBatalla.style.display = "block"; // Mostrar el botón
  botonReiniciarBatalla.addEventListener("click", () => {
    window.location.href = "pantalla1.html"; // Redirigir a la pantalla de selección
  });
}

// Función de ataque del jugador
function atacar() {
  let danio = Math.floor(Math.random() * (pokemonJugador.attack / 2) + (pokemonJugador.attack / 2));
  
  if (enDefensaOponente) {
    danio = Math.floor(danio / 2);
    enDefensaOponente = false;
    mostrarMensaje(`${pokemonJugador.name} ataca, pero ${pokemonOponente.name} reduce el daño a ${danio} por estar en defensa.`);
  } else {
    mostrarMensaje(`${pokemonJugador.name} ataca y hace ${danio} de daño a ${pokemonOponente.name}!`);
  }

  vidaOponente = Math.max(vidaOponente - danio, 0);
  actualizarBarraVida(barraVidaOponente, vidaOponente, pokemonOponente.hp, textoVidaOponente);

  if (vidaOponente > 0) {
    setTimeout(ataqueOponente, 1000);
  } else {
    mostrarMensaje("¡Ganaste la batalla!");
    mostrarBotonReiniciar(); // Mostrar el botón al ganar
  }
}

// Función de defensa del jugador
function defender() {
  enDefensaJugador = true;
  mostrarMensaje(`${pokemonJugador.name} se pone en modo de defensa y reduce el daño en el próximo ataque.`);
  setTimeout(() => {
    enDefensaJugador = false;
  }, 1000);
  setTimeout(ataqueOponente, 1000);
}

// Función para curarse
function curarse() {
  let curacion = Math.floor(Math.random() * 10 + 5);
  vidaJugador = Math.min(vidaJugador + curacion, pokemonJugador.hp);
  mostrarMensaje(`${pokemonJugador.name} se cura y recupera ${curacion} puntos de vida.`);
  actualizarBarraVida(barraVidaJugador, vidaJugador, pokemonJugador.hp, textoVidaJugador);
  setTimeout(ataqueOponente, 1000);
}

// Función de ataque del oponente
function ataqueOponente() {
  let accionOponente;
  
  // Lógica para determinar la acción de la máquina
  if (vidaOponente < pokemonOponente.hp * 0.3) {
    // Si la vida está por debajo del 30%, tiene mayor probabilidad de curarse
    accionOponente = Math.random() < 0.5 ? "curarse" : Math.random() < 0.5 ? "defender" : "atacar";
  } else {
    // De lo contrario, elige al azar entre atacar, defender y curarse
    accionOponente = Math.random() < 0.4 ? "atacar" : Math.random() < 0.4 ? "defender" : "curarse";
  }

  if (accionOponente === "atacar") {
    let danio = Math.floor(Math.random() * (pokemonOponente.attack / 2) + (pokemonOponente.attack / 2));

    if (enDefensaJugador) {
      danio = Math.floor(danio / 2);
      enDefensaJugador = false;
      mostrarMensaje(`${pokemonOponente.name} ataca, pero ${pokemonJugador.name} reduce el daño a ${danio} por estar en defensa.`);
    } else {
      mostrarMensaje(`${pokemonOponente.name} ataca y hace ${danio} de daño a ${pokemonJugador.name}!`);
    }

    vidaJugador = Math.max(vidaJugador - danio, 0);
    actualizarBarraVida(barraVidaJugador, vidaJugador, pokemonJugador.hp, textoVidaJugador);

    if (vidaJugador <= 0) {
      mostrarMensaje("Perdiste la batalla...");
      mostrarBotonReiniciar(); // Mostrar el botón al perder
    }
  } else if (accionOponente === "defender") {
    enDefensaOponente = true;
    mostrarMensaje(`${pokemonOponente.name} se pone en modo de defensa y reducirá el daño en el próximo ataque.`);
    setTimeout(() => {
      enDefensaOponente = false;
    }, 1000);
  } else if (accionOponente === "curarse") {
    let curacion = Math.floor(Math.random() * 10 + 5);
    vidaOponente = Math.min(vidaOponente + curacion, pokemonOponente.hp);
    mostrarMensaje(`${pokemonOponente.name} se cura y recupera ${curacion} puntos de vida.`);
    actualizarBarraVida(barraVidaOponente, vidaOponente, pokemonOponente.hp, textoVidaOponente);
  }
}
