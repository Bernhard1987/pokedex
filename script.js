let currentPokemon;

async function renderPokemonList() {
    document.getElementById('pokemonList').innerHTML = '';
    for (let i = 1; i < 152; i++) {
        const url = `https://pokeapi.co/api/v2/pokemon/${i}`;
        let response = await fetch(url);
        currentPokemon = await response.json();
        let sprites = currentPokemon['sprites'];

        document.getElementById('pokemonList').innerHTML += `
        <div class="pokemonListItem" onclick="loadPokemon(${i})">
            <div class="pokemonListItemHeadline">
            <h3>${currentPokemon['name']}</h3>
            <h3>#${i}</h3>
            </div>
            <img src="${sprites['front_default']}">
        </div>`;
    }
}

async function loadPokemon(i) {
    let url = `https://pokeapi.co/api/v2/pokemon/${i}`;
    let response = await fetch(url);
    currentPokemon = await response.json();
    renderPokemonInfo();
}

function renderPokemonInfo() {
    let name = currentPokemon['name'];
    document.getElementById('name').innerHTML = `${name}`;

    generateSprites();
    generateStats();
}

function generateSprites() {
    let sprites = currentPokemon['sprites'];
    document.getElementById('currentFront').src = sprites['front_default'];
    document.getElementById('currentBack').src = sprites['back_default'];
    document.getElementById('currentFrontShiny').src = sprites['front_shiny'];
    document.getElementById('currentBackShiny').src = sprites['back_shiny'];
}

function generateStats() {
    let stats = currentPokemon['stats'];
    document.getElementById('statsList').innerHTML = '';

    for (let i = 0; i < stats.length; i++) {
        const statusType = stats[i];
        document.getElementById('statsList').innerHTML += `
                    <li>${statusType['stat']['name']}: ${statusType['base_stat']}</li>
                `;
    }

    console.log(stats);
}