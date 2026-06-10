# DEPLOYMENT GUIDE

## Frontend Deployment (Vercel)

### Steps:
1. Push your code to GitHub
2. Go to https://vercel.com
3. Click "New Project"
4. Select your GitHub repository
5. Set Environment Variables:
   - `VITE_API_URL`: Your backend API URL (e.g., https://your-api.railway.app/api)
6. Click "Deploy"

## Backend Deployment (Railway or Render)

### Option 1: Railway (Recommended)
1. Go to https://railway.app
2. Create a new project
3. Connect your GitHub repository
4. Add MongoDB URI and JWT_SECRET as environment variables
5. Railway will auto-deploy on every push

### Option 2: Render
1. Go to https://render.com
2. Create new Web Service
3. Connect your GitHub repository
4. Set Build Command: `npm install`
5. Set Start Command: `node server/server.js`
6. Add environment variables:
   - `MONGO_URI`: Your MongoDB connection string
   - `JWT_SECRET`: Your secret key
7. Deploy

## Database
Use MongoDB Atlas (free tier):
- Go to https://www.mongodb.com/cloud/atlas
- Create a free cluster
- Get your connection string
- Use it in MONGO_URI

## Environment Variables Needed

### Backend (.env)
```
PORT=5000
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_secure_secret_key
NODE_ENV=production
```

### Frontend (.env)
```
VITE_API_URL=https://your-backend-url/api
```

## Post-Deployment Checklist
- [ ] Frontend deployed on Vercel
- [ ] Backend deployed on Railway/Render
- [ ] MongoDB Atlas set up
- [ ] Environment variables configured
- [ ] Test login functionality
- [ ] Test create/read/update/delete notes
- [ ] Test dark mode toggle
- [ ] Verify CORS is working
