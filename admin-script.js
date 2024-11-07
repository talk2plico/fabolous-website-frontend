// Smooth scrolling for anchor links in the admin dashboard
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
        e.preventDefault();
        document.querySelector(this.getAttribute('href')).scrollIntoView({
            behavior: 'smooth'
        });
    });
});

// Product Management
const productList = document.getElementById('product-list');
const productModal = document.getElementById('product-modal');
const addProductBtn = document.getElementById('add-product-btn');
const productForm = document.getElementById('product-form');

// Fetch and display all products
const fetchProducts = async () => {
    try {
        const response = await fetch('http://localhost:5000/api/products');
        const products = await response.json();

        productList.innerHTML = ''; // Clear existing rows
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

        addProductActions();
    } catch (error) {
        console.error('Error fetching products:', error);
    }
};

// Add event listeners to Edit and Delete buttons
const addProductActions = () => {
    const editButtons = document.querySelectorAll('.edit-btn');
    const deleteButtons = document.querySelectorAll('.delete-btn');

    editButtons.forEach(button => {
        button.addEventListener('click', (e) => {
            const productId = e.target.getAttribute('data-product-id');
            editProduct(productId);
        });
    });

    deleteButtons.forEach(button => {
        button.addEventListener('click', (e) => {
            const productId = e.target.getAttribute('data-product-id');
            deleteProduct(productId);
        });
    });
};

// Edit product function
const editProduct = async (productId) => {
    try {
        const response = await fetch(`http://localhost:5000/api/products/${productId}`);
        const product = await response.json();

        // Fill the form with product details
        document.getElementById('product-name').value = product.name;
        document.getElementById('product-category').value = product.category;
        document.getElementById('product-price').value = product.price;
        document.getElementById('product-link').value = product.affiliateLink;

        productModal.classList.remove('hidden');

        productForm.onsubmit = async (e) => {
            e.preventDefault();
            const updatedProduct = {
                name: document.getElementById('product-name').value,
                category: document.getElementById('product-category').value,
                price: document.getElementById('product-price').value,
                affiliateLink: document.getElementById('product-link').value
            };

            try {
                const response = await fetch(`http://localhost:5000/api/products/${productId}`, {
                    method: 'PUT',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify(updatedProduct)
                });

                if (response.ok) {
                    alert('Product updated successfully!');
                    window.location.reload();
                } else {
                    alert('Error updating product.');
                }
            } catch (error) {
                console.error('Error updating product:', error);
            }
        };
    } catch (error) {
        console.error('Error fetching product details:', error);
    }
};

// Delete product function
const deleteProduct = async (productId) => {
    if (confirm('Are you sure you want to delete this product?')) {
        try {
            const response = await fetch(`http://localhost:5000/api/products/${productId}`, {
                method: 'DELETE'
            });

            if (response.ok) {
                alert('Product deleted successfully!');
                window.location.reload();
            } else {
                alert('Error deleting product.');
            }
        } catch (error) {
            console.error('Error deleting product:', error);
        }
    }
};

// Open modal to add product
addProductBtn.addEventListener(' click', () => {
    productModal.classList.remove('hidden');
    productForm.reset();
});

// Handle product form submission
productForm.addEventListener('submit', async (e) => {
    e.preventDefault();

    const name = document.getElementById('product-name').value;
    const category = document.getElementById('product-category').value;
    const price = document.getElementById('product-price').value;
    const affiliateLink = document.getElementById('product-link').value;

    const newProduct = {
        name,
        category,
        price,
        affiliateLink
    };

    try {
        const response = await fetch('http://localhost:5000/api/products', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(newProduct)
        });

        if (response.ok) {
            alert('Product added successfully!');
            window.location.reload();
        } else {
            alert('Error adding product.');
        }
    } catch (error) {
        console.error('Error adding product:', error);
    }
});

// Call fetchProducts on page load
document.addEventListener('DOMContentLoaded', fetchProducts);

// User Management
const userList = document.getElementById('user-list');

// Fetch and display all users
const fetchUsers = async () => {
    try {
        const response = await fetch('http://localhost:5000/api/users');
        const users = await response.json();

        userList.innerHTML = ''; // Clear existing rows
        users.forEach(user => {
            const userRow = `
                <tr>
                    <td class="py-2 px-4">${user.username}</td>
                    <td class="py-2 px-4">${user.email}</td>
                    <td class="py-2 px-4">${user.role}</td>
                    <td class="py-2 px-4">
                        <button class="edit-user-btn neumorphism-btn px-4 py-1" data-user-id="${user._id}" data-role="${user.role}">Edit Role</button>
                        <button class="delete-user-btn neumorphism-btn px-4 py-1" data-user-id="${user._id}">Delete</button>
                    </td>
                </tr>
            `;
            userList.innerHTML += userRow;
        });

        addUserActions();
    } catch (error) {
        console.error('Error fetching users:', error);
    }
};

// Add event listeners to Edit and Delete buttons
const addUserActions = () => {
    const editButtons = document.querySelectorAll('.edit-user-btn');
    const deleteButtons = document.querySelectorAll('.delete-user-btn');

    editButtons.forEach(button => {
        button.addEventListener('click', (e) => {
            const userId = e.target.getAttribute('data-user-id');
            const currentRole = e.target.getAttribute('data-role');
            editUserRole(userId, currentRole);
        });
    });

    deleteButtons.forEach(button => {
        button.addEventListener('click', (e) => {
            const userId = e.target.getAttribute('data-user-id');
            deleteUser(userId);
        });
    });
};

// Edit user role function
const editUserRole = (userId, currentRole) => {
    const newRole = prompt(`Current role: ${currentRole}. Enter new role (admin/user):`);
    if (newRole === 'admin' || newRole === 'user') {
        updateUserRole(userId, newRole);
    } else {
        alert('Invalid role. Please enter "admin" or "user".');
    }
};

// Send request to update user role
const updateUserRole = async (userId, newRole) => {
    try {
        const response = await fetch(`http://localhost:5000/api/users/${userId}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ role: newRole })
        });

        if (response.ok) {
            alert('User role updated successfully!');
            window.location.reload();
        } else {
            alert('Error updating user role.');
        }
    } catch (error) {
        console.error('Error updating user role:', error);
    }
};

// Delete user function
const deleteUser = async (userId) => {
    if (confirm('Are you sure you want to delete this user?')) {
        try {
            const response = await fetch(`http://localhost:5000/api/users/${userId}`, {
                method: 'DELETE'
            });

            if (response.ok) {
                alert('User deleted successfully!');
                window.location.reload();
            } else {
                alert('Error deleting user.');
            }
        } catch (error) {
            console.error('Error deleting user:', error);
        }
    }
};

// Call fetchUsers on page load
document.addEventListener('DOMContentLoaded', fetchUsers);

// Click Tracking
const clickList = document.getElementById('click-list');

// Fetch and display click tracking data
const fetchClicks = async () => {
    try {
        const response = await fetch('http://localhost:5000/api/clicks ');
        const clicks = await response.json();

        clickList.innerHTML = ''; // Clear existing rows
        clicks.forEach(click => {
            const clickRow = `
                <tr>
                    <td class="py-2 px-4">${click.productId.name}</td>
                    <td class="py-2 px-4">${click.userId ? click.userId.username : 'Guest'}</td>
                    <td class="py-2 px-4">${new Date(click.timestamp).toLocaleString()}</td>
                    <td class="py-2 px-4">${click.conversionStatus ? 'Converted' : 'Pending'}</td>
                </tr>
            `;
            clickList.innerHTML += clickRow;
        });
    } catch (error) {
        console.error('Error fetching clicks:', error);
    }
};

// Call fetchClicks on page load
document.addEventListener('DOMContentLoaded', fetchClicks);

// Analytics
const totalClicksElement = document.getElementById('total-clicks');
const totalConversionsElement = document.getElementById('total-conversions');
const conversionRateElement = document.getElementById('conversion-rate');
const clickChartCanvas = document.getElementById('clickChart').getContext('2d');

// Fetch click tracking data and display analytics
const fetchAnalytics = async () => {
    try {
        const response = await fetch('http://localhost:5000/api/clicks');
        const clicks = await response.json();

        const totalClicks = clicks.length;
        const totalConversions = clicks.filter(click => click.conversionStatus).length;
        const conversionRate = ((totalConversions / totalClicks) * 100).toFixed(2);

        // Update text stats
        totalClicksElement.textContent = totalClicks;
        totalConversionsElement.textContent = totalConversions;
        conversionRateElement.textContent = `${conversionRate}%`;

        // Prepare data for chart
        const labels = clicks.map(click => new Date(click.timestamp).toLocaleDateString());
        const clickData = clicks.map(() => 1); // Each entry represents one click
        const conversionData = clicks.map(click => (click.conversionStatus ? 1 : 0)); // 1 if converted, else 0

        // Create Chart
        createClickChart(labels, clickData, conversionData);
    } catch (error) {
        console.error('Error fetching analytics data:', error);
    }
};

// Create Click Chart using Chart.js
const createClickChart = (labels, clickData, conversionData) => {
    new Chart(clickChartCanvas, {
        type: 'line',
        data: {
            labels: labels,
            datasets: [
                {
                    label: 'Clicks',
                    data: clickData,
                    borderColor: 'rgba(75, 192, 192, 1)',
                    borderWidth: 2,
                    fill: false
                },
                {
                    label: 'Conversions',
                    data: conversionData,
                    borderColor: 'rgba(153, 102, 255, 1)',
                    borderWidth: 2,
                    fill: false
                }
            ]
        },
        options: {
            scales: {
                y: {
                    beginAtZero: true
               }
            }
        }
    });
};

// Call fetchAnalytics on page load
document.addEventListener('DOMContentLoaded', fetchAnalytics);
