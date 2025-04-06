export function getBreadcrumbFromURL() {
    const path = window.location.pathname; // e.g. "/news/latest"
    const segments = path.split('/').filter(Boolean); // ['news', 'latest']
    
    const breadcrumb = [{ label: 'Home', url: '/' }];
  
    let currentPath = '';
    segments.forEach((seg, index) => {
      currentPath += `/${seg}`;
      breadcrumb.push({
        label: decodeURIComponent(seg.replace(/-/g, ' ')), // Pretty labels
        url: currentPath,
        active: index === segments.length - 1
      });
    });
  
    return breadcrumb;
  }
  