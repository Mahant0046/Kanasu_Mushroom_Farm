import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Leaf, Lock, Mail, AlertCircle, Loader2, ArrowLeft, Shield } from 'lucide-react';
import { useAuth } from '../context/AuthContext';

const AdminLogin = () => {
  const navigate = useNavigate();
  const { login } = useAuth();
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    setError('');
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      await login({ email: formData.email, password: formData.password });
      
      // Check if user is admin after login
      const token = localStorage.getItem('token');
      if (token) {
        const userResponse = await fetch('http://localhost:5000/api/auth/me', {
          headers: { Authorization: `Bearer ${token}` },
        });
        const userData = await userResponse.json();
        
        if (userData.user?.role === 'admin') {
          navigate('/admin');
        } else {
          setError('Access denied. Admin privileges required.');
          localStorage.removeItem('token');
        }
      }
    } catch (err) {
      setError(err.response?.data?.message || 'Login failed. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-earth-50 via-earth-100 to-forest-50 flex items-center justify-center p-4 relative overflow-hidden">
      {/* Decorative Background Elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-20 left-10 w-64 h-64 bg-forest-200 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob"></div>
        <div className="absolute top-40 right-10 w-64 h-64 bg-earth-200 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob animation-delay-2000"></div>
        <div className="absolute bottom-20 left-1/2 w-64 h-64 bg-forest-100 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob animation-delay-4000"></div>
      </div>

      <div className="max-w-md w-full relative z-10">
        {/* Back to Home */}
        <button
          onClick={() => navigate('/')}
          className="mb-6 flex items-center space-x-2 text-earth-600 hover:text-earth-900 transition-colors text-sm"
        >
          <ArrowLeft className="h-4 w-4" />
          <span>Back to Home</span>
        </button>

        {/* Logo Section */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center bg-forest-600 p-4 rounded-2xl mb-4 shadow-lg shadow-forest-600/30">
            <Leaf className="h-12 w-12 text-white" />
          </div>
          <h1 className="text-4xl font-display font-bold text-earth-900 mb-2">
            Kanasu Farm Admin
          </h1>
          <div className="flex items-center justify-center space-x-2 text-earth-600">
            <Shield className="h-4 w-4" />
            <p className="text-sm">
              Secure Farm Management Dashboard
            </p>
          </div>
        </div>

        {/* Login Card */}
        <div className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-xl border border-earth-100 p-8">
          <h2 className="text-2xl font-display font-semibold text-earth-900 mb-2">
            Admin Login
          </h2>
          <p className="text-gray-600 text-sm mb-6">
            Sign in to access the farm management dashboard
          </p>

          {error && (
            <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-lg flex items-center space-x-3">
              <AlertCircle className="h-5 w-5 text-red-600 flex-shrink-0" />
              <p className="text-sm text-red-700">{error}</p>
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-5">
            {/* Email */}
            <div>
              <label className="block text-sm font-semibold text-earth-700 mb-2">
                Email Address
              </label>
              <div className="relative">
                <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400 transition-colors peer-focus:text-forest-600" />
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                  placeholder="admin@kanasu.com"
                  className="peer w-full pl-10 pr-4 py-3 border-2 border-gray-200 rounded-lg focus:border-forest-600 focus:ring-4 focus:ring-forest-100 transition-all placeholder-gray-400"
                />
              </div>
            </div>

            {/* Password */}
            <div>
              <label className="block text-sm font-semibold text-earth-700 mb-2">
                Password
              </label>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400 transition-colors peer-focus:text-forest-600" />
                <input
                  type="password"
                  name="password"
                  value={formData.password}
                  onChange={handleChange}
                  required
                  placeholder="••••••••"
                  className="peer w-full pl-10 pr-4 py-3 border-2 border-gray-200 rounded-lg focus:border-forest-600 focus:ring-4 focus:ring-forest-100 transition-all placeholder-gray-400"
                />
              </div>
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              disabled={loading}
              className="w-full bg-forest-600 text-white py-3.5 rounded-lg font-semibold hover:bg-forest-700 focus:ring-4 focus:ring-forest-200 transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center space-x-2 shadow-lg shadow-forest-600/30"
            >
              {loading ? (
                <>
                  <Loader2 className="h-5 w-5 animate-spin" />
                  <span>Signing in...</span>
                </>
              ) : (
                <span>Sign In</span>
              )}
            </button>
          </form>

          {/* Help Text */}
          <div className="mt-6 p-4 bg-earth-50 rounded-lg border border-earth-200">
            <div className="flex items-start space-x-2 mb-2">
              <Shield className="h-4 w-4 text-forest-600 flex-shrink-0 mt-0.5" />
              <p className="text-sm font-semibold text-earth-700">
                Default Admin Credentials
              </p>
            </div>
            <div className="space-y-1 text-sm text-gray-600">
              <p>
                <span className="font-medium">Email:</span> admin@kanasu.com
              </p>
              <p>
                <span className="font-medium">Password:</span> admin123
              </p>
            </div>
          </div>
        </div>

        {/* Footer */}
        <p className="text-center text-earth-500 text-sm mt-8">
          © 2024 Kanasu Mushroom Farm. All rights reserved.
        </p>
      </div>

      <style>{`
        @keyframes blob {
          0% {
            transform: translate(0px, 0px) scale(1);
          }
          33% {
            transform: translate(30px, -50px) scale(1.1);
          }
          66% {
            transform: translate(-20px, 20px) scale(0.9);
          }
          100% {
            transform: translate(0px, 0px) scale(1);
          }
        }
        .animate-blob {
          animation: blob 7s infinite;
        }
        .animation-delay-2000 {
          animation-delay: 2s;
        }
        .animation-delay-4000 {
          animation-delay: 4s;
        }
      `}</style>
    </div>
  );
};

export default AdminLogin;
