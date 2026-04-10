# Deployment Guide

## Frontend Deployment (Vercel)

### Prerequisites
- Vercel account (free tier available)
- GitHub account

### Steps

1. Push your code to GitHub

2. Log in to [Vercel](https://vercel.com)

3. Click "Add New Project"

4. Import your GitHub repository

5. Configure build settings:
   - Framework Preset: Vite
   - Root Directory: `frontend`
   - Build Command: `npm run build`
   - Output Directory: `dist`

6. Add environment variables:
   - `VITE_API_URL`: Your production API URL

7. Click "Deploy"

### Automatic Deployments
Vercel will automatically redeploy when you push to GitHub.

## Backend Deployment (Render)

### Prerequisites
- Render account (free tier available)
- MongoDB Atlas database (for production)

### Steps

1. Log in to [Render](https://render.com)

2. Click "New" → "Web Service"

3. Connect your GitHub repository

4. Configure:
   - Root Directory: `backend`
   - Build Command: `npm install`
   - Start Command: `node server.js`
   - Instance Type: Free (or paid for better performance)

5. Add environment variables:
   - `PORT`: 5000
   - `MONGODB_URI`: Your MongoDB Atlas connection string
   - `JWT_SECRET`: Generate a secure random string
   - `JWT_EXPIRE`: 7d
   - `NODE_ENV`: production
   - `FRONTEND_URL`: Your Vercel frontend URL

6. Click "Deploy Web Service"

### Note on Free Tier
Render free tier spins down after 15 minutes of inactivity. First request may take ~30 seconds.

## MongoDB Atlas Setup

1. Create account at [MongoDB Atlas](https://www.mongodb.com/cloud/atlas)

2. Create a free cluster (M0)

3. Create database user:
   - Username: kanasu-admin
   - Password: Generate strong password

4. Network Access:
   - Add IP address: `0.0.0.0/0` (allows all IPs)
   - Or add specific Render/Vercel IPs

5. Get connection string:
   - Click "Connect" → "Connect your application"
   - Copy the connection string
   - Replace `<password>` with your database password

## Environment Variables Summary

### Backend (.env)
```
PORT=5000
MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/kanasu-mushroom
JWT_SECRET=your_secure_random_string_min_32_chars
JWT_EXPIRE=7d
NODE_ENV=production
FRONTEND_URL=https://your-frontend.vercel.app
```

### Frontend (.env.production)
```
VITE_API_URL=https://your-backend.onrender.com/api
```

## Production Considerations

### Security
- Change default admin password immediately
- Use strong JWT_SECRET (min 32 characters)
- Enable HTTPS (automatic on Vercel/Render)
- Set up rate limiting
- Implement input validation

### Performance
- Use CDN for static assets
- Enable image optimization
- Implement caching
- Use paid tiers for better performance

### Monitoring
- Set up error tracking (Sentry, LogRocket)
- Monitor API performance
- Set up uptime monitoring
- Log important events

### Backup
- MongoDB Atlas automated backups (paid tiers)
- Regular database exports
- Backup uploaded images

## Custom Domain Setup

### Vercel
1. Go to project settings → Domains
2. Add your custom domain
3. Update DNS records as instructed

### Render
1. Go to service settings → Custom Domain
2. Add your custom domain
3. Update DNS records as instructed

## Post-Deployment Checklist

- [ ] Change default admin password
- [ ] Test all API endpoints
- [ ] Test user registration/login
- [ ] Test checkout flow
- [ ] Test file uploads
- [ ] Configure email service
- [ ] Set up payment gateway
- [ ] Enable SSL/HTTPS
- [ ] Set up monitoring
- [ ] Configure backups
- [ ] Test on mobile devices
- [ ] Update contact information
- [ ] Add real product images
- [ ] Review and update SEO meta tags

## Scaling

When you need to scale:

1. **Database**: Upgrade MongoDB Atlas tier
2. **Backend**: 
   - Upgrade Render instance type
   - Add load balancer
   - Implement horizontal scaling
3. **Frontend**: Vercel handles automatic scaling
4. **Images**: Use cloud storage (AWS S3, Cloudinary)
5. **CDN**: Enable for static assets

## Cost Estimates (Monthly)

### Free Tier
- Vercel: $0
- Render: $0 (with sleep)
- MongoDB Atlas: $0 (M0 cluster)
- **Total: $0**

### Production Starter
- Vercel: $20
- Render: $25
- MongoDB Atlas: $9 (M2 cluster)
- **Total: ~$54/month**

### Growth
- Vercel: $40+
- Render: $50+
- MongoDB Atlas: $19+
- **Total: ~$109+/month**

## Support

For deployment issues:
- Vercel: https://vercel.com/docs
- Render: https://render.com/docs
- MongoDB Atlas: https://docs.atlas.mongodb.com
