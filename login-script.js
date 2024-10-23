// Toggle between login and registration forms
const loginForm = document.getElementById('login-form');
const registrationForm = document.getElementById('registration-form');
const formTitle = document.getElementById('form-title');
const toggleMessage = document.getElementById('toggle-message');
const toggleLink = document.getElementById('toggle-link');

toggleLink.addEventListener('click', function(e) {
    e.preventDefault();
    
    if (loginForm.classList.contains('hidden')) {
        // Switch to login form
        loginForm.classList.remove('hidden');
        registrationForm.classList.add('hidden');
        formTitle.textContent = "Login";
        toggleMessage.textContent = "Don't have an account?";
        toggleLink.textContent = "Register here";
    } else {
        // Switch to registration form
        loginForm.classList.add('hidden');
        registrationForm.classList.remove('hidden');
        formTitle.textContent = "Register";
        toggleMessage.textContent = "Already have an account?";
        toggleLink.textContent = "Login here";
    }
    // Register a new user
    document.getElementById('registration-form').addEventListener('submit', async function (e) {
    e.preventDefault();

    const username = document.getElementById('register-username').value;
    const email = document.getElementById('register-email').value;
    const password = document.getElementById('register-password').value;

    const userData = {
        username,
        email,
        password
    };

    try {
        const response = await fetch('http://localhost:5000/api/users/register', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(userData)
        });

        if (response.ok) {
            alert('User registered successfully!');
        } else {
            alert('Error registering user.');
        }
    } catch (error) {
        console.error('Error registering user:', error);
    }
});
