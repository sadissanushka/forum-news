// components/category/category.js
export function createCategoryCard({ icon, name, count }) {
    const div = document.createElement('div');
    div.className = 'category-card';
  
    div.innerHTML = `
      <div class="category-icon">${icon}</div>
      <div class="category-name">${name}</div>
      <div class="category-count">${count}</div>
    `;
  
    return div;
  }
  