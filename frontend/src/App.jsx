import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider, useAuth } from './context/AuthContext';
import { CartProvider } from './context/CartContext';
import { WishlistProvider } from './context/WishlistContext';
import { AddressProvider } from './context/AddressContext';
import Layout from './components/layout/Layout';
import Home from './pages/shop/Home';
import ProductList from './pages/shop/ProductList';
import Checkout from './pages/shop/Checkout';
import ProductDetails from './pages/shop/ProductDetails';
import Wishlist from './pages/shop/Wishlist';
import PaymentGateway from './pages/shop/PaymentGateway';
import TrackOrder from './pages/shop/TrackOrder';
import Login from './pages/auth/Login';
import SignUp from './pages/auth/SignUp';
import AdminDashboard from './pages/admin/AdminDashboard';
import AdminProducts from './pages/admin/AdminProducts';
import AdminOrders from './pages/admin/AdminOrders';
import AdminUsers from './pages/admin/AdminUsers';
import AdminSettings from './pages/admin/AdminSettings';
import ProtectedRoute from './components/auth/ProtectedRoute';
import Profile from './pages/user/Profile';

// Helper component for role-based home redirection
const HomeRedirect = () => {
    const { user } = useAuth();
    if (user?.role === 'admin') return <Navigate to="/admin" replace />;
    return <Home />;
};

function App() {
  return (
    <Router>
      <AuthProvider>
        <AddressProvider>
          <WishlistProvider>
            <CartProvider>
              <Layout>
            <Routes>
              {/* Public Routes */}
              <Route path="/" element={<HomeRedirect />} />
              <Route path="/shop" element={<ProductList />} />
              <Route path="/product/:id" element={<ProductDetails />} />
              <Route path="/wishlist" element={<Wishlist />} />
              <Route path="/login" element={<Login />} />
              <Route path="/signup" element={<SignUp />} />
              
              {/* User Protected Routes */}
              <Route path="/profile" element={
                <ProtectedRoute allowedRoles={['user', 'admin']}>
                  <Profile />
                </ProtectedRoute>
              } />

              <Route path="/checkout" element={
                <ProtectedRoute allowedRoles={['user', 'admin']}>
                  <Checkout />
                </ProtectedRoute>
              } />

              <Route path="/payment-gateway" element={
                <ProtectedRoute allowedRoles={['user', 'admin']}>
                  <PaymentGateway />
                </ProtectedRoute>
              } />

              <Route path="/track-order" element={
                <ProtectedRoute allowedRoles={['user', 'admin']}>
                  <TrackOrder />
                </ProtectedRoute>
              } />

              {/* Admin Protected Routes */}
              <Route path="/admin" element={
                <ProtectedRoute allowedRoles={['admin']}>
                  <AdminDashboard />
                </ProtectedRoute>
              } />
              <Route path="/admin/products" element={
                <ProtectedRoute allowedRoles={['admin']}>
                  <AdminProducts />
                </ProtectedRoute>
              } />
              <Route path="/admin/orders" element={
                <ProtectedRoute allowedRoles={['admin']}>
                  <AdminOrders />
                </ProtectedRoute>
              } />
              <Route path="/admin/users" element={
                <ProtectedRoute allowedRoles={['admin']}>
                  <AdminUsers />
                </ProtectedRoute>
              } />
              <Route path="/admin/settings" element={
                <ProtectedRoute allowedRoles={['admin']}>
                  <AdminSettings />
                </ProtectedRoute>
              } />

              {/* Default Route */}
              <Route path="*" element={<Home />} />
            </Routes>
          </Layout>
        </CartProvider>
      </WishlistProvider>
    </AddressProvider>
  </AuthProvider>
</Router>
  );
}

export default App;
