document.addEventListener("DOMContentLoaded", () => {

    /* =========================================
       CURRENT YEAR
    ========================================= */

    const year = document.getElementById("year");

    if (year) {
        year.textContent = new Date().getFullYear();
    }


    /* =========================================
       MOBILE NAVIGATION
    ========================================= */

    const menuToggle = document.querySelector(".menu-toggle");
    const navbar = document.querySelector(".navbar");

    if (menuToggle && navbar) {

        menuToggle.addEventListener("click", () => {

            const isOpen = navbar.classList.toggle("open");

            menuToggle.setAttribute(
                "aria-expanded",
                String(isOpen)
            );

            menuToggle.setAttribute(
                "aria-label",
                isOpen ? "Close navigation" : "Open navigation"
            );

        });


        // Close menu when a navigation link is clicked

        const navLinks = navbar.querySelectorAll("a");

        navLinks.forEach(link => {

            link.addEventListener("click", () => {

                navbar.classList.remove("open");

                menuToggle.setAttribute(
                    "aria-expanded",
                    "false"
                );

                menuToggle.setAttribute(
                    "aria-label",
                    "Open navigation"
                );

            });

        });

    }


    /* =========================================
       HEADER ON SCROLL
    ========================================= */

    const header = document.querySelector(".site-header");

    const updateHeader = () => {

        if (!header) return;

        header.classList.toggle(
            "scrolled",
            window.scrollY > 30
        );

    };

    window.addEventListener(
        "scroll",
        updateHeader,
        { passive: true }
    );

    updateHeader();


    /* =========================================
       SCROLL REVEAL ANIMATION
    ========================================= */

    const revealElements =
        document.querySelectorAll(".reveal");


    if ("IntersectionObserver" in window) {

        const revealObserver =
            new IntersectionObserver(
                (entries, observer) => {

                    entries.forEach(entry => {

                        if (entry.isIntersecting) {

                            entry.target.classList.add("active");

                            observer.unobserve(entry.target);

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

    } else {

        // Fallback for older browsers

        revealElements.forEach(element => {

            element.classList.add("active");

        });

    }


    /* =========================================
       ACTIVE NAVIGATION LINK
    ========================================= */

    const sections =
        document.querySelectorAll("main section[id]");

    const navigationLinks =
        document.querySelectorAll(".navbar a");


    if ("IntersectionObserver" in window) {

        const activeSectionObserver =
            new IntersectionObserver(
                entries => {

                    entries.forEach(entry => {

                        if (!entry.isIntersecting) {
                            return;
                        }

                        const currentId =
                            entry.target.getAttribute("id");


                        navigationLinks.forEach(link => {

                            link.classList.remove("active");


                            if (
                                link.getAttribute("href") ===
                                `#${currentId} `
                            ) {

                                link.classList.add("active");

                            }

                        });

                    });

                },
                {
                    rootMargin: "-30% 0px -60% 0px"
                }
            );


        sections.forEach(section => {

            activeSectionObserver.observe(section);

        });

    }


    /* =========================================
       PROJECT CARD INTERACTION
    ========================================= */

    const projectCards =
        document.querySelectorAll(".project-card");


    // Only enable the 3D mouse effect on devices
    // that actually support hover.

    const canHover =
        window.matchMedia("(hover: hover)").matches;


    if (canHover) {

        projectCards.forEach(card => {

            card.addEventListener("mousemove", event => {

                const rect =
                    card.getBoundingClientRect();


                const x =
                    event.clientX - rect.left;

                const y =
                    event.clientY - rect.top;


                const rotateX =
                    ((y / rect.height) - 0.5) * -3;

                const rotateY =
                    ((x / rect.width) - 0.5) * 3;


                card.style.transform =
                    `translateY(-8px)
perspective(800px)
rotateX(${rotateX}deg)
rotateY(${rotateY}deg)`;

            });


            card.addEventListener("mouseleave", () => {

                card.style.transform = "";

            });

        });

    }


    /* =========================================
       REDUCED MOTION
    ========================================= */

    const prefersReducedMotion =
        window.matchMedia(
            "(prefers-reduced-motion: reduce)"
        ).matches;


    if (prefersReducedMotion) {

        revealElements.forEach(element => {

            element.classList.add("active");

        });

        projectCards.forEach(card => {

            card.style.transform = "";

        });

    }


    /* =========================================
       CONSOLE MESSAGE
       Useful when testing the portfolio
    ========================================= */

    console.log(
        "Dauda Lawal Portfolio loaded successfully."
    );

});
const backToTop = document.getElementById("backToTop");

window.addEventListener("scroll", () => {
    if (window.scrollY > 400) {
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
