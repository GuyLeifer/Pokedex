const searchInput = document.getElementById("search");
const searchButton = document.getElementById("searchButton");
const pokeDiv = document.getElementById("pokeDiv");

searchButton.addEventListener("click", () => searchPokemon(searchInput.value));

const searchPokemon = async (pokemonId = 3) => {
  const { data } = await axios.get(`http://pokeapi.co/api/v2/pokemon/${pokemonId}`);
  console.log(data)
  let name = data.name;
  let height = data.height;
  let weight = data.weight;
  let picture = data.sprites.front_default;
  let backPicture = data.sprites.back_default;
  makeDiv(name, height, weight, picture, backPicture);
};


    const makeDiv = (name, height, weight, picture, backPicture) => {
    const htmlText = `
      <div class="pokemonContainer">
        <div>Name: ${name}</div>
        <div>height: ${height}</div>
        <div>weight: ${weight}</div>
        <div>Pokemon Image: <br> <img src="${picture}"
        onmouseover="this.src='${backPicture}';"
        onmouseout="this.src='${picture}';"/></div>`;
        // <div id="img">picture: <br> <img src="${picture}"/></div>
        // </div>
        // `
    ;
    pokeDiv.innerHTML = htmlText;
  } 



