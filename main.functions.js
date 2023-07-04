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
        generateHTMLForPokemonList(officialArtwork, i)
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

function loadNextPokemon(selector) {
    let currentId = currentPokemon['id'];
    if (selector == 'next') {
        loadNextPokemonNext(currentId);
    } else if (selector == 'last') {
        loadNextPokemonLast(currentId);
    }
}

function loadNextPokemonNext(currentId) {
    currentId++;
    if (currentId > pokemonCount) {
        loadPokemon(1);
    } else {
        loadPokemon(currentId);
    }
}

function loadNextPokemonLast(currentId) {
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
    generateHTMLForShowPokemon(name);
    document.getElementById('showPokemonImage').classList.add(`pokemonType${firstPokemonType}`);
    generateOriginalArtwork('default');
    generateBase();
    addPokemonIdToCard();
    showPokemonCard();
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
                    <div>${key}:</div>
                    <div>${statusType}</div>
                </div>
                `;
    }
}

function generateStats() {
    let stats = currentPokemon['stats'];
    document.getElementById('stats').innerHTML = '';

    for (let i = 0; i < stats.length; i++) {
        const statusType = stats[i];
        generateHTMLForStats(statusType);
    }
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