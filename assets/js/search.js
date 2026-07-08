// Client-side search matching over content.json for 404 search and global queries

let searchIndex = null;

async function loadSearchIndex() {
  if (searchIndex) return searchIndex;
  
  try {
    const response = await fetch('./data/content.json');
    if (response.ok) {
      searchIndex = await response.json();
      return searchIndex;
    }
  } catch (err) {
    console.error('Error loading search database:', err);
  }
  return [];
}

export async function initSearch() {
  const searchInputs = document.querySelectorAll('.search-input');
  if (!searchInputs.length) return;

  const data = await loadSearchIndex();

  searchInputs.forEach(input => {
    const resultsContainer = document.querySelector(input.getAttribute('data-results') || '#search-results');
    
    input.addEventListener('input', () => {
      const query = input.value.trim().toLowerCase();
      
      if (query.length < 2) {
        if (resultsContainer) resultsContainer.innerHTML = '';
        return;
      }

      // Filter matches by checking title, description, or tags
      const matches = data.filter(item => {
        return item.title.toLowerCase().includes(query) || 
               item.description.toLowerCase().includes(query) ||
               (item.tags && item.tags.some(tag => tag.toLowerCase().includes(query)));
      });

      renderResults(matches, resultsContainer);
    });
  });
}

function renderResults(results, container) {
  if (!container) return;
  container.innerHTML = '';

  if (results.length === 0) {
    container.innerHTML = '<li class="search-no-results" style="padding: var(--space-3); color: var(--text-muted);">No matching pages found.</li>';
    return;
  }

  // Draw result items limit 5 matches
  results.slice(0, 5).forEach(item => {
    const li = document.createElement('li');
    li.style.borderBottom = '1px solid var(--border-color)';
    
    const a = document.createElement('a');
    a.href = item.url;
    a.style.display = 'block';
    a.style.padding = 'var(--space-3)';
    a.style.transition = 'background-color var(--transition-fast)';
    
    a.innerHTML = `
      <div style="font-family: var(--ff-display); font-weight: var(--fw-semibold); color: var(--accent);">${item.title}</div>
      <div style="font-size: var(--fs-100); color: var(--text-secondary); margin-top: 4px;">${item.description}</div>
    `;

    a.addEventListener('mouseenter', () => {
      a.style.backgroundColor = 'var(--bg-secondary)';
    });
    a.addEventListener('mouseleave', () => {
      a.style.backgroundColor = 'transparent';
    });

    li.appendChild(a);
    container.appendChild(li);
  });
}
