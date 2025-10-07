import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom'; // Import the hook for redirection

const TaskForm = () => {
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const navigate = useNavigate(); // Initialize the navigate function

    const onSubmit = async (e) => {
        e.preventDefault();
        const token = localStorage.getItem('token');
        try {
            const config = {
                headers: { 'x-auth-token': token }
            };
            const body = { title, description };
            await axios.post('/api/tasks', body, config);
            navigate('/tasks'); // Redirect to the main tasks page after success
        } catch (err) {
            console.error(err.response ? err.response.data : err.message);
        }
    };

    return (
        <div className="p-8 bg-white rounded-lg shadow-lg border border-gray-200">
            <h2 className="text-2xl font-bold mb-6 text-slate-800">Create a New Task</h2>
            <form onSubmit={onSubmit}>
                <div className="mb-4">
                    <label htmlFor="title" className="block text-gray-700 text-sm font-bold mb-2">
                        Title
                    </label>
                    <input
                        id="title"
                        type="text"
                        placeholder="e.g., Finish project report"
                        className="w-full p-3 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                        required
                    />
                </div>
                <div className="mb-6">
                     <label htmlFor="description" className="block text-gray-700 text-sm font-bold mb-2">
                        Description (Optional)
                    </label>
                    <textarea
                        id="description"
                        placeholder="e.g., Include sales data from Q4"
                        className="w-full p-3 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
                        rows="4"
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}
                    ></textarea>
                </div>
                <button type="submit" className="w-full bg-indigo-600 text-white p-3 rounded-md font-semibold hover:bg-indigo-700 transition-colors">
                    Save Task
                </button>
            </form>
        </div>
    );
};

export default TaskForm;