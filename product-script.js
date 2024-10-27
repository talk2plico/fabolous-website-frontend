const reviewsList = document.getElementById('reviews-list');
const reviewForm = document.getElementById('review-form');
const productId = window.location.pathname.split('/').pop(); // Get product ID dynamically from URL

// Fetch and display reviews for the product
const fetchReviews = async () => {
    reviewsList.innerHTML = '<p class="text-center">Loading reviews...</p>'; // Show loading message
    try {
        const response = await fetch(`http://localhost:5000/api/reviews/${productId}`);
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }
        const reviews = await response.json();
        reviewsList.innerHTML = ''; // Clear existing reviews

        if (reviews.length === 0) {
            reviewsList.innerHTML = '<p class="text-center">No reviews yet.</p>';
        } else {
            reviews.forEach(review => {
                const reviewElement = `
                    <div class="neumorphism-card p-6">
                        <p class="font-semibold">${review.userId.username} - <span class="text-yellow-500">${'★'.repeat(review.rating)}${'☆'.repeat(5 - review.rating)}</span></p>
                        <p class="mt-2">${review.comment}</p>
                    </div>
                `;
                reviewsList.innerHTML += reviewElement;
            });
        }
    } catch (error) {
        console.error('Error fetching reviews:', error);
        reviewsList.innerHTML = '<p class="text-center text-red-500">Error loading reviews. Please try again later.</p>';
    }
};

// Call fetchReviews on page load
document.addEventListener('DOMContentLoaded', fetchReviews);

// Submit a review
reviewForm.addEventListener('submit', async function (e) {
    e.preventDefault();

    const rating = document.getElementById('rating').value;
    const comment = document.getElementById('comment').value;

    const token = localStorage.getItem('token'); // Only allow logged-in users to submit reviews

    if (!token) {
        alert('You must be logged in to submit a review.');
        return;
    }

    try {
        const response = await fetch(`http://localhost:5000/api/reviews/${productId}`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${token}`
            },
            body: JSON.stringify({ rating, comment })
        });

        if (response.ok) {
            document.getElementById('review-success').classList.remove('hidden');
            reviewForm.reset(); // Clear the form fields
            fetchReviews(); // Refresh the review list after submission
        } else {
            const errorData = await response.json();
            alert(`Error submitting review: ${errorData.message || 'Unknown error'}`);
        }
    } catch (error) {
        console.error('Error submitting review:', error);
        alert('Error submitting review. Please try again later.');
    }
});
