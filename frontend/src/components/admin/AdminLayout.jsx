import { useState, useEffect } from 'react';
import { Outlet } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { useNavigate } from 'react-router-dom';
import AdminNavbar from './AdminNavbar';

const AdminLayout = () => {
  const { user, isAuthenticated } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (!isAuthenticated || user?.role !== 'admin') {
      navigate('/admin/login');
    }
  }, [isAuthenticated, user, navigate]);

  if (!isAuthenticated || user?.role !== 'admin') {
    return null;
  }

  return (
    <div className="min-h-screen bg-earth-50">
      <AdminNavbar />
      <main>
        <Outlet />
      </main>
    </div>
  );
};

export default AdminLayout;
