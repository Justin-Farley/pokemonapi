// script.js

document.addEventListener('DOMContentLoaded', () => {
    document.getElementById('search-button').addEventListener('click', () => {
        const searchInput = document.getElementById('search-input').value;
        const pokemonIds = searchInput.split(',').map(id => id.trim());
        
        Promise.all(pokemonIds.map(id => fetch(`https://pokeapi.co/api/v2/pokemon/${id.toLowerCase()}`)))
            .then(responses => Promise.all(responses.map(response => response.json())))
            .then(pokemonDataArray => {
                const pokemonList = document.getElementById('pokemon-list');
                pokemonList.innerHTML = ''; // Clear previous results

                pokemonDataArray.forEach(data => {
                    const name = data.name.charAt(0).toUpperCase() + data.name.slice(1);
                    const imageUrl = data.sprites.front_default;
                    const abilities = data.abilities.map(ability => ability.ability.name).join(', ');
                    const types = data.types.map(type => type.type.name).join(', ');
                    const stats = data.stats.map(stat => ({ name: stat.stat.name, value: stat.base_stat }));

                    // Create a card for each Pokémon
                    const pokemonCard = `
                        <div class="col-md-4 mb-4">
                            <div class="card">
                                <img src="${imageUrl}" alt="${name}" class="card-img-top">
                                <div class="card-body">
                                    <h5 class="card-title">${name}</h5>
                                    <p><strong>Abilities:</strong> ${abilities}</p>
                                    <p><strong>Types:</strong> ${types}</p>
                                    <table class="table table-bordered">
                                        <thead>
                                            <tr>
                                                <th>Stat</th>
                                                <th>Value</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            ${stats.map(stat => `
                                                <tr>
                                                    <td>${stat.name}</td>
                                                    <td>${stat.value}</td>
                                                </tr>
                                            `).join('')}
                                        </tbody>
                                    </table>
                                </div>
                            </div>
                        </div>
                    `;

                    pokemonList.innerHTML += pokemonCard;
                });
            })
            .catch(error => {
                console.error('Error fetching Pokémon data:', error);
            });
    });
});
