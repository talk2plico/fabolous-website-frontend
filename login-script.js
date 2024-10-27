// Logout function (to be added in the Admin Dashboard)
const logout = () => {
    localStorage.removeItem('token'); // Remove token from localStorage
    alert('You have been logged out.'); // Optional: Notify the user
    window.location.href = '/login.html'; // Redirect to login page
};

// Assuming you have a button with the ID 'logout-button' in your Admin Dashboard HTML
const logoutButton = document.getElementById('logout-button');
if (logoutButton) {
    logoutButton.addEventListener('click', logout);
}

// Toggle between login and registration forms
const loginForm = document.getElementById('login-form');
const registrationForm = document.getElementById('registration-form');
const formTitle = document.getElementById('form-title');
const toggleMessage = document.getElementById('toggle-message');
const toggleLink = document.getElementById('toggle-link');
const loginError = document.getElementById('login-error');
const registrationError = document.getElementById('registration-error');

// Function to toggle forms
const toggleForms = () => {
    const isLoginVisible = !loginForm.classList.contains('hidden');
    
    // Switch forms
    loginForm.classList.toggle('hidden', !isLoginVisible);
    registrationForm.classList.toggle('hidden', isLoginVisible);
    
    // Update titles and messages
    formTitle.textContent = isLoginVisible ? "Register" : "Login";
    toggleMessage.textContent = isLoginVisible ? "Already have an account?" : "Don't have an account?";
    toggleLink.textContent = isLoginVisible ? "Login here" : "Register here";
};

// Event listener for toggling forms
toggleLink.addEventListener('click', (e) => {
    e.preventDefault();
    toggleForms();
});

// Register a new user
const registerUser   = async (e) => {
    e.preventDefault();

    const username = document.getElementById('register-username').value;
    const email = document.getElementById('register-email').value;
    const password = document.getElementById('register-password').value;

    const userData = { username, email, password };

    try {
        const response = await fetch('http://localhost:5000/api/users/register', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(userData)
        });

        if (response.ok) {
            alert('User  registered successfully!');
            registrationForm.reset(); // Clear input fields
            toggleForms(); // Switch to login form
        } else {
            const errorData = await response.json();
            registrationError.textContent = errorData.message || 'Error registering user.';
            registrationError.classList.remove('hidden');
        }
    } catch (error) {
        console.error('Error registering user:', error);
        registrationError.textContent = 'An unexpected error occurred. Please try again.';
        registrationError.classList.remove('hidden');
    }
};

// Attach the registration form submit event listener
registrationForm.addEventListener('submit', registerUser  );

// Handle login
loginForm.addEventListener('submit', async (e) => {
    e.preventDefault();

    const email = document.getElementById('login-email').value;
    const password = document.getElementById('login-password').value;

    try {
        const response = await fetch('http://localhost:5000/api/users/login', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ email, password })
        });

        if (response.ok) {
            const data = await response.json();
            localStorage.setItem('token', data.token); // Store the JWT token
            alert('Login successful!');
            window.location.href = '/admin/dashboard.html'; // Redirect to admin dashboard
        } else {
            loginError.textContent = 'Invalid email or password.';
            loginError.classList.remove('hidden');
        }
    } catch (error) {
        console.error('Error during login:', error);
        loginError.textContent = 'An unexpected error occurred. Please try again.';
        loginError.classList.remove('hidden');
    }
});
