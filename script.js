const menuToggle = document.getElementById("menuToggle");
const navMenu = document.getElementById("navMenu");

menuToggle.addEventListener("click", function () {
    navMenu.classList.toggle("show");

    const icon = menuToggle.querySelector("i");

    if (navMenu.classList.contains("show")) {
        icon.classList.replace("fa-bars", "fa-xmark");
    } else {
        icon.classList.replace("fa-xmark", "fa-bars");
    }
});


// Close menu after clicking a navigation link
document.querySelectorAll("#navMenu a").forEach(link => {
    link.addEventListener("click", function () {
        navMenu.classList.remove("show");
        const icon = menuToggle.querySelector("i");
        icon.classList.replace("fa-xmark", "fa-bars");
    });
});


// IMAGE CAROUSEL
const slides = document.querySelectorAll(".carousel-slide");
const dotsContainer = document.querySelector(".carousel-dots");
const prevBtn = document.querySelector(".carousel-btn.prev");
const nextBtn = document.querySelector(".carousel-btn.next");
let currentSlide = 0;
let carouselInterval;


// Create Navigation Dots
slides.forEach((slide, index) => {
    const dot = document.createElement("button");
    dot.setAttribute("aria-label", `Go to slide ${index + 1}`);
    dot.addEventListener("click", () => {
        showSlide(index);
        resetInterval();
    });
    dotsContainer.appendChild(dot);
});

const dots = dotsContainer.querySelectorAll("button");


// Show Slide
function showSlide(index) {
    slides[currentSlide].classList.remove("active");
    dots[currentSlide].classList.remove("active");
    currentSlide = (index + slides.length) % slides.length;
    slides[currentSlide].classList.add("active");
    dots[currentSlide].classList.add("active");
}


// Previous Slide
prevBtn.addEventListener("click", () => {
    showSlide(currentSlide - 1);
    resetInterval();
});


// Next Slide
nextBtn.addEventListener("click", () => {
    showSlide(currentSlide + 1);
    resetInterval();
});


// Automatic Sliding
function startInterval() {
    carouselInterval = setInterval(() => {
        showSlide(currentSlide + 1);
    }, 4000);
}

// Reset Timer
function resetInterval() {

    clearInterval(carouselInterval);

    startInterval();

}

// Initialize Carousel
showSlide(0);
startInterval();


/* FOOTER YEAR */
const footerYear = document.getElementById("footer-year");

if (footerYear) {
    footerYear.textContent = new Date().getFullYear();
}


/* BACK TO TOP */
const backToTop = document.getElementById("backToTop");

if (backToTop) {
    window.addEventListener("scroll", () => {
        if (window.scrollY > 300) {
            backToTop.classList.add("show");
        } else {
            backToTop.classList.remove("show");
        }

    });

    backToTop.addEventListener("click", () => {
        window.scrollTo({
            top: 0,
            behavior: "smooth"
        });
    });
}