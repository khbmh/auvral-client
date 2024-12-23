# **Auvral - Historical Artifacts Tracker**

## **Live Site**
[Auvral Live Site](https://auvral.web.app)

---

## **Project Overview**
Auvral is a web application designed to track and manage historical artifacts. Users can browse artifacts, view details, add new artifacts, like artifacts, and manage their own contributions. The application is fully responsive and includes user authentication, private routes, and CRUD operations.

---

## **Key Features**
1. **User Authentication:**
   - Email/password-based login and registration.
   - Google login options.
   - JWT token-based authentication for private routes.

2. **Private Routes:**
   - Add Artifacts
   - My Artifacts
   - Liked Artifacts
   - Artifact Details

3. **Home Page:**
   - Eye-catching banner/slider with meaningful information.
   - Featured Artifacts section displaying the top 6 artifacts with the highest like count.
   - Two additional relevant sections.

4. **All Artifacts Page:**
   - Displays all artifacts in card format.
   - Search functionality based on Artifact Name.

5. **Artifact Details Page:**
   - Detailed information about a specific artifact.
   - Like Button to increment/decrement the like count.

6. **Add Artifacts Page:**
   - A form to add new artifacts with various fields like name, image URL, type, historical context, etc.

7. **My Artifacts Page:**
   - Displays artifacts added by the logged-in user.
   - Update and Delete functionality for user-added artifacts.

8. **Liked Artifacts Page:**
   - Displays artifacts liked by the logged-in user.

9. **Update Artifact Page:**
   - A form to update artifact details with previous data as default values.

10. **Responsive Design:**
    - Fully responsive on mobile, tablet, and desktop devices.

11. **Additional Features:**
    - Dynamic title based on the route.
    - Custom 404 page for invalid routes.
    - Loading spinner during data loading.
    - Toast/SweetAlert notifications for CRUD operations.

---

## **Technologies Used**
- **Frontend:**
  - React.js
  - React Router DOM
  - Tailwind CSS
  - Firebase (for authentication)
  - Axios (for API calls)
  - React Toastify/SweetAlert (for notifications)

- **Backend:**
  - Node.js
  - Express.js
  - MongoDB (for database)
  - JWT (for authentication)

