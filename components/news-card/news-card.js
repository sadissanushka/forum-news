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

    return card;
}