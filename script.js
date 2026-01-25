/* ==================================================
   GLOBAL READY
================================================== */
document.addEventListener("DOMContentLoaded", () => {

    /* ==================================================
       NAVBAR – MOBILE MENU
    ================================================== */
    const menuBtn = document.querySelector(".menu-btn");
    const navLinks = document.querySelector(".nav-links");

    if (menuBtn && navLinks) {
        menuBtn.addEventListener("click", () => {
            const isOpen = navLinks.classList.toggle("open");
            menuBtn.classList.toggle("active");
            menuBtn.setAttribute("aria-expanded", isOpen);
        });

        // Close menu when clicking any link (mobile UX)
        navLinks.querySelectorAll("a").forEach(link => {
            link.addEventListener("click", () => {
                navLinks.classList.remove("open");
                menuBtn.classList.remove("active");
                menuBtn.setAttribute("aria-expanded", "false");
            });
        });
    }

    /* ==================================================
       ACTIVE NAV LINK ON SCROLL
    ================================================== */
    const sections = document.querySelectorAll("section[id]");
    const navItems = document.querySelectorAll(".nav-links a");

    function setActiveLink() {
        let scrollPosition = window.scrollY + 160;

        sections.forEach(section => {
            const top = section.offsetTop;
            const height = section.offsetHeight;
            const id = section.getAttribute("id");

            if (scrollPosition >= top && scrollPosition < top + height) {
                navItems.forEach(link => link.classList.remove("active"));
                const activeLink = document.querySelector(
                    `.nav-links a[href="#${id}"]`
                );
                if (activeLink) activeLink.classList.add("active");
            }
        });
    }

    window.addEventListener("scroll", setActiveLink);

    /* ==================================================
       SMOOTH SCROLL (SMART OFFSET)
    ================================================== */
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener("click", e => {
            const target = document.querySelector(anchor.getAttribute("href"));
            if (!target) return;

            e.preventDefault();
            const offset = 90;
            const top =
                target.getBoundingClientRect().top +
                window.pageYOffset -
                offset;

            window.scrollTo({
                top,
                behavior: "smooth"
            });
        });
    });

    /* ==================================================
       SCROLL TO TOP BUTTON
    ================================================== */
    const scrollBtn = document.createElement("button");
    scrollBtn.className = "scroll-top";
    scrollBtn.setAttribute("aria-label", "العودة للأعلى");
    scrollBtn.innerHTML = "↑";
    document.body.appendChild(scrollBtn);

    let scrollTimeout;

    window.addEventListener("scroll", () => {
        if (scrollTimeout) return;

        scrollTimeout = setTimeout(() => {
            scrollTimeout = null;

            if (window.scrollY > 500) {
                scrollBtn.classList.add("show");
            } else {
                scrollBtn.classList.remove("show");
            }
        }, 100);
    });

    scrollBtn.addEventListener("click", () => {
        window.scrollTo({
            top: 0,
            behavior: "smooth"
        });
    });

    /* ==================================================
       INTERSECTION OBSERVER – REVEAL ANIMATION
    ================================================== */
    const revealElements = document.querySelectorAll(".card, .section-title");

    const revealObserver = new IntersectionObserver(
        entries => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add("reveal");
                    revealObserver.unobserve(entry.target);
                }
            });
        },
        {
            threshold: 0.15
        }
    );

    revealElements.forEach(el => revealObserver.observe(el));

    /* ==================================================
       PERFORMANCE SAFE LOG
    ================================================== */
    console.log("🔥 Tawjihi Industrial Platform Loaded Successfully");
});
