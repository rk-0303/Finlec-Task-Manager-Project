import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';

import Login from './pages/Login';
import Register from './pages/Register';
import Dashboard from './pages/Dashboard';
import TasksPage from './pages/TasksPage';
import CreateTaskPage from './pages/CreateTaskPage';
import ProfilePage from './pages/ProfilePage';
import Navbar from './components/Navbar';

function App() {
    return (
        <Router>
            {/* New Era Gradient Background */}
            <div className="min-h-screen bg-gradient-to-br from-gray-50 to-slate-200">
                <Navbar />
                <main className="container mx-auto p-4 sm:p-6">
                    <Routes>
                        <Route path="/login" element={<Login />} />
                        <Route path="/register" element={<Register />} />
                        <Route path="/" element={<Dashboard />} />
                        <Route path="/tasks" element={<TasksPage />} />
                        <Route path="/create-task" element={<CreateTaskPage />} />
                        <Route path="/profile" element={<ProfilePage />} />
                    </Routes>
                </main>
            </div>
        </Router>
    );
}

export default App;