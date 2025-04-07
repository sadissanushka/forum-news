// Enhanced news card with popup functionality
export function createNewsCard({ image, category, title, excerpt, timeAgo, comments }) {
    const card = document.createElement('article');
    card.className = 'news-card';

    card.innerHTML = `
        <div class="news-image" style="background-image: url('${image}')"></div>
        <div class="news-content">
            <span class="news-category">${category}</span>
            <h3 class="news-title">${title}</h3>
            <p class="news-excerpt">${excerpt}</p>
            <div class="news-meta">
                <span>${timeAgo}</span>
                <span>${comments} comments</span>
            </div>
        </div>
    `;

    // Add click event to show popup
    card.addEventListener('click', () => {
        showNewsPopup({
            image,
            category,
            title,
            excerpt,
            timeAgo,
            comments
        });
    });

    return card;
}

// Create and show popup with news details
function showNewsPopup(newsItem) {
    // Create popup overlay
    const overlay = document.createElement('div');
    overlay.className = 'popup-overlay';
    
    // Create popup content
    const popup = document.createElement('div');
    popup.className = 'news-popup';
    
    popup.innerHTML = `
        <div class="popup-header">
            <span class="news-category">${newsItem.category}</span>
            <button class="popup-close-btn">&times;</button>
        </div>
        <div class="popup-image" style="background-image: url('${newsItem.image}')"></div>
        <div class="popup-content">
            <h2 class="popup-title">${newsItem.title}</h2>
            <p class="popup-excerpt">${newsItem.excerpt}</p>
            <div class="popup-meta">
                <span>${newsItem.timeAgo}</span>
                <span>${newsItem.comments} comments</span>
            </div>
            <div class="popup-actions">
                <button class="btn btn-primary more-info-btn">Read More</button>
                <button class="btn btn-outline chatgpt-btn">Ask ChatGPT</button>
            </div>
        </div>
    `;
    
    // Append popup to overlay and overlay to body
    overlay.appendChild(popup);
    document.body.appendChild(overlay);
    
    // Add close button event listener
    const closeBtn = popup.querySelector('.popup-close-btn');
    closeBtn.addEventListener('click', () => {
        document.body.removeChild(overlay);
    });
    
    // Close when clicking outside the popup
    overlay.addEventListener('click', (e) => {
        if (e.target === overlay) {
            document.body.removeChild(overlay);
        }
    });
    
    // Add event listeners for action buttons
    const moreInfoBtn = popup.querySelector('.more-info-btn');
    moreInfoBtn.addEventListener('click', () => {
        alert(`You'll be redirected to full article about "${newsItem.title}"`);
        // Here you would typically redirect to the full article page
    });
    
    const chatgptBtn = popup.querySelector('.chatgpt-btn');
    chatgptBtn.addEventListener('click', () => {
        alert(`Opening ChatGPT Q&A for "${newsItem.title}"`);
        // Here you would implement the ChatGPT functionality
    });
}

// Add styles for popup
function addPopupStyles() {
    const styleElement = document.createElement('style');
    styleElement.textContent = `
        .popup-overlay {
            position: fixed;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            background-color: rgba(0, 0, 0, 0.7);
            display: flex;
            justify-content: center;
            align-items: center;
            z-index: 1000;
            padding: 20px;
        }
        
        .news-popup {
            background-color: var(--light-card);
            border-radius: var(--border-radius);
            overflow: hidden;
            width: 100%;
            max-width: 700px;
            max-height: 90vh;
            overflow-y: auto;
            box-shadow: 0 5px 15px rgba(0, 0, 0, 0.3);
            animation: popup-fade-in 0.3s ease-out;
        }
        
        body.dark-mode .news-popup {
            background-color: var(--dark-card);
            color: var(--dark-mode-text);
        }
        
        @keyframes popup-fade-in {
            from { opacity: 0; transform: translateY(20px); }
            to { opacity: 1; transform: translateY(0); }
        }
        
        .popup-header {
            display: flex;
            justify-content: space-between;
            align-items: center;
            padding: 15px;
            border-bottom: 1px solid rgba(0, 0, 0, 0.1);
        }
        
        body.dark-mode .popup-header {
            border-bottom: 1px solid rgba(255, 255, 255, 0.1);
        }
        
        .popup-close-btn {
            background: none;
            border: none;
            font-size: 24px;
            cursor: pointer;
            color: #999;
            transition: color 0.3s;
            padding: 0;
            line-height: 1;
            width: 30px;
            height: 30px;
            display: flex;
            justify-content: center;
            align-items: center;
            border-radius: 50%;
        }
        
        .popup-close-btn:hover {
            color: var(--accent-color);
            background-color: rgba(0, 0, 0, 0.05);
        }
        
        body.dark-mode .popup-close-btn:hover {
            background-color: rgba(255, 255, 255, 0.05);
        }
        
        .popup-image {
            height: 300px;
            background-size: cover;
            background-position: center;
        }
        
        .popup-content {
            padding: 20px;
        }
        
        .popup-title {
            font-size: 1.5rem;
            margin-bottom: 15px;
        }
        
        .popup-excerpt {
            color: #666;
            margin-bottom: 20px;
            line-height: 1.6;
        }
        
        body.dark-mode .popup-excerpt {
            color: #bbb;
        }
        
        .popup-meta {
            display: flex;
            justify-content: space-between;
            color: #999;
            margin-bottom: 20px;
            font-size: 0.9rem;
        }
        
        .popup-actions {
            display: flex;
            gap: 10px;
        }
        
        @media (max-width: 768px) {
            .news-popup {
                max-width: 95%;
            }
            
            .popup-image {
                height: 200px;
            }
        }
    `;
    document.head.appendChild(styleElement);
}

// Add the popup styles when this module is imported
document.addEventListener('DOMContentLoaded', () => {
    addPopupStyles();
});