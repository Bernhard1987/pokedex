function generateHTMLForPokemonList(officialArtwork, i) {
    document.getElementById('pokemonList').innerHTML += `
    <div class="pokemonListItem" onclick="loadPokemon(${i})">
        <h3>${currentPokemon['name']}</h3>
        <img src="${officialArtwork['front_default']}">
        <div class="pokemonListBottom">
            <div class="pokemonListTypeContainer" id="pokemonTypeList(${i})"></div>
            <div class="pokemonListId">#${i.toString().padStart(4, '0')}</div>
        </div>
    </div>`;
}

function generateHTMLForShowPokemon(name) {
    document.getElementById('showPokemon').innerHTML = '';
    document.getElementById('showPokemon').innerHTML += `
            <h3 id="name">${name}</h3>
            <div class="statSelector selectImage">
                <div class="pokemonType showPokemonButton" onclick="generateOriginalArtwork('default')">default</div>
                <div class="pokemonType showPokemonButton" onclick="generateOriginalArtwork('shiny')">shiny</div>
                <div class="pokemonType showPokemonButton" onclick="generateHTMLSprites()">sprites</div>
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
}

function generateHTMLAddTypesToBase(currentPokemonId) {
    document.getElementById('stats').innerHTML += `
    <div class="pokemonListTypeContainer" id="pokemonTypeBase(${currentPokemonId})"></div>
    `;
}

function generateHTMLBaseStats(baseStats, keys) {
    for (let i = 0; i < baseStats.length; i++) {
        let statusType = baseStats[i];
        let key = keys[i];

        statusType = formatStatusType(key, statusType);
        generateHTMLForStats(key, statusType);
    }
}

function generateHTMLForStats(name, stat) {
    document.getElementById('stats').innerHTML += `
    <div class="oneStat">
        <div>${name}</div>
        <div>${stat}</div>
    </div>
    `;
}