let currentPokemon;
let pokemonCount;
const pokemonLoadInterval = 36;
let loadPokemonFrom = 1;
let loadPokemonTo = 36;

function triggerNextPokemon() {
    loadPokemonFrom = loadPokemonFrom + pokemonLoadInterval;
    loadPokemonTo = loadPokemonTo + pokemonLoadInterval;
    fetchCurrentPokemon('renderPokemonList');
}

async function renderPokemonList() {
    document.getElementById('pokemonList').innerHTML = '';
    await getPokemonCount();
    fetchCurrentPokemon('renderPokemonList');
}

async function fetchCurrentPokemon(location, search) {
    for (let i = loadPokemonFrom; i <= loadPokemonTo; i++) {
        const url = `https://pokeapi.co/api/v2/pokemon/${i}`;
        let response = await fetch(url);
        currentPokemon = await response.json();
        let currentPokemonId = i.toString();
        if (location == 'renderPokemonList') {
            generateHTMLForPokemonList(i);
            renderPokemonTypes(i, 'List');
        }
        if (location == 'filterPokemon' && currentPokemonId.includes(search) || currentPokemon['name'].toLowerCase().includes(search) || pokemonTypeFilter(currentPokemonId).includes(search)) {
            generateHTMLForPokemonList(i);
            renderPokemonTypes(i, 'List');
        }
    }
}

async function getPokemonCount() {
    const url = `https://pokeapi.co/api/v2/pokemon-species/`;
    let response = await fetch(url);
    let resource = await response.json();
    pokemonCount = resource['count'];
}

function renderSearchOrList() {
    let searchbar = document.getElementById('searchbar');
    if (searchbar.value == '') {
        loadPokemonFrom = 1;
        loadPokemonTo = pokemonLoadInterval;
        renderPokemonList();
    } else if (searchbar.value != '') {
        loadPokemonFrom = 1;
        loadPokemonTo = pokemonCount;
        filterPokemon(searchbar);
    }
}

async function filterPokemon(searchbar) {
    let pokemonList = document.getElementById('pokemonList');
    let search = searchbar.value;
    search = search.toLowerCase();
    pokemonList.innerHTML = '';
    fetchCurrentPokemon('filterPokemon', search);
}

function pokemonTypeFilter() {
    let result = [];
    for (let i = 0; i < currentPokemon['types'].length; i++) {
        const type = currentPokemon['types'][i]['type']['name'];
        result.push(type);
    }
    result = result.toString();
    return result;
}

function renderPokemonTypes(i, location) {
    let pokemonTypeList = currentPokemon['types'];
    document.getElementById(`pokemonType${location}(${i})`).innerHTML = '';
    for (let j = 0; j < pokemonTypeList.length; j++) {
        const type = pokemonTypeList[j]['type']['name'];

        document.getElementById(`pokemonType${location}(${i})`).innerHTML += `
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
    renderPokemonInfo();
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

function renderPokemonInfo() {
    let name = currentPokemon['name'];
    let firstPokemonType = currentPokemon['types'][0]['type']['name'];
    generateHTMLForShowPokemon(name);
    document.getElementById('showPokemonImage').classList.add(`pokemonType${firstPokemonType}`);
    generateOriginalArtwork('default');
    generateBase();
    addPokemonIdToCard();
    showPokemonCard('remove');
}

function addPokemonIdToCard() {
    document.getElementById('showPokemonId').innerHTML = `#${currentPokemon['id'].toString().padStart(4, '0')}`;
}