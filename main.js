const searchInput = document.getElementById("search");
const searchButton = document.getElementById("searchButton");
const pokeDiv = document.getElementById("pokeDiv");

const searchPokemon = async (pokemonId = 3) => {
  const { data } = await axios.get(`http://pokeapi.co/api/v2/pokemon/${pokemonId}`);
  console.log(data)
  let name = data.name;
  let height = data.height;
  let weight = data.weight;
  let picture = data.sprites.front_default;  // data.sprites.front_default, data.sprites.back_default
  makeDiv(name, height, weight, picture);
};


    const makeDiv = (name, height, weight, picture) => {
    const htmlText = `
      <div class="pokemonContainer">
        <div>Name: ${name}</div>
        <div>height: ${height}</div>
        <div>weight: ${weight}</div>
        <div>picture: <img src="${picture}" /></div>
      </div>
    `;
    pokeDiv.innerHTML = htmlText;
  } 

searchButton.addEventListener("click", () => searchPokemon(searchInput.value));




// const nameDiv = document.createElement("div");
  // const heightDiv = document.createElement("div");
  // const weightDiv = document.createElement("div");
  // const picDiv = document.createElement("div");
  
  // nameDiv.innerHTML = "Name: " + name;
  // heightDiv.innerHTML = "Height: " + height;
  // weightDiv.innerHTML = "Weight: " + weight;
  // picDiv.innerHTML = "picture: " + picture;
  
  // pokeDiv.appendChild(nameDiv);
  // pokeDiv.appendChild(heightDiv);
  // pokeDiv.appendChild(weightDiv);
  // pokeDiv.appendChild(picDiv);

// pokemonImg.onmouseover=()=>pokemonImg.src=res.data.sprites.back_default
// pokemonImg.onmouseout=()=>pokemonImg.src=res.data.sprites.front_default
