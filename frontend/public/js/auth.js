const emailInput = document.getElementById('email');
const passwordInput = document.getElementById('password');

document.addEventListener('DOMContentLoaded', () => {
    const registerForm = document.getElementById('register-form');
    if (registerForm) {
        registerForm.addEventListener('submit', async (e) => {
            e.preventDefault();
            const name = document.getElementById('name').value;
            const email = document.getElementById('email').value;
            const password = document.getElementById('password').value;
            const branch = document.getElementById('branch').value;
            const semester = document.getElementById('semester').value;

            try {
                const res = await fetch('/api/auth/register', {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({ name, email, password, branch, semester }),
                });

                if (res.ok) {
                    const data = await res.json();
                    window.showNotification('Registration successful! Please log in.');
                    setTimeout(() => {
                        window.location.href = 'login.html';
                    }, 3000);
                } else {
                    const data = await res.json();
                    window.showNotification(data.msg || 'Registration failed');
                }
            } catch (err) {
                window.showNotification('Server error during registration.');
                console.error(err);
            }
        });
    }

    const loginForm = document.getElementById('login-form');
    if (loginForm) {
        loginForm.addEventListener('submit', async (e) => {
            e.preventDefault();
            const email = document.getElementById('email').value;
            const password = document.getElementById('password').value;

            try {
                const res = await fetch('/api/auth/login', {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({ email, password }),
                });

                if (res.ok) {
                    const data = await res.json();
                    localStorage.setItem('token', data.token);
                    window.showNotification('Login successful!');
                    setTimeout(() => {
                        window.location.href = 'dashboard.html';
                    }, 3000);
                } else {
                    const data = await res.json();
                    window.showNotification(data.msg || 'Login failed');
                }
            } catch (err) {
                window.showNotification('Server error during login.');
                console.error(err);
            }
        });
    }

    const forgotPasswordForm = document.getElementById('forgot-password-form');
    if (forgotPasswordForm) {
        forgotPasswordForm.addEventListener('submit', async (e) => {
            e.preventDefault();
            const email = document.getElementById('email').value;

            try {
                const res = await fetch('/api/auth/forgot-password', {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({ email }),
                });

                if (res.ok) {
                    const data = await res.json();
                    window.showNotification(data.msg || 'If an account with that email exists, a password reset link has been sent.');
                } else {
                    const data = await res.json();
                    window.showNotification(data.msg || 'Error sending password reset link.');
                }
            } catch (err) {
                window.showNotification('Server error.');
                console.error(err);
            }
        });
    }

    const resetPasswordForm = document.getElementById('reset-password-form');
    if (resetPasswordForm) {
        resetPasswordForm.addEventListener('submit', async (e) => {
            e.preventDefault();
            const password = document.getElementById('password').value;
            const confirmPassword = document.getElementById('confirm-password').value;

            if (password !== confirmPassword) {
                window.showNotification('Passwords do not match.');
                return;
            }

            const urlParams = new URLSearchParams(window.location.search);
            const token = urlParams.get('token');

            if (!token) {
                window.showNotification('Invalid or missing token.');
                return;
            }

            try {
                const res = await fetch(`/api/auth/reset-password/${token}`, {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({ password }),
                });

                if (res.ok) {
                    const data = await res.json();
                    window.showNotification(data.msg || 'Password has been reset successfully!');
                    setTimeout(() => {
                        window.location.href = 'login.html';
                    }, 3000);
                } else {
                    const data = await res.json();
                    window.showNotification(data.msg || 'Error resetting password.');
                }
            } catch (err) {
                window.showNotification('Server error.');
                console.error(err);
            }
        });
    }
});
