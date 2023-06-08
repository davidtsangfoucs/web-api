import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const AutoLogout = () => {
    const navigate = useNavigate();

    const logoutUser = () => {
        // Remove the auth token
        localStorage.removeItem('auth-token');
        localStorage.removeItem('premission');
        localStorage.removeItem('user-id');
        localStorage.removeItem('obj-id');
        // Optionally, redirect the user to the login page
        alert('You have been logged out due to inactivity.');
        navigate('/login');
        window.location.reload();
    };

    useEffect(() => {
        // Check every second if the current time is past the logout time
        const intervalId = setInterval(() => {
            const logoutTime = localStorage.getItem('logoutTime');
            if (logoutTime && Date.now() > logoutTime) {
                logoutUser();
            }
        }, 1000); // 1000 milliseconds = 1 second

        // Cleanup function to clear the interval when the component unmounts
        clearInterval(intervalId);
        return () => {
            clearInterval(intervalId);
        };
    }, []);

    return null;
};

export default AutoLogout;
