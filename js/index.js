// ░▒▓ Navbar behavior with scroll ▓▒░
const navbar = document.querySelector(".navbar");
const collapse = document.getElementById("navbarSupportedContent");
let lastScrollTop = 0;

// ░▒▓ Initial Animations & Preloader ▓▒░
document.addEventListener("DOMContentLoaded", () => {
  const preloader = document.getElementById("preloader");

  // ✨ نرجّع الصفحة لفوق أول ما تفتح
  window.scrollTo(0, 0);
  if ("scrollRestoration" in history) {
    history.scrollRestoration = "manual";
  }

  // ✨ نسيب اللودنج شغال نص ثانية، بعدين نبدأ أنيميشن الموقع
  setTimeout(() => {
    if (preloader) preloader.classList.add("fade-out");

    // ✨ Navbar & Hero Animations
    navbar.classList.add("animate-navbar");
    document.querySelector(".img-inner").classList.add("animate-img");
    document.querySelector(".info").classList.add("animate-info");

    // ✨ Scroll Sections Animation
    const sections = document.querySelectorAll("section, main");
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("show-section");
          observer.unobserve(entry.target);
        }
      });
    }, {
      threshold: 0.2,
    });

    sections.forEach((section) => {
      section.classList.add("hidden-section");
      observer.observe(section);
    });

    // ✨ Counter Animation
    const duration = 1500;
    const counters = document.querySelectorAll(".counter");

    counters.forEach((counter) => {
      let target = +counter.getAttribute("data-target");
      let startTime = null;

      counter.classList.add("start");

      const animate = (timestamp) => {
        if (!startTime) startTime = timestamp;
        const progress = timestamp - startTime;
        const value = Math.min(Math.floor((progress / duration) * target), target);
        counter.textContent = value.toLocaleString();

        if (progress < duration) {
          requestAnimationFrame(animate);
        } else {
          counter.textContent = target.toLocaleString();
        }
      };

      requestAnimationFrame(animate);
    });
  }, 1000);
});

// ░▒▓ Navbar scroll behavior ▓▒░
window.addEventListener("scroll", () => {
  const currentScroll = window.pageYOffset || document.documentElement.scrollTop;

  if (currentScroll === 0) {
    navbar.classList.remove("scroll-nav", "nav-hidden");
    navbar.classList.add("animate-navbar");
  } else if (currentScroll > 0 && currentScroll <= 100) {
    navbar.classList.remove("nav-hidden");
    navbar.classList.add("scroll-nav");
  } else if (currentScroll > 800) {
    if (currentScroll > lastScrollTop) {
      navbar.classList.add("nav-hidden");
      navbar.classList.remove("scroll-nav");
    } else {
      navbar.classList.remove("nav-hidden");
      navbar.classList.add("scroll-nav");
    }
  }

  lastScrollTop = currentScroll <= 0 ? 0 : currentScroll;
});

// ░▒▓ Navbar collapse (for mobile) ▓▒░
collapse.addEventListener("show.bs.collapse", () => {
  navbar.classList.add("nav-open");
});

collapse.addEventListener("hide.bs.collapse", () => {
  navbar.classList.remove("nav-open");
});

// ░▒▓ ScrollSpy Active Link ▓▒░
const sectionEls = document.querySelectorAll("main, section");
const navLinks = document.querySelectorAll(".navbar-nav .nav-link");

window.addEventListener("scroll", () => {
  let current = "";

  sectionEls.forEach((section) => {
    const sectionTop = section.offsetTop - 120;
    const sectionHeight = section.offsetHeight;
    if (pageYOffset >= sectionTop && pageYOffset < sectionTop + sectionHeight) {
      current = section.getAttribute("id");
    }
  });

  navLinks.forEach((link) => {
    link.classList.remove("active");
    if (link.getAttribute("href").includes(current)) {
      link.classList.add("active");
    }
  });
});



// ░▒▓ Scroll to Top Button ▓▒░
const scrollTopBtn = document.getElementById("scrollTopBtn");

// إظهار الزر عند السكول
window.addEventListener("scroll", () => {
  if (window.scrollY > 400) {
    scrollTopBtn.style.display = "block";
  } else {
    scrollTopBtn.style.display = "none";
  }
});

// لما تضغط عليه يطلعك لفوق بسلاسة
scrollTopBtn.addEventListener("click", () => {
  window.scrollTo({
    top: 0,
    behavior: "smooth"
  });
});

