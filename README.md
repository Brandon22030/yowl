# YOWL
Yowl is an application that lets you comment on everything on the Internet

![capt7](./Frontend/src/assets/images/capt7.png)
![capt8](./Frontend/src/assets/images/capt8.png)
![capt9](./Frontend/src/assets/images/capt9.png)
![capt1](./Frontend/src/assets/images/capt1.png)
![capt2](./Frontend/src/assets/images/capt2.png)
![capt3](./Frontend/src/assets/images/capt3.png)
![capt4](./Frontend/src/assets/images/capt4.png)
![capt5](./Frontend/src/assets/images/capt5.png)
![capt6](./Frontend/src/assets/images/capt6.png)
![capt10](./Frontend/src/assets/images/capt10.png)

# Introduction 
YOWL is a comprehensive social platform that allows users to comment on any content on the Internet. The application offers a robust system for managing users, posts, comments, and categories, enabling everyone to share their opinions on web content.

# Technical Architecture

## Backend (Laravel)
- **Framework**: Laravel (PHP)
- **Database**: MySQL
- **Authentication**: Laravel Sanctum with email verification
- **RESTful API**: Complete resource management (users, posts, comments, categories)

## Frontend (Vue.js)
- **Framework**: Vue.js 3
- **Routing**: Vue Router
- **State Management**: Pinia (via stores)
- **Styling**: Tailwind CSS
- **Components**: Modular architecture with reusable components

# Main Features

## User Management
- Registration and login
- Email verification
- Customizable user profile
- User dashboard

## Post Management
- Creation, modification, and deletion of posts
- Filtering by category
- Adding external URLs to comment on web content
- Image uploads

## Comment System
- Adding comments to posts
- Viewing comments by post
- Comment management (editing, deletion)

## Content Categorization
- Creation and management of categories
- Navigation by category
- Display of posts by category

# Data Models

1. **Users**
   - Basic information (name, email, birthdate)
   - Authentication (hashed password, tokens)
   - Relationships with posts and comments

2. **Posts**
   - Title, content, image
   - Linked URL (for referencing external content)
   - Category association
   - Relationship with author (user)

3. **Comments**
   - Text content
   - Relationship with user (author)
   - Relationship with commented post

4. **Categories**
   - Name and image
   - Relationship with associated posts
   - Relationship with creator user

# Getting Started

##  REQUIRES
-  Vuejs
-  Nodesjs
-  Tailwind css
-  composer
-  php last version
-  laravel
-  docker
-  mysql
<br>

## INSTALLATION

-   Clone the contents to working web directory using git clone "reposistory".
-   Make npm install,npm run dev in the Frontend file
-   Make composer install in the Backend file
-   Configure .env file and run php artisan migrate
-   Make php artisan serve
<br>

# Usage

- Ensure Tailwind CSS is properly installed in the project
- Verify that Composer and Laravel are installed correctly
- Check that all components are imported correctly
- Start the backend server with `php artisan serve`
- Start the frontend development server with `npm run dev`
- Access the application through your browser at the local development URL

# Authors
1. This project was carried out by Daniel MEDEHOU project manager responsible for

   - Post and category crud api management
   - Oragnisation and cordination of the team and Merging

   - Github : [Daniel MEDEHOU](https://github.com/Brandon22030)
   - Email : daniel.medehou@epitech.eu

2. Romeo GOSSOU-BAH in charge of user crud and user profile management

   * Github : [Romeo GOSSOU-BAH](https://github.com/Romeo2520)
   * Email : romeo.gossou-bah@epitech.eu

3.  Stone AFEDJOU in charge of comment crud management and post display, kpi management

   * Github : [Stone AFEDJOU](https://github.com/stonefadel02)
   * Email : stone.afedjou@epitech.eu

4.  Farid ADOI in charge of managing likes and posts 

   * Github : [Farid ADOI](https://github.com/Fqr1d0)
   * Email : farid.adoi@epitech.eu

<br>

# License

- This project is owned by Daniel MEDEHOU, Romeo GOSSOU-BAH,Stone AFEDJOU and Farid ADOI
- The project is open source but can't be used for illegal purposes.
