document.addEventListener("DOMContentLoaded", function () {
  const menuOpen = document.querySelector(".menu-toggle");
  const menuClose = document.querySelector(".menu-close");
  const menu = document.querySelector(".menu");
  if (!menuOpen || !menuClose || !menu) return;
  menuOpen.addEventListener("click", function () {
    menu.classList.add("is-active");
  });
  menuClose.addEventListener("click", function () {
    menu.classList.remove("is-active");
  });
  document.addEventListener("click", function (e) {
    if (!menu.contains(e.target) && !e.target.matches(".menu-toggle")) {
      menu.classList.remove("is-active");
    }
  });
});

//Fade fixed header
window.addEventListener("scroll", () => {
  if (window.innerWidth <= 1023) {
    return;
  }
  const heightFixed = 200;
  const scrollPosition = window.scrollY || document.documentElement.scrollTop;

  if (scrollPosition >= heightFixed) {
    document.querySelector("#header").classList.add("fixed-header");
    document.body.classList.add("fixed-header");
  } else {
    document.querySelector("#header").classList.remove("fixed-header");
    document.body.classList.remove("fixed-header");
  }
});

//Hero swiper carousel
const swiper = new Swiper(".swiper-container", {
  effect: "fade",
  speed: 500,
  loop: true,
  pagination: {
    el: ".swiper-pagination",
    clickable: true,
  },
  on: {
    slideChange: function () {
      this.slides.forEach((slide) => {
        let background = slide.querySelector(".background");
        if (background) {
          background.classList.remove("animation");
        }
      });
      let activeSlide = this.slides[this.activeIndex];
      let background = activeSlide.querySelector(".background");
      if (background) {
        background.classList.add("animation");
      }
    },
  },
});

//Tab
document.querySelectorAll(".tab").forEach((tab, index) => {
  tab.addEventListener("click", () => {
    // Remove active class from all tabs and content
    document
      .querySelectorAll(".tab, .content")
      .forEach((el) => el.classList.remove("active"));

    // Add active class to clicked tab and corresponding content
    tab.classList.add("active");
    document.getElementById(tab.dataset.tab).classList.add("active");

    // Move progress bar
    const progressBar = document.querySelector(".progress-bar");
    progressBar.style.left = `${index * 33.33}%`;
  });
});

document.addEventListener("DOMContentLoaded", function () {
  const sections = document.querySelectorAll(".section");

  const options = {
    threshold: 0.1, // Gọi callback khi 10% của section đi vào vùng nhìn thấy
  };

  const observer = new IntersectionObserver(function (entries, observer) {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("visible");
        observer.unobserve(entry.target); // Ngừng theo dõi section sau khi đã được load
      }
    });
  }, options);

  sections.forEach((section) => {
    observer.observe(section);
  });
});
