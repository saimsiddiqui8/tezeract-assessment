# User Management Dashboard

## Deployed Link 
https://659e9a8e041645e5c798ca8e--golden-puppy-bb3839.netlify.app


## Description

This project is a user management dashboard built using ReactJS, Firebase Firestore, Firebase Storage, React Router DOM, React Toastify, and React Bootstrap. The dashboard allows users to add new users, view a list of existing users, and perform actions like sorting, filtering, and pagination.

## Technologies Used

- ReactJS
- Ant Design
- Firebase Firestore
- Firebase Storage
- React Router DOM
- React Toastify
- React Bootstrap
- HTML, CSS (styled with JSX)

## Features

1. **User Addition Form:**
   - Full Name
   - Email with real-time dynamic form validation messages
   - Profile Picture Upload (integrated with Firebase Storage)
   - Country and State dropdowns (populated with dummy data)
   - Loaders for feedback during data submission

2. **User List Table:**
   - Displaying users with columns for Full Name, Email, Profile Picture, Interview Timings, Roles and Active status
   - Pagination to display a limited number of users per page

3. **Design and Responsiveness:**
   - Alignment with the provided Figma design
   - Responsive design for desktop, tablet, and mobile screens
   - Usability and layout adjustments for smaller screens

4. **Additional Considerations:**
   - Real-time dynamic form validation messages
   - Data persistence using Firebase Firestore for client-side storage

## Installation

1. Clone the repository:

   ```bash
   git clone https://github.com/your-username/user-management-dashboard.git
   cd user-management-dashboard
