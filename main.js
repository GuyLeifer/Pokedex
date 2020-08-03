const searchInput = document.getElementById("search");
const searchButton = document.getElementById("searchButton");
const pokeDiv = document.getElementById("pokeDiv");

searchButton.addEventListener("click", () => searchPokemon(searchInput.value));

const searchPokemon = async (pokemonId = 3) => {
  try {
  const { data } = await axios.get(`http://pokeapi.co/api/v2/pokemon/${pokemonId}`);
  let name = data.name;
  let height = data.height;
  let weight = data.weight;
  let picture = data.sprites.front_default;
  let backPicture = data.sprites.back_default;
  console.log(data.types);
  let types = [];
  for (let i = 0; i<data.types.length; i++) {
  types.push(data.types[i].type.name);
  console.log(types);
  }
  makeDiv(name, height, weight, picture, backPicture, types);
  }
  catch (err) {
      pokeDiv.innerHTML = 
      `<div style="color:red">${err}</div>`
  }
};


    const makeDiv = (name, height, weight, picture, backPicture, types) => {
    const htmlText = `
      <div class="pokemonContainer">
        <div>Name: ${name}</div>
        <div>height: ${height}</div>
        <div>weight: ${weight}</div>
        <div id="img">Pokemon Image: <br> <img id="pokeImg" src="${picture}"
        onmouseover="this.src='${backPicture}';"
        onmouseout="this.src='${picture}';"/></div>
        `;
    ;
    pokeDiv.innerHTML = htmlText;
    const ul = document.createElement("ul");
    ul.textContent = "Types:"
    pokeDiv.appendChild(ul);
      for (let i = 0; i < types.length; i++) {
          let li = document.createElement("li");
          li.textContent = [i+1] + ". " + types[i];
          ul.appendChild(li);
      }
  } 



