<<<<<<< HEAD
# Finance Tracker App

A full-stack finance tracking application built with FastAPI (Backend) and React (Frontend).

## Setup Instructions

### Backend Setup

1. Create and activate a virtual environment:
```bash
cd backend
python -m venv venv
.\venv\Scripts\activate
```

2. Install dependencies:
```bash
pip install -r requirements.txt
```

3. Run the backend server:
```bash
uvicorn main:app --reload
```

The backend API will be available at http://localhost:8000
API documentation will be available at http://localhost:8000/docs

### Frontend Setup

1. Install Node.js dependencies:
```bash
cd frontend
npm install
```

2. Run the frontend development server:
```bash
npm start
```

The frontend application will be available at http://localhost:3000

## Deployment Instructions

### Backend Deployment (Railway)

1. Create a Railway account at https://railway.app
2. Install Railway CLI:
   ```bash
   npm i -g @railway/cli
   ```

3. Login to Railway:
   ```bash
   railway login
   ```

4. Navigate to the backend directory:
   ```bash
   cd backend
   ```

5. Initialize Railway project:
   ```bash
   railway init
   ```

6. Add environment variables in Railway dashboard:
   - `SECRET_KEY`: Your JWT secret key
   - `FRONTEND_URL`: Your frontend URL (after deploying to Vercel)

7. Deploy the backend:
   ```bash
   railway up
   ```

8. Note down your backend URL from the Railway dashboard.

### Frontend Deployment (Vercel)

1. Create a Vercel account at https://vercel.com

2. Install Vercel CLI:
   ```bash
   npm i -g vercel
   ```

3. Login to Vercel:
   ```bash
   vercel login
   ```

4. Navigate to the frontend directory:
   ```bash
   cd frontend
   ```

5. Add environment variable in Vercel:
   ```bash
   vercel env add REACT_APP_API_URL
   ```
   Enter your Railway backend URL when prompted.

6. Deploy to Vercel:
   ```bash
   vercel
   ```

7. For subsequent deployments:
   ```bash
   vercel --prod
   ```

## Environment Variables

### Backend
- `SECRET_KEY`: JWT secret key for authentication
- `FRONTEND_URL`: URL of the deployed frontend application

### Frontend
- `REACT_APP_API_URL`: URL of the deployed backend API

## Default Test User

You can register a new user or use these test credentials:
- Email: test@example.com
- Password: test123
=======
# financetracker
>>>>>>> d8909bf2c484cd844f88f495e91e52e14c64de20
