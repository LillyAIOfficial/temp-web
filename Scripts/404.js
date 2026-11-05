/* =========================================
   LILLYAI — 404 PAGE
   Shows the missing path + rotating excuses from Lilly.
========================================= */
(function () {
    const pathEl = document.getElementById("nf-path");
    if (pathEl) pathEl.textContent = decodeURIComponent(location.pathname) || "/";

    const quips = [
        "I looked everywhere. Under the bed, behind the closet, even inside the crown. Nothing.",
        "Either this page doesn't exist, or it's hiding from me. Rude either way.",
        "Somebody typed the wrong link. I'm not naming names.",
        "I checked twice. Then I checked the window. Still nothing, and now I'm bored.",
        "This page left without telling me. Honestly, same."
    ];

    const quipEl = document.getElementById("nf-quip");
    const againBtn = document.getElementById("nf-again");
    if (!quipEl || !againBtn) return;

    let i = 0;
    quipEl.textContent = quips[i];

    againBtn.addEventListener("click", () => {
        quipEl.classList.add("swap");
        setTimeout(() => {
            i = (i + 1) % quips.length;
            quipEl.textContent = quips[i];
            quipEl.classList.remove("swap");
        }, 250);
    });
})();