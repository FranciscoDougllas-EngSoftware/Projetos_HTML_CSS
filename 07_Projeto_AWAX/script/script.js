// Menu Mobile
document.querySelector('.mobile-menu').addEventListener('click', () => {
    document.querySelector('.nav-links').classList.toggle('active');
});

// Scroll Suave
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        document.querySelector(this.getAttribute('href')).scrollIntoView({
            behavior: 'smooth'
        });
    });
});

// Filtro de Projetos
const filterButtons = document.querySelectorAll('.projects-filter button');
const projects = document.querySelectorAll('.projects-grid div');

filterButtons.forEach(button => {
    button.addEventListener('click', () => {
        const filter = button.dataset.filter;
        projects.forEach(project => {
            project.style.display = filter === 'all' || project.dataset.category === filter ? 
                'block' : 'none';
        });
    });
});