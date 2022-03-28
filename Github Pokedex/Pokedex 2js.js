const baseURL = 'https://pokeapi.co/api/v2/pokemon/'
const pokemon = document.getElementById('pokeName')
const buttonsearch = document.getElementById('searchPokemon')
const buttondelete = document.getElementById('deletePokemon')
const appNode = document.getElementById('app')

buttonsearch.addEventListener('click',insertPokemon)
buttonsearch.addEventListener('touchstart',insertPokemon) //*Moviles
buttondelete.addEventListener('click',deletePokemon)
buttondelete.addEventListener('touchstart',deletePokemon) //*Moviles

function insertPokemon(){
   window.fetch(`${baseURL}${pokemon.value.toLowerCase()}`)
   .then(response =>{
       if (response.status === 404) {
           alert('This pokemon is not available. Try with another one!')
       } else{
           return response.json()
       } 
    })
       .then(responseJSON => {
         const allitems = []
         
         const result = []  

         for(let pokemonInfo in responseJSON){
             result.push([pokemonInfo , responseJSON[pokemonInfo]])
         }

         console.table(result)

         //**Crear imagen**//

         const pokemonImage = document.createElement('img')
         pokemonImage.src = result[14][1].front_default

         ///*Nombre e ID*//

         const pokemonName = document.createElement('h2')
         pokemonName.innerText = `Name: ${result[10][1]} - ID: ${result[6][1]}`

         ////*Type Pokemon*///

         const pokemonType = document.createElement('h2')
         pokemonType.innerText = `Type: ${result[16][1][0].type.name}`

         //***Container***//
         const container = document.createElement('div')
         container.append(pokemonImage , pokemonName , pokemonType)
         container.classList.add('container');

         allitems.push(container)

         appNode.append(...allitems)
       });
}

function deletePokemon(){
    let allPokemon = appNode.childNodes
    allPokemon = Array.from(allPokemon)

    allPokemon.forEach(pokemon => {
        pokemon.remove(pokemon)


    })
}

