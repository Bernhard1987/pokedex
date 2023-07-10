function generateBase() {
    let baseStats = [currentPokemon['base_experience'], Number(currentPokemon['height']), Number(currentPokemon['weight'])];
    let keys = ['Base Experience', 'Height', 'Weight'];
    let currentPokemonId = currentPokemon['id'];

    document.getElementById('stats').innerHTML = '';
    generateHTMLAddTypesToBase(currentPokemonId);
    renderPokemonTypes(currentPokemonId, 'Base');
    generateHTMLBaseStats(baseStats, keys);
}

function generateStats() {
    let stats = currentPokemon['stats'];
    document.getElementById('stats').innerHTML = '';

    for (let i = 0; i < stats.length; i++) {
        const statusType = stats[i];
        generateHTMLForStats(statusType['stat']['name'], statusType['base_stat']);
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

function formatStatusType(key, statusType) {
    if (key == 'Base Experience') {
        statusType = `${statusType} xp`;
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