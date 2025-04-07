import { forumPosts } from './data/forum-item-data.js';
import { createForumItem } from './forum-item.js';

// Add styling to make the news grid and cards display properly
function addStyles() {
    const styleElement = document.createElement('style');
    styleElement.textContent = `
    .trending-forums {
        background-color: var(--light-card);
        border-radius: var(--border-radius);
        padding: 20px;
        box-shadow: var(--box-shadow);
        transition: background-color 0.3s;
    }

    body.dark-mode .trending-forums {
        background-color: var(--dark-card);
        box-shadow: var(--dark-box-shadow);
    }

    .forum-list {
        list-style: none;
    }

    .forum-item {
        padding: 15px 0;
        border-bottom: 1px solid #eee;
    }

    body.dark-mode .forum-item {
        border-bottom: 1px solid rgba(255, 255, 255, 0.1);
    }

    .forum-item:last-child {
        border-bottom: none;
    }

    .forum-title {
        font-weight: 600;
        font-size: 1rem;
        margin-bottom: 5px;
    }

    .forum-meta {
        display: flex;
        justify-content: space-between;
        font-size: 0.8rem;
        color: #999;
    }

    .forum-stats {
        display: flex;
        gap: 15px;
    }
    `;
    document.head.appendChild(styleElement);
}

// Initialize the forum list with items
function initForumList() {
    const forumList = document.getElementById('forum-list');
    
    if (forumList) {
        forumPosts.forEach(item => {
            const forumItem = createForumItem(item);
            forumList.appendChild(forumItem);
        });
    } else {
        console.error('Forum list element not found');
    }
}

// Run when the DOM is fully loaded
document.addEventListener('DOMContentLoaded', () => {
    addStyles();
    initForumList();
});