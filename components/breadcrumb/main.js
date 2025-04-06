import { getBreadcrumbFromURL } from './breadcrumb-url.js';
import { createBreadcrumb } from './breadcrumb.js';

// Add styling to make the breadcrumb display properly
function addStyles() {
  const styleElement = document.createElement('style');
  styleElement.textContent = `
    .breadcrumb {
        padding: 15px 0;
        background-color: var(--light-bg);
        border-bottom: 1px solid rgba(0, 0, 0, 0.1);
        transition: background-color 0.3s;
    }

    body.dark-mode .breadcrumb {
        background-color: rgba(0, 0, 0, 0.2);
        border-bottom: 1px solid rgba(255, 255, 255, 0.1);
    }

    .breadcrumb-list {
        list-style: none;
        display: flex;
        flex-wrap: wrap;
    }

    .breadcrumb-item {
        display: inline-block;
    }

    .breadcrumb-item:not(:last-child)::after {
        content: "›";
        margin: 0 8px;
        color: #999;
    }

    .breadcrumb-item a {
        color: var(--secondary-color);
        text-decoration: none;
    }

    .breadcrumb-item.active {
        color: #999;
    }
  `;
  document.head.appendChild(styleElement);
}

// Initialize the breadcrumb navigation
function initBreadcrumb() {
  const container = document.getElementById('breadcrumb-container');
  if (container) {
    const breadcrumbItems = getBreadcrumbFromURL();
    const breadcrumbElement = createBreadcrumb(breadcrumbItems);
    container.appendChild(breadcrumbElement);
  } else {
    console.error('Breadcrumb container not found');
  }
}

// Run initialization when the DOM is fully loaded
document.addEventListener('DOMContentLoaded', () => {
  addStyles();
  initBreadcrumb();
});