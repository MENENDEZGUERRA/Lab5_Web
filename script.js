// Configuración inicial del body
document.body.style.margin = '0';
document.body.style.backgroundColor = '#282328';
document.body.style.color = '#a3a29a';
document.body.style.fontFamily = 'Arial, sans-serif';

// Simulación de Posts
let posts = [{
    "imagen": "https://www.boredpanda.com/blog/wp-content/uploads/2022/08/63061e6e8d473_vrcu3jrl9se91__700.jpg",
    "titulo": "Esto apareció en mi patio, ¿Qué hago?",
    "descripcion": "Esta roca (creo) con forma de tiburón apareció en mi patio ¿Qué hago?",
    "id": 1,
    "comentarios": [
        { "id": 1, "comentario": "Eso es normal, pasa todos los martes" },
        { "id": 2, "comentario": "Muy raro" }
    ]
}, {
    "imagen": "https://www.boredpanda.com/blog/wp-content/uploads/2022/08/63061b3dbea9f_kbkyw30t4rq81__700.jpg",
    "titulo": "Mi hija hizo esto para el colegio...",
    "descripcion": "Mi hija hiz esto para una tarea del colegio, cada vez que intento agarrarlo quedo parcialmente ciego ¿Alguien tiene una idea de que puede ser?",
    "id": 2,
    "comentarios": [
        { "id": 1, "comentario": "Pues a mí me parece bonito" },
        { "id": 2, "comentario": "Medicala" }
    ]
}];

// Estado de la aplicación
let postSeleccionadoId = null;

// Elementos principales
const elementosUI = {
  barraBusqueda: crearBarraBusqueda(),
  contenedorPosts: crearContenedorPosts(),
  detallePost: crearContenedorDetallePost(),
  seccionComentarios: null
};

// Inicializar la interfaz
document.body.append(
  elementosUI.barraBusqueda,
  elementosUI.contenedorPosts,
  elementosUI.detallePost
);

// Renderizar posts iniciales
actualizarListadoPosts(posts);

// Función para crear la barra de búsqueda
function crearBarraBusqueda() {
  const contenedor = document.createElement('div');
  contenedor.style.position = 'fixed';
  contenedor.style.top = '0';
  contenedor.style.width = '100%';
  contenedor.style.padding = '1rem';
  contenedor.style.backgroundColor = '#545c7e';

  const input = document.createElement('input');
  input.style.width = '100%';
  input.style.padding = '0.5rem';
  input.placeholder = 'Buscar posts...';
  input.addEventListener('input', () => filtrarPosts(input.value));

  contenedor.appendChild(input);
  return contenedor;
}

// Función para crear el contenedor de posts
function crearContenedorPosts() {
  const contenedor = document.createElement('div');
  contenedor.style.marginTop = '80px';
  contenedor.style.padding = '1rem';
  return contenedor;
}

// Función para crear el contenedor de detalle de post
function crearContenedorDetallePost() {
  const contenedor = document.createElement('div');
  contenedor.style.display = 'none';
  contenedor.style.marginTop = '60px';
  contenedor.style.padding = '1rem';
  contenedor.style.paddingBottom = '100px';
  return contenedor;
}

// Función para actualizar la lista de posts
function actualizarListadoPosts(postsMostrar) {
  elementosUI.contenedorPosts.innerHTML = '';
  
  postsMostrar.forEach(post => {
    const tarjeta = document.createElement('div');
    tarjeta.style.backgroundColor = '#373239';
    tarjeta.style.margin = '1rem 0';
    tarjeta.style.padding = '1rem';
    tarjeta.style.borderRadius = '5px';
    tarjeta.style.cursor = 'pointer';
    tarjeta.addEventListener('click', () => mostrarDetallePost(post.id));

    const imagen = document.createElement('img');
    imagen.src = post.imagen;
    imagen.style.width = '150px';
    imagen.style.height = '150px';
    imagen.style.objectFit = 'cover';

    const titulo = document.createElement('h1');
    titulo.textContent = post.titulo;
    
    const descripcion = document.createElement('p');
    descripcion.textContent = post.descripcion;

    tarjeta.append(imagen, titulo, descripcion);
    elementosUI.contenedorPosts.appendChild(tarjeta);
  });
}

// Función para mostrar el detalle de un post
function mostrarDetallePost(postId) {
  postSeleccionadoId = postId;
  const post = posts.find(p => p.id === postId);
  
  elementosUI.detallePost.innerHTML = '';
  elementosUI.detallePost.style.display = 'block';
  elementosUI.contenedorPosts.style.display = 'none';
  
  // Crear elementos del detalle
  const botonVolver = crearBotonVolver();
  const contenedorImagen = crearContenedorImagen(post.imagen);
  const seccionComentarios = crearSeccionComentarios(post.comentarios);
  const formularioComentario = crearFormularioComentario();

  elementosUI.detallePost.append(
    botonVolver,
    contenedorImagen,
    crearElementoTitulo(post.titulo),
    crearElementoDescripcion(post.descripcion),
    seccionComentarios,
    formularioComentario
  );
}

// Función para crear el botón de volver
function crearBotonVolver() {
  const boton = document.createElement('button');
  boton.textContent = 'Volver';
  boton.style.backgroundColor = '#c56981';
  boton.style.color = 'white';
  boton.style.border = 'none';
  boton.style.padding = '0.5rem 1rem';
  boton.style.marginBottom = '2rem';
  boton.addEventListener('click', () => {
    elementosUI.detallePost.style.display = 'none';
    elementosUI.contenedorPosts.style.display = 'block';
  });
  return boton;
}

// Función para crear el contenedor de la imagen
function crearContenedorImagen(urlImagen) {
  const contenedor = document.createElement('div');
  contenedor.style.maxWidth = '600px';
  contenedor.style.margin = '0 auto 2rem';
  
  const imagen = document.createElement('img');
  imagen.src = urlImagen;
  imagen.style.width = '100%';
  imagen.style.height = 'auto';
  imagen.style.maxHeight = '600px';
  imagen.style.objectFit = 'contain';
  
  contenedor.appendChild(imagen);
  return contenedor;
}

// Función para crear la sección de comentarios
function crearSeccionComentarios(comentarios) {
  const contenedor = document.createElement('div');
  contenedor.style.maxHeight = 'calc(100vh - 400px)';
  contenedor.style.overflowY = 'auto';
  contenedor.style.marginBottom = '2rem';
  
  comentarios.forEach(comentario => {
    const elemento = document.createElement('p');
    elemento.style.margin = '0.5rem 0';
    elemento.innerHTML = detectarEnlaces(comentario.comentario);
    contenedor.appendChild(elemento);
  });
  
  return contenedor;
}

// Función para crear el formulario de comentarios
function crearFormularioComentario() {
  const formulario = document.createElement('div');
  formulario.style.backgroundColor = '#545c7e';
  formulario.style.padding = '1rem';
  formulario.style.borderRadius = '5px';

  const input = document.createElement('input');
  input.style.width = 'calc(100% - 70px)';
  input.placeholder = 'Escribe un comentario... (máx. 140 caracteres)';
  input.maxLength = 140;

  const boton = document.createElement('button');
  boton.textContent = 'Enviar';
  boton.style.backgroundColor = '#c56981';
  boton.style.color = 'white';
  boton.style.border = 'none';
  boton.style.padding = '0.5rem 1rem';
  boton.style.marginLeft = '0.5rem';
  boton.addEventListener('click', () => agregarComentario(input));

  input.addEventListener('keypress', (e) => {
    if (e.key === 'Enter') agregarComentario(input);
  });

  formulario.append(input, boton);
  return formulario;
}

// Función para detectar enlaces en el texto
function detectarEnlaces(texto) {
  const regexURL = /(https?:\/\/[^\s]+)/g;
  return texto.replace(regexURL, url => {
    if (url.match(/\.(jpeg|jpg|gif|png)$/)) {
      return `<img src="${url}" style="max-width: 200px; display: block; margin: 0.5rem 0;" />`;
    }
    return `<a href="${url}" target="_blank" style="color: #c56981;">${url}</a>`;
  });
}

// Función para filtrar posts
function filtrarPosts(textoBusqueda) {
  const postsFiltrados = posts.filter(post => 
    post.titulo.toLowerCase().includes(textoBusqueda.toLowerCase()) ||
    post.descripcion.toLowerCase().includes(textoBusqueda.toLowerCase())
  );
  actualizarListadoPosts(postsFiltrados);
}

// Función para agregar comentarios
function agregarComentario(input) {
  if (!input.value.trim()) return;
  
  const post = posts.find(p => p.id === postSeleccionadoId);
  post.comentarios.push({
    id: post.comentarios.length + 1,
    comentario: input.value
  });
  
  input.value = '';
  mostrarDetallePost(postSeleccionadoId);
}

// Funciones auxiliares para crear elementos
function crearElementoTitulo(texto) {
  const elemento = document.createElement('h1');
  elemento.textContent = texto;
  elemento.style.marginBottom = '1rem';
  return elemento;
}

function crearElementoDescripcion(texto) {
  const elemento = document.createElement('p');
  elemento.textContent = texto;
  elemento.style.marginBottom = '2rem';
  return elemento;
}