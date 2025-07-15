let slideIndex = 0;
let timeOut = 4000
showSlides();
 
function showSlides() {    
    let i;
    let slides = document.getElementsByClassName("mySlides");

    for (i = 0; i < slides.length; i++) {
        slides[i].style.display = "none";
    }
    slideIndex++;
    // timeOut-=100
    
    if (slideIndex > slides.length) {
        slideIndex = 1
    }

    slides[slideIndex-1].style.display = "block";
    setTimeout(showSlides, timeOut);
}