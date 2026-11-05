(function () {
    const targets = document.querySelectorAll(".reveal");
    const io = new IntersectionObserver(entries => {
        entries.forEach(e => {
            if (e.isIntersecting) { e.target.classList.add("visible"); io.unobserve(e.target); }
        });
    }, { threshold: 0.12 });
    targets.forEach((el, n) => {
        el.style.transitionDelay = `${(n % 4) * 0.08}s`;
        io.observe(el);
    });

    document.querySelectorAll(".credit-card, .lead-card").forEach(card => {
        card.addEventListener("pointermove", e => {
            const r = card.getBoundingClientRect();
            card.style.setProperty("--x", `${e.clientX - r.left}px`);
            card.style.setProperty("--y", `${e.clientY - r.top}px`);
        });
    });
})();