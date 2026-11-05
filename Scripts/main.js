const mobileMenu = document.querySelector(".mobile-menu");
const navLinks = document.querySelector(".nav-links");

if (mobileMenu) {

    mobileMenu.addEventListener("click", () => {

        navLinks.classList.toggle("mobile-open");

        mobileMenu.classList.toggle("active");

    });

}


/* =========================================
   CLOSE MOBILE NAV AFTER CLICK
========================================= */

document.querySelectorAll(".nav-links a").forEach(link => {

    link.addEventListener("click", () => {

        navLinks.classList.remove("mobile-open");

    });

});


/* =========================================
   SMOOTH SCROLL
========================================= */

document.querySelectorAll('a[href^="#"]').forEach(anchor => {

    anchor.addEventListener("click", function (event) {

        const targetId = this.getAttribute("href");

        if (!targetId || targetId === "#") {
            return;
        }

        const target = document.querySelector(targetId);

        if (!target) {
            return;
        }

        event.preventDefault();

        const navbarHeight = 76;

        const targetPosition =
            target.getBoundingClientRect().top +
            window.scrollY -
            navbarHeight;

        window.scrollTo({
            top: targetPosition,
            behavior: "smooth"
        });

    });

});


/* =========================================
   SCROLL REVEAL
========================================= */

const revealElements = document.querySelectorAll(
    ".news-slider, .about-image, .about-copy, .link-card, .social-links"
);

revealElements.forEach(element => {
    element.classList.add("reveal");
});


const revealObserver = new IntersectionObserver(
    entries => {

        entries.forEach(entry => {

            if (entry.isIntersecting) {

                entry.target.classList.add("visible");

                revealObserver.unobserve(entry.target);

            }

        });

    },
    {
        threshold: 0.12
    }
);


revealElements.forEach(element => {
    revealObserver.observe(element);
});


/* =========================================
   NEWS SLIDER
========================================= */

const newsSlider = document.querySelector(".news-slider");

if (newsSlider) {

    const track = newsSlider.querySelector(".news-track");
    const slides = [...track.children];
    const dotsWrap = document.querySelector(".news-dots");
    const prevBtn = document.querySelector(".news-prev");
    const nextBtn = document.querySelector(".news-next");
    const progress = newsSlider.querySelector(".news-progress");

    const AUTOPLAY_MS = 10000; 

    let index = 0;

    // Build dots
    const dots = slides.map((_, i) => {
        const dot = document.createElement("button");
        dot.className = "news-dot";
        dot.setAttribute("aria-label", `Go to story ${i + 1}`);
        dot.addEventListener("click", () => goTo(i));
        dotsWrap.appendChild(dot);
        return dot;
    });

    // Restart the timer bar (the bar finishing is what advances the slide)
    function restartTimer() {
        progress.classList.remove("running");
        void progress.offsetWidth;   // force reflow so the animation restarts

        if (slides.length < 2) return;

        progress.style.animationDuration = `${AUTOPLAY_MS}ms`;
        progress.classList.add("running");
    }

    function goTo(i) {
        index = (i + slides.length) % slides.length;
        track.style.transform = `translateX(-${index * 100}%)`;

        dots.forEach((dot, n) => dot.classList.toggle("active", n === index));
        slides.forEach((slide, n) => { slide.inert = n !== index; });

        restartTimer();
    }

    // Timer bar finished -> next slide
    progress.addEventListener("animationend", () => goTo(index + 1));

    prevBtn.addEventListener("click", () => goTo(index - 1));
    nextBtn.addEventListener("click", () => goTo(index + 1));

    // Pause the timer while the tab is in the background
    document.addEventListener("visibilitychange", () => {
        progress.style.animationPlayState = document.hidden ? "paused" : "";
    });

    // Swipe support
    let touchStartX = 0;

    newsSlider.addEventListener("touchstart", e => {
        touchStartX = e.changedTouches[0].clientX;
    }, { passive: true });

    newsSlider.addEventListener("touchend", e => {
        const diff = e.changedTouches[0].clientX - touchStartX;

        if (Math.abs(diff) > 50) {
            goTo(diff < 0 ? index + 1 : index - 1);
        }
    }, { passive: true });

    goTo(0);
}


/* =========================================
   ACTIVE NAVIGATION
========================================= */

const sections = document.querySelectorAll("section[id]");
const navigationLinks = document.querySelectorAll(".nav-links a");


const activeObserver = new IntersectionObserver(
    entries => {

        entries.forEach(entry => {

            if (!entry.isIntersecting) {
                return;
            }

            const currentId = entry.target.id;

            navigationLinks.forEach(link => {

                link.classList.remove("active");

                if (link.getAttribute("href") === `#${currentId}`) {
                    link.classList.add("active");
                }

            });

        });

    },
    {
        rootMargin: "-35% 0px -55% 0px"
    }
);


sections.forEach(section => {
    activeObserver.observe(section);
});


/* =========================================
   NAVBAR SCROLL EFFECT
========================================= */

const navbar = document.querySelector(".navbar");

window.addEventListener(
    "scroll",
    () => {

        if (window.scrollY > 40) {

            navbar.style.background =
                "rgba(13, 10, 15, 0.92)";

        } else {

            navbar.style.background =
                "rgba(13, 10, 15, 0.75)";

        }

    },
    { passive: true }
);


/* =========================================
   SMALL PARALLAX EFFECT
========================================= */

const heroCharacter =
    document.querySelector(".hero-character");


window.addEventListener(
    "mousemove",
    event => {

        if (!heroCharacter || window.innerWidth < 900) {
            return;
        }

        const x =
            (event.clientX / window.innerWidth - 0.5) * 10;

        const y =
            (event.clientY / window.innerHeight - 0.5) * 10;

        heroCharacter.style.transform =
            `translate(${x}px, ${y}px)`;

    },
    { passive: true }
);