let LightboxGaleria = {
    // Almacena las imágenes seleccionadas del DOM y el índice de la imagen que se está viendo
    imagenes: [],
    posicion: 0,

    // Función principal de inicialización. Recibe un selector (ej. '.galeria img') para que sea reutilizable
    crear: function(selector) {
        this.imagenes = document.querySelectorAll(selector);
        this.crearLightbox();
        this.agregarEventos();
    },

    // Genera e inyecta dinámicamente la estructura HTML del modal directamente desde JS
    crearLightbox: function() {
        let lightbox = document.createElement("div");

        lightbox.id = "lightbox";
        lightbox.className = "lightbox";
        lightbox.innerHTML =
            "<div class='lightbox-contenido'>" +
                "<button type='button' id='cerrarLightbox' class='lightbox-cerrar'>&times;</button>" +
                "<button type='button' id='anteriorLightbox' class='lightbox-flecha lightbox-anterior'>&#10094;</button>" +
                "<img id='imagenLightbox' class='lightbox-imagen' src='' alt=''>" +
                "<button type='button' id='siguienteLightbox' class='lightbox-flecha lightbox-siguiente'>&#10095;</button>" +
                "<div class='lightbox-info'>" +
                    "<h2 id='tituloLightbox'></h2>" +
                    "<p id='contadorLightbox'></p>" +
                "</div>" +
            "</div>";

        document.body.appendChild(lightbox);
    },

    agregarEventos: function() {
        // Guarda la referencia al objeto LightboxGaleria para poder usarla dentro de los manejadores de eventos
        let galeria = this;
        let cerrar = document.getElementById("cerrarLightbox");
        let anterior = document.getElementById("anteriorLightbox");
        let siguiente = document.getElementById("siguienteLightbox");
        let lightbox = document.getElementById("lightbox");

        // Asigna el evento click a cada miniatura para que abra el modal en la posición correcta
        for (let i = 0; i < this.imagenes.length; i++) {
            this.imagenes[i].addEventListener("click", function() {
                galeria.abrir(i);
            });
        }

        cerrar.addEventListener("click", function() {
            galeria.cerrar();
        });

        anterior.addEventListener("click", function() {
            galeria.anterior();
        });

        siguiente.addEventListener("click", function() {
            galeria.siguiente();
        });

        // Permite cerrar el lightbox si el usuario hace clic fuera de la imagen (en el fondo oscuro)
        lightbox.addEventListener("click", function(evento) {
            if (evento.target.id === "lightbox") {
                galeria.cerrar();
            }
        });
    },

    abrir: function(indice) {
        this.posicion = indice;
        this.mostrarImagen();
        // Muestra el modal añadiendo una clase CSS y bloquea el scroll de la página de fondo
        document.getElementById("lightbox").classList.add("activo");
        document.body.classList.add("sin-scroll");
    },

    cerrar: function() {
        // Oculta el modal y restaura el scroll normal de la página
        document.getElementById("lightbox").classList.remove("activo");
        document.body.classList.remove("sin-scroll");
    },

    mostrarImagen: function() {
        let imagenActual = this.imagenes[this.posicion];
        let imagenGrande = document.getElementById("imagenLightbox");
        let titulo = document.getElementById("tituloLightbox");
        let contador = document.getElementById("contadorLightbox");
        
        // Intenta usar un atributo personalizado para el título; si no existe, usa el 'alt' como respaldo
        let tituloTexto = imagenActual.getAttribute("data-titulo");
        if (tituloTexto === null) {
            tituloTexto = imagenActual.alt;
        }

        // Actualiza el DOM con los datos de la imagen correspondiente
        imagenGrande.src = imagenActual.src;
        imagenGrande.alt = imagenActual.alt;
        titulo.textContent = tituloTexto;
        contador.textContent = (this.posicion + 1) + " de " + this.imagenes.length;
    },

    siguiente: function() {
        this.posicion++;

        // Si avanzas después de la última imagen, regresas a la primera
        if (this.posicion >= this.imagenes.length) {
            this.posicion = 0;
        }

        this.mostrarImagen();
    },

    anterior: function() {
        this.posicion--;

        // Si retrocedes desde la primera imagen, vas a la última
        if (this.posicion < 0) {
            this.posicion = this.imagenes.length - 1;
        }

        this.mostrarImagen();
    }
};