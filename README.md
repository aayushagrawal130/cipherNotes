# CipherNotes

A secure, minimalist note-taking application built with the MERN stack. Create, manage, and organize your thoughts with a clean, intuitive interface.

## Features

- **User Authentication**: Secure registration and login using JWT
- **Protected Routes**: Dashboard accessible only to authenticated users
- **Create, Read, Update, Delete (CRUD) Notes**: Manage your notes with full control
- **Search Functionality**: Find your notes instantly with the search bar
- **Dark Mode Support**: Toggle between light and dark themes
- **Responsive Design**: Beautiful UI that works on all devices
- **Clean Interface**: Minimalist, modern design inspired by Notely

## Tech Stack

### Frontend
- React 19
- React Router DOM
- Tailwind CSS
- Axios

### Backend
- Node.js
- Express.js
- MongoDB / Mongoose
- JWT Authentication
- bcryptjs

---

## Folder Structure

```
client/          # Frontend React client
server/          # Backend Express server
```

---

## Installation & Setup

### Prerequisites
- Node.js (v14+)
- npm or yarn
- MongoDB Atlas account (or local MongoDB)

### 1. Clone the Repository

```bash
git clone https://github.com/aayushagrawal130/cipherNotes.git
cd cipherNotes
```

### 2. Configure Environment Variables

#### Backend (`server/.env`)
Create a `.env` file in the `server` directory. Use `server/.env.example` as a template:

```env
PORT=5000
MONGO_URI=mongodb+srv://username:password@cluster.mongodb.net/database-name
JWT_SECRET=your-secret-key-here
```

#### Frontend (`client/.env`)
Create a `.env` file in the `client` directory. Use `client/.env.example` as a template:

```env
VITE_API_URL=http://localhost:5000/api
```

### 3. Install Dependencies

```bash
# Install root dependencies
npm install

# Install frontend dependencies
npm install --prefix client

# Install backend dependencies
npm install --prefix server
```

### 4. Run the Application

From the root directory:

```bash
# Run backend & frontend concurrently
npm run dev
```

Or run them separately:

```bash
# Terminal 1: Start backend
npm run server

# Terminal 2: Start frontend
npm run client
```

The application will launch on:
- Frontend: `http://localhost:5173`
- Backend API: `http://localhost:5000`

---

## API Endpoints

### Authentication
- `POST /api/auth/register` - Register a new user
- `POST /api/auth/login` - Login user

### Notes
- `GET /api/notes` - Get all notes for authenticated user
- `POST /api/notes` - Create a new note
- `PUT /api/notes/:id` - Update a note
- `DELETE /api/notes/:id` - Delete a note

---

## Usage

1. **Register** - Create a new account with your email and password
2. **Login** - Sign in to access your dashboard
3. **Create Notes** - Click "New Note" and enter your title and content
4. **Edit Notes** - Hover over a note and click the edit icon
5. **Delete Notes** - Hover over a note and click the delete icon
6. **Search** - Use the search bar to find notes by title or content
7. **Dark Mode** - Toggle dark mode using the button in the navbar

---

## Author

**Aayush Agrawal**
- [GitHub](https://github.com/aayushagrawal130)
- [LinkedIn](https://www.linkedin.com/in/aayushagrawal130/)

