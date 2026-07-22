const green365 = [
  {
    day: 1,
    title: "Bắt đầu hành trình Green365",
    image: "assets/green365/day-001.jpg"
  },

  {
    day: 8,
    title: "Xây dựng Plant Database",
    image: "assets/green365/day-008.jpg"
  },

  {
    day: 9,
    title: "Khởi tạo Website Hoàng Kim Landscape Studio",
    image: "assets/green365/day-009.jpg"
  }
];

const gallery = document.getElementById("green365-gallery");

if (gallery) {
  const sortedDays = [...green365].sort((a, b) => b.day - a.day);

  sortedDays.forEach((item) => {
    const card = document.createElement("article");
    card.className = "green365-card";

    card.innerHTML = `
      <img
        src="${item.image}"
        alt="Green365 ngày ${item.day}"
        loading="lazy"
      >

      <div class="green365-card-content">
        <span>Ngày ${String(item.day).padStart(3, "0")} / 365</span>
        <h3>${item.title}</h3>
      </div>
    `;

    gallery.appendChild(card);
  });
}
