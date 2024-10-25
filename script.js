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

// Global variable to store fetched products
let products = [];

// Fetch and display products
const fetchProducts = async () => {
    try {
        const response = await fetch('http://localhost:5000/api/products');
        products = await response.json(); // Store products globally
        displayProducts(products); // Display all products initially
    } catch (error) {
        console.error('Error fetching products:', error);
    }
};

// Function to display products
const displayProducts = (filteredProducts) => {
    const productGrid = document.getElementById('product-grid');
    productGrid.innerHTML = ''; // Clear the current products

    if (filteredProducts.length === 0) {
        productGrid.innerHTML = '<p>No products found.</p>';
    } else {
        filteredProducts.forEach(product => {
            const productCard = `
                <div class="claymorphism-card text-center p-8">
                    <h3 class="text-xl font-semibold">${product.name}</h3>
                    <p class="mt-2">${product.description}</p>
                    <p class="mt-2 text-blue-600 font-bold">$${product.price}</p>
                    <a href="${product.affiliateLink}" target="_blank" class="neumorphism-btn px-4 py-2 mt-4 inline-block" data-product-id="${product._id}">Buy Now</a>
                    <button class="wishlist-btn mt-2" data-product-id="${product._id}">Add to Wishlist</button>
                </div>
            `;
            productGrid.innerHTML += productCard;
        });
    }
};

// Function to filter products by search input, category, and price
const filterProducts = () => {
    const searchInput = document.getElementById('product-search')?.value.toLowerCase() || '';
    const categoryFilter = document.getElementById('category-filter').value;
    const priceFilter = document.getElementById('price-filter').value;

    const filteredProducts = products.filter(product => {
        const matchesSearch = product.name.toLowerCase().includes(searchInput) ||
                              product.description.toLowerCase().includes(searchInput) ||
                              product.category.toLowerCase().includes(searchInput);

        const matchesCategory = (categoryFilter === 'all') || product.category.toLowerCase() === categoryFilter;

        const price = parseFloat(product.price);
        let matchesPrice = true;
        if (priceFilter !== 'all') {
            const [minPrice, maxPrice] = priceFilter.split('-').map(Number);
            matchesPrice = price >= minPrice && price <= maxPrice;
        }

        return matchesSearch && matchesCategory && matchesPrice;
    });

    displayProducts(filteredProducts); // Display filtered products
};

// Event listener for filtering products
document.getElementById('product-search').addEventListener('input', filterProducts);
document.getElementById('category-filter').addEventListener('change', filterProducts);
document.getElementById('price-filter').addEventListener('change', filterProducts);

// Add event listener to "Add to Wishlist" buttons
document.addEventListener('click', async function (e) {
    if (e.target.classList.contains('wishlist-btn')) {
        const productId = e.target.getAttribute('data-product-id');
        const token = localStorage.getItem('token');

        if (!token) {
            alert('You must be logged in to add products to your wishlist.');
            return;
        }

        try {
            const response = await fetch(`http://localhost:5000/api/wishlist/${productId}`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${token}`
                }
            });

            if (response.ok) {
                alert('Product added to your wishlist!');
            } else {
                const data = await response.json();
                alert(data.message || 'Error adding product to wishlist.');
            }
        } catch (error) {
            console.error('Error adding to wishlist:', error);
        }
    }
});

// Newsletter subscription
const newsletterForm = document.getElementById('newsletter-form');
newsletterForm.addEventListener(' submit', async function (e) {
    e.preventDefault();

    const email = document.getElementById('subscriber-email').value;

    try {
        const response = await fetch('http://localhost:5000/api/newsletter/subscribe', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ email })
        });

        if (response.ok) {
            document.getElementById('subscription-success').classList.remove('hidden');
            document.getElementById('subscription-error').classList.add('hidden');
            newsletterForm.reset();
        } else {
            document.getElementById('subscription-error').classList.remove('hidden');
            document.getElementById('subscription-success').classList.add('hidden');
        }
    } catch (error) {
        console.error('Error subscribing to the newsletter:', error);
        document.getElementById('subscription-error').classList.remove('hidden');
    }
});

// Call fetchProducts on page load
document.addEventListener('DOMContentLoaded', fetchProducts);
