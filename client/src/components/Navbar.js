import React from 'react';
import { NavLink } from 'react-router-dom';

const Navbar = () => {
    const token = localStorage.getItem('token');

    const onLogout = () => {
        localStorage.removeItem('token');
        window.location.href = '/login';
    };

    const activeLinkStyle = {
        backgroundColor: 'rgba(255, 255, 255, 0.1)',
        borderRadius: '6px',
    };

    const authLinks = (
        <div className="flex items-center space-x-2">
            <NavLink to="/" className="px-3 py-2" style={({ isActive }) => isActive ? activeLinkStyle : undefined}>Dashboard</NavLink>
            <NavLink to="/tasks" className="px-3 py-2" style={({ isActive }) => isActive ? activeLinkStyle : undefined}>Tasks</NavLink>
            <NavLink to="/profile" className="px-3 py-2" style={({ isActive }) => isActive ? activeLinkStyle : undefined}>Profile</NavLink>
            <button onClick={onLogout} className="bg-red-500 text-white px-4 py-2 rounded-md hover:bg-red-600 transition-colors">
                Logout
            </button>
        </div>
    );

    const guestLinks = (
        <div className="space-x-2">
            <NavLink to="/login" className="px-3 py-2" style={({ isActive }) => isActive ? activeLinkStyle : undefined}>Login</NavLink>
            <NavLink to="/register" className="px-3 py-2" style={({ isActive }) => isActive ? activeLinkStyle : undefined}>Register</NavLink>
        </div>
    );

    return (
        <nav className="bg-slate-800 text-white shadow-lg">
            <div className="container mx-auto flex justify-between items-center p-4">
                <h1 className="text-xl font-bold">
                    TaskManager
                </h1>
                <div className="font-medium">{token ? authLinks : guestLinks}</div>
            </div>
        </nav>
    );
};

export default Navbar;