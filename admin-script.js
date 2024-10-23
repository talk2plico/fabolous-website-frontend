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
