// Smooth scrolling for anchor links in the admin dashboard
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
        e.preventDefault();
        document.querySelector(this.getAttribute('href')).scrollIntoView({
            behavior: 'smooth'
        });
    });
});

// Example function to edit a product (placeholder for future AJAX calls)
function editProduct(productId) {
    console.log(`Editing product: ${productId}`);
    // Implement AJAX call to edit product details
}

// Example function to delete a product
function deleteProduct(productId) {
    console.log(`Deleting product: ${productId}`);
    // Implement AJAX call to delete product
}

const productList = document.getElementById('product-list');

// Fetch and display all products
const fetchProducts = async () => {
    try {
        const response = await fetch('http://localhost:5000/api/products');
        const products = await response.json();

        products.forEach(product => {
            const productRow = `
                <tr>
                    <td class="py-2 px-4">${product.name}</td>
                    <td class="py-2 px-4">${product.category}</td>
                    <td class="py-2 px-4">$${product.price}</td>
                    <td class="py-2 px-4">
                        <button class="edit-btn neumorphism-btn px-4 py-1" data-product-id="${product._id}">Edit</button>
                        <button class="delete-btn neumorphism-btn px-4 py-1" data-product-id="${product._id}">Delete</button>
                    </td>
                </tr>
            `;
            productList.innerHTML += productRow;
        });

        // Add event listeners to Edit and Delete buttons
        addProductActions();
    } catch (error) {
        console.error('Error fetching products:', error);
    }
};

// Call fetchProducts on page load
document.addEventListener('DOMContentLoaded', fetchProducts);
}
