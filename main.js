const searchInput = document.getElementById("search");
const searchButton = document.getElementById("searchButton");
const pokeDiv = document.getElementById("pokeDiv");

searchButton.addEventListener("click", () => searchPokemon(searchInput.value));

//Gives the option to add task by enter
searchInput.addEventListener("keyup", (e) => {
  if (e.keyCode === 13) {
    myPokemonId = searchInput.value;
    searchPokemon(myPokemonId);
  }
});

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
          li.setAttribute("id", "pok");
          li.textContent = types[i];
          ul.appendChild(li);
      }
  } 

  document.addEventListener("click", (e) => {
    console.log(e.target.id);
    if (e.target.id === "pok") {
      searchInput.value = "";
      let divRemove = document.getElementById("brothersList");
      if (divRemove !== null) divRemove.remove();
      let parent = e.target.parentElement
      console.log(e.target.innerText)
      openList(e.target.innerText, parent)
  }
  if (e.target.id === "brotherName") {
    searchPokemon(e.target.innerText);
}
  })

  const openList = async (pokemonName, node) => {
    console.log(pokemonName);
      await axios
      .get(`http://pokeapi.co/api/v2/type/${pokemonName}`)
      .then(response => {
        console.log(response) 
        showBrothers(response.data, node)
      })
      .catch(error => {
        console.log(error.message);
        document.getElementById("error").innerHTML = "<p>Type not found</p>"
        setTimeout(() => {
          document.getElementById("error").innerHTML = '';
      }, 3000);
      });
  }
    


const showBrothers = (data, node) => {
  console.log(data.pokemon)
  let brothersRapper = document.createElement("div");
  brothersRapper.classList.add("brothersRapper");
  node.appendChild(brothersRapper);
  let names = data.pokemon;
  let pokNames = "";
  names.forEach(i => {
    console.log(i)
    pokNames += `<a id="brotherName" href="#">${i.pokemon.name}  </a>`
  });
  brothersRapper.innerHTML = `<div id="brothersList">Pokemon Brothers: ${pokNames}</div> `
};

