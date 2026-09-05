const gallery = document.getElementById('green365-gallery');

const githubApiUrl =
  'https://api.github.com/repos/HKlandscapestudio/hklandscapestudio.github.io/contents/assets';

const localFallbackMaxDay = 28;

function getDayNumber(filename) {
  const match = filename.match(/^day-(\d{3})\.(png|jpe?g|webp)$/i);
  return match ? Number(match[1]) : null;
}

function renderGreen365(files) {
  if (!gallery) return;

  const isDedicatedPage = Boolean(gallery.closest('.green365-page'));
  const sorted = [...files]
    .filter((file) => getDayNumber(file.name) !== null)
    .sort((a, b) => getDayNumber(b.name) - getDayNumber(a.name));

  const visible = isDedicatedPage ? sorted : sorted.slice(0, 6);
  gallery.replaceChildren();

  visible.forEach((file) => {
    const day = getDayNumber(file.name);
    const card = document.createElement('article');
    card.className = 'green365-card';

    const image = document.createElement('img');
    image.src = file.url;
    image.alt = `GREEN365 Journal – Day ${day} / 365`;
    image.loading = 'lazy';
    image.decoding = 'async';

    const content = document.createElement('div');
    content.className = 'green365-card-content';
    content.innerHTML = `<span>GREEN365 JOURNAL</span><h3>Day ${day} / 365</h3>`;

    card.append(image, content);
    gallery.appendChild(card);
  });

  if (!visible.length) {
    gallery.innerHTML = '<p class="green365-status">Chưa có bài Green365 để hiển thị.</p>';
  }
}

function localFallbackFiles() {
  return Array.from({ length: localFallbackMaxDay }, (_, index) => {
    const day = String(index + 1).padStart(3, '0');
    return { name: `day-${day}.png`, url: `assets/day-${day}.png` };
  });
}

async function loadGreen365Images() {
  if (!gallery) return;

  gallery.setAttribute('aria-busy', 'true');

  try {
    const response = await fetch(githubApiUrl, {
      headers: { Accept: 'application/vnd.github+json' }
    });

    if (!response.ok) throw new Error(`GitHub API: ${response.status}`);

    const files = await response.json();
    const images = files
      .filter((file) => getDayNumber(file.name) !== null)
      .map((file) => ({ name: file.name, url: file.download_url }));

    renderGreen365(images.length ? images : localFallbackFiles());
  } catch (error) {
    console.warn('Không tải được danh sách Green365 từ GitHub, dùng ảnh cục bộ.', error);
    renderGreen365(localFallbackFiles());
  } finally {
    gallery.removeAttribute('aria-busy');
  }
}

loadGreen365Images();
