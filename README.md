The Study Shelf
Welcome to The Study Shelf, a MERN stack application designed as a dedicated platform for college students to share and discover academic notes. This project aims to simplify the process of finding study materials by providing a clean, organized, and secure environment.
Features
User Authentication: A robust and secure authentication system using JSON Web Tokens (JWT) for user registration and login. Passwords are encrypted with bcrypt.js for enhanced security.
Password Reset: A fully functional "Forgot Password" feature that uses Nodemailer to send a secure password reset link to a user's email address.
Note Upload: Authenticated users can upload their study notes, which are stored securely on Cloudinary.
Dynamic Filtering: Students can easily browse and filter notes by branch, semester, and subject to find exactly what they need.
User Dashboard: A private area where logged-in users can view, manage, and delete the notes they have uploaded.
Responsive Design: The entire application is built with a minimalist design using HTML, CSS, and vanilla JavaScript, ensuring a smooth experience on both desktop and mobile devices.
Technologies Used
This project is built on the MERN (MongoDB, Express, React, Node.js) stack, with a focus on a vanilla JavaScript frontend.
Frontend:
HTML5
CSS3
Vanilla JavaScript
Backend:
Node.js
Express.js (for building the REST API)
Database:
MongoDB (with Mongoose for schema modeling)
Cloud Services:
Cloudinary (for secure file storage and delivery)
Nodemailer (for sending password reset emails)
Security & Authentication:
bcrypt.js (for password hashing)
jsonwebtoken (for creating JWTs)
Utilities:
dotenv (for managing environment variables)
multer (for handling file uploads)
 Setup Instructions
Follow these steps to get a copy of the project up and running on your local machine.
Prerequisites
You'll need to have Node.js and MongoDB Atlas set up.
Clone the repository:
git clone [your-repo-url]


Navigate to the project directory:
cd TheStudyShelf


Backend Setup
Navigate into the backend folder:
cd backend


Install the necessary dependencies:
npm install


Create a .env file in the backend directory. This file will store your sensitive keys.
Add your credentials to the .env file, replacing the placeholder values with your actual keys:
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=a_very_secret_key_that_you_generate
CLOUDINARY_CLOUD_NAME=your_cloudinary_cloud_name
CLOUDINARY_API_KEY=your_cloudinary_api_key
CLOUDINARY_API_SECRET=your_cloudinary_api_secret
EMAIL_SERVICE=Gmail
EMAIL_USER=your_email_address@gmail.com
EMAIL_PASS=your_app_password


Start the backend server:
node server.js

Your server should now be running on http://localhost:5000.
Frontend Setup
The frontend is located in the frontend/public directory.
Open the index.html file in your browser to access the application. You can use a live server extension in VS Code or a simple http-server to view the pages.
 Hosting on Render
To deploy your application on Render, follow these steps:
Push to GitHub: Make sure your entire project, including the backend and frontend folders, is pushed to a public GitHub repository.
Create a New Web Service: On your Render dashboard, click "New" and select "Web Service."
Connect to GitHub: Connect your GitHub account and select your repository.
Configuration:
Set the Root Directory to backend.
Set the Build Command to npm install.
Set the Start Command to node server.js.
Environment Variables: In the "Advanced" section, add all the environment variables from your local .env file. These are crucial for a successful deployment.
Create Web Service: Click "Create Web Service," and Render will handle the deployment process for you. Once the build is complete, your application will be live at the URL provided by Render.
This README provides a comprehensive overview of your project, making it easy for anyone to understand and run the application, including in
