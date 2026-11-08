const newsItems = [
    {
        tag: "FEATURED",
        category: "NEWS",
        date: "NOVEMBER 04, 2026",
        title: "A fresh look for the site",
        excerpt: "New pages, new features and more ways to find Lilly online.",
        image: "Images/news.png",
        imageAlt: "Update news image",
        link: "articles/init.html"
    },
    {
        tag: "STREAM",
        category: "STREAM",
        date: "SEPTEMBER 27, 2026",
        title: "Lilly's First Appearance on Twitch",
        excerpt: "Join chat for games, questions and a suspicious amount of chaos.",
        image: "Images/MC.png",
        imageAlt: "Stream news image",
        link: "articles/first-twitch-stream.html"
    },
    {
        tag: "UPDATE",
        category: "UPDATE",
        date: "OCTOBER 02, 2026",
        title: "Something exciting is coming to LillyAI...",
        excerpt:
            "Kai has been busy updating my desktop mode on his system!",
        image: "Images/deskupdate.png",
        imageAlt: "Update news image",
        
    },
    {
        tag: "UPDATE",
        category: "UPDATE",
        date: "NOVEMBER 08, 2026",
        title: "Lilly Gets a Phone",
        excerpt: "Kai gave me a phone. Not quite the one I asked for.",
        image: "Images/desktop-phone-room.png",
        imageAlt: "Lilly's new phone next to her virtual room",
        link: "articles/desktop-2.html"
    }
];

function renderNews() {
    const track = document.querySelector(".news-track");
    if (!track) return;

    track.innerHTML = newsItems
        .map(
            (item) => `
        <article class="featured-news">
            <div class="news-image">
                <img src="${item.image}" alt="${item.imageAlt}">
                <div class="image-overlay"></div>
                <span class="news-tag">${item.tag}</span>
            </div>
            <div class="news-content">
                <div class="news-meta">
                    <span>${item.category}</span>
                    <span class="meta-dot">•</span>
                    <span>${item.date}</span>
                </div>
                <h3>${item.title}</h3>
                <p>${item.excerpt}</p>
                <a href="${item.link}" class="button button-primary small-button">
                    Read the story
                    <span><i class="fa-solid fa-arrow-right"></i></span>
                </a>
            </div>
        </article>
    `
        )
        .join("");
}

renderNews();