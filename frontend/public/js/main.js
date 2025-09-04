document.addEventListener('DOMContentLoaded', () => {
    // Inject Navbar and Footer
    const navbarHTML = `
        <div class="navbar">
            <a href="/" class="logo">The Study Shelf</a>
            <ul class="nav-links">
                <li><a href="/">Home</a></li>
                <li><a href="/browse-notes.html">Browse Notes</a></li>
                <li id="upload-link"><a href="/upload-notes.html">Upload Notes</a></li>
                <li id="dashboard-link"><a href="/dashboard.html">Dashboard</a></li>
                <li id="auth-link"><a href="/login.html">Login</a></li>
            </ul>
        </div>
    `;
    document.getElementById('navbar-placeholder').innerHTML = navbarHTML;

    const footerHTML = `
        <div class="footer">
            <p>&copy; 2023 NoteShare. All rights reserved.</p>
        </div>
    `;
    document.getElementById('footer-placeholder').innerHTML = footerHTML;

    // Check auth status and update navbar
    const token = localStorage.getItem('token');
    const authLink = document.getElementById('auth-link');
    const uploadLink = document.getElementById('upload-link');
    const dashboardLink = document.getElementById('dashboard-link');

    if (token) {
        authLink.innerHTML = '<a href="#">Logout</a>';
        authLink.querySelector('a').addEventListener('click', () => {
            localStorage.removeItem('token');
            window.location.href = '/';
        });
    } else {
        uploadLink.style.display = 'none';
        dashboardLink.style.display = 'none';
    }

    // Simple notification function
    window.showNotification = (message) => {
        const notification = document.createElement('div');
        notification.className = 'notification';
        notification.textContent = message;
        document.body.appendChild(notification);
        setTimeout(() => {
            notification.classList.add('show');
        }, 10);
        setTimeout(() => {
            notification.classList.remove('show');
            setTimeout(() => notification.remove(), 500);
        }, 3000);
    };
});