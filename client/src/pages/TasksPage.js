import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Task from '../components/Task';
import { Link } from 'react-router-dom';

const TasksPage = () => {
    const [tasks, setTasks] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchTasks = async () => {
            const token = localStorage.getItem('token');
            if (!token) { window.location.href = '/login'; return; }

            try {
                const config = { headers: { 'x-auth-token': token } };
                const res = await axios.get('/api/tasks', config);
                setTasks(res.data);
            } catch (err) {
                console.error('Error fetching tasks');
            } finally {
                setLoading(false);
            }
        };
        fetchTasks();
    }, []);

    if (loading) {
        return <p className="text-center text-slate-500">Loading tasks...</p>;
    }

    return (
        <div>
            <div className="flex justify-between items-center mb-6">
                <h1 className="text-3xl font-bold text-slate-800">My Tasks</h1>
                <Link to="/create-task" className="bg-green-500 text-white px-4 py-2 rounded-md font-semibold hover:bg-green-600 transition-colors">
                    + New Task
                </Link>
            </div>
            <div className="space-y-4">
                {tasks.length > 0 ? (
                    tasks.map(task => <Task key={task._id} task={task} />)
                ) : (
                    <p className="text-center text-slate-500 bg-white p-6 rounded-lg shadow-sm">No tasks found. Add one to get started!</p>
                )}
            </div>
        </div>
    );
};

export default TasksPage;