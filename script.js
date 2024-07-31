// script.js

document.addEventListener('DOMContentLoaded', () => {
    const searchButton = document.getElementById('search-button');
    const searchInput = document.getElementById('search-input');
    const pokemonInfo = document.getElementById('pokemon-info');

    searchButton.addEventListener('click', async () => {
        const query = searchInput.value.trim();
        if (!query) {
            pokemonInfo.innerHTML = '<p class="text-danger">Please enter a Pokémon name or ID.</p>';
            return;
        }

        try {
            const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${query.toLowerCase()}`);
            if (!response.ok) {
                throw new Error('Pokémon not found');
            }
            const data = await response.json();
            displayPokemonInfo(data);
        } catch (error) {
            pokemonInfo.innerHTML = `<p class="text-danger">${error.message}</p>`;
        }
    });

    function displayPokemonInfo(data) {
        const { name, id, sprites, types } = data;
        
        // Create a new image element
        const pokemonImage = document.createElement('img');
        pokemonImage.src = sprites.front_default;
        pokemonImage.alt = name;
        pokemonImage.className = 'pokemon-image'; // Add a class for additional styling
        
        // Apply inline styles for the image
        pokemonImage.style.width = 'auto'; // Set width
        pokemonImage.style.height = '300px'; // Set height

        pokemonInfo.innerHTML = `
            <h2>${name.charAt(0).toUpperCase() + name.slice(1)}</h2>
            <p><strong>ID:</strong> ${id}</p>
            <p><strong>Types:</strong> ${types.map(typeInfo => typeInfo.type.name).join(', ')}</p>
        `;
        
        // Append the image to the pokemonInfo div
        pokemonInfo.appendChild(pokemonImage);
    }
});
