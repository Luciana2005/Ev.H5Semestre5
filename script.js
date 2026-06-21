
    // Simple scroll behavior for header
        window.addEventListener('scroll', () => {
            const header = document.querySelector('header');
            if (window.scrollY > 50) {
                header.classList.add('h-16');
                header.classList.add('shadow-md');
            } else {
                header.classList.remove('h-16');
                header.classList.remove('shadow-md');
            }
        });
    // boton conocenos

const btnConocenos = document.getElementById("btnConocenos");
const infoCard = document.getElementById("infoCard");
const cerrarCard = document.getElementById("cerrarCard");

btnConocenos.addEventListener("click", () => {
    infoCard.classList.remove("hidden");
});

cerrarCard.addEventListener("click", () => {
    infoCard.classList.add("hidden");
});
// card productos
const productos = {

    top:{
        nombre:"Top Minimal Azul",
        descripcion:"Top de algodón premium con un diseño minimalista.",
        imagen:"https://i.pinimg.com/originals/3b/3e/cf/3b3ecfaef9205c4710aa6036a720b9ce.png",
        colores:["#1F305E","#f5d0d0","#000"]
    },

    chaqueta:{
        nombre:"Chaqueta Urban",
        descripcion:"Chaqueta oversize moderna y cómoda.",
        imagen:"https://i.pinimg.com/originals/e4/b5/cc/e4b5cce27138cb6c85392820ed8615b5.png",
        colores:["#f7c6d9","#d4c5a4","#000"]
    },

    jeans:{
        nombre:"Jeans",
        descripcion:"Jeans de corte amplio con estilo urbano.",
        imagen:"https://i.pinimg.com/originals/02/c6/f4/02c6f404f2e537c814794e2e1e2d7534.png",
        colores:["blue","#000","#fff"]
    },

    falda:{
        nombre:"Falda Satin",
        descripcion:"Falda elegante con acabado satinado.",
        imagen:"https://i.pinimg.com/originals/11/bc/0e/11bc0e9d9fdb7ce2bd1322f091c7887f.png",
        colores:["#3d5b44","#000","#fff"]
    }

};


const cards = document.querySelectorAll(".producto");
const modal = document.getElementById("modalProducto");
let productoActual = null;
let colorSeleccionado = "";
let tallaSeleccionada = "";
let carrito = [];

cards.forEach(card=>{

    card.addEventListener("click",()=>{

        const p = productos[card.dataset.product];
        productoActual = p;

        document.getElementById("modalNombre").innerText = p.nombre;
        document.getElementById("modalDescripcion").innerText = p.descripcion;
        document.getElementById("modalImagen").src = p.imagen;

        let htmlColores = "";

        p.colores.forEach(color=>{

            htmlColores += `
            <div class="color-option"
                 data-color="${color}"
                 style="
                    background:${color};
                    width:50px;
                    height:50px;
                    border-radius:50%;
                    border:2px solid #ddd;
                    cursor:pointer;
                    transition:.3s;
                 ">
            </div>
            `;

        });

        document.getElementById("modalColores").innerHTML = htmlColores;

        // Selección de color
        document.querySelectorAll(".color-option").forEach(color=>{

            color.addEventListener("click",()=>{

                document.querySelectorAll(".color-option").forEach(c=>{

                    c.style.border = "2px solid #ddd";
                    c.style.transform = "scale(1)";
                    c.style.boxShadow = "none";

                });

                color.style.border = "3px solid #E56A2E";
                color.style.boxShadow = "0 0 15px rgba(229,106,46,.5)";                color.style.transform = "scale(1.15)";
                colorSeleccionado = color.dataset.color;

            });

        });

        modal.classList.remove("hidden");

    });

});


document.getElementById("cerrarModal").onclick = ()=>{

    modal.classList.add("hidden");

}


// Selección de talla

document.querySelectorAll(".talla-btn").forEach(btn=>{

    btn.addEventListener("click",()=>{

        document.querySelectorAll(".talla-btn").forEach(b=>{

            b.classList.remove(
            "bg-[#E56A2E]",
            "text-white"
             );

        });

        btn.classList.add(
        "bg-[#E56A2E]",
        "text-white"
        );
        tallaSeleccionada = btn.innerText;

    });

});

document.getElementById("btnBolsa")
.addEventListener("click",()=>{

    const carritoSection = document.getElementById("carrito");

    if(carritoSection){

        carritoSection.scrollIntoView({

            behavior:"smooth",
            block:"start"

        });

    }

});
document.getElementById("agregarCarrito").addEventListener("click",()=>{

    if(colorSeleccionado==="" || tallaSeleccionada===""){
        alert("Selecciona un color y una talla");
        return;
    }

    let precio = 0;

    if(productoActual.nombre==="Top Minimal Azul") precio = 180;
    if(productoActual.nombre==="Chaqueta Urban") precio = 450;
    if(productoActual.nombre==="Jeans") precio = 320;
    if(productoActual.nombre==="Falda Satin") precio = 280;

    carrito.push({

        nombre: productoActual.nombre,
        imagen: productoActual.imagen,
        color: colorSeleccionado,
        talla: tallaSeleccionada,
        precio: precio

    });

    actualizarCarrito();

    modal.classList.add("hidden");

});
function actualizarCarrito(){

    const lista = document.getElementById("listaCarrito");

    lista.innerHTML = "";

    let subtotal = 0;

    carrito.forEach((producto,index)=>{

        subtotal += producto.precio;

        lista.innerHTML += `

            <div class="flex gap-4 bg-[#F8F8F8]
            p-4 rounded-[30px]
            items-center
            shadow-md">
            <img src="${producto.imagen}"
            alt="${producto.nombre}"
            class="w-20 h-24 object-cover rounded-[20px]">

            <div class="flex-1">

                <h4 class="font-semibold">
                    ${producto.nombre}
                </h4>

                <p class="text-gray-500 text-sm">
                    Talla: ${producto.talla}
                </p>

                <div class="flex items-center gap-2 mt-2">

                    <span class="text-sm">
                        Color:
                    </span>

                    <div
                    style="
                    background:${producto.color};
                    width:20px;
                    height:20px;
                    border-radius:50%;
                    border:1px solid #ddd;
                    ">
                    </div>

                </div>

                <p class="text-[#E56A2E] font-bold mt-2">
                    ${producto.precio} Bs.
                </p>

            </div>

            <button
            onclick="eliminarProducto(${index})"
            class="w-10 h-10 rounded-full
            hover:bg-red-100 duration-300">
                <span class="material-symbols-outlined">
                    delete
                </span>

            </button>

        </div>

        `;

    });

    document.getElementById("contadorCarrito").innerText = carrito.length;

    document.getElementById("subtotal").innerText = subtotal + " Bs.";

    let envio = carrito.length > 0 ? 15 : 0;

    document.getElementById("envio").innerText = envio + " Bs.";

    document.getElementById("total").innerText =
        subtotal + envio + " Bs.";

}
function eliminarProducto(indice){

    carrito.splice(indice,1);

    actualizarCarrito();

}
// Botones outfit

const lookTop = document.getElementById("lookTop");
const lookBottom = document.getElementById("lookBottom");

// TOP
document.getElementById("btnTop").addEventListener("click",()=>{

    lookTop.src =
    "https://i.pinimg.com/originals/3b/3e/cf/3b3ecfaef9205c4710aa6036a720b9ce.png";

    lookTop.classList.remove("hidden");
    if(!outfitSeleccionado.includes("top")){

    outfitSeleccionado.push("top");

    precioOutfit += 180;

    document.getElementById("totalOutfit").innerText =
        precioOutfit + " Bs.";

}

});


// JEANS
document.getElementById("btnJeans").addEventListener("click",()=>{

    lookBottom.src =
    "https://i.pinimg.com/originals/02/c6/f4/02c6f404f2e537c814794e2e1e2d7534.png";

    lookBottom.classList.remove("hidden");
    if(!outfitSeleccionado.includes("jeans")){

    outfitSeleccionado.push("jeans");

    precioOutfit += 320;

    document.getElementById("totalOutfit").innerText =
        precioOutfit + " Bs.";

}

});


// FALDA
document.getElementById("btnFalda").addEventListener("click",()=>{

    lookBottom.src =
    "https://i.pinimg.com/originals/11/bc/0e/11bc0e9d9fdb7ce2bd1322f091c7887f.png";

    lookBottom.classList.remove("hidden");
if(!outfitSeleccionado.includes("falda")){

    outfitSeleccionado.push("falda");

    precioOutfit += 280;

    document.getElementById("totalOutfit").innerText =
        precioOutfit + " Bs.";

}
});
 let outfitSeleccionado = [];
let precioOutfit = 0;
document.getElementById("btnOutfitCarrito")
.addEventListener("click",()=>{

    outfitSeleccionado.forEach(prenda=>{

        if(prenda==="top"){

            carrito.push({

                nombre:"Top Minimal Azul",
                imagen:productos.top.imagen,
                color:"#1F305E",
                talla:"M",
                precio:180

            });

        }

        if(prenda==="jeans"){

            carrito.push({

                nombre:"Jeans",
                imagen:productos.jeans.imagen,
                color:"blue",
                talla:"M",
                precio:320

            });

        }

        if(prenda==="falda"){

            carrito.push({

                nombre:"Falda Satin",
                imagen:productos.falda.imagen,
                color:"#3d5b44",
                talla:"M",
                precio:280

            });

        }

    });

    actualizarCarrito();

});
// Métodos de pago

document.querySelectorAll(".metodoPago")
.forEach(btn=>{

    btn.addEventListener("click",()=>{

        document.querySelectorAll(".metodoPago")
        .forEach(b=>{

            b.style.background = "";
            b.style.color = "";
            b.style.borderColor = "";

        });

        btn.style.background = "#E56A2E";
        btn.style.color = "white";
        btn.style.borderColor = "#E56A2E";

    });

});


// Finalizar compra

document.getElementById("finalizarCompra")
.addEventListener("click",()=>{

    // Mostrar mensaje
    document.getElementById("mensajeCompra")
    .classList.remove("hidden");

    // Vaciar carrito
    carrito = [];

    // Reiniciar lista
    actualizarCarrito();

    // Reiniciar contador bolsa
    document.getElementById("contadorCarrito")
    .innerText = "0";

    // Reiniciar Build Your Look
    outfitSeleccionado = [];
    precioOutfit = 0;

    document.getElementById("totalOutfit")
    .innerText = "0 Bs.";

    // Ocultar prendas sobre la modelo
    lookTop.classList.add("hidden");
    lookBottom.classList.add("hidden");   

});


// Cerrar mensaje

document.getElementById("cerrarMensaje")
.addEventListener("click",()=>{

    document.getElementById("mensajeCompra")
    .classList.add("hidden");

    // Volver al inicio
    document.getElementById("inicio")
    .scrollIntoView({

        behavior:"smooth"

    });

});
// MODO OSCURO
// =====================

const botonModoOscuro =
document.getElementById("modoOscuro");


// Cambiar icono
function actualizarIconoModo(){

    if(document.body.classList.contains("dark")){

        botonModoOscuro.innerHTML = `
        <span class="material-symbols-outlined">
            light_mode
        </span>`;

    }else{

        botonModoOscuro.innerHTML = `
        <span class="material-symbols-outlined">
            dark_mode
        </span>`;

    }

}


// Revisar si el usuario tenía guardado el modo oscuro
if(localStorage.getItem("modo") === "oscuro"){

    document.body.classList.add("dark");

}


// Mostrar icono correcto al cargar la página
actualizarIconoModo();


// Al hacer clic en el botón
botonModoOscuro.addEventListener("click",()=>{

    document.body.classList.toggle("dark");

    if(document.body.classList.contains("dark")){

        localStorage.setItem("modo","oscuro");

    }else{

        localStorage.setItem("modo","claro");

    }

    // Cambiar icono
    actualizarIconoModo();

});
