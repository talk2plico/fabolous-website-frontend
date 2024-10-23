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
        // Fetch and display products
       const fetchProducts = async () => {
       try {
        const response = await fetch('http://localhost:5000/api/products');
        const products = await response.json();
        const productGrid = document.getElementById('product-grid');

        products.forEach(product => {
            const productCard = `
                <div class="claymorphism-card text-center p-8">
                    <h3 class="text-xl font-semibold">${product.name}</h3>
                    <p class="mt-2">${product.description}</p>
                    <p class="mt-2 text-blue-600 font-bold">$${product.price}</p>
                    <a href="${product.affiliateLink}" target="_blank" class="neumorphism-btn px-4 py-2 mt-4 inline-block">Buy Now</a>
                </div>
            `;
            productGrid.innerHTML += productCard;
        });
    } catch (error) {
        console.error('Error fetching products:', error);
    }
};

// Call fetchProducts to load products when the page loads
document.addEventListener('DOMContentLoaded', fetchProducts);

    });
});
