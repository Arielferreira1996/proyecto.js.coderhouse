let carrito = localStorage.getItem("productos-en-carrito");
carrito = JSON.parse(carrito)

// CONSTANTES Y VARIABLES UTILIZADAS PARA LA PAGINA**********************************************************************

const contenedorCarritoVacio = document.querySelector("#carrito-vacio");
const contenedorProductos = document.querySelector("#carrito-productos");
const contenedorCarritoAcciones = document.querySelector("#carrito-acciones");
const contenedorCarritoComprado = document.querySelector("#carrito-comprado");
let botonesEliminar = document.querySelectorAll(".carrito-producto-eliminar");
const botonVaciar = document.querySelector("#carrito-acciones-vaciar");
const contenedorTotal = document.querySelector("#total");
const botonComprar = document.querySelector("#carrito-acciones-comprar");

// FUNCION PARA PINTAR LOS PRODUCTOS SELECCIONADOS POR EL USUARIO AL CARRITO *********************************************

function cargarProductosCarrito() {
    if (carrito && carrito.length > 0) {
        contenedorCarritoVacio.classList.add("disabled");
        contenedorProductos.classList.remove("disabled");
        contenedorCarritoAcciones.classList.remove("disabled");
        contenedorCarritoComprado.classList.add("disabled");

        contenedorProductos.innerHTML = "";

        carrito.forEach(producto => {
            const div = document.createElement("div");
            div.classList.add("carrito-producto");
            div.innerHTML = `
                    <img class="carrito-producto-imagen" src="${producto.imagen}" alt="${producto.titulo}">
                        <div class="carrito-producto-titulo">
                            <small>Titulo</small>
                            <h3>${producto.titulo}</h3>
                        </div>
                        <div class="carrito-producto-cantidad">
                            <small>Cantidad</small>
                            <p>${producto.cantidad}</p>
                        </div>
                        <div class="carrito-producto-precio">
                            <small>Precio</small>
                            <p>$${producto.precio}</p>
                        </div>
                        <div class="carrito-producto-subtotal">
                            <small>Subtotal</small>
                            <p>$${producto.precio * producto.cantidad}</p>
                        </div>
                        <button class="carrito-producto-eliminar" id="${producto.id}"><i class="bi bi-trash3-fill"></i></button>
                    </div>
    `;
            contenedorProductos.append(div);
        })

        actualizarBotonesEliminar();
        actualizarTotal();

    } else {
        contenedorCarritoVacio.classList.remove("disabled");
        contenedorProductos.classList.add("disabled");
        contenedorCarritoAcciones.classList.add("disabled");
        contenedorCarritoComprado.classList.add("disabled");
    }
}

cargarProductosCarrito();


// EVENTOS Y FUNCIONES PARA ELIMINAR PORDUCTOS DEL CARRITO*****************************************************

function actualizarBotonesEliminar() {
    botonesEliminar = document.querySelectorAll(".carrito-producto-eliminar");

    botonesEliminar.forEach(boton => {
        boton.addEventListener("click", eliminarDelCarrito);
    })
}

function eliminarDelCarrito(e) {
    let idBoton = e.currentTarget.id;
    const indice = carrito.findIndex(producto => producto.id === idBoton);
    Swal.fire({
        title: 'Desea eliminar el producto?',
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Eliminar!'
    }).then((result) => {
        if (result.isConfirmed) {
            Swal.fire(
                'Eliminado!',
                'Producto Eliminado.',
                'success'
            )
        }
        carrito.splice(indice, 1);
        cargarProductosCarrito();

        localStorage.setItem("productos-en-carrito", JSON.stringify(carrito));
    })
}

// EVENTO Y FUNCION PARA VACIAR EL CARRITO ******************************************************************

botonVaciar.addEventListener("click", vaciarCarrito);

function vaciarCarrito() {
    Swal.fire({
        title: 'Desea eliminar todos los productos?',
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Eliminar!'
    }).then((result) => {
        if (result.isConfirmed) {
            Swal.fire(
                'Eliminado!',
                'Producto Eliminado.',
                'success'
            )
        }
        carrito.length = 0;
        localStorage.setItem("productos-en-carrito", JSON.stringify(carrito));
        cargarProductosCarrito();
    })
}

// FUNCION PARA CALCULAR EL TOTAL DE LA COMPRA*************************************************************************

function actualizarTotal() {
    const totalCalculado = carrito.reduce((acc, producto) => acc + (producto.precio * producto.cantidad), 0);
    total.innerText = `$${totalCalculado}`;
}

// EVENTO Y FUNCION PARA REALIZAR LA COMPRA *****************************************************************************

botonComprar.addEventListener("click", comprarCarrito);

function comprarCarrito() {

    carrito.length = 0;
    localStorage.setItem("productos-en-carrito", JSON.stringify(carrito));

    contenedorCarritoVacio.classList.add("disabled");
    contenedorProductos.classList.add("disabled");
    contenedorCarritoAcciones.classList.add("disabled");
    contenedorCarritoComprado.classList.remove("disabled");
}