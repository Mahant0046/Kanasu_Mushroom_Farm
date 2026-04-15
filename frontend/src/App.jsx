import { BrowserRouter as Router, Routes, Route, Outlet } from 'react-router-dom'
import { CartProvider } from './context/CartContext'
import { AuthProvider } from './context/AuthContext'
import Navbar from './components/Navbar'
import Footer from './components/Footer'
import CartSidebar from './components/CartSidebar'
import WhatsAppFloat from './components/WhatsAppFloat'
import Home from './pages/Home'
import Shop from './pages/Shop'
import About from './pages/About'
import Blog from './pages/Blog'
import Contact from './pages/Contact'
import ProductDetail from './pages/ProductDetail'
import Cart from './pages/Cart'
import Checkout from './pages/Checkout'
import Login from './pages/Login'
import Register from './pages/Register'
import Profile from './pages/Profile'
import Subscriptions from './pages/Subscriptions'
import MySubscriptions from './pages/MySubscriptions'
import SubscriptionCheckout from './pages/SubscriptionCheckout'
import AdminDashboard from './pages/AdminDashboard'
import AdminReviews from './pages/AdminReviews'
import AdminSubscriptions from './pages/AdminSubscriptions'
import FarmDashboard from './pages/FarmDashboard'
import AdminLogin from './pages/AdminLogin'
import AdminHome from './pages/AdminHome'
import AdminProducts from './pages/AdminProducts'
import AdminOrders from './pages/AdminOrders'
import AdminOrderDetail from './pages/AdminOrderDetail'
import AdminReviewDetail from './pages/AdminReviewDetail'
import AdminProductDetail from './pages/AdminProductDetail'
import AdminSubscriptionDetail from './pages/AdminSubscriptionDetail'
import AdminBlogs from './pages/AdminBlogs'
import AdminBlogDetail from './pages/AdminBlogDetail'
import ProductForm from './components/admin/ProductForm'
import BlogForm from './components/admin/BlogForm'
import AdminLayout from './components/admin/AdminLayout'

function App() {
  return (
    <AuthProvider>
      <CartProvider>
        <Router>
          <Routes>
            {/* Admin Routes - No Navbar/Footer */}
            <Route path="/admin/login" element={<AdminLogin />} />
            <Route path="/admin/*" element={<AdminLayout />}>
              <Route index element={<AdminHome />} />
              <Route path="dashboard" element={<AdminDashboard />} />
              <Route path="products" element={<AdminProducts />} />
              <Route path="products/new" element={<ProductForm />} />
              <Route path="products/:id/edit" element={<ProductForm />} />
              <Route path="products/:id" element={<AdminProductDetail />} />
              <Route path="orders" element={<AdminOrders />} />
              <Route path="orders/:id" element={<AdminOrderDetail />} />
              <Route path="reviews" element={<AdminReviews />} />
              <Route path="reviews/:id" element={<AdminReviewDetail />} />
              <Route path="subscriptions" element={<AdminSubscriptions />} />
              <Route path="subscriptions/:id" element={<AdminSubscriptionDetail />} />
              <Route path="blogs" element={<AdminBlogs />} />
              <Route path="blogs/new" element={<BlogForm />} />
              <Route path="blogs/:id/edit" element={<BlogForm />} />
              <Route path="blogs/:id" element={<AdminBlogDetail />} />
              <Route path="farm" element={<FarmDashboard />} />
            </Route>

            {/* Regular Routes - With Navbar/Footer */}
            <Route
              element={
                <>
                  <Navbar />
                  <main className="flex-grow">
                    <Outlet />
                  </main>
                  <Footer />
                  <CartSidebar />
                  <WhatsAppFloat />
                </>
              }
            >
              <Route path="/" element={<Home />} />
              <Route path="/shop" element={<Shop />} />
              <Route path="/shop/:category" element={<Shop />} />
              <Route path="/product/:slug" element={<ProductDetail />} />
              <Route path="/about" element={<About />} />
              <Route path="/blog" element={<Blog />} />
              <Route path="/blog/:slug" element={<Blog />} />
              <Route path="/contact" element={<Contact />} />
              <Route path="/cart" element={<Cart />} />
              <Route path="/checkout" element={<Checkout />} />
              <Route path="/login" element={<Login />} />
              <Route path="/register" element={<Register />} />
              <Route path="/profile" element={<Profile />} />
              <Route path="/subscriptions" element={<Subscriptions />} />
              <Route path="/my-subscriptions" element={<MySubscriptions />} />
              <Route path="/subscription-checkout" element={<SubscriptionCheckout />} />
            </Route>
          </Routes>
        </Router>
      </CartProvider>
    </AuthProvider>
  )
}

export default App
