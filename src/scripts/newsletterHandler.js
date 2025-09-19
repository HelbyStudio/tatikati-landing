/**
 * Shared newsletter form handler
 * Handles form submission, validation, and state management
 */

export function initNewsletterHandler(formSelector = '[data-newsletter-form]') {
  const newsletterForms = document.querySelectorAll(formSelector);
  
  newsletterForms.forEach(form => {
    const emailInput = form.querySelector('input[type="email"]');
    const errorMessage = form.querySelector('[role="alert"]');
    const submitButton = form.querySelector('button[type="submit"]');

    if (emailInput && errorMessage && submitButton) {
      form.addEventListener('submit', async function(e) {
        e.preventDefault();
        
        const email = emailInput.value.trim();
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

        // Reset error state
        resetErrorState(errorMessage, emailInput);

        // Validate email
        if (!email) {
          showError(errorMessage, emailInput, getErrorMessage(errorMessage, 'required'));
          return;
        }

        if (!emailRegex.test(email)) {
          showError(errorMessage, emailInput, getErrorMessage(errorMessage, 'invalid'));
          return;
        }

        // Show loading state
        const originalText = submitButton.innerHTML;
        const loadingText = getButtonText(submitButton, 'loading');
        setButtonState(submitButton, loadingText, true);

        try {
          // Call newsletter API endpoint
          const response = await fetch('/api/newsletter', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json'
            },
            body: JSON.stringify({ email, listId: 9 })
          });

          const result = await response.json();

          if (response.ok && result.success) {
            // Success state
            const successText = getButtonText(submitButton, 'success');
            setButtonState(submitButton, `✓ ${successText}`, true, 'var(--color-accent-4)');
            emailInput.value = '';
            
            // Analytics
            console.log('Newsletter subscription success:', email);
            
            // Reset after 3 seconds
            setTimeout(() => {
              setButtonState(submitButton, originalText, false);
            }, 3000);
          } else {
            // Show error from API or default message
            const defaultError = getErrorMessage(errorMessage, 'general');
            showError(errorMessage, emailInput, result.error || defaultError);
            setButtonState(submitButton, originalText, false);
          }

        } catch (error) {
          console.error('Newsletter error:', error);
          const defaultError = getErrorMessage(errorMessage, 'general');
          showError(errorMessage, emailInput, defaultError);
          setButtonState(submitButton, originalText, false);
        }
      });

      // Real-time validation
      emailInput.addEventListener('input', function() {
        if (errorMessage.style.display === 'block') {
          resetErrorState(errorMessage, emailInput);
        }
      });
    }
  });
}

function resetErrorState(errorMessage, emailInput) {
  errorMessage.style.display = 'none';
  errorMessage.textContent = '';
  emailInput.classList.remove('error');
}

function showError(errorMessage, emailInput, message) {
  errorMessage.textContent = message;
  errorMessage.style.display = 'block';
  emailInput.classList.add('error');
  emailInput.focus();
}

function setButtonState(button, text, disabled, backgroundColor = '') {
  button.innerHTML = `<span>${text}</span>`;
  button.disabled = disabled;
  if (backgroundColor) {
    button.style.background = backgroundColor;
  } else {
    button.style.background = '';
  }
}

function getErrorMessage(errorElement, type) {
  return errorElement.getAttribute(`data-error-${type}`) || 'Une erreur est survenue.';
}

function getButtonText(button, type) {
  return button.getAttribute(`data-${type}-text`) || {
    loading: 'Chargement...',
    success: 'Inscrit !',
    subscribe: 'S\'abonner'
  }[type];
}