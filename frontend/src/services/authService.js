import api from './api';

// Mock implementation until backend auth is ready
const authService = {
    login: async (email, password) => {
        // Simulate API call delay
        await new Promise(resolve => setTimeout(resolve, 500));
        
        // Mock validation
        if (email === 'admin@smartcart.com' && password === 'admin123') {
            return {
                id: '1',
                name: 'Admin User',
                email: 'admin@smartcart.com',
                role: 'admin',
                token: 'mock-admin-token'
            };
        }
        
        if (email && password) {
            return {
                id: '2',
                name: 'Jane Doe',
                email: email,
                role: 'user',
                token: 'mock-user-token'
            };
        }
        
        throw new Error('Invalid credentials');
    },

    register: async (userData) => {
         await new Promise(resolve => setTimeout(resolve, 500));
         return {
             id: Math.random().toString(36).substr(2, 9),
             ...userData,
             role: 'user',
             token: 'mock-user-token'
         };
    },

    logout: () => {
        localStorage.removeItem('user');
    }
};

export default authService;
