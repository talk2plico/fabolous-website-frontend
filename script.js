// Dark Mode Toggle (optional)
const toggleDarkMode = () => {
    const body = document.querySelector('body');
    body.classList.toggle('dark');
};

// Smooth scrolling for anchor links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
        e.preventDefault();
        document.querySelector(this.getAttribute('href')).scrollIntoView({
            behavior: 'smooth'
        });
    });
});
