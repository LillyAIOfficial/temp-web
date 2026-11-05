(function () {
    const ROOT = "../";   // this page lives in /articles
    const featuredEl = document.getElementById("hub-featured");
    const gridEl = document.getElementById("hub-grid");
    const filtersEl = document.getElementById("hub-filters");
    if (!featuredEl || !gridEl || typeof newsItems === "undefined") return;

    const items = [...newsItems].sort((a, b) => new Date(b.date) - new Date(a.date));
    const fmt = d => new Date(d).toLocaleDateString("en-GB",
        { day: "2-digit", month: "long", year: "numeric" }).toUpperCase();

    const meta = i => `<div class="news-meta"><span>${i.category}</span><span class="meta-dot">•</span><span>${fmt(i.date)}</span></div>`;
    const href = i => `${i.slug}.html`;

    const featuredHTML = i => `
        <a class="hub-featured reveal" href="${href(i)}">
            <div class="news-image">
                <img src="${ROOT}${i.image}" alt="${i.imageAlt}">
                <div class="image-overlay"></div>
                <span class="news-tag">${i.tag}</span>
            </div>
            <div class="news-content">
                ${meta(i)}
                <h2>${i.title}</h2>
                <p>${i.excerpt}</p>
                <span class="button button-primary small-button">Read the story <span><i class="fa-solid fa-arrow-right"></i></span></span>
            </div>
        </a>`;

    const cardHTML = i => `
        <a class="news-card reveal" href="${href(i)}">
            <div class="news-image">
                <img src="${ROOT}${i.image}" alt="${i.imageAlt}" loading="lazy">
                <span class="news-tag">${i.tag}</span>
            </div>
            <div class="news-card-body">
                ${meta(i)}
                <h3>${i.title}</h3>
                <p>${i.excerpt}</p>
                <span class="read-more">Read story <i class="fa-solid fa-arrow-right"></i></span>
            </div>
        </a>`;

    const emptyHTML = `
        <div class="hub-empty reveal">
            <i class="fa-solid fa-heart"></i>
            <strong>More stories on the way</strong>
            <span>Lilly is probably thinking about what to tell you next.</span>
        </div>`;

    const observer = new IntersectionObserver(entries => {
        entries.forEach(e => {
            if (e.isIntersecting) { e.target.classList.add("visible"); observer.unobserve(e.target); }
        });
    }, { threshold: 0.1 });

    function render(filter) {
        const list = filter === "ALL" ? items : items.filter(i => i.category === filter);
        const [first, ...rest] = list;

        featuredEl.innerHTML = first ? featuredHTML(first) : "";
        gridEl.innerHTML = rest.length ? rest.map(cardHTML).join("") : emptyHTML;

        document.querySelectorAll("#hub-featured .reveal, #hub-grid .reveal").forEach((el, n) => {
            el.style.transitionDelay = `${n * 0.08}s`;
            observer.observe(el);
        });
    }

    // Filter chips (built from whatever categories exist)
    const cats = ["ALL", ...new Set(items.map(i => i.category))];
    filtersEl.innerHTML = cats.map((c, n) => {
        const count = c === "ALL" ? items.length : items.filter(i => i.category === c).length;
        return `<button class="chip${n === 0 ? " active" : ""}" data-filter="${c}">${c}<b>${count}</b></button>`;
    }).join("");

    filtersEl.addEventListener("click", e => {
        const chip = e.target.closest(".chip");
        if (!chip) return;
        filtersEl.querySelectorAll(".chip").forEach(c => c.classList.toggle("active", c === chip));
        render(chip.dataset.filter);
    });

    render("ALL");
})();