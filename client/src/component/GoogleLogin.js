import { useEffect } from 'react';
import axios from '../commons/axios';
import { baseURL } from '../commons/helper';
import jwt_decode from "jwt-decode"
import { useNavigate } from 'react-router-dom';
// async function fetchUserProfile(idToken) {
//     try {
//         const response = await axios.get('https://people.googleapis.com/v1/people/me', {
//             params: {
//                 personFields: 'names',
//             },
//             headers: {
//                 Authorization: `Bearer ${idToken}`,
//             },
//         });

//         // Extract the desired information from the response
//         const email = response.data.emailAddresses[0].value;
//         const gender = response.data.genders[0].value;
//         const name = response.data.names[0].displayName;

//         return { email, gender, name };
//     } catch (error) {
//         console.error('Failed to fetch user profile:', error);
//         throw error;
//     }
// }

function GoogleLogin() {
    const navigate = useNavigate();

    async function handleCallbackResponse(response) {
        console.log("Encoded JWT ID token" + response.credential);
        var userObject = jwt_decode(response.credential);
        console.log("userObject", userObject);
        try {

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
                navigate('/')
            } else {
                // The user already exists
                let UserData = responseCheckUser.data;

                // Save the JWT to local storage
                localStorage.setItem('auth-token', UserData.token);
                localStorage.setItem('premission', UserData.employee.premission);
                navigate('/')
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