const petsGrid = document.getElementById('petsGrid');
const petsEmptyMessage = document.getElementById('petsEmptyMessage');

const speciesFilter = document.getElementById('speciesFilter');
const cityFilter = document.getElementById('cityFilter');
const ageFilter = document.getElementById('ageFilter');
const clearFiltersBtn = document.getElementById('clearFiltersBtn');

let allPets = [];

async function loadPets() {
  try {
    const params = new URLSearchParams();

    const species = speciesFilter.value;
    const city = cityFilter.value;
    const age = ageFilter.value;

    if (species && species !== 'todas') {
      params.append('species', species);
    }
    if (city && city !== 'todas') {
      params.append('city', city);
    }
    if (age && age !== 'todas') {
      const [minAge, maxAge] = age.split('-');
      params.append('minAge', minAge);
      params.append('maxAge', maxAge);
    }

    const url = params.toString()
      ? `/api/pets?${params.toString()}`
      : '/api/pets';

    const res = await fetch(url);
    if (!res.ok) {
      throw new Error('Error cargando mascotas');
    }
    const pets = await res.json();
    allPets = pets;
    renderPets(pets);
  } catch (error) {
    console.error(error);
    petsGrid.innerHTML = '';
    petsEmptyMessage.textContent =
      'No pudimos cargar las mascotas en este momento. Intenta de nuevo más tarde.';
    petsEmptyMessage.classList.remove('hidden');
  }
}

function renderPets(pets) {
  petsGrid.innerHTML = '';

  if (!pets || pets.length === 0) {
    petsEmptyMessage.classList.remove('hidden');
    return;
  }

  petsEmptyMessage.classList.add('hidden');

  pets.forEach((pet) => {
    const card = document.createElement('article');
    card.className = 'pet-card';

    card.innerHTML = `
      <div class="pet-card-image">
        <img src="${pet.imageUrl}" alt="${pet.name}" />
      </div>
      <div class="pet-card-body">
        <div class="pet-card-title">
          <h3>${pet.name}</h3>
          <span class="pet-badge">${pet.species}</span>
        </div>
        <div class="pet-meta">
          ${pet.ageYears} años · ${pet.size} · ${pet.sex}
        </div>
        <p class="pet-description">
          ${pet.description}
        </p>
        <div class="pet-footer">
          <span class="pet-city">📍 ${pet.city}</span>
          <a class="btn btn-primary" href="adopt.html?petId=${pet.id}">
            Adoptar
          </a>
        </div>
      </div>
    `;

    petsGrid.appendChild(card);
  });
}

function clearFilters() {
  speciesFilter.value = 'todas';
  cityFilter.value = 'todas';
  ageFilter.value = 'todas';
  loadPets();
}

speciesFilter.addEventListener('change', loadPets);
cityFilter.addEventListener('change', loadPets);
ageFilter.addEventListener('change', loadPets);
clearFiltersBtn.addEventListener('click', clearFilters);

loadPets();
