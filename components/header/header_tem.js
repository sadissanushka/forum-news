/**
 * Header Component JavaScript
 * Handles header interactions including:
 * - Dark mode toggle
 * - Mobile menu toggle
 * - Dropdown menus for mobile view
 */

// Self-invoking function to avoid global scope pollution
(function() {
    // DOM Elements
    const darkModeToggle = document.querySelector('.dark-mode-toggle');
    const hamburger = document.querySelector('.hamburger');
    const navLinks = document.querySelector('.nav-links');
    const dropdownTriggers = document.querySelectorAll('.dropdown-trigger');
    
    // Initialize header functionality
    function initHeader() {
        setupDarkMode();
        setupMobileMenu();
        setupDropdowns();
    }
    // Dark Mode functionality
    function setupDarkMode() {
        // Check for saved dark mode preference on page load
        if (localStorage.getItem('darkMode') === 'enabled') {
            document.body.classList.add('dark-mode');
        }
        
        // Toggle dark mode when clicking the toggle button
        darkModeToggle.addEventListener('click', () => {
            document.body.classList.toggle('dark-mode');
            
            // Save preference to localStorage
            if (document.body.classList.contains('dark-mode')) {
                localStorage.setItem('darkMode', 'enabled');
            } else {
                localStorage.setItem('darkMode', 'disabled');
            }
        });
    }
    
    // Mobile menu toggle
    function setupMobileMenu() {
        hamburger.addEventListener('click', () => {
            navLinks.classList.toggle('active');
            
            // Animate hamburger
            const spans = hamburger.querySelectorAll('span');
            spans[0].classList.toggle('rotate-45');
            spans[1].classList.toggle('opacity-0');
            spans[2].classList.toggle('rotate-neg-45');
        });
    }
    
    // Mobile dropdown menus
    function setupDropdowns() {
        // For mobile: clicking on dropdown triggers
        if (window.innerWidth <= 768) {
            dropdownTriggers.forEach(trigger => {
                trigger.addEventListener('click', function(e) {
                    // Only for mobile view
                    if (window.innerWidth <= 768) {
                        e.preventDefault();
                        const parent = this.parentElement;
                        const dropdown = parent.querySelector('.dropdown-content');
                        dropdown.classList.toggle('active');
                    }
                });
            });
        }
        
        // Reset dropdown states on window resize
        window.addEventListener('resize', () => {
            if (window.innerWidth > 768) {
                document.querySelectorAll('.dropdown-content').forEach(dropdown => {
                    dropdown.classList.remove('active');
                });
                navLinks.classList.remove('active');
            }
        });
    }
    
    // Initialize when DOM is fully loaded
    document.addEventListener('DOMContentLoaded', initHeader);
})();
