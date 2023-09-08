
const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
    entry.target.classList.toggle('show', entry.isIntersecting);
    entry.target.classList.toggle('anima', entry.isIntersecting);

    });
    });
    document.querySelectorAll('.hidden').forEach((el) => observer.observe(el));
    