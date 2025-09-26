// Simple auto slider for future enhancements
let slides = document.querySelectorAll('.slides img');
let current = 0;

function nextSlide() {
    slides[current].style.display = "none";
    current = (current + 1) % slides.length;
    slides[current].style.display = "block";
}

slides.forEach((slide, index) => {
    if(index !== 0) slide.style.display = "none";
});

setInterval(nextSlide, 5000);
