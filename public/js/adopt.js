const selectedPetContainer = document.getElementById('selectedPetContainer');
const adoptionForm = document.getElementById('adoptionForm');
const formMessage = document.getElementById('formMessage');

function getPetIdFromUrl() {
  const params = new URLSearchParams(window.location.search);
  return params.get('petId');
}

async function loadSelectedPet() {
  const petId = getPetIdFromUrl();
  if (!petId) {
    selectedPetContainer.innerHTML = `
      <p>No se recibió información de la mascota. 
      Vuelve al listado y selecciona "Adoptar" nuevamente.</p>
    `;
    return;
  }

  try {
    const res = await fetch(`/api/pets/${petId}`);
    if (!res.ok) {
      throw new Error('Mascota no encontrada');
    }
    const pet = await res.json();
    renderSelectedPet(pet);
  } catch (error) {
    console.error(error);
    selectedPetContainer.innerHTML = `
      <p>Ocurrió un problema cargando la información de la mascota.</p>
    `;
  }
}

function renderSelectedPet(pet) {
  selectedPetContainer.innerHTML = `
    <div class="selected-pet-header">
      <img src="${pet.imageUrl}" alt="${pet.name}" />
      <div class="selected-pet-info">
        <h2>${pet.name}</h2>
        <p>${pet.species} · ${pet.ageYears} años · ${pet.size}</p>
        <p>📍 ${pet.city}</p>
      </div>
    </div>
    <div class="selected-pet-body">
      <p>${pet.description}</p>
      <p style="margin-top: .4rem; font-size: .85rem; color: #6b7280;">
        Esta ficha es solo informativa. El refugio confirmará datos de 
        salud, vacunas y requisitos específicos de adopción.
      </p>
    </div>
  `;
}

adoptionForm.addEventListener('submit', async (e) => {
  e.preventDefault();
  formMessage.classList.add('hidden');
  formMessage.textContent = '';
  formMessage.classList.remove('success', 'error');

  const petId = getPetIdFromUrl();
  if (!petId) {
    showMessage(
      'No se encontró la mascota asociada a esta solicitud.',
      false
    );
    return;
  }

  const payload = {
    petId,
    fullName: adoptionForm.fullName.value.trim(),
    email: adoptionForm.email.value.trim(),
    phone: adoptionForm.phone.value.trim(),
    city: adoptionForm.city.value,
    housingType: adoptionForm.housingType.value,
    hasOtherPets: adoptionForm.hasOtherPets.value,
    experience: adoptionForm.experience.value.trim(),
    motivation: adoptionForm.motivation.value.trim()
  };

  if (!payload.fullName || !payload.email || !payload.phone || !payload.city || !payload.motivation) {
    showMessage('Por favor completa los campos obligatorios.', false);
    return;
  }

  try {
    const res = await fetch('/api/adoptions', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(payload)
    });

    const data = await res.json();

    if (!res.ok) {
      throw new Error(data.message || 'Error enviando solicitud');
    }

    const applications =
      JSON.parse(localStorage.getItem('adoptionApplications') || '[]');
    applications.push(data.adoptionRequest);
    localStorage.setItem(
      'adoptionApplications',
      JSON.stringify(applications)
    );

    showMessage(data.message, true);
    adoptionForm.reset();
  } catch (error) {
    console.error(error);
    showMessage(
      'Ocurrió un problema enviando la solicitud. Intenta de nuevo.',
      false
    );
  }
});

function showMessage(text, isSuccess) {
  formMessage.textContent = text;
  formMessage.classList.remove('hidden');
  formMessage.classList.add(isSuccess ? 'success' : 'error');
}

loadSelectedPet();
