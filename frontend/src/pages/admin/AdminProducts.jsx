import { useState } from 'react';
import { 
    Search, 
    Plus, 
    Filter, 
    MoreVertical, 
    Edit, 
    Trash2, 
    ChevronLeft, 
    ChevronRight,
    ArrowUpDown,
    Package,
    AlertCircle,
    X,
    UploadCloud,
    Loader2,
    ImagePlus
} from 'lucide-react';
import Button from '../../components/ui/Button';
import Badge from '../../components/ui/Badge';

// Mock Product Data for Admin
const initialProducts = [
    { 
        id: 1, 
        name: 'Velocity Tech Tee', 
        category: 'Apparel', 
        price: 45.00, 
        stock: 124, 
        status: 'In Stock', 
        sku: 'AP-VLT-001', 
        image: 'https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?auto=format&fit=crop&q=80&w=800',
        description: 'Engineered for maximum performance and breathability.',
        tags: 'Best Seller'
    },
    { 
        id: 2, 
        name: 'Classic Urban Blazer', 
        category: 'Apparel', 
        price: 158.00, 
        stock: 42, 
        status: 'In Stock', 
        sku: 'AP-CUB-002', 
        image: 'https://images.unsplash.com/photo-1591047139829-d91aecb6caea?auto=format&fit=crop&q=80&w=800',
        description: 'A timeless silhouette for the modern city explorer.',
        tags: 'New Arrival'
    },
    { 
        id: 3, 
        name: 'Sprint Runner X', 
        category: 'Shoes', 
        price: 85.00, 
        stock: 8, 
        status: 'Low Stock', 
        sku: 'SH-SRX-003', 
        image: 'https://images.unsplash.com/photo-1542291026-7eec264c27ff?auto=format&fit=crop&q=80&w=800',
        description: 'Responsive cushioning meets aerodynamic design.',
        tags: 'Discounted'
    },
    { 
        id: 4, 
        name: 'Sonic Buds Ultra', 
        category: 'Tech', 
        price: 249.00, 
        stock: 0, 
        status: 'Out of Stock', 
        sku: 'TE-SBU-004', 
        image: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?auto=format&fit=crop&q=80&w=800',
        description: 'Immersive noise cancellation for pure audio bliss.',
        tags: 'Limited Edition'
    },
    { 
        id: 5, 
        name: 'Elite Urban Backpack', 
        category: 'Accessories', 
        price: 124.00, 
        stock: 56, 
        status: 'In Stock', 
        sku: 'AC-EUB-005', 
        image: 'https://images.unsplash.com/photo-1553062407-98eeb64c6a62?auto=format&fit=crop&q=80&w=800',
        description: 'Weatherproof exterior with smart organization compartments.',
        tags: 'New Arrival'
    },
];

const AdminProducts = () => {
    const [products, setProducts] = useState(initialProducts);
    const [searchTerm, setSearchTerm] = useState('');
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [editingProduct, setEditingProduct] = useState(null);
    const [formData, setFormData] = useState({ 
        name: '', 
        category: 'Apparel', 
        price: '', 
        stock: '', 
        sku: '', 
        image: '',
        description: '',
        tags: 'New Arrival'
    });
    const [isUploading, setIsUploading] = useState(false);

    const filteredProducts = products.filter(p => 
        p.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
        p.sku.toLowerCase().includes(searchTerm.toLowerCase())
    );

    const handleOpenModal = (product = null) => {
        if (product) {
            setEditingProduct(product);
            setFormData({ ...product });
        } else {
            setEditingProduct(null);
            setFormData({ 
                name: '', 
                category: 'Apparel', 
                price: '', 
                stock: '', 
                sku: `SKU-${Math.floor(Math.random() * 10000)}`, 
                image: '',
                description: '',
                tags: 'New Arrival'
            });
        }
        setIsModalOpen(true);
    };

    const handleImageUpload = async (e) => {
        const file = e.target.files[0];
        if (!file) return;

        setIsUploading(true);
        const uploadData = new FormData();
        uploadData.append('image', file);

        try {
            const response = await fetch('http://localhost:5000/api/upload/image', {
                method: 'POST',
                body: uploadData,
            });

            if (!response.ok) {
                const errorData = await response.json();
                throw new Error(errorData.message || `Server responded with ${response.status}`);
            }

            const data = await response.json();
            if (data.url) {
                setFormData(prev => ({ ...prev, image: data.url }));
            }
        } catch (error) {
            console.error('Upload failed:', error);
            alert(`Upload Failed: ${error.message}. Please check if backend is running on port 5000.`);
        } finally {
            setIsUploading(false);
        }
    };

    const handleSaveProduct = (e) => {
        e.preventDefault();
        const productData = {
            ...formData,
            price: parseFloat(formData.price),
            stock: parseInt(formData.stock),
            status: formData.stock > 20 ? 'In Stock' : formData.stock > 0 ? 'Low Stock' : 'Out of Stock'
        };

        if (editingProduct) {
            setProducts(products.map(p => p.id === editingProduct.id ? { ...p, ...productData } : p));
        } else {
            setProducts([...products, { ...productData, id: Date.now() }]);
        }
        setIsModalOpen(false);
    };

    const handleDelete = (id) => {
        if (window.confirm('Are you sure you want to delete this product?')) {
            setProducts(products.filter(p => p.id !== id));
        }
    };

    return (
        <div className="space-y-8 animate-in fade-in duration-700">
            {/* Action Bar */}
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 bg-white p-6 rounded-[32px] border border-slate-200 shadow-sm">
                <div className="relative flex-1 max-w-md">
                    <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-slate-400" />
                    <input 
                        type="text" 
                        placeholder="Search by name or SKU..."
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        className="w-full pl-12 pr-4 py-4 bg-slate-50 border-none rounded-2xl focus:ring-2 focus:ring-indigo-100 font-bold transition-all outline-none"
                    />
                </div>
                <div className="flex items-center space-x-4">
                    <button className="p-4 bg-slate-50 rounded-2xl text-slate-600 hover:bg-slate-100 transition-all">
                        <Filter className="h-5 w-5" />
                    </button>
                    <Button 
                        variant="primary" 
                        className="rounded-2xl px-6 py-4 shadow-xl shadow-indigo-100" 
                        leftIcon={<Plus className="h-5 w-5" />}
                        onClick={() => handleOpenModal()}
                    >
                        Add Product
                    </Button>
                </div>
            </div>

            {/* Products Table */}
            <div className="bg-white rounded-[40px] border border-slate-200 overflow-hidden shadow-xl shadow-slate-200/50">
                <div className="overflow-x-auto">
                    <table className="w-full text-left border-collapse">
                        <thead>
                            <tr className="bg-slate-50/50 border-b border-slate-100">
                                <th className="px-8 py-6 text-[10px] font-black text-slate-400 uppercase tracking-widest">
                                    <div className="flex items-center space-x-2">
                                        <span>Product</span>
                                        <ArrowUpDown className="h-3 w-3" />
                                    </div>
                                </th>
                                <th className="px-8 py-6 text-[10px] font-black text-slate-400 uppercase tracking-widest">Category</th>
                                <th className="px-8 py-6 text-[10px] font-black text-slate-400 uppercase tracking-widest">Price</th>
                                <th className="px-8 py-6 text-[10px] font-black text-slate-400 uppercase tracking-widest">Inventory</th>
                                <th className="px-8 py-6 text-[10px] font-black text-slate-400 uppercase tracking-widest">Status</th>
                                <th className="px-8 py-6 text-[10px] font-black text-slate-400 uppercase tracking-widest text-right">Actions</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-slate-50">
                            {filteredProducts.map((product) => (
                                <tr key={product.id} className="hover:bg-slate-50/50 transition-colors group">
                                    <td className="px-8 py-6">
                                        <div className="flex items-center space-x-4">
                                            <div className="w-12 h-12 bg-slate-100 rounded-xl flex items-center justify-center overflow-hidden border border-slate-100">
                                                {product.image ? (
                                                    <img src={product.image} alt={product.name} className="w-full h-full object-cover" />
                                                ) : (
                                                    <Package className="h-6 w-6 text-slate-400" />
                                                )}
                                            </div>
                                            <div>
                                                <div className="flex items-center space-x-2">
                                                    <p className="font-black text-slate-900 tracking-tight leading-tight">{product.name}</p>
                                                    {product.tags && (
                                                        <span className="px-1.5 py-0.5 bg-indigo-50 text-indigo-600 text-[8px] font-black uppercase rounded uppercase tracking-tighter">
                                                            {product.tags}
                                                        </span>
                                                    )}
                                                </div>
                                                <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mt-1">SKU: {product.sku}</p>
                                            </div>
                                        </div>
                                    </td>
                                    <td className="px-8 py-6 text-sm font-bold text-slate-600">{product.category}</td>
                                    <td className="px-8 py-6 text-sm font-black text-slate-900">${product.price.toFixed(2)}</td>
                                    <td className="px-8 py-6">
                                        <div className="flex flex-col space-y-1">
                                            <span className="text-sm font-bold text-slate-900">{product.stock} Units</span>
                                            <div className="w-24 h-1.5 bg-slate-100 rounded-full overflow-hidden">
                                                <div 
                                                    className={`h-full transition-all duration-1000 ${
                                                        product.stock === 0 ? 'bg-red-500 w-0' : 
                                                        product.stock < 20 ? 'bg-amber-500 w-1/4' : 'bg-emerald-500 w-2/3'
                                                    }`}
                                                ></div>
                                            </div>
                                        </div>
                                    </td>
                                    <td className="px-8 py-6">
                                        <div className={`inline-flex items-center px-3 py-1.5 rounded-lg text-[10px] font-black uppercase tracking-widest ${
                                            product.status === 'In Stock' ? 'bg-emerald-50 text-emerald-600' :
                                            product.status === 'Low Stock' ? 'bg-amber-50 text-amber-600' : 'bg-red-50 text-red-600'
                                        }`}>
                                            {product.status}
                                        </div>
                                    </td>
                                    <td className="px-8 py-6 text-right">
                                        <div className="flex items-center justify-end space-x-2">
                                            <button 
                                                className="p-2 text-slate-400 hover:text-indigo-600 hover:bg-indigo-50 rounded-lg transition-all"
                                                onClick={() => handleOpenModal(product)}
                                            >
                                                <Edit className="h-4 w-4" />
                                            </button>
                                            <button 
                                                className="p-2 text-slate-400 hover:text-red-500 hover:bg-red-50 rounded-lg transition-all"
                                                onClick={() => handleDelete(product.id)}
                                            >
                                                <Trash2 className="h-4 w-4" />
                                            </button>
                                        </div>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>

                {/* Pagination Placeholder */}
                <div className="px-8 py-6 bg-slate-50/30 border-t border-slate-100 flex items-center justify-between">
                    <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Showing 1 to 5 of 42 products</p>
                    <div className="flex items-center space-x-2">
                        <button className="p-2 bg-white border border-slate-200 rounded-lg text-slate-400 cursor-not-allowed">
                            <ChevronLeft className="h-4 w-4" />
                        </button>
                        <button className="p-2 bg-white border border-slate-200 rounded-lg text-slate-600 hover:border-indigo-600 hover:text-indigo-600 transition-all">
                            <ChevronRight className="h-4 w-4" />
                        </button>
                    </div>
                </div>
            </div>

            {/* Stats Overlay */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
                <div className="bg-indigo-600 p-8 rounded-[32px] text-white shadow-xl shadow-indigo-100 flex items-center justify-between overflow-hidden relative group">
                    <div className="absolute -right-4 -bottom-4 w-24 h-24 bg-white/10 rounded-full blur-2xl group-hover:scale-150 transition-transform duration-700"></div>
                    <div>
                        <p className="text-[10px] font-black uppercase tracking-widest text-indigo-200 mb-2">Total Value</p>
                        <h4 className="text-3xl font-black tracking-tighter leading-none">$12,450</h4>
                    </div>
                    <div className="bg-white/10 p-4 rounded-2xl backdrop-blur-md">
                        <ArrowUpDown className="h-6 w-6" />
                    </div>
                </div>
                <div className="bg-white p-8 rounded-[32px] border border-slate-200 shadow-sm flex items-center justify-between">
                    <div>
                        <p className="text-[10px] font-black uppercase tracking-widest text-slate-400 mb-2">Active Categories</p>
                        <h4 className="text-3xl font-black tracking-tighter leading-none text-slate-900">12</h4>
                    </div>
                    <div className="bg-slate-50 p-4 rounded-2xl text-slate-400">
                        <Filter className="h-6 w-6" />
                    </div>
                </div>
                <div className="bg-white p-8 rounded-[32px] border border-slate-200 shadow-sm flex items-center justify-between">
                    <div>
                        <p className="text-[10px] font-black uppercase tracking-widest text-slate-400 mb-2">Stock Alerts</p>
                        <h4 className="text-3xl font-black tracking-tighter leading-none text-amber-500">4</h4>
                    </div>
                    <div className="bg-amber-50 p-4 rounded-2xl text-amber-500">
                        <AlertCircle className="h-6 w-6" />
                    </div>
                </div>
                <div className="bg-slate-900 p-8 rounded-[32px] text-white shadow-xl flex items-center justify-between">
                    <div>
                        <p className="text-[10px] font-black uppercase tracking-widest text-slate-400 mb-2">Top Category</p>
                        <h4 className="text-3xl font-black tracking-tighter leading-none">Apparel</h4>
                    </div>
                    <div className="bg-white/5 p-4 rounded-2xl">
                        <Package className="h-6 w-6 text-indigo-400" />
                    </div>
                </div>
            </div>

            {/* Product Modal */}
            {isModalOpen && (
                <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
                <div className="absolute inset-0 bg-slate-900/60 backdrop-blur-sm animate-in fade-in duration-300" onClick={() => setIsModalOpen(false)}></div>
                <div className="bg-white rounded-[40px] w-full max-w-4xl max-h-[90vh] relative z-10 shadow-2xl border border-white animate-in zoom-in duration-300 overflow-hidden flex flex-col">
                    {/* Fixed Header */}
                    <div className="p-8 border-b border-slate-100 flex justify-between items-center bg-slate-50/50 shrink-0">
                            <div>
                                <h3 className="text-2xl font-black text-slate-900 tracking-tight">
                                    {editingProduct ? 'Edit Product' : 'Add New Product'}
                                </h3>
                                <p className="text-slate-500 font-bold text-sm">Fill in the technical details below.</p>
                            </div>
                            <button onClick={() => setIsModalOpen(false)} className="p-2 text-slate-400 hover:text-slate-900 hover:bg-slate-50 rounded-xl transition-all">
                                <X className="h-6 w-6" />
                            </button>
                        </div>

                        <form onSubmit={handleSaveProduct} className="flex flex-col flex-1 overflow-hidden">
                            {/* Scrollable Body */}
                            <div className="p-8 space-y-8 overflow-y-auto flex-1 custom-scrollbar">
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
                                    {/* Left Column: Media & Info */}
                                    <div className="space-y-6">
                                        <div className="space-y-2">
                                            <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">Product Media</label>
                                            <div 
                                                className={`relative group h-64 rounded-[32px] border-2 border-dashed transition-all flex flex-col items-center justify-center overflow-hidden cursor-pointer ${
                                                    formData.image ? 'border-indigo-100 bg-indigo-50/30' : 'border-slate-200 bg-slate-50 hover:border-indigo-300'
                                                }`}
                                            >
                                                {isUploading ? (
                                                    <div className="flex flex-col items-center space-y-3">
                                                        <Loader2 className="h-8 w-8 text-indigo-500 animate-spin" />
                                                        <p className="text-xs font-black text-indigo-500 uppercase tracking-widest">Uploading to Cloud...</p>
                                                    </div>
                                                ) : formData.image ? (
                                                    <div className="relative w-full h-full group">
                                                        <img src={formData.image} alt="Preview" className="w-full h-full object-cover" />
                                                        <div className="absolute inset-0 bg-slate-900/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                                                            <Button type="button" variant="primary" className="rounded-xl px-4 py-2 text-xs" onClick={() => setFormData({ ...formData, image: '' })}>
                                                                Change Image
                                                            </Button>
                                                        </div>
                                                    </div>
                                                ) : (
                                                    <div className="flex flex-col items-center space-y-2 text-slate-400 group-hover:text-indigo-500 transition-colors">
                                                        <div className="p-3 bg-white rounded-2xl shadow-sm border border-slate-100 group-hover:border-indigo-100">
                                                            <ImagePlus className="h-6 w-6" />
                                                        </div>
                                                        <p className="text-xs font-black uppercase tracking-widest text-center px-4">Drag and drop or click to upload</p>
                                                    </div>
                                                )}
                                                <input 
                                                    type="file" 
                                                    accept="image/*"
                                                    onChange={handleImageUpload}
                                                    className="absolute inset-0 opacity-0 cursor-pointer"
                                                    disabled={isUploading}
                                                />
                                            </div>
                                        </div>

                                        <div className="space-y-2">
                                            <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">Product Description</label>
                                            <textarea 
                                                rows="4"
                                                value={formData.description}
                                                onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                                                className="w-full px-6 py-4 bg-slate-50 border-none rounded-2xl focus:ring-2 focus:ring-indigo-100 font-bold transition-all outline-none resize-none"
                                                placeholder="Tell the story of this product..."
                                            />
                                        </div>
                                    </div>

                                    {/* Right Column: Details */}
                                    <div className="space-y-6">
                                        <div className="space-y-2">
                                            <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">Product Name</label>
                                            <input 
                                                type="text" 
                                                required
                                                value={formData.name}
                                                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                                                className="w-full px-6 py-4 bg-slate-50 border-none rounded-2xl focus:ring-2 focus:ring-indigo-100 font-bold transition-all outline-none"
                                                placeholder="e.g. Velocity Tech Tee"
                                            />
                                        </div>

                                        <div className="grid grid-cols-2 gap-4">
                                            <div className="space-y-2">
                                                <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">Category</label>
                                                <select 
                                                    value={formData.category}
                                                    onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                                                    className="w-full px-6 py-4 bg-slate-50 border-none rounded-2xl focus:ring-2 focus:ring-indigo-100 font-bold transition-all outline-none appearance-none cursor-pointer"
                                                >
                                                    <option value="Apparel">Apparel</option>
                                                    <option value="Shoes">Shoes</option>
                                                    <option value="Tech">Tech</option>
                                                    <option value="Accessories">Accessories</option>
                                                </select>
                                            </div>
                                            <div className="space-y-2">
                                                <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">Price ($)</label>
                                                <input 
                                                    type="number" 
                                                    step="0.01"
                                                    required
                                                    value={formData.price}
                                                    onChange={(e) => setFormData({ ...formData, price: e.target.value })}
                                                    className="w-full px-6 py-4 bg-slate-50 border-none rounded-2xl focus:ring-2 focus:ring-indigo-100 font-bold transition-all outline-none"
                                                    placeholder="0.00"
                                                />
                                            </div>
                                        </div>

                                        <div className="grid grid-cols-2 gap-4">
                                            <div className="space-y-2">
                                                <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">Stock Status</label>
                                                <input 
                                                    type="number" 
                                                    required
                                                    value={formData.stock}
                                                    onChange={(e) => setFormData({ ...formData, stock: e.target.value })}
                                                    className="w-full px-6 py-4 bg-slate-50 border-none rounded-2xl focus:ring-2 focus:ring-indigo-100 font-bold transition-all outline-none"
                                                    placeholder="0"
                                                />
                                            </div>
                                            <div className="space-y-2">
                                                <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">Badge / Tag</label>
                                                <select 
                                                    value={formData.tags}
                                                    onChange={(e) => setFormData({ ...formData, tags: e.target.value })}
                                                    className="w-full px-6 py-4 bg-slate-50 border-none rounded-2xl focus:ring-2 focus:ring-indigo-100 font-bold transition-all outline-none appearance-none cursor-pointer"
                                                >
                                                    <option value="New Arrival">New Arrival</option>
                                                    <option value="Best Seller">Best Seller</option>
                                                    <option value="Limited Edition">Limited Edition</option>
                                                    <option value="Discounted">Discounted</option>
                                                </select>
                                            </div>
                                        </div>
                                        
                                        <div className="space-y-2">
                                            <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">Inventory SKU</label>
                                            <div className="px-6 py-4 bg-slate-100 rounded-2xl text-slate-400 font-mono text-sm border border-slate-200">
                                                {formData.sku}
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            {/* Fixed Footer */}
                            <div className="p-8 border-t border-slate-100 flex justify-end space-x-4 bg-slate-50/30 shrink-0">
                                <Button type="button" variant="dark" className="rounded-2xl px-10 py-4" onClick={() => setIsModalOpen(false)}>
                                    Discard
                                </Button>
                                <Button type="submit" variant="primary" className="rounded-2xl px-10 py-4 shadow-xl shadow-indigo-100">
                                    {editingProduct ? 'Save Changes' : 'Add Product'}
                                </Button>
                            </div>
                        </form>
                    </div>
                </div>
            )}
        </div>
    );
};

export default AdminProducts;
