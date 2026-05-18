console.log("JS connected!");

let allPosts = [];

const postsContainer = document.querySelector('#posts-container');
const loading = document.querySelector('#loading');
const searchInput = document.querySelector('#search-input');

function renderPosts(list) {
  if (!postsContainer) return;

  const html = list
    .map(post => `
      <div class="post">
        <h3>${post.title}</h3>
        <p>${post.body}</p>
      </div>
    `)
    .join('');

  postsContainer.innerHTML = html;
}

async function loadPosts() {
  if (!loading || !postsContainer) return;

  try {
    const response = await fetch('https://jsonplaceholder.typicode.com/posts');

    if (!response.ok) {
      throw new Error('Помилка сервера');
    }

    const data = await response.json();

    allPosts = data.slice(0, 10);

    renderPosts(allPosts);

    loading.style.display = 'none';

  } catch (error) {
    console.error(error);
    loading.textContent = 'Помилка завантаження';
  }
}

if (searchInput) {
  searchInput.addEventListener('input', () => {
    const value = searchInput.value.toLowerCase();

    const filtered = allPosts.filter(post =>
      post.title.toLowerCase().includes(value)
    );

    renderPosts(filtered);
  });
}

loadPosts();

const themeBtn = document.querySelector('#theme-toggle');
const bodyElement = document.body;

if (themeBtn) {
  themeBtn.addEventListener('click', () => {
    bodyElement.classList.toggle('dark-theme');
  });
}

const openBtn = document.querySelector('#open-modal');
const closeBtn = document.querySelector('#close-modal');
const modal = document.querySelector('#modal');

if (openBtn && closeBtn && modal) {
  openBtn.addEventListener('click', () => {
    modal.classList.add('is-open');
  });

  closeBtn.addEventListener('click', () => {
    modal.classList.remove('is-open');
  });
}

document.addEventListener('keydown', (event) => {
  if (event.key === 'Escape' && modal) {
    modal.classList.remove('is-open');
  }
});

const form = document.querySelector('#contact-form');
const nameInput = document.querySelector('#user-name');

if (form && nameInput) {
  form.addEventListener('submit', (event) => {
    event.preventDefault();

    if (nameInput.value.trim().length < 2) {
      alert("Ім'я має містити щонайменше 2 символи");
    } else {
      alert("Форму відправлено!");
    }
  });
}