const portfolioPages = [
  "assets/portfolio/page-01.jpg",
  "assets/portfolio/page-02.jpg",
  "assets/portfolio/page-03.jpg",
  "assets/portfolio/page-04.jpg",
  "assets/portfolio/page-05.jpg",
  "assets/portfolio/page-06.jpg",
  "assets/portfolio/page-07.jpg",
  "assets/portfolio/page-08.jpg",
  "assets/portfolio/page-09.jpg",
  "assets/portfolio/page-10.jpg"
];

let currentPage = 0;

const pageImage = document.getElementById("portfolio-page-image");
const pageCounter = document.getElementById("portfolio-page-counter");
const loadingText = document.getElementById("portfolio-loading");

const previousButtons = [
  document.getElementById("previous-page"),
  document.getElementById("previous-page-bottom")
];

const nextButtons = [
  document.getElementById("next-page"),
  document.getElementById("next-page-bottom")
];

function showPage(pageIndex) {
  if (!pageImage || portfolioPages.length === 0) {
    return;
  }

  currentPage = Math.max(
    0,
    Math.min(pageIndex, portfolioPages.length - 1)
  );

  if (loadingText) {
    loadingText.style.display = "block";
  }

  pageImage.classList.add("page-changing");

  pageImage.onload = () => {
    pageImage.classList.remove("page-changing");

    if (loadingText) {
      loadingText.style.display = "none";
    }
  };

  pageImage.onerror = () => {
    pageImage.classList.remove("page-changing");

    if (loadingText) {
      loadingText.textContent =
        "Không tìm thấy ảnh. Hãy kiểm tra tên và vị trí file.";
    }
  };

  pageImage.src = portfolioPages[currentPage];

  pageImage.alt =
    `Portfolio Hoàng Kim Landscape Studio – Trang ${currentPage + 1}`;

  if (pageCounter) {
    pageCounter.textContent =
      `Trang ${currentPage + 1} / ${portfolioPages.length}`;
  }

  previousButtons.forEach((button) => {
    if (button) {
      button.disabled = currentPage === 0;
    }
  });

  nextButtons.forEach((button) => {
    if (button) {
      button.disabled =
        currentPage === portfolioPages.length - 1;
    }
  });
}

function showPreviousPage() {
  showPage(currentPage - 1);
}

function showNextPage() {
  showPage(currentPage + 1);
}

previousButtons.forEach((button) => {
  if (button) {
    button.addEventListener("click", showPreviousPage);
  }
});

nextButtons.forEach((button) => {
  if (button) {
    button.addEventListener("click", showNextPage);
  }
});

document.addEventListener("keydown", (event) => {
  if (event.key === "ArrowLeft") {
    showPreviousPage();
  }

  if (event.key === "ArrowRight") {
    showNextPage();
  }
});

/* Tải trước các trang để chuyển ảnh nhanh hơn */
portfolioPages.forEach((pagePath) => {
  const image = new Image();
  image.src = pagePath;
});

showPage(0);
