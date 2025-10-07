import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams, useNavigate } from 'react-router-dom';

const EditTaskPage = () => {
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const { id } = useParams(); // Gets the ':id' from the URL
    const navigate = useNavigate();
    const token = localStorage.getItem('token');

    useEffect(() => {
        const fetchTask = async () => {
            if (!token) {
                navigate('/login');
                return;
            }
            try {
                const config = { headers: { 'x-auth-token': token } };
                const res = await axios.get(`/api/tasks/${id}`, config);
                setTitle(res.data.title);
                setDescription(res.data.description);
            } catch (err) {
                console.error('Failed to fetch task');
                navigate('/tasks'); // Redirect if task not found or error
            }
        };
        fetchTask();
    }, [id, token, navigate]);

    const onSubmit = async (e) => {
        e.preventDefault();
        try {
            const config = { headers: { 'x-auth-token': token } };
            const body = { title, description };
            await axios.put(`/api/tasks/${id}`, body, config);
            navigate('/tasks'); // Redirect to tasks list on success
        } catch (err) {
            console.error(err.response.data);
        }
    };

    return (
        <div className="max-w-2xl mx-auto">
            <h1 className="text-3xl font-bold text-slate-800 mb-6">Edit Task</h1>
            <div className="p-8 bg-white rounded-lg shadow-lg border border-gray-200">
                <form onSubmit={onSubmit}>
                    <div className="mb-4">
                        <label htmlFor="title" className="block text-gray-700 text-sm font-bold mb-2">Title</label>
                        <input
                            id="title"
                            type="text"
                            className="w-full p-3 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
                            value={title}
                            onChange={(e) => setTitle(e.target.value)}
                            required
                        />
                    </div>
                    <div className="mb-6">
                        <label htmlFor="description" className="block text-gray-700 text-sm font-bold mb-2">Description</label>
                        <textarea
                            id="description"
                            className="w-full p-3 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
                            rows="4"
                            value={description}
                            onChange={(e) => setDescription(e.target.value)}
                        ></textarea>
                    </div>
                    <button type="submit" className="w-full bg-indigo-600 text-white p-3 rounded-md font-semibold hover:bg-indigo-700 transition-colors">
                        Update Task
                    </button>
                </form>
            </div>
        </div>
    );
};

export default EditTaskPage;