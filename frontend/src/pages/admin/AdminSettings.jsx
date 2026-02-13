import { useState } from 'react';
import { 
    Store, 
    Globe, 
    Truck, 
    ShieldCheck, 
    Bell, 
    Save, 
    Mail, 
    Phone, 
    MapPin, 
    CreditCard, 
    Percent, 
    Clock, 
    Eye, 
    EyeOff,
    CheckCircle2,
    Settings,
    Shield
} from 'lucide-react';
import Button from '../../components/ui/Button';

const AdminSettings = () => {
    const [activeTab, setActiveTab] = useState('identity');
    const [isSaved, setIsSaved] = useState(false);

    const tabs = [
        { id: 'identity', label: 'Store Identity', icon: Store },
        { id: 'financials', label: 'Localization', icon: Globe },
        { id: 'logistics', label: 'Logistics', icon: Truck },
        { id: 'security', label: 'Security', icon: Shield },
        { id: 'notifications', label: 'Notifications', icon: Bell },
    ];

    const handleSave = () => {
        setIsSaved(true);
        setTimeout(() => setIsSaved(false), 3000);
    };

    const TabButton = ({ id, label, icon: Icon }) => (
        <button
            onClick={() => setActiveTab(id)}
            className={`flex items-center space-x-3 px-6 py-4 rounded-2xl w-full transition-all group ${
                activeTab === id 
                ? 'bg-indigo-600 text-white shadow-xl shadow-indigo-100' 
                : 'text-slate-400 hover:text-slate-900 hover:bg-slate-50'
            }`}
        >
            <Icon className={`h-5 w-5 ${activeTab === id ? 'text-white' : 'group-hover:text-indigo-600'}`} />
            <span className="font-black text-sm tracking-tight">{label}</span>
        </button>
    );

    return (
        <div className="space-y-10 animate-in fade-in duration-700">
            <div className="flex justify-between items-end">
                <div>
                    <h2 className="text-3xl font-black text-slate-900 tracking-tighter">Control Room</h2>
                    <p className="text-slate-500 font-bold mt-1">Manage your global store configurations and system preferences.</p>
                </div>
                {isSaved && (
                    <div className="flex items-center space-x-2 px-4 py-2 bg-emerald-50 text-emerald-600 rounded-xl animate-in slide-in-from-right-4">
                        <CheckCircle2 className="h-4 w-4" />
                        <span className="text-xs font-black uppercase tracking-widest">Settings Saved</span>
                    </div>
                )}
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
                {/* Settings Sidebar */}
                <div className="lg:col-span-3 space-y-2">
                    {tabs.map(tab => (
                        <TabButton key={tab.id} {...tab} />
                    ))}
                </div>

                {/* Settings Content */}
                <div className="lg:col-span-9">
                    <div className="bg-white rounded-[48px] border border-slate-200 shadow-xl shadow-slate-200/50 overflow-hidden">
                        <div className="p-10">
                            {activeTab === 'identity' && (
                                <div className="space-y-10 animate-in fade-in duration-500">
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                                        <div className="space-y-3">
                                            <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">Store Name</label>
                                            <div className="relative group">
                                                <Store className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-slate-400 group-focus-within:text-indigo-600 transition-colors" />
                                                <input 
                                                    type="text" 
                                                    defaultValue="SmartCart Premium"
                                                    className="w-full pl-12 pr-4 py-4 bg-slate-50 border-none rounded-2xl focus:ring-2 focus:ring-indigo-100 font-bold transition-all outline-none"
                                                />
                                            </div>
                                        </div>
                                        <div className="space-y-3">
                                            <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">Support Email</label>
                                            <div className="relative group">
                                                <Mail className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-slate-400 group-focus-within:text-indigo-600 transition-colors" />
                                                <input 
                                                    type="email" 
                                                    defaultValue="support@smartcart.com"
                                                    className="w-full pl-12 pr-4 py-4 bg-slate-50 border-none rounded-2xl focus:ring-2 focus:ring-indigo-100 font-bold transition-all outline-none"
                                                />
                                            </div>
                                        </div>
                                    </div>

                                    <div className="space-y-3">
                                        <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">Business Address</label>
                                        <div className="relative group">
                                            <MapPin className="absolute left-4 top-4 h-5 w-5 text-slate-400 group-focus-within:text-indigo-600 transition-colors" />
                                            <textarea 
                                                defaultValue="123 Tech Avenue, Luxury District&#10;Metropolis, State 90210"
                                                rows="3"
                                                className="w-full pl-12 pr-4 py-4 bg-slate-50 border-none rounded-2xl focus:ring-2 focus:ring-indigo-100 font-bold transition-all outline-none resize-none"
                                            ></textarea>
                                        </div>
                                    </div>

                                    <div className="p-8 bg-indigo-50/50 rounded-[32px] border border-indigo-100/50 flex items-center justify-between">
                                        <div className="flex items-center space-x-6">
                                            <div className="w-20 h-20 bg-white rounded-3xl flex items-center justify-center shadow-lg border border-indigo-50 p-2">
                                                <div className="w-full h-full bg-indigo-600 rounded-2xl flex items-center justify-center text-white">
                                                    <Store className="h-8 w-8" />
                                                </div>
                                            </div>
                                            <div>
                                                <h4 className="font-black text-slate-900 tracking-tight">Store Logo</h4>
                                                <p className="text-xs font-bold text-slate-500">Recommended size: 512x512px (PNG/SVG)</p>
                                            </div>
                                        </div>
                                        <Button variant="primary" className="rounded-xl px-6">Upload New</Button>
                                    </div>
                                </div>
                            )}

                            {activeTab === 'financials' && (
                                <div className="space-y-10 animate-in fade-in duration-500">
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                                        <div className="space-y-3">
                                            <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">Default Currency</label>
                                            <div className="relative group">
                                                <CreditCard className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-slate-400 group-focus-within:text-indigo-600 transition-colors" />
                                                <select className="w-full pl-12 pr-4 py-4 bg-slate-50 border-none rounded-2xl focus:ring-2 focus:ring-indigo-100 font-bold transition-all outline-none appearance-none cursor-pointer">
                                                    <option>USD ($)</option>
                                                    <option>PKR (Rs.)</option>
                                                    <option>EUR (€)</option>
                                                    <option>GBP (£)</option>
                                                </select>
                                            </div>
                                        </div>
                                        <div className="space-y-3">
                                            <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">Tax Rate (%)</label>
                                            <div className="relative group">
                                                <Percent className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-slate-400 group-focus-within:text-indigo-600 transition-colors" />
                                                <input 
                                                    type="number" 
                                                    defaultValue="15"
                                                    className="w-full pl-12 pr-4 py-4 bg-slate-50 border-none rounded-2xl focus:ring-2 focus:ring-indigo-100 font-bold transition-all outline-none"
                                                />
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            )}

                            {activeTab === 'logistics' && (
                                <div className="space-y-10 animate-in fade-in duration-500">
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                                        <div className="space-y-3">
                                            <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">Shipping Cost</label>
                                            <div className="relative group">
                                                <Truck className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-slate-400 group-focus-within:text-indigo-600 transition-colors" />
                                                <input 
                                                    type="number" 
                                                    defaultValue="15.00"
                                                    className="w-full pl-12 pr-4 py-4 bg-slate-50 border-none rounded-2xl focus:ring-2 focus:ring-indigo-100 font-bold transition-all outline-none"
                                                />
                                            </div>
                                        </div>
                                        <div className="space-y-3">
                                            <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">Free Delivery Threshold</label>
                                            <div className="relative group">
                                                <CheckCircle2 className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-slate-400 group-focus-within:text-indigo-600 transition-colors" />
                                                <input 
                                                    type="number" 
                                                    defaultValue="100.00"
                                                    className="w-full pl-12 pr-4 py-4 bg-slate-50 border-none rounded-2xl focus:ring-2 focus:ring-indigo-100 font-bold transition-all outline-none"
                                                />
                                            </div>
                                        </div>
                                    </div>
                                    <div className="p-8 bg-slate-50 rounded-[32px] flex items-center justify-between">
                                        <div>
                                            <h4 className="font-black text-slate-900 tracking-tight">Real-time Carrier Tracking</h4>
                                            <p className="text-xs font-bold text-slate-500 mt-1">Automatically notify customers about their shipment status.</p>
                                        </div>
                                        <div className="relative inline-flex h-6 w-11 flex-shrink-0 cursor-pointer rounded-full border-2 border-transparent bg-indigo-600 transition-colors duration-200">
                                            <span className="translate-x-5 pointer-events-none inline-block h-5 w-5 transform rounded-full bg-white shadow ring-0 transition duration-200 ease-in-out"></span>
                                        </div>
                                    </div>
                                </div>
                            )}

                            {activeTab === 'security' && (
                                <div className="space-y-10 animate-in fade-in duration-500">
                                    <div className="space-y-3">
                                        <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">Maintenance Mode</label>
                                        <div className="p-8 bg-red-50/50 rounded-[32px] border border-red-100/50 flex items-center justify-between">
                                            <div className="flex items-center space-x-4">
                                                <div className="p-4 bg-white rounded-2xl text-red-500 shadow-sm border border-red-50">
                                                    <ShieldCheck className="h-6 w-6" />
                                                </div>
                                                <div>
                                                    <h4 className="font-black text-slate-900 tracking-tight">Offline Operations</h4>
                                                    <p className="text-xs font-bold text-slate-500 mt-1">Redirect customers to a maintenance page.</p>
                                                </div>
                                            </div>
                                            <div className="relative inline-flex h-6 w-11 flex-shrink-0 cursor-pointer rounded-full border-2 border-transparent bg-slate-200 transition-colors duration-200">
                                                <span className="translate-x-0 pointer-events-none inline-block h-5 w-5 transform rounded-full bg-white shadow ring-0 transition duration-200 ease-in-out"></span>
                                            </div>
                                        </div>
                                    </div>

                                    <div className="space-y-3">
                                        <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">Cloudinary API Key</label>
                                        <div className="relative group">
                                            <Shield className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-slate-400 group-focus-within:text-indigo-600 transition-colors" />
                                            <input 
                                                type="password" 
                                                defaultValue="aksjd782kjsdfhskjdf8"
                                                className="w-full pl-12 pr-12 py-4 bg-slate-50 border-none rounded-2xl focus:ring-2 focus:ring-indigo-100 font-bold transition-all outline-none"
                                            />
                                            <button className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-900">
                                                <EyeOff className="h-5 w-5" />
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            )}

                            {activeTab === 'notifications' && (
                                <div className="space-y-10 animate-in fade-in duration-500">
                                    <div className="space-y-6">
                                        {[
                                            { title: 'New Order Alerts', desc: 'Notify admin when a new order is received.' },
                                            { title: 'Customer Registration', desc: 'Send welcome email to new customers.' },
                                            { title: 'Inventory Warnings', desc: 'Alert when a product goes below 5 units.' },
                                        ].map((notif, i) => (
                                            <div key={i} className="flex items-center justify-between py-4 border-b border-slate-50 last:border-0">
                                                <div>
                                                    <h4 className="font-black text-slate-900 tracking-tight text-sm uppercase">{notif.title}</h4>
                                                    <p className="text-xs font-bold text-slate-400 mt-1">{notif.desc}</p>
                                                </div>
                                                <div className="relative inline-flex h-5 w-9 flex-shrink-0 cursor-pointer rounded-full border-2 border-transparent bg-indigo-600 transition-colors duration-200">
                                                    <span className="translate-x-4 pointer-events-none inline-block h-4 w-4 transform rounded-full bg-white shadow ring-0 transition duration-200 ease-in-out"></span>
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            )}
                        </div>

                        {/* Footer Action Bar */}
                        <div className="px-10 py-8 bg-slate-50/50 border-t border-slate-100 flex items-center justify-between">
                            <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest flex items-center">
                                <Clock className="h-3 w-3 mr-2" />
                                Last modified: Today, 1:12 PM
                            </p>
                            <div className="flex space-x-4">
                                <Button variant="dark" className="rounded-xl px-8 py-3">Discard</Button>
                                <Button 
                                    variant="primary" 
                                    className="rounded-xl px-10 py-3 shadow-xl shadow-indigo-100"
                                    leftIcon={<Save className="h-4 w-4" />}
                                    onClick={handleSave}
                                >
                                    Save Changes
                                </Button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default AdminSettings;
