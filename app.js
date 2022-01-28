const charactersList = document.getElementById("charactersList");
const searchBar = document.getElementById("searchBar");

let hpCharacters = [];

searchBar.addEventListener("keyup", (e) => {
  const searchString = e.target.value.toLowerCase();

  const filteredCharacters = hpCharacters.filter((character) => {
    return (
      character.name.toLowerCase().includes(searchString) ||
      character.house.toLowerCase().includes(searchString)
    );
  });
  displayCharacters(filteredCharacters);
});

const loadCharacters = async () => {
  try {
    const res = await fetch("https://hp-api.herokuapp.com/api/characters");
    hpCharacters = await res.json();
    displayCharacters(hpCharacters);
    console.log(hpCharacters);
  } catch (err) {
    console.error(err);
  }
};

const displayCharacters = (characters) => {
  const htmlString = characters
    .map((character) => {
      return `
      <div class="container">
      <div class="flipper">
        <div class="front">
          <img
            src="${character.image}"
            alt="cherry blossoms"
          />
          <p class="caption"> ${character.house}</p>
        </div>
        <div class="back">
        <span class="title">Character</span>
            <span>${character.name}</span>
            <span class="title">Name</span>
            <span>${character.actor}</span>
                <span class="title">Date of birth</span>
          <span class="date">${character.dateOfBirth}</span>
        </div>
      </div>
    </div>
        `;
    })
    .join("");
  charactersList.innerHTML = htmlString;
};

loadCharacters();
