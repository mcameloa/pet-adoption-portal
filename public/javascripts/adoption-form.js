/**
 * Funciones para manejar el modal de adopción y el formulario
 */

// Abrir modal de adopción
function openAdoptionModal() {
  const modal = document.getElementById('adoption-modal');
  if (modal) {
    modal.style.display = 'flex';
    document.body.style.overflow = 'hidden'; // Prevenir scroll del body
  }
}

// Cerrar modal de adopción
function closeAdoptionModal() {
  const modal = document.getElementById('adoption-modal');
  if (modal) {
    modal.style.display = 'none';
    document.body.style.overflow = ''; // Restaurar scroll del body
    // Limpiar mensajes y resetear formulario
    const formMessage = document.getElementById('form-message');
    if (formMessage) {
      formMessage.style.display = 'none';
      formMessage.className = 'form-message';
      formMessage.textContent = '';
      formMessage.innerHTML = '';
    }
    const form = document.getElementById('adoption-form');
    if (form) {
      form.reset();
      // Restaurar visibilidad del formulario
      const formContent = form.querySelector('.form-content');
      const formActions = form.querySelector('.form-actions');
      if (formContent) formContent.style.display = '';
      if (formActions) formActions.style.display = '';
    }
  }
}

// Cerrar modal al hacer clic fuera de él
document.addEventListener('DOMContentLoaded', function() {
  const modal = document.getElementById('adoption-modal');
  if (modal) {
    modal.addEventListener('click', function(e) {
      if (e.target === modal) {
        closeAdoptionModal();
      }
    });
  }

  // Cerrar modal con tecla ESC
  document.addEventListener('keydown', function(e) {
    if (e.key === 'Escape') {
      const modal = document.getElementById('adoption-modal');
      if (modal && modal.style.display === 'flex') {
        closeAdoptionModal();
      }
    }
  });

  // Manejar envío del formulario
  const form = document.getElementById('adoption-form');
  if (form) {
    form.addEventListener('submit', async function(e) {
      e.preventDefault();

      const formData = new FormData(form);
      const data = Object.fromEntries(formData.entries());
      const submitButton = form.querySelector('button[type="submit"]');
      const formMessage = document.getElementById('form-message');

      // Deshabilitar botón de envío
      if (submitButton) {
        submitButton.disabled = true;
        submitButton.textContent = 'Enviando...';
      }

      // Ocultar mensajes anteriores
      if (formMessage) {
        formMessage.style.display = 'none';
        formMessage.className = 'form-message';
      }

      try {
        const response = await fetch('/adoption/submit', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(data)
        });

        const result = await response.json();

        // Mostrar mensaje
        if (formMessage) {
          if (result.success) {
            // Ocultar el formulario y mostrar mensaje de éxito
            const formContent = form.querySelector('.form-content');
            const formActions = form.querySelector('.form-actions');
            
            if (formContent) formContent.style.display = 'none';
            if (formActions) formActions.style.display = 'none';
            
            // Mostrar mensaje de agradecimiento destacado
            formMessage.style.display = 'block';
            formMessage.className = 'form-message form-message-success form-message-thanks';
            formMessage.innerHTML = `
              <div class="success-icon">✓</div>
              <h3>¡Gracias por tu interés!</h3>
              <p>${result.message}</p>
              <p class="thanks-note">El formulario se cerrará automáticamente...</p>
            `;
            
            form.reset();
            
            // Cerrar modal después de 3 segundos
            setTimeout(() => {
              closeAdoptionModal();
            }, 3000);
          } else {
            formMessage.style.display = 'block';
            formMessage.className = 'form-message form-message-error';
            formMessage.textContent = result.message;
          }
        }
      } catch (error) {
        console.error('Error al enviar formulario:', error);
        if (formMessage) {
          formMessage.style.display = 'block';
          formMessage.className = 'form-message form-message-error';
          formMessage.textContent = 'Ocurrió un error al enviar tu solicitud. Por favor, intenta nuevamente.';
        }
      } finally {
        // Rehabilitar botón de envío
        if (submitButton) {
          submitButton.disabled = false;
          submitButton.textContent = 'Enviar Solicitud';
        }
      }
    });
  }
});

