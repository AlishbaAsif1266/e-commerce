import PropTypes from 'prop-types';
import { useLocation } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import Navbar from './Navbar';
import Footer from './Footer';
import BottomNav from './BottomNav';
import CartDrawer from '../cart/CartDrawer';
import AdminLayout from './AdminLayout';

const Layout = ({ children }) => {
    const { user } = useAuth();
    const location = useLocation();
    
    // Check if we should use Admin Layout
    const isAdminPath = location.pathname.startsWith('/admin');
    const isAdmin = user?.role === 'admin';

    if (isAdmin && isAdminPath) {
        return <AdminLayout>{children}</AdminLayout>;
    }

    return (
        <div className="flex flex-col min-h-screen bg-gray-50">
            <Navbar />
            <main className="flex-grow max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-8">
                {children}
            </main>
            <Footer />
            <BottomNav />
            <CartDrawer />
        </div>
    );
};

Layout.propTypes = {
    children: PropTypes.node.isRequired,
};

export default Layout;
