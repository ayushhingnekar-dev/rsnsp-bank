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


// NEWS & NOTICES SEARCH AND FILTER

const noticeSearch = document.getElementById("noticeSearch");
const noticeCategory = document.getElementById("noticeCategory");
const noticeCards = document.querySelectorAll(".all-notice-card");
const noNotices = document.getElementById("noNotices");

function filterNotices() {
    if (!noticeSearch || !noticeCategory || !noNotices) return;

    const searchValue = noticeSearch.value.toLowerCase().trim();
    const selectedCategory = noticeCategory.value;

    let visibleCount = 0;

    noticeCards.forEach(card => {

        const cardText = card.textContent.toLowerCase();
        const cardCategory = card.dataset.category;

        const matchesSearch = cardText.includes(searchValue);

        const matchesCategory =
            selectedCategory === "all" ||
            selectedCategory === cardCategory;

        if (matchesSearch && matchesCategory) {
            card.style.display = "flex";
            visibleCount++;
        } else {
            card.style.display = "none";
        }
    });
    noNotices.style.display =
        visibleCount === 0 ? "block" : "none";
}

if (noticeSearch && noticeCategory) {
    noticeSearch.addEventListener("input", filterNotices);
    noticeCategory.addEventListener("change", filterNotices);
}


// HELP & SUPPORT FAQ ACCORDION
const faqQuestions = document.querySelectorAll(".faq-question");
faqQuestions.forEach(question => {
    question.addEventListener("click", () => {

        const currentItem = question.closest(".faq-item");
        const isAlreadyOpen = currentItem.classList.contains("active");

        // Close all FAQ items
        document.querySelectorAll(".faq-item").forEach(item => {

            item.classList.remove("active");

            const icon = item.querySelector(".faq-question i");

            if (icon) {
                icon.classList.remove("fa-minus");
                icon.classList.add("fa-plus");
            }

        });

        // Open selected FAQ item
        if (!isAlreadyOpen) {

            currentItem.classList.add("active");

            const icon = question.querySelector("i");

            icon.classList.remove("fa-plus");
            icon.classList.add("fa-minus");

        }

    });

});
