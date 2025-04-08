const hamburger = document.querySelector('.hamburger');
const navLinks = document.querySelector('.nav-links');

hamburger.addEventListener('click', () => {
    navLinks.classList.toggle('active');
    
    // Animate hamburger
    const spans = hamburger.querySelectorAll('span');
    spans[0].classList.toggle('rotate-45');
    spans[1].classList.toggle('opacity-0');
    spans[2].classList.toggle('rotate-neg-45');
});

// Update the HTML for the dark mode toggle
const darkModeToggle = document.querySelector('.dark-mode-toggle');
darkModeToggle.innerHTML = `
  <span class="sun-icon">🌙</span>
  <div class="toggle-thumb"></div>
  <span class="moon-icon">☀️</span>
`;

// Dark Mode Toggle functionality
darkModeToggle.addEventListener('click', () => {
  document.body.classList.toggle('dark-mode');
  
  // Save preference to localStorage
  if (document.body.classList.contains('dark-mode')) {
    localStorage.setItem('darkMode', 'enabled');
  } else {
    localStorage.setItem('darkMode', 'disabled');
  }
});

// Check for saved dark mode preference
if (localStorage.getItem('darkMode') === 'enabled') {
  document.body.classList.add('dark-mode');
}