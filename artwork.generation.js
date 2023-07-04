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

function generateHTMLSprites() {
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