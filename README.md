# Giridharan Portfolio Website

This is a personal portfolio website built with HTML, CSS, JavaScript, Node.js, Express, and MongoDB.

## Pages and Sections

- Home
- About
- Skills
- Projects
- Contact

## Features

- Responsive personal portfolio design
- Project list loaded from MongoDB
- Add projects from the website using an admin password
- Delete projects from the website using the same admin password
- Contact email and description stored in MongoDB

## How to Run in VS Code

1. Open this folder in VS Code:

   ```bash
   outputs/portfolio-website
   ```

2. Open the VS Code terminal and install dependencies:

   ```bash
   npm install
   ```

3. Make sure MongoDB is running on your computer.

   If you use local MongoDB, keep this value in `.env`:

   ```bash
   MONGO_URI=mongodb://127.0.0.1:27017/giridharan_portfolio
   ```

   If you use MongoDB Atlas, replace `MONGO_URI` with your Atlas connection string.

4. Update your admin password in `.env`:

   ```bash
   ADMIN_PASSWORD=portfolio123
   ```

5. Add starter data to MongoDB:

   ```bash
   npm run seed
   ```

6. Start the website:

   ```bash
   npm run dev
   ```

   Or:

   ```bash
   npm start
   ```

7. Open this URL in your browser:

   ```bash
   http://localhost:3000
   ```

## How to Change Contact Details

Open `seed.js`, change this part, then run `npm run seed` again:

```js
email: "giridharan@example.com",
description: "Your contact description here."
```

## How to Add or Delete Projects

1. Open the Projects section on the website.
2. To add a project, fill the form and enter the password from `.env`.
3. To delete a project, enter the password below that project and press Delete.

## Important Files

- `server.js` starts the Express server.
- `models/Project.js` defines the project database collection.
- `models/ContactInfo.js` defines the contact database collection.
- `routes/projects.js` handles project add, list, and delete APIs.
- `routes/contact.js` loads contact information from MongoDB.
- `public/index.html` contains the website structure.
- `public/style.css` contains the design.
- `public/script.js` connects the frontend to the backend APIs.
