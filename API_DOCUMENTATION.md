# API Documentation

## Base URL
```
http://localhost:5000/api
```

## Authentication

Most endpoints require authentication. Include the token in the Authorization header:

```
Authorization: Bearer <your_jwt_token>
```

## Endpoints

### Auth

#### Register
```
POST /auth/register
Content-Type: application/json

{
  "name": "John Doe",
  "email": "john@example.com",
  "password": "password123",
  "phone": "+919876543210",
  "address": {
    "street": "123 Main St",
    "city": "Bangalore",
    "state": "Karnataka",
    "zipCode": "560001"
  }
}

Response:
{
  "success": true,
  "token": "jwt_token_here",
  "user": {
    "id": "user_id",
    "name": "John Doe",
    "email": "john@example.com",
    "role": "customer"
  }
}
```

#### Login
```
POST /auth/login
Content-Type: application/json

{
  "email": "john@example.com",
  "password": "password123"
}

Response:
{
  "success": true,
  "token": "jwt_token_here",
  "user": { ... }
}
```

#### Get Current User
```
GET /auth/me
Authorization: Bearer <token>

Response:
{
  "success": true,
  "user": { ... }
}
```

### Products

#### Get All Products
```
GET /products?page=1&limit=12&category=fresh-mushrooms&sort=price&order=asc

Query Parameters:
- page: Page number (default: 1)
- limit: Items per page (default: 12)
- category: Category slug
- mushroomType: button, oyster, shiitake, milky
- productType: fresh, dried, powder, pickle, grow-kit
- search: Search query
- minPrice: Minimum price
- maxPrice: Maximum price
- featured: true/false
- inStock: true/false
- sort: createdAt, price, rating
- order: asc, desc

Response:
{
  "success": true,
  "products": [...],
  "total": 50,
  "page": 1,
  "pages": 5
}
```

#### Get Featured Products
```
GET /products/featured

Response:
{
  "success": true,
  "products": [...]
}
```

#### Get Single Product
```
GET /products/:slug

Response:
{
  "success": true,
  "product": {
    "_id": "product_id",
    "name": "Fresh Button Mushrooms",
    "slug": "fresh-button-mushrooms",
    "description": "...",
    "price": 120,
    "category": { ... },
    "mushroomType": "button",
    "productType": "fresh",
    "weight": { "value": 250, "unit": "g" },
    "stock": 50,
    "rating": { "average": 4.5, "count": 10 },
    "images": [...],
    "healthBenefits": [...]
  }
}
```

#### Create Product (Admin)
```
POST /products
Authorization: Bearer <admin_token>
Content-Type: multipart/form-data

Form Data:
- name: string
- description: string
- category: categoryId
- price: number
- mushroomType: button|oyster|shiitake|milky
- productType: fresh|dried|powder|pickle|grow-kit
- weight: JSON string
- stock: number
- images: file[]
```

#### Update Product (Admin)
```
PUT /products/:id
Authorization: Bearer <admin_token>
Content-Type: multipart/form-data
```

#### Delete Product (Admin)
```
DELETE /products/:id
Authorization: Bearer <admin_token>
```

### Categories

#### Get All Categories
```
GET /categories

Response:
{
  "success": true,
  "categories": [
    {
      "_id": "category_id",
      "name": "Fresh Mushrooms",
      "slug": "fresh-mushrooms",
      "description": "...",
      "order": 1
    }
  ]
}
```

### Orders

#### Create Order
```
POST /orders
Authorization: Bearer <token>
Content-Type: application/json

{
  "items": [
    {
      "product": "product_id",
      "quantity": 2
    }
  ],
  "shippingAddress": {
    "name": "John Doe",
    "phone": "+919876543210",
    "street": "123 Main St",
    "city": "Bangalore",
    "state": "Karnataka",
    "zipCode": "560001"
  },
  "paymentMethod": "cod",
  "notes": "Optional notes"
}

Response:
{
  "success": true,
  "order": {
    "_id": "order_id",
    "orderNumber": "KAN000001",
    "items": [...],
    "total": 290,
    "status": "pending"
  }
}
```

#### Get User Orders
```
GET /orders?page=1&limit=10
Authorization: Bearer <token>
```

#### Get Single Order
```
GET /orders/:id
Authorization: Bearer <token>
```

#### Get All Orders (Admin)
```
GET /orders/all?status=pending&page=1
Authorization: Bearer <admin_token>
```

#### Update Order Status (Admin)
```
PUT /orders/:id/status
Authorization: Bearer <admin_token>
Content-Type: application/json

{
  "status": "confirmed",
  "note": "Order confirmed"
}
```

#### Cancel Order
```
PUT /orders/:id/cancel
Authorization: Bearer <token>
```

### Reviews

#### Get Product Reviews
```
GET /reviews/product/:productId?page=1&limit=10

Response:
{
  "success": true,
  "reviews": [
    {
      "_id": "review_id",
      "user": { "name": "John Doe" },
      "rating": 5,
      "comment": "Great product!",
      "isVerifiedPurchase": true
    }
  ]
}
```

#### Create Review
```
POST /reviews
Authorization: Bearer <token>
Content-Type: application/json

{
  "product": "product_id",
  "rating": 5,
  "title": "Excellent",
  "comment": "Great quality mushrooms"
}
```

### Subscriptions

#### Create Subscription
```
POST /subscriptions
Authorization: Bearer <token>
Content-Type: application/json

{
  "items": [...],
  "deliveryFrequency": "weekly",
  "deliveryDay": "saturday",
  "shippingAddress": { ... },
  "paymentMethod": "cod"
}
```

#### Get User Subscriptions
```
GET /subscriptions
Authorization: Bearer <token>
```

#### Pause Subscription
```
PUT /subscriptions/:id/pause
Authorization: Bearer <token>
```

#### Resume Subscription
```
PUT /subscriptions/:id/resume
Authorization: Bearer <token>
```

#### Cancel Subscription
```
PUT /subscriptions/:id/cancel
Authorization: Bearer <token>
```

### Blog

#### Get All Blogs
```
GET /blog?page=1&limit=9&category=recipe&search=mushroom

Response:
{
  "success": true,
  "blogs": [
    {
      "_id": "blog_id",
      "title": "Mushroom Soup Recipe",
      "slug": "mushroom-soup-recipe",
      "excerpt": "...",
      "category": "recipe",
      "publishedAt": "2024-01-01",
      "readingTime": 5
    }
  ]
}
```

#### Get Single Blog
```
GET /blog/:slug
```

#### Get Blog Categories
```
GET /blog/categories

Response:
{
  "success": true,
  "categories": [
    { "value": "recipe", "label": "Recipes" },
    { "value": "health-benefits", "label": "Health Benefits" }
  ]
}
```

### Contact

#### Submit Contact Form
```
POST /contact
Content-Type: application/json

{
  "name": "John Doe",
  "email": "john@example.com",
  "phone": "+919876543210",
  "subject": "Question",
  "message": "I have a question..."
}

Response:
{
  "success": true,
  "message": "Thank you for contacting us..."
}
```

#### Subscribe to Newsletter
```
POST /contact/newsletter
Content-Type: application/json

{
  "email": "john@example.com"
}
```

## Error Responses

All errors follow this format:

```json
{
  "success": false,
  "message": "Error message here",
  "error": {} // Only in development
}
```

### Status Codes

- 200: Success
- 201: Created
- 400: Bad Request
- 401: Unauthorized
- 403: Forbidden
- 404: Not Found
- 500: Server Error

## Rate Limiting

API requests are limited to 100 requests per 15 minutes per IP address.
