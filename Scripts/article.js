(function () {
    const bar = document.getElementById("progress-bar");
    if (bar) {
        const update = () => {
            const max = document.documentElement.scrollHeight - window.innerHeight;
            bar.style.transform = `scaleX(${max > 0 ? Math.min(window.scrollY / max, 1) : 0})`;
        };
        window.addEventListener("scroll", update, { passive: true });
        window.addEventListener("resize", update);
        update();
    }

    const copyBtn = document.getElementById("copy-link");
    if (copyBtn) {
        const label = copyBtn.innerHTML;
        copyBtn.addEventListener("click", async () => {
            try {
                await navigator.clipboard.writeText(window.location.href);
                copyBtn.innerHTML = '<i class="fa-solid fa-check"></i> Link copied';
            } catch {
                copyBtn.innerHTML = '<i class="fa-solid fa-xmark"></i> Couldn\'t copy';
            }
            setTimeout(() => (copyBtn.innerHTML = label), 2000);
        });
    }
})();