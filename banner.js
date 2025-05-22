let currentIndex = 0;
const slides = document.querySelectorAll('.banner-slide');

function showSlide(index) {
  slides.forEach((slide, i) => {
    slide.classList.toggle('active', i === index);
  });
}

function nextSlide() { 
  currentIndex = (currentIndex + 1) % slides.length;
  showSlide(currentIndex);
}

setInterval(nextSlide, 2000);// chuyển banner mỗi 2 giây

