import { Link } from 'react-router-dom';
import { Leaf, Mail, Phone, MapPin, Facebook, Instagram, Twitter } from 'lucide-react';

const Footer = () => {
  return (
    <footer className="bg-earth-900 text-earth-100">
      <div className="container py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Brand */}
          <div className="space-y-4">
            <div className="flex items-center space-x-2">
              <Leaf className="h-8 w-8 text-forest-400" />
              <span className="text-xl font-display font-semibold text-white">
                Kanasu
              </span>
            </div>
            <p className="text-earth-300 text-sm">
              Nature's finest mushrooms, farm to your door. Fresh, organic, and sustainably grown.
            </p>
            <div className="flex space-x-4">
              <a href="#" className="text-earth-300 hover:text-white transition-colors">
                <Facebook className="h-5 w-5" />
              </a>
              <a href="#" className="text-earth-300 hover:text-white transition-colors">
                <Instagram className="h-5 w-5" />
              </a>
              <a href="#" className="text-earth-300 hover:text-white transition-colors">
                <Twitter className="h-5 w-5" />
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
