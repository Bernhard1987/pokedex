let pokemonCardElementIds = ['showPokemonBackground', 'showPokemon', 'lastPokemon', 'nextPokemon', 'closePokemon'];

function showPokemonCard(addOrRemove) {
        for (let i = 0; i < pokemonCardElementIds.length; i++) {
            const id = pokemonCardElementIds[i];
            toggleDNone(id, addOrRemove);
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