// Práctica 1: Arreglo de prueba con Pokémon iniciales
const pokemonIniciales = [
    { id: 1, nombre: 'Bulbasaur', tipo: 'grass' },
    { id: 4, nombre: 'Charmander', tipo: 'fire' },
    { id: 7, nombre: 'Squirtle', tipo: 'water' }
];

// Práctica 2: Consumo de la PokéAPI
const consultarPokemon = async (id) => {
    try {
        const url = `https://pokeapi.co/api/v2/pokemon/${id}`;
        const respuesta = await fetch(url);
        const pokemon = await respuesta.json();
        console.log(pokemon);
    } catch (error) {
        console.error('Error al obtener el Pokémon:', error);
    }
};

// Práctica 3: Función para obtener los primeros 150 Pokémon
const obtenerPrimeros150 = async () => {
    const contenedor = document.getElementById('pokedex-container');
    
    for (let i = 1; i <= 150; i++) {
        try {
            const url = `https://pokeapi.co/api/v2/pokemon/${i}`;
            const respuesta = await fetch(url);
            const pokemon = await respuesta.json();
            crearTarjetaAPI(pokemon);
        } catch (error) {
            console.error(`Error al obtener Pokémon ${i}:`, error);
        }
    }
};

// Función para crear tarjeta de Pokémon desde la API
function crearTarjetaAPI(pokemon) {
    const contenedor = document.getElementById('pokedex-container');
    
    const tarjeta = document.createElement('div');
    tarjeta.classList.add('card');
    tarjeta.dataset.nombre = pokemon.name.toLowerCase();
    
    const imagen = pokemon.sprites.other['official-artwork'].front_default || pokemon.sprites.front_default;
    const tipo = pokemon.types[0].type.name;
    
    tarjeta.innerHTML = `
        <p class="card-number">#${pokemon.id}</p>
        <img src="${imagen}" alt="${pokemon.name}">
        <p class="card-name">${pokemon.name.toUpperCase()}</p>
        <p class="card-type">Tipo: ${tipo}</p>
    `;
    
    tarjeta.addEventListener('click', () => abrirModal(pokemon));
    contenedor.appendChild(tarjeta);
}

// Función para abrir el modal con detalles del Pokémon
function abrirModal(pokemon) {
    const modal = document.getElementById('modal-pokemon');
    const imagen = pokemon.sprites.other['official-artwork'].front_default || pokemon.sprites.front_default;
    
    document.getElementById('modal-imagen').src = imagen;
    document.getElementById('modal-nombre').textContent = pokemon.name.toUpperCase();
    document.getElementById('modal-altura').textContent = (pokemon.height / 10) + ' m';
    document.getElementById('modal-peso').textContent = (pokemon.weight / 10) + ' kg';
    
    // Obtener estadísticas
    const stats = pokemon.stats;
    document.getElementById('modal-hp').textContent = stats[0].base_stat;
    document.getElementById('modal-ataque').textContent = stats[1].base_stat;
    document.getElementById('modal-defensa').textContent = stats[2].base_stat;
    
    modal.style.display = 'block';
}

// Función para cerrar el modal
function cerrarModal() {
    const modal = document.getElementById('modal-pokemon');
    modal.style.display = 'none';
}

// Evento para cerrar el modal con el botón X
document.querySelector('.close').addEventListener('click', cerrarModal);

// Evento para cerrar el modal al hacer clic fuera del contenido
window.addEventListener('click', (event) => {
    const modal = document.getElementById('modal-pokemon');
    if (event.target === modal) {
        cerrarModal();
    }
});

// Buscador funcional
document.getElementById('buscador').addEventListener('input', (event) => {
    const termino = event.target.value.toLowerCase();
    const tarjetas = document.querySelectorAll('.card');
    
    tarjetas.forEach(tarjeta => {
        const nombre = tarjeta.dataset.nombre;
        if (nombre.includes(termino)) {
            tarjeta.style.display = 'block';
        } else {
            tarjeta.style.display = 'none';
        }
    });
});

// Iniciar la aplicación
obtenerPrimeros150();
