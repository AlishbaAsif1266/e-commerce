const Badge = ({ 
    children, 
    variant = 'default', 
    className = '' 
}) => {
    const variants = {
        default: 'bg-gray-100 text-gray-800',
        primary: 'bg-indigo-100 text-indigo-700',
        success: 'bg-green-100 text-green-700',
        warning: 'bg-yellow-100 text-yellow-700',
        error: 'bg-red-100 text-red-700',
        hot: 'bg-red-600 text-white uppercase tracking-wider text-[10px]'
    };

    return (
        <span className={`inline-flex items-center px-2.5 py-1 rounded-full text-xs font-bold ${variants[variant]} ${className}`}>
            {children}
        </span>
    );
};

export default Badge;
