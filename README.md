# Kanasu Mushroom Farm - E-Commerce Platform

A complete end-to-end mushroom farming and e-commerce business platform.

## Business Overview

**Brand Name:** Kanasu Mushroom Farm  
**Tagline:** "Nature's Finest Mushrooms, Farm to Your Door"  
**Focus:** Fresh, organic mushrooms (button, oyster, shiitake, milky) and value-added products

## Target Audience
- Health-conscious consumers
- Restaurants and retailers
- Fitness enthusiasts
- Home cooks

## Revenue Streams
- Direct sales (fresh & dried mushrooms)
- Subscription boxes (weekly delivery)
- Bulk supply for businesses
- DIY grow kits
- Value-added products (powders, pickles)

## Tech Stack

### Frontend
- React 18
- TailwindCSS
- shadcn/ui components
- Lucide icons
- React Router

### Backend
- Node.js
- Express.js
- MongoDB
- JWT Authentication
- Multer (file uploads)

### Features
- Product catalog with categories
- Shopping cart & checkout
- User authentication
- Admin dashboard
- Subscription system
- Blog with recipes & guides
- Order tracking
- Reviews & ratings

## Project Structure

```
kanasu-mushroom/
├── backend/              # Node.js/Express API
│   ├── config/          # Database & auth config
│   ├── models/          # MongoDB schemas
│   ├── routes/          # API routes
│   ├── controllers/     # Business logic
│   ├── middleware/      # Auth & validation
│   └── uploads/         # Product images
├── frontend/            # React application
│   ├── src/
│   │   ├── components/  # Reusable components
│   │   ├── pages/       # Page components
│   │   ├── context/     # State management
│   │   ├── services/    # API calls
│   │   └── utils/       # Helper functions
│   └── public/
└── docs/               # Documentation
```

## Getting Started

### Backend Setup
```bash
cd backend
npm install
cp .env.example .env
# Configure MongoDB connection in .env
npm run dev
```

### Frontend Setup
```bash
cd frontend
npm install
npm run dev
```

## Environment Variables

### Backend (.env)
```
PORT=5000
MONGODB_URI=mongodb://localhost:27017/kanasu-mushroom
JWT_SECRET=your_jwt_secret
NODE_ENV=development
```

### Frontend (.env)
```
VITE_API_URL=http://localhost:5000/api
```

## Database Collections

- **Users** - Customer and admin accounts
- **Products** - Mushroom products and kits
- **Categories** - Product categories
- **Orders** - Customer orders
- **Reviews** - Product reviews
- **Subscriptions** - Weekly delivery subscriptions

## Pages

- **Home** - Hero, featured products, benefits
- **Shop** - Product catalog with filters
- **About** - Farm story and cultivation process
- **Blog** - Recipes, health benefits, guides
- **Contact** - Contact form and information
- **Cart** - Shopping cart management
- **Checkout** - Order placement
- **Admin** - Dashboard for management

## Deployment

### Frontend
- Vercel, Netlify, or similar

### Backend
- Render, Railway, or similar
- MongoDB Atlas for database

## License

© 2024 Kanasu Mushroom Farm
