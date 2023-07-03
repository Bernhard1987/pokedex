let currentPokemon;
let pokemonCount = 151;
let pokemonCardElementIds = ['showPokemonBackground', 'showPokemon', 'lastPokemon', 'nextPokemon', 'closePokemon'];

async function renderPokemonList() {
    document.getElementById('pokemonList').innerHTML = '';
    for (let i = 1; i <= pokemonCount; i++) {
        const url = `https://pokeapi.co/api/v2/pokemon/${i}`;
        let response = await fetch(url);
        currentPokemon = await response.json();
        let officialArtwork = currentPokemon['sprites']['other']['official-artwork'];

        document.getElementById('pokemonList').innerHTML += `
        <div class="pokemonListItem" onclick="loadPokemon(${i})">
            <h3>${currentPokemon['name']}</h3>
            <img src="${officialArtwork['front_default']}">
            <div class="pokemonListBottom">
                <div class="pokemonListTypeContainer" id="pokemonType(${i})"></div>
                <div class="pokemonListId">#${i.toString().padStart(4, '0')}</div>
            </div>
        </div>`;
        renderPokemonTypes(i);
    }
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

async function loadPokemon(i) {
    let url = `https://pokeapi.co/api/v2/pokemon/${i}`;
    let response = await fetch(url);
    currentPokemon = await response.json();
    renderPokemonInfo(i);
}

function loadNextPokemon() {
    let currentId = currentPokemon['id'];
    currentId++;
    if (currentId > pokemonCount) {
        loadPokemon(1);
    } else {
        loadPokemon(currentId);
    }
}

function loadLastPokemon() {
    let currentId = currentPokemon['id'];
    currentId--;
    if (currentId < 1) {
        loadPokemon(pokemonCount);
    } else {
        loadPokemon(currentId);
    }

}

function renderPokemonInfo(i) {
    let name = currentPokemon['name'];
    let firstPokemonType = currentPokemon['types'][0]['type']['name'];

    document.getElementById('showPokemon').innerHTML = '';
    document.getElementById('showPokemon').innerHTML += `
            <div class="showPokemonHeadline">
                <h3 id="name">${name}</h3>
                <h3>#${i}</h3>
            </div>
            <div class="statSelector">
                <div class="pokemonType showPokemonButton" onclick="generateOriginalArtwork('default')">default</div>
                <div class="pokemonType showPokemonButton" onclick="generateOriginalArtwork('shiny')">shiny</div>
                <div class="pokemonType showPokemonButton" onclick="generateSprites()">sprites</div>
            </div>
            <div class="showPokemonImage" id="showPokemonImage">
            </div>
            <div class="statsContainer">
                <div class="statSelector">
                    <div class="pokemonType showPokemonButton" onclick="generateBase()">base</div>
                    <div class="pokemonType showPokemonButton" onclick="generateStats()">stats</div>
                    <div class="pokemonType showPokemonButton" onclick="generateMoves()">moves</div>
                </div>
                <div class="stats" id="stats"></div>
                <div id="showPokemonId"></div>
            </div>
    `;
    document.getElementById('showPokemonImage').classList.add(`pokemonType${firstPokemonType}`);
    generateOriginalArtwork('default');
    generateBase();
    addPokemonIdToCard();
    showPokemonCard();
}

function generateOriginalArtwork(selector) {
    let officialArtwork = currentPokemon['sprites']['other']['official-artwork'];

    if (selector == 'shiny') {
        document.getElementById('showPokemonImage').innerHTML = `
                <img src="${officialArtwork['front_shiny']}" class="showOriginalPokemonImage">
        `;
    } else if (selector == 'default') {
        document.getElementById('showPokemonImage').innerHTML = `
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

function generateBase() {
    let baseStats = [currentPokemon['base_experience'], Number(currentPokemon['height']), Number(currentPokemon['weight'])];
    let keys = ['Base Experience', 'Height', 'Weight'];

    document.getElementById('stats').innerHTML = '';

    for (let i = 0; i < baseStats.length; i++) {
        let statusType = baseStats[i];
        let key = keys[i];

        statusType = formatStatusType(key, statusType);
        document.getElementById('stats').innerHTML += `
                <div class="oneStat">
                    <div>${keys[i]}:</div>
                    <div>${statusType}</div>
                </div>
                `;
    }
}

function formatStatusType(key, statusType) {
    if (key == 'Base Experience') {
        statusType = `${statusType} exp`;
    }
    if (key == 'Height' || key == 'Weight') {
        statusType = statusType / 10;
        statusType = Number(statusType).toFixed(2);
        if (key == 'Height') {
            statusType = `${statusType} m`;
        } else {
            statusType = `${statusType} kg`;
        }
    }
    return statusType;
}

function generateMoves() {
    let moves = currentPokemon['moves'];
    document.getElementById('stats').innerHTML = '<div id="movesContainer" class="statSelector movesContainer"></div>';

    for (let i = 0; i < moves.length; i++) {
        const move = moves[i]['move']['name'];
        document.getElementById('movesContainer').innerHTML += `
            <div class="pokemonType showPokemonButton movesButton">
                ${move}
            </div>
        `;
    }
}

function addPokemonIdToCard() {
    document.getElementById('showPokemonId').innerHTML = `#${currentPokemon['id'].toString().padStart(4, '0')}`;
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
}

function togglePokemon() {
    for (let i = 0; i < pokemonCardElementIds.length; i++) {
        const id = pokemonCardElementIds[i];
        toggleDNone(id);
    }
}

function showPokemonCard() {
    for (let i = 0; i < pokemonCardElementIds.length; i++) {
        const id = pokemonCardElementIds[i];
        removeDNone(id);
    }
}

function toggleDNone(id) {
    document.getElementById(id).classList.toggle('dnone');
}

function removeDNone(id) {
    document.getElementById(id).classList.remove('dnone');
}