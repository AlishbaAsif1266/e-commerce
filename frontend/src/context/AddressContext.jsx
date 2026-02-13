import { createContext, useContext, useState, useEffect } from 'react';

const AddressContext = createContext();

export const useAddresses = () => {
    const context = useContext(AddressContext);
    if (!context) {
        throw new Error('useAddresses must be used within an AddressProvider');
    }
    return context;
};

export const AddressProvider = ({ children }) => {
    const [addresses, setAddresses] = useState(() => {
        try {
            const saved = localStorage.getItem('user_addresses');
            if (saved) {
                const parsed = JSON.parse(saved);
                if (Array.isArray(parsed)) return parsed;
            }
        } catch (e) {
            console.error("Address parsing error", e);
        }
        return [
            {
                id: '1',
                name: 'Home Base',
                street: '123 Premium Avenue, Luxury District',
                city: 'Silicon Valley',
                state: 'CA',
                zip: '94025',
                country: 'United States',
                isDefault: true
            }
        ];
    });

    useEffect(() => {
        localStorage.setItem('user_addresses', JSON.stringify(addresses));
    }, [addresses]);

    const addAddress = (newAddress) => {
        const id = Math.random().toString(36).substr(2, 9);
        const addressWithId = { ...newAddress, id };
        
        if (addressWithId.isDefault) {
            setAddresses(prev => prev.map(addr => ({ ...addr, isDefault: false })).concat(addressWithId));
        } else {
            setAddresses(prev => [...prev, addressWithId]);
        }
        return addressWithId;
    };

    const updateAddress = (id, updatedFields) => {
        setAddresses(prev => {
            let newAddresses = prev.map(addr => addr.id === id ? { ...addr, ...updatedFields } : addr);
            
            // Handle if a new default is set
            if (updatedFields.isDefault) {
                newAddresses = newAddresses.map(addr => addr.id === id ? addr : { ...addr, isDefault: false });
            }
            
            return newAddresses;
        });
    };

    const deleteAddress = (id) => {
        setAddresses(prev => {
            const newAddresses = prev.filter(addr => addr.id !== id);
            // If we deleted the default, set the first one as default if it exists
            if (prev.find(a => a.id === id)?.isDefault && newAddresses.length > 0) {
                newAddresses[0].isDefault = true;
            }
            return newAddresses;
        });
    };

    const setDefaultAddress = (id) => {
        setAddresses(prev => prev.map(addr => ({
            ...addr,
            isDefault: addr.id === id
        })));
    };

    return (
        <AddressContext.Provider value={{ 
            addresses, 
            addAddress, 
            updateAddress, 
            deleteAddress, 
            setDefaultAddress 
        }}>
            {children}
        </AddressContext.Provider>
    );
};
