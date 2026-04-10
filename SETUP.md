# Setup Instructions

## Prerequisites

- Node.js (v18 or higher)
- MongoDB (v6 or higher) or MongoDB Atlas account
- npm or yarn

## Backend Setup

1. Navigate to the backend directory:
```bash
cd backend
```

2. Install dependencies:
```bash
npm install
```

3. Create environment file:
```bash
cp .env.example .env
```

4. Configure `.env` with your settings:
```env
PORT=5000
MONGODB_URI=mongodb://localhost:27017/kanasu-mushroom
JWT_SECRET=your_super_secret_jwt_key_change_this_in_production
JWT_EXPIRE=7d
NODE_ENV=development
```

5. Create uploads directory:
```bash
mkdir uploads
```

6. Seed the database (optional):
```bash
npm run seed
```

7. Start the backend server:
```bash
npm run dev
```

The backend will run on `http://localhost:5000`

## Frontend Setup

1. Navigate to the frontend directory:
```bash
cd frontend
```

2. Install dependencies:
```bash
npm install
```

3. Create environment file:
```bash
echo "VITE_API_URL=http://localhost:5000/api" > .env
```

4. Start the frontend development server:
```bash
npm run dev
```

The frontend will run on `http://localhost:5173`

## Default Admin Account

After seeding the database, you can login with:
- Email: `admin@kanasu.com`
- Password: `admin123`

**Important:** Change this password in production!

## MongoDB Atlas Setup (Alternative)

If you don't have MongoDB installed locally:

1. Create a free account at [MongoDB Atlas](https://www.mongodb.com/cloud/atlas)
2. Create a new cluster
3. Get your connection string
4. Update `MONGODB_URI` in backend `.env`:
```env
MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/kanasu-mushroom
```

## Development Workflow

1. Start MongoDB (if using local installation)
2. Start backend server: `cd backend && npm run dev`
3. Start frontend server: `cd frontend && npm run dev`
4. Open `http://localhost:5173` in your browser

## Project Structure

```
kanasu-mushroom/
├── backend/              # Node.js/Express API
│   ├── config/          # Database & auth config
│   ├── models/          # MongoDB schemas
│   ├── routes/          # API routes
│   ├── controllers/     # Business logic
│   ├── middleware/      # Auth & validation
│   ├── scripts/         # Seed script
│   ├── uploads/         # Product images
│   └── server.js        # Entry point
├── frontend/            # React application
│   ├── src/
│   │   ├── components/  # Reusable components
│   │   ├── pages/       # Page components
│   │   ├── context/     # State management
│   │   ├── services/    # API calls
│   │   └── utils/       # Helper functions
│   └── public/          # Static assets
└── README.md            # Project documentation
```

## Troubleshooting

### MongoDB Connection Error
- Ensure MongoDB is running (local) or connection string is correct (Atlas)
- Check firewall settings if using Atlas

### Port Already in Use
- Change PORT in backend `.env`
- Or kill the process using the port

### CORS Errors
- Ensure frontend URL is added to CORS origin in backend server.js

### Images Not Loading
- Ensure uploads directory exists in backend
- Check file permissions

## Next Steps

1. Customize the brand colors in `frontend/tailwind.config.js`
2. Add real product images to `backend/uploads/`
3. Set up payment gateway (Stripe, Razorpay, etc.)
4. Configure email service for notifications
5. Deploy to production (see DEPLOYMENT.md)
