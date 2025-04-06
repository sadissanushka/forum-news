// components/breadcrumb/breadcrumb.js
export function createBreadcrumb(items) {
    const wrapper = document.createElement('div');
    wrapper.className = 'breadcrumb';
  
    wrapper.innerHTML = `
      <div class="container">
        <ul class="breadcrumb-list">
          ${items
            .map((item, i) => {
              if (item.active) {
                return `<li class="breadcrumb-item active">${item.label}</li>`;
              } else {
                return `<li class="breadcrumb-item"><a href="${item.url}">${item.label}</a></li>`;
              }
            })
            .join('')}
        </ul>
      </div>
    `;
  
    return wrapper;
  }
  