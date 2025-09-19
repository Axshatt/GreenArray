# PlantStore E-Commerce Website

A full-stack e-commerce platform for selling plants, featuring a modern, nature-inspired UI and robust backend.

## Features
- Responsive React + TailwindCSS frontend
- Node.js + Express + MongoDB backend
- JWT authentication (login, signup, profile)
- Stripe payment integration
- RESTful API for products, users, authentication, orders
- Admin dashboard for managing products, categories, users, orders
- Seller dashboard for managing own products
- Secure route protection (JWT, admin/seller restrictions)
- Ready for deployment on Vercel (frontend) and Render/Heroku (backend)

## Setup Instructions

### Prerequisites
- Node.js & npm
- MongoDB database (local or cloud)
- Stripe account (for payment integration)

### Environment Variables
Create a `.env` file in `backend/` with:
```
MONGO_URI=your_mongodb_uri
JWT_SECRET=your_jwt_secret
STRIPE_SECRET_KEY=your_stripe_secret_key
```

### Backend
```sh
cd backend
npm install
npm run dev
```

### Frontend
```sh
cd frontend
npm install
npm run dev
```

### Deployment
- Frontend: Deploy `frontend/` to Vercel
- Backend: Deploy `backend/` to Render or Heroku

## Folder Structure
- `frontend/` - React + Tailwind app
- `backend/` - Node.js + Express API
- `models/` - Mongoose models
- `controllers/` - API controllers
- `routes/` - Express routes
- `middleware/` - Auth and other middleware
- `utils/` - Utility functions
- `.github/` - Copilot instructions

## License
MIT
