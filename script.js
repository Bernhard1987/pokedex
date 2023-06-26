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
    renderPokemonInfo(i);
}

function renderPokemonInfo(i) {
    let name = currentPokemon['name'];
    document.getElementById('showPokemon').innerHTML = '';
    document.getElementById('showPokemon').innerHTML += `
            <div class="showPokemonHeadline">
                <h3 id="name">${name}</h3>
                <h3>#${i}</h3>
            </div>
            <div class="showPokemonImage">
                <h3>Normal View</h3>
                <div>
                    <img src="" alt="Normal Front View" id="currentFront">
                    <img src="" alt="Normal Back View" id="currentBack">
                </div>
            </div>
            <div class="showPokemonImage">
                <h3>Shiny View</h3>
                <div>
                    <img src="" alt="Shiny Front View" id="currentFrontShiny">
                    <img src="" alt="Shiny Back View" id="currentBackShiny">
                </div>
            </div>
            <div class="stats" id="stats">
            </div>
    `;
    generateSprites();
    generateStats();
    document.getElementById('showPokemonBackground').classList.remove('dnone');
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
    document.getElementById('stats').innerHTML = '';

    for (let i = 0; i < stats.length; i++) {
        const statusType = stats[i];
        document.getElementById('stats').innerHTML += `
                <div class="oneStat">
                    <div>${statusType['stat']['name']}</div>
                    <div>${statusType['base_stat']}</div>
                </div>
                `;
    }

    console.log(stats);
}

function hidePokemon() {
    document.getElementById('showPokemonBackground').classList.add('dnone');
}