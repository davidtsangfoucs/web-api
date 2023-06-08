import { useState, useEffect } from 'react';

const UseAuth = () => {
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [premission, setPremission] = useState('');
    const [userId, setUserId] = useState(0);
    const [objId, setObjId] = useState(0);

    useEffect(() => {
        const token = localStorage.getItem('auth-token');
        setIsLoggedIn(!!token);

        const userPremission = localStorage.getItem('premission');
        setPremission(userPremission);

        const userId = localStorage.getItem('user-id');
        setUserId(userId);

        const objId = localStorage.getItem('obj-id');
        setObjId(objId);
    }, []);

    return { isLoggedIn, premission, userId, objId };
};

export default UseAuth;
