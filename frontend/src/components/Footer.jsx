import { Link } from 'react-router-dom';
import { Leaf, Mail, Phone, MapPin, Facebook, Instagram, Twitter, MessageCircle } from 'lucide-react';

const Footer = () => {
  return (
    <footer className="bg-earth-800 text-earth-100">
      <div className="container py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Brand */}
          <div className="space-y-4">
            <div className="flex items-center space-x-2">
              <img src="/cropped_circle_logo.png" alt="" className='h-20 w-20' />
             </div>
            <p className="text-earth-300 text-sm">
              Nature's finest mushrooms, farm to your door. Fresh, organic, and sustainably grown.
            </p>
            <div className="flex space-x-3">
              <a
                href="https://facebook.com"
                target="_blank"
                rel="noopener noreferrer"
                className="bg-earth-700 p-3 rounded-lg text-earth-300 hover:text-white hover:bg-forest-600 transition-all duration-300 group"
              >
                <Facebook className="h-5 w-5 group-hover:scale-110 transition-transform" />
              </a>
              <a
                href="https://instagram.com"
                target="_blank"
                rel="noopener noreferrer"
                className="bg-earth-700 p-3 rounded-lg text-earth-300 hover:text-white hover:bg-forest-600 transition-all duration-300 group"
              >
                <Instagram className="h-5 w-5 group-hover:scale-110 transition-transform" />
              </a>
              <a
                href="https://twitter.com"
                target="_blank"
                rel="noopener noreferrer"
                className="bg-earth-700 p-3 rounded-lg text-earth-300 hover:text-white hover:bg-forest-600 transition-all duration-300 group"
              >
                <Twitter className="h-5 w-5 group-hover:scale-110 transition-transform" />
              </a>
              <a
                href="https://wa.me/919876543210"
                target="_blank"
                rel="noopener noreferrer"
                className="bg-earth-700 p-3 rounded-lg text-earth-300 hover:text-white hover:bg-green-600 transition-all duration-300 group"
              >
                <MessageCircle className="h-5 w-5 group-hover:scale-110 transition-transform" />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-white font-semibold mb-4">Quick Links</h3>
            <ul className="space-y-2">
              <li>
                <Link to="/shop" className="text-earth-300 hover:text-white transition-colors text-sm">
                  Shop
                </Link>
              </li>
              <li>
                <Link to="/about" className="text-earth-300 hover:text-white transition-colors text-sm">
                  About Us
                </Link>
              </li>
              <li>
                <Link to="/blog" className="text-earth-300 hover:text-white transition-colors text-sm">
                  Blog
                </Link>
              </li>
              <li>
                <Link to="/contact" className="text-earth-300 hover:text-white transition-colors text-sm">
                  Contact
                </Link>
              </li>
            </ul>
          </div>

          {/* Categories */}
          <div>
            <h3 className="text-white font-semibold mb-4">Products</h3>
            <ul className="space-y-2">
              <li>
                <Link to="/shop?category=fresh-mushrooms" className="text-earth-300 hover:text-white transition-colors text-sm">
                  Fresh Mushrooms
                </Link>
              </li>
              <li>
                <Link to="/shop?category=dried-products" className="text-earth-300 hover:text-white transition-colors text-sm">
                  Dried Products
                </Link>
              </li>
              <li>
                <Link to="/shop?category=grow-kits" className="text-earth-300 hover:text-white transition-colors text-sm">
                  Grow Kits
                </Link>
              </li>
              <li>
                <Link to="/shop?category=powders" className="text-earth-300 hover:text-white transition-colors text-sm">
                  Powders
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h3 className="text-white font-semibold mb-4">Contact Us</h3>
            <ul className="space-y-3">
              <li className="flex items-start space-x-3">
                <MapPin className="h-5 w-5 text-forest-400 mt-0.5" />
                <span className="text-earth-300 text-sm">
                  Farm Road, Bangalore<br />
                  Karnataka, India 560001
                </span>
              </li>
              <li className="flex items-center space-x-3">
                <Phone className="h-5 w-5 text-forest-400" />
                <span className="text-earth-300 text-sm">+91 98765 43210</span>
              </li>
              <li className="flex items-center space-x-3">
                <Mail className="h-5 w-5 text-forest-400" />
                <span className="text-earth-300 text-sm">hello@kanasu.com</span>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-earth-800 mt-8 pt-8 text-center">
          <p className="text-earth-400 text-sm">
            © 2024 Kanasu Mushroom Farm. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
