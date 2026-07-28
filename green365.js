const gallery = document.getElementById("green365-gallery");

const githubApiUrl =
  "https://api.github.com/repos/HKlandscapestudio/hklandscapestudio.github.io/contents/assets";

async function loadGreen365Images() {
  if (!gallery) return;

  try {
    const response = await fetch(githubApiUrl);

    if (!response.ok) {
      throw new Error("Không thể đọc danh sách ảnh.");
    }

    const files = await response.json();

    const images = files
      .filter((file) => /^day-\d{3}\.(png|jpg|jpeg|webp)$/i.test(file.name))
      .sort((a, b) => {
        const dayA = Number(a.name.match(/\d{3}/)[0]);
        const dayB = Number(b.name.match(/\d{3}/)[0]);

        return dayB - dayA;
      });

    images.forEach((file) => {
      const card = document.createElement("article");
      card.className = "green365-card";

      const image = document.createElement("img");
      image.src = file.download_url;
      image.alt = "";
      image.loading = "lazy";

      card.appendChild(image);
      gallery.appendChild(card);
    });
  } catch (error) {
    console.error(error);
  }
}

loadGreen365Images();
