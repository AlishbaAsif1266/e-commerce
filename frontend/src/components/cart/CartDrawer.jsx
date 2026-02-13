import { X, Trash2, Plus, Minus, ShoppingBag } from 'lucide-react';
import { useCart } from '../../context/CartContext';
import Button from '../ui/Button';
import { useNavigate } from 'react-router-dom';

const CartDrawer = () => {
    const { 
        isCartOpen, 
        setIsCartOpen, 
        cartItems, 
        removeFromCart, 
        updateQuantity, 
        cartSubtotal 
    } = useCart();
    const navigate = useNavigate();

    if (!isCartOpen) return null;

    return (
        <div className="fixed inset-0 z-[100] overflow-hidden">
            {/* Backdrop */}
            <div 
                className="absolute inset-0 bg-black/40 backdrop-blur-sm transition-opacity"
                onClick={() => setIsCartOpen(false)}
            ></div>

            {/* Drawer */}
            <div className="absolute inset-y-0 right-0 max-w-full flex">
                <div className="w-screen max-w-md bg-white shadow-2xl flex flex-col transform transition-transform duration-500 ease-in-out">
                    {/* Header */}
                    <div className="p-6 border-b border-gray-100 flex items-center justify-between">
                        <div>
                            <h2 className="text-2xl font-black text-gray-900 tracking-tighter">Shopping Cart</h2>
                            <p className="text-xs font-bold text-gray-400 uppercase tracking-widest mt-1">
                                {cartItems.length} Items Selected
                            </p>
                        </div>
                        <button 
                            onClick={() => setIsCartOpen(false)}
                            className="p-2 hover:bg-gray-100 rounded-xl transition-colors"
                        >
                            <X className="h-6 w-6 text-gray-400" />
                        </button>
                    </div>

                    {/* Cart Items */}
                    <div className="flex-1 overflow-y-auto p-6 space-y-6">
                        {cartItems.length === 0 ? (
                            <div className="h-full flex flex-col items-center justify-center text-center space-y-4">
                                <div className="w-20 h-20 bg-indigo-50 rounded-full flex items-center justify-center">
                                    <ShoppingBag className="h-10 w-10 text-indigo-600" />
                                </div>
                                <div>
                                    <h3 className="text-xl font-bold text-gray-900">Your cart is empty</h3>
                                    <p className="text-gray-400 font-medium">Add some items to get started!</p>
                                </div>
                                <Button 
                                    variant="outline" 
                                    onClick={() => {
                                        setIsCartOpen(false);
                                        navigate('/shop');
                                    }}
                                >
                                    Start Shopping
                                </Button>
                            </div>
                        ) : (
                            cartItems.map((item) => (
                                <div key={item.id} className="flex space-x-4 group">
                                    <div className="h-24 w-24 flex-shrink-0 overflow-hidden rounded-2xl bg-gray-50 border border-gray-100">
                                        <img 
                                            src={item.image} 
                                            alt={item.name} 
                                            className="h-full w-full object-cover transition-transform group-hover:scale-110"
                                        />
                                    </div>
                                    <div className="flex-1 flex flex-col justify-between">
                                        <div>
                                            <div className="flex justify-between items-start">
                                                <h3 className="text-sm font-black text-gray-900 line-clamp-1">{item.name}</h3>
                                                <button 
                                                    onClick={() => removeFromCart(item.id)}
                                                    className="text-gray-400 hover:text-red-500 transition-colors"
                                                >
                                                    <Trash2 className="h-4 w-4" />
                                                </button>
                                            </div>
                                            <p className="text-xs font-bold text-indigo-600 mt-1">${item.price}</p>
                                        </div>
                                        <div className="flex items-center space-x-3 bg-gray-50 self-start p-1 rounded-xl">
                                            <button 
                                                onClick={() => updateQuantity(item.id, -1)}
                                                className="p-1 hover:bg-white hover:shadow-sm rounded-lg transition-all"
                                            >
                                                <Minus className="h-3 w-3" />
                                            </button>
                                            <span className="text-xs font-black w-4 text-center">{item.quantity}</span>
                                            <button 
                                                onClick={() => updateQuantity(item.id, 1)}
                                                className="p-1 hover:bg-white hover:shadow-sm rounded-lg transition-all"
                                            >
                                                <Plus className="h-3 w-3" />
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            ))
                        )}
                    </div>

                    {/* Footer */}
                    {cartItems.length > 0 && (
                        <div className="p-6 bg-gray-50 rounded-t-[40px] border-t border-gray-100 space-y-4">
                            <div className="flex justify-between text-gray-900 font-bold">
                                <span className="text-gray-400 uppercase tracking-widest text-[10px]">Subtotal</span>
                                <span className="text-xl font-black text-indigo-600">${cartSubtotal.toFixed(2)}</span>
                            </div>
                            <Button 
                                variant="primary" 
                                className="w-full py-5 rounded-3xl shadow-xl shadow-indigo-100"
                                onClick={() => {
                                    setIsCartOpen(false);
                                    navigate('/checkout');
                                }}
                            >
                                Proceed to Checkout
                            </Button>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default CartDrawer;
