import { useEffect } from 'react';
import axios from '../commons/axios';
import { baseURL } from '../commons/helper';
import jwt_decode from "jwt-decode"
import { useNavigate } from 'react-router-dom';


function GoogleLogin() {
    const navigate = useNavigate();

    async function handleCallbackResponse(response) {
        console.log("Encoded JWT ID token" + response.credential);
        var userObject = jwt_decode(response.credential);
        console.log("userObject", userObject);
        try {
            // Send a request to your server to verify the token
            const verificationResponse = await axios.post(`${baseURL}/verify-id-token`, {
                idToken: response.credential,
            });

            // Check if the token is verified
            if (!verificationResponse.data.verified) {
                throw new Error('Token verification failed');
            }

            let RegisFormData = {};
            let responseCheckUser;

            try {
                responseCheckUser = await axios.get(`${baseURL}/get-employees-accounts/${response.clientId}`);
            } catch (error) {
                console.log('User not found', error.message);
            }


            if (!responseCheckUser || !responseCheckUser.data) {
                // Create a new user
                RegisFormData = {
                    fullName: userObject.name,
                    email: userObject.email,
                    password: 'No password number',
                    confirmPassword: 'No password number',
                    dateOfBirth: "No date of birth",
                    gender: "No Gender", // If Google API provides it
                    phoneNumber: 'No phone number',
                    address: 'No address number',
                    state: "verification",
                    premission: "Public User",
                    department: "No Department",
                    employeeID: response.clientId,
                    hkID: 'No HKID number',
                };

                // Register the new user
                let registrationResponse = await registerUser(RegisFormData);

                // Save the JWT to local storage
                localStorage.setItem('auth-token', registrationResponse.data.token);
                localStorage.setItem('premission', "Public User");
                localStorage.setItem('user-id', response.data.employeeID);
                localStorage.setItem('employeeID', response.data.employeeID);
                localStorage.setItem('obj-id', response.data._id);
                const logoutTime = Date.now() + 60 * 60 * 1000; // 60 minutes
                localStorage.setItem('logoutTime', logoutTime.toString());
                alert('Login successfully');
                navigate('/')
                window.location.reload();
            } else {
                // The user already exists
                let UserData = responseCheckUser.data;

                // Save the JWT to local storage
                localStorage.setItem('auth-token', UserData.token);
                localStorage.setItem('premission', UserData.employee.premission);
                localStorage.setItem('user-id', UserData.employee.employeeID);
                localStorage.setItem('employeeID', UserData.employee.employeeID);
                localStorage.setItem('obj-id', UserData.employee._id);
                const logoutTime = Date.now() + 60 * 60 * 1000; // 60 minutes
                localStorage.setItem('logoutTime', logoutTime.toString());
                alert('Login successfully');
                navigate('/')
                window.location.reload();
            }
        } catch (err) {
            console.error(err);
        }
    }

    const registerUser = async (RegisFormData) => {
        try {
            const response = await axios.post(`${baseURL}/create-account`, {
                // Include other registration data as needed
                ...RegisFormData
            });

            console.log('Registration successful:', response.data);
            alert('Registration successful!');
            // Handle successful registration

            // Set isRegistering back to false after the registration process is completed
            // setIsRegistering(false);


        } catch (error) {
            console.error('Registration failed:', error.response.data);
            alert('Registration failed!');
            // Handle registration failure
        }
    };

    // Init Google client
    useEffect(() => {
        /* global google */
        google.accounts.id.initialize({
            client_id: "1061523075573-n537pria7u9k24et8osc54cop29krk3c.apps.googleusercontent.com",
            callback: handleCallbackResponse
        });
        google.accounts.id.renderButton(
            document.getElementById("signInDiv"),
            { theme: "outline", size: "large" }
        )
    }, []);


    return (
        <div className="App">
            <div id="signInDiv"></div>
        </div>
    );
}

export default GoogleLogin;
