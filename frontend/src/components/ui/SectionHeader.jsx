import { Link } from 'react-router-dom';
import { ChevronRight } from 'lucide-react';

const SectionHeader = ({ 
    title, 
    viewAllHref, 
    viewAllLabel = 'View All',
    className = '' 
}) => {
    return (
        <div className={`flex justify-between items-center mb-8 ${className}`}>
            <h2 className="text-2xl md:text-3xl font-extrabold text-gray-900 tracking-tight">
                {title}
            </h2>
            {viewAllHref && (
                <Link 
                    to={viewAllHref} 
                    className="group flex items-center text-sm font-bold text-indigo-600 hover:text-indigo-700 transition-colors"
                >
                    {viewAllLabel}
                    <ChevronRight className="ml-1 h-4 w-4 transition-transform group-hover:translate-x-0.5" />
                </Link>
            )}
        </div>
    );
};

export default SectionHeader;
