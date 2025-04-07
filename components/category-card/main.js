import { categories } from './data/category-data.js';
import { createCategoryCard } from './category.js';

// Add styling to make the news grid and cards display properly
function addStyles() {
    const styleElement = document.createElement('style');
    styleElement.textContent = `
    .categories {
        margin-bottom: 40px;
    }

    .category-grid {
        display: grid;
        grid-template-columns: repeat(4, 1fr);
        gap: 15px;
    }

    .category-card {
        background-color: var(--light-card);
        border-radius: var(--border-radius);
        padding: 20px;
        text-align: center;
        box-shadow: var(--box-shadow);
        transition: all 0.3s;
    }

    body.dark-mode .category-card {
        background-color: var(--dark-card);
        box-shadow: var(--dark-box-shadow);
    }

    .category-card:hover {
        transform: translateY(-3px);
        box-shadow: 0 5px 15px rgba(0,0,0,0.1);
    }

    body.dark-mode .category-card:hover {
        box-shadow: 0 5px 15px rgba(0,0,0,0.3);
    }

    .category-icon {
        font-size: 24px;
        margin-bottom: 10px;
        color: var(--secondary-color);
    }

    .category-name {
        font-weight: 600;
    }

    .category-count {
        font-size: 0.8rem;
        color: #999;
    }
    `;
    document.head.appendChild(styleElement);
}

// Initialize the news grid with cards
function initNewsGrid() {
    const grid = document.getElementById('category-grid');
    
    // Add each news item to the grid
    categories.forEach(category => {
        const card = createCategoryCard(category);
        grid.appendChild(card);
    });
}

// Run when the DOM is fully loaded
document.addEventListener('DOMContentLoaded', () => {
    addStyles();
    initNewsGrid();
});