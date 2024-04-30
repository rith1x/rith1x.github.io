const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
        if (entry.isIntersecting){
    entry.target.classList.add('show');
    entry.target.classList.add('anima');

        }
    });
    });
    const hEm = document.querySelectorAll('.hixx');
    hEm.forEach((el) => observer.observe(el));
    