// Lista de emojis para las cartas
const emojis = ['🍎', '🍌', '🍇', '🍉', ];

// Variables para el juego
let cartasVolteadas = [];
let paresEncontrados = 0;

const contenedorCartas = document.querySelector('.contenedor-cartas');
const mensaje = document.getElementById('mensaje');
const botonReiniciar = document.getElementById('reiniciar-btn');

// Función para iniciar el juego
function iniciarJuego() {
    mensaje.innerText = 'Encuentra los pares de emojis.';
    paresEncontrados = 0;
    cartasVolteadas = [];
    generarCartas();
}

// Función para generar cartas al azar
function generarCartas() {
    contenedorCartas.innerHTML = '';
    const cartasEmojis = [...emojis, ...emojis]; // Duplicamos los emojis para tener pares
    cartasEmojis.sort(() => Math.random() - 0.5); // Barajamos las cartas

    cartasEmojis.forEach((emoji, indice) => {
        const carta = document.createElement('div');
        carta.classList.add('carta');
        carta.dataset.emoji = emoji;
        carta.dataset.indice = indice;
        carta.innerText = ' '; // Inicialmente las cartas están volteadas
        carta.addEventListener('click', voltearCarta);
        contenedorCartas.appendChild(carta);
    });
}

// Función para voltear la carta
function voltearCarta(evento) {
    const cartaSeleccionada = evento.target;

    // Evitar que se volteen más de dos cartas o que se voltee una ya completada
    if (cartasVolteadas.length >= 2 || cartaSeleccionada.classList.contains('completada')) {
        return;
    }

    cartaSeleccionada.innerText = cartaSeleccionada.dataset.emoji;
    cartaSeleccionada.classList.add('volteada');
    cartasVolteadas.push(cartaSeleccionada);

    // Si se han volteado dos cartas, comprobar si coinciden
    if (cartasVolteadas.length === 2) {
        verificarPareja();
    }
}

// Función para verificar si las dos cartas volteadas coinciden
function verificarPareja() {
    const [carta1, carta2] = cartasVolteadas;

    if (carta1.dataset.emoji === carta2.dataset.emoji) {
        carta1.classList.add('completada');
        carta2.classList.add('completada');
        paresEncontrados++;

        if (paresEncontrados === emojis.length) {
            mensaje.innerText = '¡Has ganado! Encontraste todos los pares.';
        }
    } else {
        // Si no coinciden, las volvemos a ocultar después de un pequeño retraso
        setTimeout(() => {
            carta1.innerText = ' ';
            carta2.innerText = ' ';
            carta1.classList.remove('volteada');
            carta2.classList.remove('volteada');
        }, 500);
    }

    cartasVolteadas = [];
}

// Función para reiniciar el juego
botonReiniciar.addEventListener('click', iniciarJuego);

// Iniciar el juego al cargar la página
iniciarJuego();
