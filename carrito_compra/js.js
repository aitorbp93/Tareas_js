const productos = [
    { id: 1, nombre: "Laptop", precio: 500 },
    { id: 2, nombre: "Smartphone", precio: 300 },
    { id: 3, nombre: "auriculares", precio: 50 },
    { id: 4, nombre: "Smartwatch", precio: 120 },
    { id: 5, nombre: "Teclado", precio: 40 },
    { id: 6, nombre: "Mochila", precio: 30 },
    { id: 7, nombre: "Camisa", precio: 25 },
    { id: 8, nombre: "Taza", precio: 10 }
];

// Función para obtener una cookie por su nombre
function obtenerCookie(nombre) {
    let cookies = document.cookie.split(';');
    for (let i = 0; i < cookies.length; i++) {
        let cookie = cookies[i].trim();
        if (cookie.indexOf(nombre + '=') === 0) {
            return decodeURIComponent(cookie.substring((nombre + '=').length, cookie.length));
        }
    }
    return null;
}

// Función para establecer una cookie con nombre y valor
function establecerCookie(nombre, valor, dias) {
    const fecha = new Date();
    fecha.setTime(fecha.getTime() + (dias * 24 * 60 * 60 * 1000));
    const expiracion = "expires=" + fecha.toUTCString();
    document.cookie = nombre + "=" + encodeURIComponent(valor) + ";" + expiracion + ";path=/";
}

// Obtener el carrito desde la cookie o inicializar un carrito vacío
let carrito = JSON.parse(obtenerCookie("carrito")) || [];

// Función para agregar un producto al carrito
function agregarAlCarrito(idProducto) {
    const producto = productos.find(prod => prod.id === idProducto);
    const itemCarrito = carrito.find(item => item.id === idProducto);

    if (itemCarrito) {
        itemCarrito.cantidad++;
    } else {
        carrito.push({ ...producto, cantidad: 1 });
    }

    actualizarCarrito();
}

// Función para actualizar el carrito en la interfaz y en la cookie
function actualizarCarrito() {
    const listaCarrito = document.getElementById("lista-carrito");
    listaCarrito.innerHTML = "";

    carrito.forEach(item => {
        const div = document.createElement("div");
        div.innerHTML = `
            <p>${item.nombre} - €${item.precio} x ${item.cantidad}</p>
            <button onclick="eliminarDelCarrito(${item.id})">Eliminar</button>
        `;
        listaCarrito.appendChild(div);
    });

    establecerCookie("carrito", JSON.stringify(carrito), 7);  // Guardar el carrito en una cookie por 7 días
}

// Función para eliminar un producto del carrito
function eliminarDelCarrito(idProducto) {
    carrito = carrito.filter(item => item.id !== idProducto);
    actualizarCarrito();
}

// Función para vaciar el carrito
function vaciarCarrito() {
    carrito = [];
    actualizarCarrito();
}

// Cargar el carrito desde la cookie al iniciar
document.addEventListener("DOMContentLoaded", actualizarCarrito);
