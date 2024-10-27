const wishlistGrid = document.getElementById('wishlist-grid');
const token = localStorage.getItem('token');

// Fetch and display wishlist items
const fetchWishlist = async () => {
    if (!token) {
        alert('You must be logged in to view your wishlist.');
        window.location.href = '/login.html';
        return;
    }

    try {
        const response = await fetch('http://localhost:5000/api/wishlist', {
            method: 'GET',
            headers: {
                Authorization: `Bearer ${token}`
            }
        });

        const wishlistItems = await response.json();

        if (wishlistItems.length === 0) {
            wishlistGrid.innerHTML = '<p>No items in your wishlist yet.</p>';
        } else {
            wishlistItems.forEach(item => {
                const product = item.productId;
                const wishlistItem = `
                    <div class="claymorphism-card text-center p-8">
                        <h3 class="text-xl font-semibold">${product.name}</h3>
                        <p class="mt-2">${product.description}</p>
                        <p class="mt-2 text-blue-600 font-bold">$${product.price}</p>
                        <button class="remove-wishlist-btn neumorphism-btn px-4 py-2 mt-4" data-product-id="${product._id}">Remove</button>
                    </div>
                `;
                wishlistGrid.innerHTML += wishlistItem;
            });

            // Add event listeners to "Remove from Wishlist" buttons
            addRemoveWishlistActions();
        }
    } catch (error) {
        console.error('Error fetching wishlist:', error);
    }
};

// Remove product from wishlist
const addRemoveWishlistActions = () => {
    const removeButtons = document.querySelectorAll('.remove-wishlist-btn');

    removeButtons.forEach(button => {
        button.addEventListener('click', async function () {
            const productId = this.getAttribute('data-product-id');

            try {
                const response = await fetch(`http://localhost:5000/api/wishlist/${productId}`, {
                    method: 'DELETE',
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                });

                if (response.ok) {
                    alert('Product removed from your wishlist!');
                    fetchWishlist(); // Refresh wishlist
                } else {
                    alert('Error removing product from wishlist.');
                }
            } catch (error) {
                console.error('Error removing from wishlist:', error);
            }
        });
    });
};

// Call fetchWishlist on page load
document.addEventListener('DOMContentLoaded', fetchWishlist);
