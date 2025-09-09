document.addEventListener('DOMContentLoaded', function () {
  const toggle = document.getElementById('darkModeToggle');
  const root = document.documentElement;

  function updateTheme(isDark) {
    root.setAttribute('data-theme', isDark ? 'dark' : 'light');
    localStorage.setItem('dark-mode', isDark ? 'enabled' : 'disabled');
    toggle.textContent = isDark ? '☀️' : '🌙';
    toggle.setAttribute('aria-label', isDark ? 'Switch to light mode' : 'Switch to dark mode');
  }

  const storedPreference = localStorage.getItem('dark-mode');
  const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
  let isDark = storedPreference === 'enabled' || (storedPreference === null && prefersDark);

  updateTheme(isDark);

  if (toggle) {
    toggle.addEventListener('click', () => {
      isDark = !isDark;
      updateTheme(isDark);
    });
  }
});



(function () {
    "use strict";

    /**
     * Easy selector helper function
     */
    const select = (el, all = false) => {
        el = el.trim();
        if (all) {
            return [...document.querySelectorAll(el)];
        } else {
            return document.querySelector(el);
        }
    };

    /**
     * Easy event listener function
     */
    const on = (type, el, listener, all = false) => {
        let selectEl = select(el, all);
        if (selectEl) {
            if (all) {
                selectEl.forEach((e) => e.addEventListener(type, listener));
            } else {
                selectEl.addEventListener(type, listener);
            }
        }
    };

    /**
     * Easy on scroll event listener
     */
    const onscroll = (el, listener) => {
        el.addEventListener("scroll", listener);
    };

    /**
     * Navbar links active state on scroll
     */
    let navbarlinks = select("#navbar .scrollto", true);
    const navbarlinksActive = () => {
        let position = window.scrollY + 200;
        navbarlinks.forEach((navbarlink) => {
            if (!navbarlink.hash) return;
            let section = select(navbarlink.hash);
            if (!section) return;
            if (position >= section.offsetTop && position <= section.offsetTop + section.offsetHeight) {
                navbarlink.classList.add("active");
            } else {
                navbarlink.classList.remove("active");
            }
        });
    };
    window.addEventListener("load", navbarlinksActive);
    onscroll(document, navbarlinksActive);

    /**
     * Scrolls to an element with header offset
     */
    const scrollto = (el) => {
        let elementPos = select(el).offsetTop;
        window.scrollTo({
            top: elementPos,
            behavior: "smooth",
        });
    };

    /**
     * Back to top button
     */
    let backtotop = select(".back-to-top");
    if (backtotop) {
        const toggleBacktotop = () => {
            if (window.scrollY > 100) {
                backtotop.classList.add("active");
            } else {
                backtotop.classList.remove("active");
            }
        };
        window.addEventListener("load", toggleBacktotop);
        onscroll(document, toggleBacktotop);
    }

    /**
     * Mobile nav toggle
     */
    on("click", ".mobile-nav-toggle", function (e) {
        select("body").classList.toggle("mobile-nav-active");
        this.classList.toggle("bi-list");
        this.classList.toggle("bi-x");
    });

    /**
     * Scroll with ofset on links with a class name .scrollto
     */
    on(
        "click",
        ".scrollto",
        function (e) {
            if (select(this.hash)) {
                e.preventDefault();

                let body = select("body");
                if (body.classList.contains("mobile-nav-active")) {
                    body.classList.remove("mobile-nav-active");
                    let navbarToggle = select(".mobile-nav-toggle");
                    navbarToggle.classList.toggle("bi-list");
                    navbarToggle.classList.toggle("bi-x");
                }
                scrollto(this.hash);
            }
        },
        true
    );

    /**
     * Scroll with ofset on page load with hash links in the url
     */
    window.addEventListener("load", () => {
        if (window.location.hash) {
            if (select(window.location.hash)) {
                scrollto(window.location.hash);
            }
        }
    });

    /**
     * Hero type effect
     */
    const typed = select(".typed");
    if (typed) {
        let typed_strings = typed.getAttribute("data-typed-items");
        typed_strings = typed_strings.split(",");
        new Typed(".typed", {
            strings: typed_strings,
            loop: true,
            typeSpeed: 100,
            backSpeed: 50,
            backDelay: 2000,
        });
    }

    /**
     * Skills animation
     */
    let skilsContent = select(".skills-content");
    if (skilsContent) {
        new Waypoint({
            element: skilsContent,
            offset: "80%",
            handler: function (direction) {
                let progress = select(".progress .progress-bar", true);
                progress.forEach((el) => {
                    el.style.width = el.getAttribute("aria-valuenow") + "%";
                });
            },
        });
    }

    /**
     * Porfolio isotope and filter
     */
    window.addEventListener("load", () => {
        let portfolioContainer = select(".portfolio-container");
        if (portfolioContainer) {
            let portfolioIsotope = new Isotope(portfolioContainer, {
                itemSelector: ".portfolio-item",
            });

            let portfolioFilters = select("#portfolio-flters li", true);

            on(
                "click",
                "#portfolio-flters li",
                function (e) {
                    e.preventDefault();
                    portfolioFilters.forEach(function (el) {
                        el.classList.remove("filter-active");
                    });
                    this.classList.add("filter-active");

                    portfolioIsotope.arrange({
                        filter: this.getAttribute("data-filter"),
                    });
                    portfolioIsotope.on("arrangeComplete", function () {
                        AOS.refresh();
                    });
                },
                true
            );
        }
    });

    /**
     * Initiate portfolio lightbox
     */
    const portfolioLightbox = GLightbox({
        selector: ".portfolio-lightbox",
    });

    /**
     * Portfolio details slider
     */
    new Swiper(".portfolio-details-slider", {
        speed: 400,
        loop: true,
        autoplay: {
            delay: 5000,
            disableOnInteraction: false,
        },
        pagination: {
            el: ".swiper-pagination",
            type: "bullets",
            clickable: true,
        },
    });


    /**
     * Animation on scroll
     */
    window.addEventListener("load", () => {
        AOS.init({
            duration: 1000,
            easing: "ease-in-out",
            once: true,
            mirror: false,
        });
    });


})();

const projectData = [
    {
        id: "project1",
        images: ["../img/portfolio/portfolio-details-1.png", "static/img/portfolio/portfolio-details-2.png", "static/img/portfolio/portfolio-details-3.png"],
        info: {
            category: "Website Development",
            date: "June, 2025",
            url: "https://elaiyarani-s.github.io/MyPortfolio/",
            urlText: "MyPortfolio",
        },
        description: {
            title: "My Personal Portfolio",
            points: [
                "Developed a personal portfolio website using Javascript, HTML, CSS and Bootstrap 5.",
                "The webpage uses dynamic cards that injects data from the javascript files in the experience and project sections",
                "Dark/light theme toggle",
                "Responsive across all screens",
            ],
        },
    },
    {
        id: "project2",
        images: ["static/img/portfolio/portfolio-details-4.png", "static/img/portfolio/portfolio-details-5.png", "static/img/portfolio/portfolio-details-6.png"],
        info: {
            category: "Website Development",
            date: "July, 2025",
            url: "https://reha-radio.onrender.com",
            urlText: "REHA Radio",
        },
        description: {
            title: "REHA Radio",
            points: [
                "Developed an online platform for streaming online tamil fm online radio stations using Django, Javascript, HTML, CSS and Bootstrap 5.",
                "The webpage uses dynamic cards that injects data from the javascript files for each station.",
                "Real time public chat using Channels + Redis + Daphne (ASGI server)",
                "Dark/light theme toggle",
                "Responsive across all screens",
            ],
        },
    },
    {
        id: "project3",
        images: ["static/img/portfolio/portfolio-details-16.png", "static/img/portfolio/portfolio-details-21.png", 
            "static/img/portfolio/portfolio-details-23.png","static/img/portfolio/portfolio-details-17.png",
            "static/img/portfolio/portfolio-details-18.png","static/img/portfolio/portfolio-details-19.png",
            "static/img/portfolio/portfolio-details-20.png","static/img/portfolio/portfolio-details-22.png"],
        info: {
            category: "Website Development",
            date: "July, 2025",
            url: "https://github.com/elaiyarani-s/MyPortfolio-Django",
            urlText: "MyPortfolio",
        },
        description: {
            title: "MyPortfolio - Django",
            points: ["Built a portfolio web app using Django, showcasing my background, projects, and blog posts. Features user authentication, responsive design, and deploy-ready architecture"],
        },
    },
    {
        id: "project4",
        images: ["static/img/portfolio/portfolio-details-7.png", "static/img/portfolio/portfolio-details-10.png","static/img/portfolio/portfolio-details-9.png",
            "static/img/portfolio/portfolio-details-8.png","static/img/portfolio/portfolio-details-11.png","static/img/portfolio/portfolio-details-12.png"
        ,"static/img/portfolio/portfolio-details-13.png","static/img/portfolio/portfolio-details-14.png","static/img/portfolio/portfolio-details-15.png"],
        info: {
            category: "Website Development",
            date: "July, 2025",
            url: "https://github.com/project-django-group5/Skillswap",
            urlText: "SkillSwap",
        },
        description: {
            title: "SkillSwap",
            points: ["Developed a skill sharing platform using Django, Javascript, HTML, CSS and Bootstrap 5.", "Dark/light theme toggle", "Responsive across all screens"],
        },
    },
];

class ProjectViewer {
    constructor(projects) {
        this.projects = projects;
    }

    renderAll() {
        this.projects.forEach((project) => this.renderProject(project));
    }

    renderProject(project) {
        const container = document.getElementById(project.id);
        if (!container) return;

        container.innerHTML = `
      <div class="row gy-4">
        <div class="col-lg-8">
          <div class="portfolio-details-slider swiper">
            <div class="swiper-wrapper align-items-center">
              ${project.images
                  .map(
                      (img) => `
                <div class="swiper-slide">
                  <img src="${img}" alt="">
                </div>
              `
                  )
                  .join("")}
            </div>
            <div class="swiper-pagination"></div>
          </div>
        </div>
        <div class="col-lg-4">
          <div class="portfolio-info">
            <h3>Project information</h3>
            <ul>
              <li><strong>Category</strong>: ${project.info.category}</li>
              <li><strong>Project date</strong>: ${project.info.date}</li>
              <li><strong>Project URL</strong>: 
                <a href="${project.info.url}" target="_blank" rel="noopener noreferrer">${project.info.urlText}</a>
              </li>
            </ul>
          </div>
          <div class="portfolio-description">
            <h2>${project.description.title}</h2>
            <ul>
              ${project.description.points.map((point) => `<li>${point}</li>`).join("")}
            </ul>
          </div>
        </div>
      </div>
    `;

        // Swiper initialization
        new Swiper(".portfolio-details-slider", {
            speed: 400,
            loop: true,
            autoplay: { delay: 5000, disableOnInteraction: false },
            pagination: { el: ".swiper-pagination", type: "bullets", clickable: true },
        });
    }
}
document.addEventListener("DOMContentLoaded", () => {
    const viewer = new ProjectViewer(projectData);
    viewer.renderAll();
});

