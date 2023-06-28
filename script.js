let currentPokemon;

async function renderPokemonList() {
    document.getElementById('pokemonList').innerHTML = '';
    for (let i = 1; i < 152; i++) {
        const url = `https://pokeapi.co/api/v2/pokemon/${i}`;
        let response = await fetch(url);
        currentPokemon = await response.json();
        let officialArtwork = currentPokemon['sprites']['other']['official-artwork'];

        document.getElementById('pokemonList').innerHTML += `
        <div class="pokemonListItem" onclick="loadPokemon(${i})">
            <div class="pokemonListItemHeadline">
            <h3>${currentPokemon['name']}</h3>
            <h3>#${i}</h3>
            </div>
            <img src="${officialArtwork['front_default']}">
            <div class="pokemonTypeContainer" id="pokemonType(${i})"></div>
        </div>`;
        renderPokemonTypes(i);
    }
}

async function loadPokemon(i) {
    let url = `https://pokeapi.co/api/v2/pokemon/${i}`;
    let response = await fetch(url);
    currentPokemon = await response.json();
    renderPokemonInfo(i);
    console.log(currentPokemon)
}

function renderPokemonTypes(i) {
    let pokemonTypeList = currentPokemon['types'];

    for (let j = 0; j < pokemonTypeList.length; j++) {
        const type = pokemonTypeList[j]['type']['name'];

        document.getElementById(`pokemonType(${i})`).innerHTML += `
            <div class="pokemonType pokemonType${type}">
                ${type}
            </div>
        `;
    }
}

function renderPokemonInfo(i) {
    let name = currentPokemon['name'];
    document.getElementById('showPokemon').innerHTML = '';
    document.getElementById('showPokemon').innerHTML += `
            <div class="showPokemonHeadline">
                <h3 id="name">${name}</h3>
                <h3>#${i}</h3>
            </div>
            <div class="statSelector">
                <div class="pokemonType showPokemonButton" onclick="generateOriginal('default')">default</div>
                <div class="pokemonType showPokemonButton" onclick="generateOriginal('shiny')">shiny</div>
                <div class="pokemonType showPokemonButton" onclick="generateSprites()">sprites</div>
            </div>
            <div class="showPokemonImage" id="showPokemonImage">
            </div>
            <div class="statsContainer">
                <div class="statSelector">
                    <div class="pokemonType showPokemonButton">base</div>
                    <div class="pokemonType showPokemonButton">stats</div>
                    <div class="pokemonType showPokemonButton">moves</div>
                </div>
                <div class="stats" id="stats">
            </div>
            </div>
    `;
    generateOriginal('default');
    generateStats();
    document.getElementById('showPokemonBackground').classList.remove('dnone');
}

function generateOriginal(selector) {
    let officialArtwork = currentPokemon['sprites']['other']['official-artwork'];

    if (selector == 'shiny') {
        document.getElementById(`showPokemonImage`).innerHTML = `
                <img src="${officialArtwork['front_shiny']}" class="showOriginalPokemonImage">
        `;
    } else if (selector == 'default') {
        document.getElementById(`showPokemonImage`).innerHTML = `
        <img src="${officialArtwork['front_default']}" class="showOriginalPokemonImage">
        `;
    }
}

function generateSprites() {
    let sprites = currentPokemon['sprites'];

    document.getElementById(`showPokemonImage`).innerHTML = `
                <div>
                    <img src="${sprites['front_default']}" alt="Normal Front View" class="spriteImage">
                    <img src="${sprites['back_default']}" alt="Normal Back View" class="spriteImage">
                </div>
                <div>
                    <img src="${sprites['front_shiny']}" alt="Shiny Front View" class="spriteImage">
                    <img src="${sprites['back_shiny']}" alt="Shiny Back View" class="spriteImage">
                </div>
    `;
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