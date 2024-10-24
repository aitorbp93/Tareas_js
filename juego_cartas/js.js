// Lista de emojis para las cartas
const emojis = ['🍎', '🍌', '🍇', '🍉', '🍎', '🍌', '🍇', '🍉'];

// Variables para el juego
let cartasVolteadas = [];
let paresEncontrados = 0;  // Contador de pares correctamente encontrados

const contenedorCartas = document.querySelector('.contenedor-cartas');
const mensaje = document.getElementById('mensaje');
const botonReiniciar = document.getElementById('reiniciar-btn');
const encontrado = document.getElementById('encontrado');

// Función para iniciar el juego
function iniciarJuego() {
    mensaje.innerText = 'Encuentra los pares de emojis.';
    paresEncontrados = 0;  // Reiniciar el contador de pares encontrados
    cartasVolteadas = [];   // Vaciar las cartas volteadas
    encontrado.innerText = ''; // Limpiar el mensaje de victoria
    generarCartas();  // Generar las cartas nuevamente
    console.log('Juego iniciado.'); // Depuración
}

// Función para generar cartas al azar
function generarCartas() {
    contenedorCartas.innerHTML = ''; // Limpiar el contenedor de cartas
    let cartasEmojis = [...emojis]; // Hacer una copia del array de emojis
    cartasEmojis.sort(() => Math.random() - 0.5); // Barajar las cartas

    cartasEmojis.forEach((emoji, indice) => {
        const carta = document.createElement('div');
        carta.classList.add('carta');
        carta.dataset.emoji = emoji; // Almacenar el emoji en un atributo data
        carta.dataset.indice = indice;
        carta.innerText = ' '; // Inicialmente las cartas están volteadas
        carta.addEventListener('click', voltearCarta); // Añadir evento de clic
        contenedorCartas.appendChild(carta); // Añadir la carta al contenedor
    });
}

// Función para voltear la carta
function voltearCarta(evento) {
    const cartaSeleccionada = evento.target;

    // Evitar que se volteen más de dos cartas o que se voltee una ya completada
    if (cartasVolteadas.length >= 2 || cartaSeleccionada.classList.contains('completada') || cartaSeleccionada.classList.contains('volteada')) {
        return;
    }

    cartaSeleccionada.innerText = cartaSeleccionada.dataset.emoji; // Mostrar el emoji
    cartaSeleccionada.classList.add('volteada'); // Marcar la carta como volteada
    cartasVolteadas.push(cartaSeleccionada); // Añadir la carta a las volteadas

    console.log('Carta volteada:', cartaSeleccionada.dataset.emoji); // Depuración

    // Si se han volteado dos cartas, comprobar si coinciden
    if (cartasVolteadas.length === 2) {
        setTimeout(verificarPareja, 1000); // Esperar un segundo antes de verificar
    }
}

// Función para verificar si las dos cartas volteadas coinciden
function verificarPareja() {
    const [carta1, carta2] = cartasVolteadas;

    // Si los emojis coinciden, marcar las cartas como completadas
    if (carta1.dataset.emoji === carta2.dataset.emoji) {
        carta1.classList.add('completada');
        carta2.classList.add('completada');
        paresEncontrados++; // Incrementamos el número de pares encontrados
        console.log('Pares encontrados:', paresEncontrados); // Depuración

        // Verificar si se han encontrado todos los pares
        if (paresEncontrados == emojis.length / 2) {
            encontrado.innerText = '¡Has ganado! Encontraste todos los pares.';
            console.log('¡Has ganado!'); // Depuración
        }
    } else {
        // Si no coinciden, volver a ocultarlas después de un retraso
        carta1.innerText = ' ';
        carta2.innerText = ' ';
        carta1.classList.remove('volteada');
        carta2.classList.remove('volteada');
        console.log('No coincidieron:', carta1.dataset.emoji, carta2.dataset.emoji); // Depuración
    }

    cartasVolteadas = []; // Vaciar las cartas volteadas para la siguiente ronda
}

// Función para reiniciar el juego al hacer clic en el botón
botonReiniciar.addEventListener('click', iniciarJuego);

// Iniciar el juego al cargar la página
iniciarJuego();
