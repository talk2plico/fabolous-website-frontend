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
});
