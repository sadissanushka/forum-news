// Update the popup.js file

// Enhanced news card with popup functionality
export function createNewsCard({ image, category, title, excerpt, timeAgo, comments, likes = 0 }) {
    const card = document.createElement('article');
    card.className = 'news-card';

    card.innerHTML = `
        <div class="news-image" style="background-image: url('${image}')"></div>
        <div class="news-content">
            <div class="news-header">
                <span class="news-category">${category}</span>
                <div class="like-button" data-likes="${likes}">
                    <i class="like-icon">♥</i>
                    <span class="likes-count">${likes}</span>
                </div>
            </div>
            <h3 class="news-title">${title}</h3>
            <p class="news-excerpt">${excerpt}</p>
            <div class="news-meta">
                <span>${timeAgo}</span>
                <span>${comments} comments</span>
            </div>
        </div>
    `;

    // Generate a unique ID for this news item
    const cardId = `news-${title.replace(/\s+/g, '-').toLowerCase()}`;
    
    // Add like/upvote functionality
    const likeButton = card.querySelector('.like-button');
    const likesCountDisplay = card.querySelector('.likes-count');
    let liked = localStorage.getItem(cardId) === 'liked';
    
    // Set initial state
    if (liked) {
        likeButton.classList.add('liked');
    }

    likeButton.addEventListener('click', (e) => {
        e.stopPropagation(); // Very important to prevent the card click
        
        let currentLikes = parseInt(likesCountDisplay.textContent);
        
        if (!liked) {
            currentLikes++;
            likeButton.classList.add('liked');
            liked = true;
            localStorage.setItem(cardId, 'liked');
        } else {
            currentLikes--;
            likeButton.classList.remove('liked');
            liked = false;
            localStorage.removeItem(cardId);
        }
        
        likesCountDisplay.textContent = currentLikes;
    });

    // Add click event to show popup
    card.addEventListener('click', (e) => {
        // Don't show popup if clicking the like button
        if (!e.target.closest('.like-button')) {
            showNewsPopup({
                image,
                category,
                title,
                excerpt,
                timeAgo,
                comments,
                likes: parseInt(likesCountDisplay.textContent), // Get current likes count
                cardId // Pass the ID to maintain like state
            });
        }
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
            <div class="popup-actions-top">
                <div class="like-button popup-like-button" data-likes="${newsItem.likes}">
                    <i class="like-icon">♥</i>
                    <span class="likes-count">${newsItem.likes}</span>
                </div>
                <button class="popup-close-btn">&times;</button>
            </div>
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
    
    // Prevent scrolling of the background
    document.body.style.overflow = 'hidden';
    
    // Apply blur effect to all main content elements
    applyBlurToMainContent(true);
    
    // Sync like button state from localStorage
    const popupLikeButton = popup.querySelector('.popup-like-button');
    const popupLikesCount = popup.querySelector('.likes-count');
    let liked = localStorage.getItem(newsItem.cardId) === 'liked';
    
    if (liked) {
        popupLikeButton.classList.add('liked');
    }
    
    // Add like functionality in the popup
    popupLikeButton.addEventListener('click', () => {
        let currentLikes = parseInt(popupLikesCount.textContent);
        
        if (!liked) {
            currentLikes++;
            popupLikeButton.classList.add('liked');
            liked = true;
            localStorage.setItem(newsItem.cardId, 'liked');
        } else {
            currentLikes--;
            popupLikeButton.classList.remove('liked');
            liked = false;
            localStorage.removeItem(newsItem.cardId);
        }
        
        popupLikesCount.textContent = currentLikes;
        
        // Update the card's like count in the background
        const cardLikeButton = document.querySelector(`[data-likes="${newsItem.likes}"]`);
        if (cardLikeButton) {
            const cardLikesCount = cardLikeButton.querySelector('.likes-count');
            cardLikesCount.textContent = currentLikes;
            if (liked) {
                cardLikeButton.classList.add('liked');
            } else {
                cardLikeButton.classList.remove('liked');
            }
        }
    });
    
    // Add close button event listener
    const closeBtn = popup.querySelector('.popup-close-btn');
    closeBtn.addEventListener('click', () => {
        closePopup(overlay);
    });
    
    // Close when clicking outside the popup
    overlay.addEventListener('click', (e) => {
        if (e.target === overlay) {
            closePopup(overlay);
        }
    });
    
    // Add event listeners for action buttons
    const moreInfoBtn = popup.querySelector('.more-info-btn');
    moreInfoBtn.addEventListener('click', () => {
        alert(`You'll be redirected to full article about "${newsItem.title}"`);
    });
    
    const chatgptBtn = popup.querySelector('.chatgpt-btn');
    chatgptBtn.addEventListener('click', () => {
        alert(`Opening ChatGPT Q&A for "${newsItem.title}"`);
    });
    
    // Add keyboard event listener to close popup on ESC key
    document.addEventListener('keydown', handleKeyDown);
    
    function handleKeyDown(e) {
        if (e.key === 'Escape') {
            closePopup(overlay);
            document.removeEventListener('keydown', handleKeyDown);
        }
    }
}

// Function to apply/remove blur to main content elements
function applyBlurToMainContent(apply) {
    // Target all main content sections
    const elementsToBlur = [
        '.container',
        '.site-header',
        '.hero',
        '#breadcrumb-container',
        '#header-container',
        '.main-content',
        '.news-section',
        '.trending-forums',
        '.categories',
        '#footer-container'
    ];
    
    elementsToBlur.forEach(selector => {
        const elements = document.querySelectorAll(selector);
        elements.forEach(element => {
            if (apply) {
                element.classList.add('blur-background');
            } else {
                element.classList.remove('blur-background');
            }
        });
    });
}

// Function to close popup and restore normal state
function closePopup(overlay) {
    // Remove blur effect from all elements
    applyBlurToMainContent(false);
    
    // Allow scrolling again
    document.body.style.overflow = '';
    
    // Remove the overlay
    document.body.removeChild(overlay);
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
            backdrop-filter: blur(2px);
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
            z-index: 1001;
        }
        
        body.dark-mode .news-popup {
            background-color: var(--dark-card);
            color: var(--dark-mode-text);
        }
        
        /* Blur effect for background elements */
        .blur-background {
            filter: blur(5px);
            transition: filter 0.3s ease;
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
        
        .popup-actions-top {
            display: flex;
            align-items: center;
            gap: 10px;
        }
        
        .popup-like-button {
            margin-right: 5px;
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
            position: relative;
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