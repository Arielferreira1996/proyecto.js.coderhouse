// DOCUMENTOS TRAIDOS DEL DOM PARA TRABAJARLOS EN JS*****************************************************

const contenedorProductos = document.querySelector("#contenedor-productos");
const botonesNavbar = document.querySelectorAll(".botones-navbar");
const tituloInicio = document.querySelector("#titulo-principal");
let botonesAgregar = document.querySelectorAll(".prod-agregar");
const numero = document.querySelector("#numero");


// TRAEMOS LOS PRODUCTOS DESDE DATA.JSON******************************************************************

fetch("/data.json")
    .then((resp) => resp.json())
    .then((data) => {
        // FUNCION PARA CARGAR PRODUCTOS DEL DATA.JSON***************************************************

        function pintarProductos(productosSeleccionados) {

            contenedorProductos.innerHTML = "";

            productosSeleccionados.forEach(producto => {

                const div = document.createElement("div");
                div.classList.add("producto");
                div.innerHTML = `
        <img class="prod-imagen" src="${producto.imagen}" alt="${producto.titulo}">
        <div class="prod-detalles">
            <h3 class="prod-titulo">${producto.titulo}</h3>
            <p class="prod-precio">$${producto.precio}</p>
            <button class="prod-agregar" id="${producto.id}">Agregar</button>
        </div>
        `;
                contenedorProductos.append(div);
            })
            btnAgregar();
        }
        // EVENTO Y ELSE IF PARA QUE LA PAGINA CARGUE LOS PRODUCTOS SEGUN EL USUARIO CLIKEE EN LA PAGINA**************************
        pintarProductos(data);
        botonesNavbar.forEach(boton => {
            boton.addEventListener("click", (e) => {

                botonesNavbar.forEach(boton => boton.classList.remove("active"));
                e.currentTarget.classList.add("active");

                if (e.currentTarget.id != "todos") {
                    const prodCategoria = data.find(data => data.categoria.id === e.currentTarget.id)
                    tituloInicio.innerText = prodCategoria.categoria.nombre;

                    let productosElegido = data.filter(data => data.categoria.id === e.currentTarget.id);
                    pintarProductos(productosElegido);
                } else {
                    tituloInicio.innerText = "Todos los Productos";
                    pintarProductos(data);
                }

            })
        });

        // FUNCIONES PARA AGREGAR PRODUCTOS AL CARRITO Y PARA QUE NO SE RESETEEN EN EL DOM **************************************

        function btnAgregar() {
            botonesAgregar = document.querySelectorAll(".prod-agregar");
            
            botonesAgregar.forEach(boton => {
                boton.addEventListener("click", agregarAlCarrito);
                Toastify({
                    text: "Producto Agregado",
                   className: "info",
                    style: {
                      background: "linear-gradient(90deg, rgba(249,255,98,1) 0%, rgba(255,244,0,1) 35%, rgba(255,59,0,1) 69%);",
                    }
                  }).showToast();
            })
            
        }

        // ARRAY VACIO DONDE SE AGREGARAN LOS PRODUCTOS SELECCIONADOS POR EL CLIENTE (carrito)********************************************
        let carrito;

        let carritoLs = localStorage.getItem("productos-en-carrito");


        if (carritoLs) {
            carrito = JSON.parse(carritoLs);
            actualizarNumero();
        } else {
            carrito = [];
        }


        // FUNCION PARA AGREGAR AL CARRITO LOS PRODUCTOS SELECCIONADOS POR EL CLIENTE*****************************************************
        function agregarAlCarrito(e) {
            const idBoton = e.currentTarget.id;
            const productoAgregado = data.find(data => data.id === idBoton);

            if (carrito.some(producto => producto.id === idBoton)) {
                const indice = carrito.findIndex(data => data.id === idBoton);
                carrito[indice].cantidad++;
            } else {
                productoAgregado.cantidad = 1;
                carrito.push(productoAgregado);
            }
            actualizarNumero();

            localStorage.setItem("productos-en-carrito", JSON.stringify(carrito))
        }

        function actualizarNumero() {
            let numeroNuevo = carrito.reduce((acc, producto) => acc + producto.cantidad, 0);
            numero.innerText = numeroNuevo;
        }

    })

















//   producto agregado
// let botonAgregar = document.querySelectorAll("#agregar");

// botonAgregar.addEventListener("click", function() {
    
//  });