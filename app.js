// app.js - UI behavior (swiper + hero slider + year)
document.addEventListener("DOMContentLoaded", () => {
  // Footer year
  const yearEl = document.getElementById("year");
  if (yearEl) yearEl.textContent = new Date().getFullYear();

  // Init i18n (sets default language + activates buttons)
  if (window.i18n && typeof window.i18n.init === "function") {
    window.i18n.init();
  }

  // Swiper (Signature Menu)
  if (window.Swiper) {
    // eslint-disable-next-line no-new
    new Swiper(".mySwiper", {
      slidesPerView: 1,
      spaceBetween: 20,
      loop: true,
      breakpoints: {
        640: { slidesPerView: 1 },
        768: { slidesPerView: 2 },
        1024: { slidesPerView: 3 }
      },
      pagination: { el: ".swiper-pagination", clickable: true },
      navigation: { nextEl: ".swiper-button-next", prevEl: ".swiper-button-prev" }
    });
  }

  // Hero slider (custom)
  const slides = document.querySelectorAll("[data-slide]");
  const dots = document.querySelectorAll("[data-dot]");
  let current = 0;

  function updateSlide(index) {
    slides.forEach((slide, i) => {
      if (i === index) slide.classList.remove("hidden", "opacity-0");
      else slide.classList.add("opacity-0", "hidden");
    });

    dots.forEach((dot, i) => {
      dot.classList.toggle("bg-white", i === index);
      dot.classList.toggle("bg-white/40", i !== index);
    });
  }

  function nextSlide() {
    current = (current + 1) % slides.length;
    updateSlide(current);
  }

  if (slides.length) {
    updateSlide(0);
    const timer = setInterval(nextSlide, 7000);

    dots.forEach((dot, i) => {
      dot.addEventListener("click", () => {
        current = i;
        updateSlide(current);
        clearInterval(timer);
      });
    });
  }
});
