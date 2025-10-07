import React, { useState, useEffect } from 'react';
import axios from 'axios';

const ProfilePage = () => {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(''); // State to hold a specific error message

    useEffect(() => {
        const fetchUser = async () => {
            const token = localStorage.getItem('token');
            if (!token) {
                window.location.href = '/login';
                return;
            }
            
            try {
                const config = { headers: { 'x-auth-token': token } };
                const res = await axios.get('/api/auth/me', config);
                setUser(res.data);
            } catch (err) {
                console.error('Error fetching user data:', err.response ? err.response.data : err.message);
                
                // If the error is 401 (Unauthorized), the token is bad. Log the user out.
                if (err.response && err.response.status === 401) {
                    localStorage.removeItem('token');
                    window.location.href = '/login';
                } else {
                    setError('Could not load user profile. Please try again later.');
                }
            } finally {
                setLoading(false);
            }
        };
        fetchUser();
    }, []);

    if (loading) {
        return <p className="text-center text-slate-500">Loading profile...</p>;
    }

    if (error) {
        return <p className="text-center text-red-500 bg-white p-6 rounded-lg shadow-sm">{error}</p>
    }

    if (!user) {
         return <p className="text-center text-red-500 bg-white p-6 rounded-lg shadow-sm">Could not display user profile.</p>
    }

    return (
         <div className="max-w-md mx-auto bg-white rounded-xl shadow-md overflow-hidden md:max-w-2xl mt-10">
            <div className="p-8">
                <div className="uppercase tracking-wide text-sm text-indigo-500 font-semibold">User Profile</div>
                <div className="mt-4">
                    <p className="text-slate-500 text-sm">Name</p>
                    <p className="block text-lg leading-tight font-medium text-black">{user.name}</p>
                </div>
                 <div className="mt-4">
                    <p className="text-slate-500 text-sm">Email</p>
                    <p className="mt-1 text-slate-600">{user.email}</p>
                </div>
            </div>
        </div>
    );
};

export default ProfilePage;