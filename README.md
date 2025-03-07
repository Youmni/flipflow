# FlipFlow

**FlipFlow** is a community-driven learning platform where users can create study cards for various purposes, such as studying or learning new languages. Users can choose to make their cards public or keep them private.

## Overview

FlipFlow enables users to organize their learning process by creating cardsets, adding cards, and sharing these sets with other users.

## Key Features

### Cards
- **Create a card set:** Users can create a new set of cards for studying or other purposes.
- **Add cards to a set:** Users can add individual cards to a set to enhance learning.
- **View public sets with cards:** Users can explore all public sets and learn from shared content.
- **Edit or delete sets and individual cards:** Users can manage their sets, including editing or deleting sets and cards.

## Installation Guide

### Requirements
- **Node.js (version 20 or higher):** Ensure you have [Node.js](https://nodejs.org/en) version 20 or higher installed.
- **MySQL:** MySQL is required for database management. Make sure it is installed and properly configured.

### Steps to Set Up

1. **Clone the repository** from GitHub:
   ```bash
   git clone https://github.com/YourUsername/FlipFlow.git

### Frontend Setup
1. Navigate to the **frontend** directory:

    ```bash
    cd frontend
    ```

2. Install the required dependencies using npm:

    ```bash
    npm install
    ```

3. Once the dependencies are installed, start the development server:

    ```bash
    npm run dev
    ```

4. You will see a domain or URL printed in the terminal, typically something like `http://localhost:5173`. Open this URL in your browser to access the web application.

---

### Backend Setup
1. Navigate to the **backend** directory:

    ```bash
    cd backend
    ```

2. Set up your database credentials and token information in the `.env` file. Example:

    ```bash
    DB_HOST=[host]
    DB_USER=[user]
    DB_PASSWORD=[password]
    DB_NAME=[name]

    ACCESS_TOKEN_SECRET=[your_secret]
    REFRESH_TOKEN_SECRET=[your_secret]
    ACCESS_TOKEN_EXPIRY=15m
    REFRESH_TOKEN_EXPIRY=7d
    ```
 4. Create the tables and insert dummy data:

    ```bash
    node setup.js
    ```

3. Start the backend server using Node.js:

    ```bash
    node server.js
    ```

---

## Technologies Used
1. **Express.js**: A Node.js framework used to build the backend of the application.
2. **React.js**: A JavaScript library used to build the frontend user interface.
3. **MySQL**: A relational database management system used for storing and querying data.
4. **Tailwind CSS**: A utility-first CSS framework used for styling the frontend.

---

## Author
- [@Youmni Malha](https://github.com/Youmni)
