// Código JavaScript para animação na rolagem
document.addEventListener('DOMContentLoaded', () => {
    const sections = document.querySelectorAll('section');
    const options = {
        root: null, // Usa o viewport como referência
        threshold: 0.2, // Ativa quando 20% da seção está visível
    };

    const observer = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target.querySelector('img');
                if (img) {
                    img.classList.add('animate');
                }
                observer.unobserve(entry.target); // Para de observar após animar
            }
        });
    }, options);

    sections.forEach(section => {
        observer.observe(section);
    });
});