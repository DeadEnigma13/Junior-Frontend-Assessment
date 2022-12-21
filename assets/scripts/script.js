function sortByName(a, b) {
  if (a.name < b.name) {
    return -1;
  }
  if (a.name > b.name) {
    return 1;
  }
  return 0;
}


window.pets = [];
const pushPet = pet => {
  window.pets.push(pet);
  Pet.renderAll();
}

class Pet {
  constructor(name,
    species, age, color, breed, favoriteFood, favoriteToy, featured = false) {
    this.name = name;
    this.species = species;
    this.age = age;
    this.color = color;
    this.breed = breed;
    this.favoriteFood = favoriteFood;
    this.favoriteToy = favoriteToy;
    this.featured = featured;
  }

  generateCard() {
    return `
      <div class="pets__card">
        <h2 class="pets__card__title">${this.name}</h2>
        <p class="pets__card__info">Species: ${this.species}</p>
        <p class="pets__card__info">Age: ${this.age}</p>
        <p class="pets__card__info">Color: ${this.color}</p>
        <p class="pets__card__info">Breed: ${this.breed}</p>
        <p class="pets__card__info">Favorite Food: ${this.favoriteFood}</p>
        <p class="pets__card__info">Favorite Toy: ${this.favoriteToy}</p>
        <button type="button" class="pets__card__button">More Info</button>
      </div>
    `;
  }

  static renderAll() {
    const petsGrid = document.querySelector('.pets__grid');
    if (!petsGrid) return;

    petsGrid.innerHTML = '';
    window.pets.forEach(pet => {
      petsGrid.innerHTML += pet.generateCard();
    });
  }
}

const petData = fetch('assets/data/pets.json').then(response => response.json()).then(data => {
  data.sort(sortByName);
  data.forEach(pet => {
    pushPet(new Pet(
      pet.name,
      pet.species,
      pet.age,
      pet.color,
      pet.breed,
      pet.favoriteFood,
      pet.favoriteToy,
      pet.featured
    ));
  });
});