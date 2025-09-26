// Auto slider fallback if needed
let slides = document.querySelectorAll('.slides img');
let current = 0;

slides.forEach((slide,index)=>{
    if(index!==0) slide.style.display='none';
});

function nextSlide(){
    slides[current].style.display='none';
    current = (current+1)%slides.length;
    slides[current].style.display='block';
}

setInterval(nextSlide,5000);
