(function () {

    // mouse / trackpad devices only
    if (!window.matchMedia("(pointer: fine)").matches || !window.matchMedia("(hover: hover)").matches) {
        return;
    }

    const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    const PINK = "#ff9dbc";                    // matches --pink in styles.css
    const PINK_LIGHT = "#ffc2d5";              // heart colour while over something clickable
    const SIZE = 20;                           // main heart size in px
    const HEARTS = true;                       // little hearts floating up on click
    const HOVER_TARGETS =
        'a, button, [role="button"], summary, .link-card, .tag, .social-link, .news-dot, .news-arrow';

    /* ---------- styles ---------- */
    const css = `
    html.lilly-cursor-on,
    html.lilly-cursor-on * { cursor: none !important; }

    html.lilly-cursor-on input,
    html.lilly-cursor-on textarea,
    html.lilly-cursor-on select { cursor: text !important; }

    #lilly-cursor {
        position: fixed;
        top: 0;
        left: 0;
        z-index: 9999;
        pointer-events: none;
        opacity: 0;
        transition: opacity .25s ease;
    }
    #lilly-cursor.is-ready { opacity: 1; }
    #lilly-cursor.is-hidden { opacity: 0; }

    #lilly-cursor .lc-main {
        position: absolute;
        top: 0;
        left: 0;
        will-change: transform;
    }

    #lilly-cursor i {
        display: block;
        text-align: center;
        line-height: 1;
    }

    /* the heart on the pointer */
    #lilly-cursor .lc-main-body {
        width: ${SIZE}px;
        height: ${SIZE}px;
        margin: -${SIZE / 2}px 0 0 -${SIZE / 2}px;
        font-size: ${SIZE}px;
        color: ${PINK};
        filter: drop-shadow(0 0 7px rgba(255, 157, 188, .7));
        transition: transform .3s cubic-bezier(.22, 1, .36, 1), color .25s ease;
    }

    /* over something clickable: swell + heartbeat */
    #lilly-cursor.is-hover .lc-main-body {
        color: ${PINK_LIGHT};
        transform: scale(1.35);
        animation: lcBeat .95s ease-in-out infinite;
    }
    @keyframes lcBeat {
        0%, 100% { transform: scale(1.3); }
        50%      { transform: scale(1.6); }
    }

    /* mouse held down */
    #lilly-cursor.is-down .lc-main-body { transform: scale(.75); animation: none; }

    /* the little heart that floats up on click */
    #lilly-cursor .lc-pop {
        position: absolute;
        width: 15px;
        height: 15px;
        font-size: 15px;
        color: ${PINK};
        filter: drop-shadow(0 0 6px rgba(255, 157, 188, .7));
        animation: lcPop .9s ease-out forwards;
    }
    @keyframes lcPop {
        0%   { transform: translate(-50%, -50%) scale(.4) rotate(0deg); opacity: 0; }
        20%  { opacity: 1; }
        100% { transform: translate(calc(-50% + var(--dx)), calc(-50% - 46px)) scale(1) rotate(var(--rot)); opacity: 0; }
    }

    /* fallback if Font Awesome didn't load: show a plain heart character instead */
    #lilly-cursor.no-fa i { font-family: system-ui, sans-serif !important; font-weight: 400 !important; }
    #lilly-cursor.no-fa i::before { content: "\\2665" !important; }

    @media (prefers-reduced-motion: reduce) {
        #lilly-cursor .lc-main-body { transition: none; }
        #lilly-cursor.is-hover .lc-main-body { animation: none; }
    }
    `;

    function init() {

        const style = document.createElement("style");
        style.textContent = css;
        document.head.appendChild(style);

        const root = document.createElement("div");
        root.id = "lilly-cursor";
        root.setAttribute("aria-hidden", "true");
        root.innerHTML =
            '<div class="lc-main"><i class="fa-solid fa-heart lc-main-body"></i></div>';
        document.body.appendChild(root);

        document.documentElement.classList.add("lilly-cursor-on");

        // if Font Awesome's heart can't be loaded, fall back to a ♥ character
        if (document.fonts && document.fonts.load) {
            document.fonts.load('900 16px "Font Awesome 6 Free"')
                .then((faces) => { if (!faces || !faces.length) root.classList.add("no-fa"); })
                .catch(() => root.classList.add("no-fa"));
        }

        const main = root.querySelector(".lc-main");

        let started = false;

        window.addEventListener("mousemove", (e) => {
            main.style.transform = `translate3d(${e.clientX}px, ${e.clientY}px, 0)`;

            if (!started) {                    // first move: fade the heart in
                started = true;
                root.classList.add("is-ready");
            }
        }, { passive: true });

        // swell over clickable things; hide over form fields (native text cursor shows there)
        document.addEventListener("mouseover", (e) => {
            root.classList.toggle("is-hover", !!e.target.closest(HOVER_TARGETS));
            root.classList.toggle("is-hidden", !!e.target.closest("input, textarea, select"));
        }, { passive: true });

        // press + floating hearts
        let pops = 0;

        document.addEventListener("mousedown", (e) => {
            root.classList.add("is-down");

            if (!HEARTS || reduceMotion || pops >= 12) return;

            const heart = document.createElement("i");
            heart.className = "fa-solid fa-heart lc-pop";
            heart.style.left = e.clientX + "px";
            heart.style.top = e.clientY + "px";
            heart.style.setProperty("--dx", (Math.random() * 30 - 15).toFixed(0) + "px");
            heart.style.setProperty("--rot", (Math.random() * 40 - 20).toFixed(0) + "deg");

            pops++;
            heart.addEventListener("animationend", () => {
                heart.remove();
                pops--;
            });
            root.appendChild(heart);
        });

        document.addEventListener("mouseup", () => root.classList.remove("is-down"));

        // hide when the mouse leaves the window
        document.documentElement.addEventListener("mouseleave", () => root.classList.remove("is-ready"));
        document.documentElement.addEventListener("mouseenter", () => {
            if (started) root.classList.add("is-ready");
        });
    }

    if (document.body) init();
    else document.addEventListener("DOMContentLoaded", init);

})();