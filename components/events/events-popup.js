// events-popup.js - Events functionality with popup

// Sample event data
const eventsData = [
    {
        title: "Tech Conference 2025",
        date: "May 15-17, 2025",
        location: "San Francisco, CA",
        description: "Join industry leaders for three days of workshops, talks, and networking focused on emerging technologies.",
        image: "/api/placeholder/400/200"
    },
    {
        title: "Science Fair",
        date: "June 10, 2025",
        location: "Chicago, IL",
        description: "Annual science exhibition featuring groundbreaking research and innovations from universities and research institutions.",
        image: "/api/placeholder/400/200"
    },
    {
        title: "Health & Wellness Summit",
        date: "July 5-6, 2025",
        location: "New York, NY",
        description: "A comprehensive event covering the latest trends and research in health, fitness, nutrition, and mental wellbeing.",
        image: "/api/placeholder/400/200"
    },
    {
        title: "Environmental Symposium",
        date: "August 22, 2025",
        location: "Seattle, WA",
        description: "Discussions and presentations on climate solutions, conservation efforts, and sustainable practices.",
        image: "/api/placeholder/400/200"
    }
];

// Initialize events functionality
export function initEvents() {
    // Add event listener to the Events link in the header
    const eventsLink = document.querySelector('a[href="pages/about.html"]');
    if (eventsLink) {
        eventsLink.addEventListener('click', (e) => {
            e.preventDefault();
            showEventsPopup();
        });
    }
    
    // Add styles for events popup
    addEventsPopupStyles();
}

// Show events popup with list of upcoming events
function showEventsPopup() {
    // Create popup overlay
    const overlay = document.createElement('div');
    overlay.className = 'popup-overlay events-overlay';
    
    // Create popup content
    const popup = document.createElement('div');
    popup.className = 'events-popup';
    
    // Create popup header
    const popupHeader = document.createElement('div');
    popupHeader.className = 'popup-header';
    popupHeader.innerHTML = `
        <h2>Upcoming Events</h2>
        <button class="popup-close-btn">&times;</button>
    `;
    
    // Create popup content with events list
    const popupContent = document.createElement('div');
    popupContent.className = 'events-list';
    
    // Add each event to the list
    eventsData.forEach(event => {
        const eventCard = document.createElement('div');
        eventCard.className = 'event-card';
        eventCard.innerHTML = `
            <div class="event-image" style="background-image: url('${event.image}')"></div>
            <div class="event-content">
                <div class="event-header">
                    <h3 class="event-title">${event.title}</h3>
                    <span class="event-date">${event.date}</span>
                </div>
                <div class="event-location">${event.location}</div>
                <p class="event-description">${event.description}</p>
                <button class="btn btn-primary register-btn">Register</button>
            </div>
        `;
        popupContent.appendChild(eventCard);
        
        // Add register button functionality
        const registerBtn = eventCard.querySelector('.register-btn');
        registerBtn.addEventListener('click', () => {
            alert(`Registration for "${event.title}" will open soon!`);
        });
    });
    
    // Assemble the popup
    popup.appendChild(popupHeader);
    popup.appendChild(popupContent);
    overlay.appendChild(popup);
    document.body.appendChild(overlay);
    
    // Prevent scrolling of the background
    document.body.style.overflow = 'hidden';
    
    // Apply blur effect to main content
    applyBlurToMainContent(true);
    
    // Add close button event listener
    const closeBtn = popup.querySelector('.popup-close-btn');
    closeBtn.addEventListener('click', () => {
        closeEventsPopup(overlay);
    });
    
    // Close when clicking outside the popup
    overlay.addEventListener('click', (e) => {
        if (e.target === overlay) {
            closeEventsPopup(overlay);
        }
    });
    
    // Add keyboard event listener to close popup on ESC key
    document.addEventListener('keydown', handleKeyDown);
    
    function handleKeyDown(e) {
        if (e.key === 'Escape') {
            closeEventsPopup(overlay);
            document.removeEventListener('keydown', handleKeyDown);
        }
    }
}

// Close events popup and restore normal state
function closeEventsPopup(overlay) {
    // Remove blur effect
    applyBlurToMainContent(false);
    
    // Allow scrolling again
    document.body.style.overflow = '';
    
    // Remove the overlay
    document.body.removeChild(overlay);
}

// Function to apply/remove blur to main content elements
function applyBlurToMainContent(apply) {
    // Target all main content sections (same as in news popup)
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

// Add styles for events popup
function addEventsPopupStyles() {
    const styleElement = document.createElement('style');
    styleElement.textContent = `
        /* Events Popup Styles */
        .events-overlay {
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
        
        .events-popup {
            background-color: var(--light-card);
            border-radius: var(--border-radius);
            overflow: hidden;
            width: 100%;
            max-width: 800px;
            max-height: 90vh;
            overflow-y: auto;
            box-shadow: 0 5px 15px rgba(0, 0, 0, 0.3);
            animation: popup-fade-in 0.3s ease-out;
            z-index: 1001;
        }
        
        body.dark-mode .events-popup {
            background-color: var(--dark-card);
            color: var(--dark-mode-text);
        }
        
        .popup-header {
            display: flex;
            justify-content: space-between;
            align-items: center;
            padding: 15px 20px;
            border-bottom: 1px solid rgba(0, 0, 0, 0.1);
            position: sticky;
            top: 0;
            background-color: var(--light-card);
            z-index: 10;
        }
        
        body.dark-mode .popup-header {
            border-bottom: 1px solid rgba(255, 255, 255, 0.1);
            background-color: var(--dark-card);
        }
        
        .popup-header h2 {
            margin: 0;
            font-size: 1.5rem;
            color: var(--primary-color);
        }
        
        body.dark-mode .popup-header h2 {
            color: var(--light-text);
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
        
        .events-list {
            padding: 20px;
            display: flex;
            flex-direction: column;
            gap: 20px;
        }
        
        .event-card {
            display: flex;
            border-radius: var(--border-radius);
            overflow: hidden;
            box-shadow: var(--box-shadow);
            background-color: #fff;
            transition: transform 0.3s;
        }
        
        body.dark-mode .event-card {
            background-color: var(--dark-card);
            box-shadow: var(--dark-box-shadow);
        }
        
        .event-card:hover {
            transform: translateY(-5px);
        }
        
        .event-image {
            width: 150px;
            min-height: 150px;
            background-size: cover;
            background-position: center;
            flex-shrink: 0;
        }
        
        .event-content {
            padding: 15px;
            flex-grow: 1;
            display: flex;
            flex-direction: column;
        }
        
        .event-header {
            display: flex;
            justify-content: space-between;
            align-items: flex-start;
            margin-bottom: 10px;
        }
        
        .event-title {
            margin: 0;
            font-size: 1.2rem;
            color: var(--primary-color);
        }
        
        body.dark-mode .event-title {
            color: var(--light-text);
        }
        
        .event-date {
            background-color: var(--secondary-color);
            color: white;
            padding: 3px 8px;
            border-radius: 4px;
            font-size: 0.8rem;
            font-weight: 500;
        }
        
        .event-location {
            font-size: 0.9rem;
            color: #666;
            margin-bottom: 10px;
        }
        
        body.dark-mode .event-location {
            color: #bbb;
        }
        
        .event-description {
            color: #666;
            font-size: 0.9rem;
            margin-bottom: 15px;
            flex-grow: 1;
        }
        
        body.dark-mode .event-description {
            color: #bbb;
        }
        
        .register-btn {
            align-self: flex-start;
        }
        
        @keyframes popup-fade-in {
            from { opacity: 0; transform: translateY(20px); }
            to { opacity: 1; transform: translateY(0); }
        }
        
        .blur-background {
            filter: blur(5px);
            transition: filter 0.3s ease;
        }
        
        @media (max-width: 768px) {
            .events-popup {
                max-width: 95%;
            }
            
            .event-card {
                flex-direction: column;
            }
            
            .event-image {
                width: 100%;
                height: 150px;
            }
            
            .event-header {
                flex-direction: column;
                gap: 10px;
            }
            
            .event-date {
                align-self: flex-start;
            }
        }
    `;
    document.head.appendChild(styleElement);
}