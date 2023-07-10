let pokemonCardElementIds = ['showPokemonBackground', 'showPokemon', 'lastPokemon', 'nextPokemon', 'closePokemon'];

function showPokemonCard(showOrClose) {
    if (showOrClose == 'show') {
        for (let i = 0; i < pokemonCardElementIds.length; i++) {
            const id = pokemonCardElementIds[i];
            toggleDNone(id, 'remove');
        }
    }
    if (showOrClose == 'close') {
        for (let i = 0; i < pokemonCardElementIds.length; i++) {
            const id = pokemonCardElementIds[i];
            toggleDNone(id, 'add');
        }
    }
}

function toggleDNone(id, addOrRemove) {
    if (addOrRemove == 'add') {
        document.getElementById(id).classList.add('dnone');
    }
    if (addOrRemove == 'remove') {
        document.getElementById(id).classList.remove('dnone');
    }
}