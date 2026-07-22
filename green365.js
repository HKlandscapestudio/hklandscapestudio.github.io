const green365 = [
  {
    day: 1,
    title: "Bắt đầu hành trình Green365",
    image: "assets/day-001.png"
  },

  {
    day: 2,
    title: "Khai sinh thương hiệu "Hoàng Kim Landscape Studio",
    image: "assets/day-002.png"
  }
];

const gallery = document.getElementById("green365-gallery");

if (gallery) {

  gallery.innerHTML = "";

  green365.forEach((item) => {

    const card = document.createElement("article");

    card.className = "green365-card";

    card.innerHTML = `
      <img src="${item.image}" alt="Green365 Ngày ${item.day}">

      <div class="green365-card-content">

        <span>Ngày ${String(item.day).padStart(3,"0")} / 365</span>

        <h3>${item.title}</h3>

      </div>
    `;

    gallery.appendChild(card);

  });

}
