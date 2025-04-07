import { newsData } from './data/news-card-data.js';
import { createNewsCard } from './news-card.js';

// Add styling to make the news grid and cards display properly
function addStyles() {
    const styleElement = document.createElement('style');
    styleElement.textContent = `
    .news-grid {
        display: grid;
        grid-template-columns: repeat(2, 1fr);
        gap: 20px;
    }

    .news-card {
        background-color: var(--light-card);
        border-radius: var(--border-radius);
        overflow: hidden;
        box-shadow: var(--box-shadow);
        transition: transform 0.3s, background-color 0.3s;
        cursor: pointer;
    }

    body.dark-mode .news-card {
        background-color: var(--dark-card);
        box-shadow: var(--dark-box-shadow);
    }

    .news-card:hover {
        transform: translateY(-5px);
    }

    .news-image {
        height: 200px;
        background-color: #ddd;
        background-size: cover;
        background-position: center;
    }

    .news-content {
        padding: 15px;
    }

    .news-category {
        display: inline-block;
        background-color: var(--secondary-color);
        color: white;
        padding: 3px 8px;
        border-radius: 4px;
        font-size: 0.8rem;
        margin-bottom: 10px;
    }

    .news-title {
        font-size: 1.2rem;
        margin-bottom: 10px;
    }

    .news-excerpt {
        color: #666;
        font-size: 0.9rem;
        margin-bottom: 15px;
    }

    body.dark-mode .news-excerpt {
        color: #bbb;
    }

    .news-meta {
        display: flex;
        justify-content: space-between;
        font-size: 0.8rem;
        color: #999;
    }

    @media (max-width: 768px) {
        .news-grid {
            grid-template-columns: 1fr;
        }
    }
    `;
    document.head.appendChild(styleElement);
}

// Initialize the news grid with cards
function initNewsGrid() {
    const newsGrid = document.getElementById('news-grid');
    
    if (newsGrid) {
        // Add each news item to the grid
        newsData.forEach(newsItem => {
            const card = createNewsCard(newsItem);
            newsGrid.appendChild(card);
        });
    } else {
        console.error('News grid element not found');
    }
}

// Run when the DOM is fully loaded
document.addEventListener('DOMContentLoaded', () => {
    addStyles();
    initNewsGrid();
});