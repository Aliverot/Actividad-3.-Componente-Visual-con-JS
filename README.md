# Galeria Lightbox - Componente Visual con JavaScript

**Autor:** Leonardo Fuentes Lopez  
**Institucion:** Instituto Tecnologico de Oaxaca  
**No. de Control:** 22161062  

## Nombre del componente

**LightboxGaleria**

## Que problema resuelve

Cuando una pagina tiene varias imagenes, muchas veces se ven pequenas y el usuario no puede revisarlas comodamente.
LightboxGaleria resuelve este problema mostrando la imagen seleccionada en grande, sobre un fondo oscuro, con botones para avanzar o regresar entre las imagenes de la galeria.

Este componente es reutilizable porque no depende de imagenes especificas. Solo se le indica que clase CSS debe buscar y automaticamente agrupa esas imagenes para mostrarlas en el visor.

## Instalacion

Para usar el componente en un proyecto HTML, agrega el archivo CSS dentro de la etiqueta `<head>`.

```html
<link rel="stylesheet" href="css/componente.css">
```

Antes de cerrar la etiqueta `</body>`, agrega primero el archivo del componente y despues tu archivo principal.

```html
<script src="js/componente.js"></script>
<script src="js/index.js"></script>
```

## Uso y ejemplos de codigo

### 1. Crear imagenes para la galeria

En el HTML se colocan imagenes normales. La clase `imagen-galeria` sirve para que el componente las detecte.

```html
<div class="galeria">
    <figure class="tarjeta-imagen">
        <img class="imagen-galeria" src="img/imagen1.jpeg" data-titulo="Imagen 1" alt="Imagen 1">
        <figcaption>Imagen 1</figcaption>
    </figure>

    <figure class="tarjeta-imagen">
        <img class="imagen-galeria" src="img/imagen2.jpg" data-titulo="Imagen 2" alt="Imagen 2">
        <figcaption>Imagen 2</figcaption>
    </figure>
</div>
```

### 2. Activar el componente

En el archivo `js/index.js` se activa el componente con una sola linea.

```javascript
LightboxGaleria.crear(".imagen-galeria");
```

### 3. Reutilizarlo con otra galeria

Si en otra pagina las imagenes tienen otra clase, no se reescribe el componente. Solo se cambia el selector.

```html
<img class="foto-producto" src="img/producto1.jpg" data-titulo="Producto 1" alt="Producto 1">
<img class="foto-producto" src="img/producto2.jpg" data-titulo="Producto 2" alt="Producto 2">
```

```javascript
LightboxGaleria.crear(".foto-producto");
```

### 4. Codigo principal del componente

El componente crea el visor con JavaScript y despues asigna eventos a las imagenes, al boton cerrar y a las flechas.

```javascript
let LightboxGaleria = {
    imagenes: [],
    posicion: 0,

    crear: function(selector) {
        this.imagenes = document.querySelectorAll(selector);
        this.crearLightbox();
        this.agregarEventos();
    },

    abrir: function(indice) {
        this.posicion = indice;
        this.mostrarImagen();
        document.getElementById("lightbox").classList.add("activo");
        document.body.classList.add("sin-scroll");
    },

    cerrar: function() {
        document.getElementById("lightbox").classList.remove("activo");
        document.body.classList.remove("sin-scroll");
    },

    siguiente: function() {
        this.posicion++;

        if (this.posicion >= this.imagenes.length) {
            this.posicion = 0;
        }

        this.mostrarImagen();
    },

    anterior: function() {
        this.posicion--;

        if (this.posicion < 0) {
            this.posicion = this.imagenes.length - 1;
        }

        this.mostrarImagen();
    }
};
```

## Capturas de pantalla

A continuacion se muestra el funcionamiento del componente visual.

### Galeria de imagenes

Vista inicial de la pagina con las miniaturas de la galeria.

![Galeria de imagenes](img/captura-galeria.png)

### Lightbox funcionando

Al hacer clic sobre una imagen, se abre el visor en grande con flechas para cambiar de imagen.

![Lightbox funcionando](img/captura-lightbox.png)

### Consola

No aplica en este componente, porque su funcionamiento principal es visual e interactivo. No depende de mensajes en consola para demostrar su uso.

## Video demostrativo

Pendiente por agregar.

<!-- Aqui se puede colocar despues el enlace del video de YouTube o Drive. -->

