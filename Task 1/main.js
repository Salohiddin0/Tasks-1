let currentStep = 1

function showStep (step) {
  // Remove active class from all steps
  document
    .querySelectorAll('.step')
    .forEach(el => el.classList.remove('active'))

  // Add active class to current step
  document.getElementById(`step${step}`).classList.add('active')

  // Update step indicators
  document.querySelectorAll('.step-indicator span').forEach((el, index) => {
    el.classList.toggle('active', index + 1 === step)
  })

  // Update button states
  document.getElementById('prev-btn').disabled = step === 1
  document.getElementById('next-btn').innerText = step === 3 ? 'Submit' : 'Next'
}

function nextStep () {
  // Validate fields before proceeding
  if (currentStep === 1) {
    const nameField = document.getElementById('name').value.trim()
    if (!nameField) {
      displayMessage('Please fill out the name field!', 'red') // Show error in red
      return // Stop execution if validation fails
    }
  } else if (currentStep === 2) {
    const emailField = document.getElementById('email').value.trim()
    if (!emailField || !validateEmail(emailField)) {
      displayMessage('Please enter a valid email address!', 'red') // Show error in red
      return // Stop execution if validation fails
    }
  } else if (currentStep === 3) {
    const phoneField = document.getElementById('phone').value.trim()
    if (!phoneField || isNaN(phoneField)) {
      displayMessage('Please enter a valid phone number!', 'red') // Show error in red
      return // Stop execution if validation fails
    }
  }

  // Proceed to the next step
  if (currentStep < 3) {
    currentStep++
    showStep(currentStep)
    document.getElementById('result').innerHTML = '' // Clear result message
  } else {
    displayMessage('Form submitted successfully!', 'green') // Show success in green
  }
}

// Helper function to display a message
function displayMessage (message, color) {
  const resultElement = document.getElementById('result')
  resultElement.innerHTML = `<i>${message}</i>`
  resultElement.style.color = color

  // Hide the message after 2 seconds
  setTimeout(() => {
    resultElement.innerHTML = ''
  }, 2000)
}

// Helper function to validate email
function validateEmail (email) {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/ // Simple email validation regex
  return emailRegex.test(email)
}

function prevStep () {
  if (currentStep > 1) {
    currentStep--
    showStep(currentStep)
  }
}

// Initialize step navigation
document.getElementById('next-btn').addEventListener('click', nextStep)
document.getElementById('prev-btn').addEventListener('click', prevStep)
