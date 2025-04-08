// Update components/news-card/main.js

import { newsData } from './data/news-card-data.js';
import { createNewsCard } from '../news-card-popup/popup.js';

// Initialize the news grid with cards
function initNewsGrid() {
    const newsGrid = document.getElementById('news-grid');
    
    if (newsGrid) {
        // Make sure the data has likes property
        const newsWithLikes = newsData.map(item => ({
            ...item,
            likes: item.likes || Math.floor(Math.random() * 200) + 50 // Add random likes if not present
        }));
        
        // Add each news item to the grid
        newsWithLikes.forEach(newsItem => {
            const card = createNewsCard(newsItem);
            newsGrid.appendChild(card);
        });
    } else {
        console.error('News grid element not found');
    }
}

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
    
    .news-header {
        display: flex;
        justify-content: space-between;
        align-items: center;
        margin-bottom: 10px;
    }

    .news-category {
        display: inline-block;
        background-color: var(--secondary-color);
        color: white;
        padding: 3px 8px;
        border-radius: 4px;
        font-size: 0.8rem;
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

    /* Like button styles */
    .like-button {
        display: flex;
        align-items: center;
        gap: 4px;
        padding: 3px 8px;
        border-radius: 20px;
        background-color: rgba(0, 0, 0, 0.05);
        cursor: pointer;
        transition: background-color 0.2s;
        z-index: 10;
    }
    
    body.dark-mode .like-button {
        background-color: rgba(255, 255, 255, 0.1);
    }
    
    .like-button:hover {
        background-color: rgba(0, 0, 0, 0.1);
    }
    
    body.dark-mode .like-button:hover {
        background-color: rgba(255, 255, 255, 0.15);
    }
    
    .like-icon {
        color: #ccc;
        font-size: 14px;
        transition: color 0.2s, transform 0.2s;
    }
    
    .like-button.liked .like-icon {
        color: #e74c3c;
        transform: scale(1.2);
    }
    
    .like-button.liked {
        background-color: rgba(231, 76, 60, 0.1);
    }
    
    body.dark-mode .like-button.liked {
        background-color: rgba(231, 76, 60, 0.2);
    }
    
    .likes-count {
        font-size: 0.8rem;
        color: #666;
    }
    
    body.dark-mode .likes-count {
        color: #bbb;
    }

    @media (max-width: 768px) {
        .news-grid {
            grid-template-columns: 1fr;
        }
    }
    `;
    document.head.appendChild(styleElement);
}

// Run when the DOM is fully loaded
document.addEventListener('DOMContentLoaded', () => {
    addStyles();
    initNewsGrid();
});