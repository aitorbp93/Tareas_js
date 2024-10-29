// Verificar que el archivo JavaScript se está cargando
console.log("JavaScript cargado");

// Función para obtener los datos del carrito desde localStorage
function getCarrito() {
    return JSON.parse(localStorage.getItem("carrito") || "[]");
}

// Función para guardar los datos del carrito en localStorage
function setCarrito(carrito) {
    localStorage.setItem("carrito", JSON.stringify(carrito));
    console.log(`Carrito guardado en localStorage: ${JSON.stringify(carrito)}`);
}

// Función para actualizar visualmente el carrito
function actualizarCarrito() {
    console.log("Actualizando el carrito...");
    const carrito = getCarrito();
    const contenidoCarrito = document.querySelector(".contenido-carrito");
    const totalPrecio = document.getElementById("total-precio");

    contenidoCarrito.innerHTML = "";  // Limpiamos la vista actual del carrito

    if (carrito.length === 0) {
        console.log("El carrito está vacío.");
        totalPrecio.textContent = `Total: 0 €`;
        return;
    }

    let total = 0;

    carrito.forEach((item, index) => {
        console.log(`Producto en el carrito: ${item.nombre} - Cantidad: ${item.cantidad}`);
        
        const itemElemento = document.createElement("div");
        itemElemento.innerHTML = `
            <p>${item.nombre} - ${item.cantidad} x ${item.precio} €</p>
            <button onclick="eliminarProducto(${index})">Eliminar</button>
        `;
        contenidoCarrito.appendChild(itemElemento);

        total += item.cantidad * item.precio;
    });

    totalPrecio.textContent = `Total: ${total} €`;
    console.log(`Total actualizado: ${total} €`);
}

// Agregar producto al carrito
document.querySelectorAll(".agregar-carrito").forEach(boton => {
    boton.addEventListener("click", () => {
        console.log("Botón de agregar al carrito pulsado");
        const producto = boton.closest(".producto");
        const id = producto.getAttribute("data-id");
        const nombre = producto.getAttribute("data-nombre");
        const precio = parseFloat(producto.getAttribute("data-precio"));
        let carrito = getCarrito();

        const index = carrito.findIndex(item => item.id === id);
        if (index === -1) {
            carrito.push({ id, nombre, precio, cantidad: 1 });
            console.log(`Producto añadido: ${nombre}`);
        } else {
            carrito[index].cantidad += 1;
            console.log(`Cantidad incrementada para: ${nombre}`);
        }

        setCarrito(carrito);
        actualizarCarrito();
    });
});

// Eliminar producto del carrito
function eliminarProducto(index) {
    console.log(`Eliminando producto en índice: ${index}`);
    let carrito = getCarrito();
    carrito.splice(index, 1);
    setCarrito(carrito);
    actualizarCarrito();
}

// Vaciar el carrito
document.getElementById("vaciar-carrito").addEventListener("click", () => {
    console.log("Vaciando el carrito...");
    setCarrito([]);
    actualizarCarrito();
});

// Cargar el carrito al inicio
console.log("Cargando carrito al inicio...");
actualizarCarrito();
