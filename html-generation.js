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

function generateHTMLForStats(statusType) {
    document.getElementById('stats').innerHTML += `
    <div class="oneStat">
        <div>${statusType['stat']['name']}</div>
        <div>${statusType['base_stat']}</div>
    </div>
    `;
}

function generateHTMLForPokemonList(officialArtwork, i) {
    document.getElementById('pokemonList').innerHTML += `
    <div class="pokemonListItem" onclick="loadPokemon(${i})">
        <h3>${currentPokemon['name']}</h3>
        <img src="${officialArtwork['front_default']}">
        <div class="pokemonListBottom">
            <div class="pokemonListTypeContainer" id="pokemonType(${i})"></div>
            <div class="pokemonListId">#${i.toString().padStart(4, '0')}</div>
        </div>
    </div>`;
}