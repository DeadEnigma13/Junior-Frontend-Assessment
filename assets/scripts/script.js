const popup = document.getElementById("myModal");
const overlay = document.getElementById("overlay");

function closePopup() {
  popup.classList.toggle("hidden");
  overlay.classList.toggle("hidden");
}
function openPopup() {
  popup.classList.toggle("hidden");
  overlay.classList.toggle("hidden");
}

function sortSpecial(a, b) {
  if (a.featured === true || a.name < b.name) {
    return -1;
  }
  if (a.featured === false || a.name > b.name) {
    return 1;
  }
  return 0;
}

window.pets = [];
const pushPet = (pet) => {
  window.pets.push(pet);
  Pet.renderAll();
};

class Pet {
  constructor(name,
    species, age, color, breed, favoriteFood, favoriteToy, featured = false, badDog = false) {
    this.name = name;
    this.species = species;
    this.age = age;
    this.color = color;
    this.breed = breed;
    this.favoriteFood = favoriteFood;
    this.favoriteToy = favoriteToy;
    this.featured = featured;
    this.badDog = badDog;
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
        <button type="button" onclick="openPopup()" class="pets__card__button">More Info</button>
      </div>
    `;
  }

  generateFeaturedCard() {
    return `
      <div class="pets__featured__card">
        <h2 class="pets__card__title">${this.name}</h2>
        <p class="pets__card__info">Species: ${this.species}</p>
        <p class="pets__card__info">Age: ${this.age}</p>
        <p class="pets__card__info">Color: ${this.color}</p>
        <p class="pets__card__info">Breed: ${this.breed}</p>
        <p class="pets__card__info">Favorite Food: ${this.favoriteFood}</p>
        <p class="pets__card__info">Favorite Toy: ${this.favoriteToy}</p>
        <button type="button" onclick="openPopup()" class="pets__card__button">More Info</button>
      </div>
    `;
  }

  generateBadDogCard() {
    {
      return `
        <div class="pets__badDog__card">
          <h2 class="pets__card__title">${this.name}</h2>
          <p class="pets__card__info">Species: ${this.species}</p>
          <p class="pets__card__info">Age: ${this.age}</p>
          <p class="pets__card__info">Color: ${this.color}</p>
          <p class="pets__card__info">Breed: ${this.breed}</p>
          <p class="pets__card__info">Favorite Food: ${this.favoriteFood}</p>
          <p class="pets__card__info">Favorite Toy: ${this.favoriteToy}</p>
          <button type="button" onclick="openPopup()" class="pets__card__button">More Info</button>
        </div>
      `;
    }
  }

  static renderAll() {
    const petsGrid = document.querySelector(".pets__grid");
    if (!petsGrid) return;

    petsGrid.innerHTML = "";
    window.pets.forEach((pet) => {
      if (pet.featured === true) {
        petsGrid.innerHTML += pet.generateFeaturedCard();
      } else if (pet.badDog === true) {
        petsGrid.innerHTML += pet.generateBadDogCard();
      } else {
        petsGrid.innerHTML += pet.generateCard();
      }
    });
  }
}

const petData = fetch('assets/data/pets.json').then(response => response.json()).then(data => {
  data.sort(sortSpecial);
  data.forEach((pet) => {
    pushPet(
      new Pet(
      pet.name,
      pet.species,
      pet.age,
      pet.color,
      pet.breed,
      pet.favoriteFood,
      pet.favoriteToy,
      pet.featured,
      pet.badDog
    ));
  });
});