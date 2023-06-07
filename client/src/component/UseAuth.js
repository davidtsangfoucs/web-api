import { useState, useEffect } from 'react';

const UseAuth = () => {
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [premission, setPremission] = useState('');

    useEffect(() => {
        const token = localStorage.getItem('auth-token');
        setIsLoggedIn(!!token);

        const userPremission = localStorage.getItem('premission');
        setPremission(userPremission);
    }, []);

    return { isLoggedIn, premission };
};

export default UseAuth;
