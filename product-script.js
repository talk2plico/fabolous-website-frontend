const reviewsList = document.getElementById('reviews-list');
const productId = 'PRODUCT_ID_FROM_URL'; // Get product ID dynamically

// Fetch and display reviews for the product
const fetchReviews = async () => {
    try {
        const response = await fetch(`http://localhost:5000/api/reviews/${productId}`);
        const reviews = await response.json();

        reviews.forEach(review => {
            const reviewElement = `
                <div class="neumorphism-card p-6">
                    <p class="font-semibold">${review.userId.username} - <span class="text-yellow-500">${'★'.repeat(review.rating)}</span></p>
                    <p class="mt-2">${review.comment}</p>
                </div>
            `;
            reviewsList.innerHTML += reviewElement;
        });
    } catch (error) {
        console.error('Error fetching reviews:', error);
    }
};

// Call fetchReviews on page load
document.addEventListener('DOMContentLoaded', fetchReviews);
