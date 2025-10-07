import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

const Dashboard = () => {
    const [user, setUser] = useState(null);

    // A simple effect to redirect if not logged in
    useEffect(() => {
        const token = localStorage.getItem('token');
        if (!token) {
            window.location.href = '/login';
        }
    }, []);


    return (
        <div className="text-center p-10 bg-white rounded-lg shadow-md">
            <h1 className="text-4xl font-bold text-slate-800 mb-4">Welcome to Your Dashboard</h1>
            <p className="text-slate-600 mb-8">Manage your life, one task at a time. What would you like to do today?</p>
            <div className="flex justify-center space-x-4">
                <Link to="/tasks" className="bg-indigo-600 text-white px-6 py-3 rounded-md font-semibold hover:bg-indigo-700 transition-colors shadow-sm">
                    View All Tasks
                </Link>
                <Link to="/create-task" className="bg-green-500 text-white px-6 py-3 rounded-md font-semibold hover:bg-green-600 transition-colors shadow-sm">
                    Create a New Task
                </Link>
            </div>
        </div>
    );
};

export default Dashboard;