import React from 'react';
import axios from 'axios';

const Task = ({ task }) => {
    const token = localStorage.getItem('token');

    const onStatusChange = async (e) => {
        try {
            const newStatus = e.target.value;
            const config = { headers: { 'x-auth-token': token } };
            await axios.put(`/api/tasks/${task._id}`, { ...task, status: newStatus }, config);
            window.location.reload(); // Reload to see the changes
        } catch (err) {
            console.error(err.response.data);
        }
    };

    const onDelete = async () => {
        if (window.confirm('Are you sure you want to delete this task?')) {
            try {
                const config = { headers: { 'x-auth-token': token } };
                await axios.delete(`/api/tasks/${task._id}`, config);
                window.location.reload();
            } catch (err) {
                console.error(err.response.data);
            }
        }
    };

    // Helper function to get styles based on status
    const getStatusStyles = (status) => {
        switch (status) {
            case 'Pending':
                return {
                    borderColor: 'border-yellow-400',
                    badgeColor: 'bg-yellow-100 text-yellow-800',
                };
            case 'In-progress':
                return {
                    borderColor: 'border-blue-500',
                    badgeColor: 'bg-blue-100 text-blue-800',
                };
            case 'Done':
                return {
                    borderColor: 'border-green-500',
                    badgeColor: 'bg-green-100 text-green-800',
                };
            default:
                return {
                    borderColor: 'border-gray-300',
                    badgeColor: 'bg-gray-100 text-gray-800',
                };
        }
    };

    const { borderColor, badgeColor } = getStatusStyles(task.status);

    return (
        <div className={`bg-white p-4 rounded-lg shadow-md flex justify-between items-center border-l-8 ${borderColor} transition-all`}>
            <div className="flex-1">
                <h3 className="font-bold text-lg text-gray-800">{task.title}</h3>
                <p className="text-gray-600">{task.description || 'No description provided.'}</p>
            </div>
            <div className="flex items-center space-x-4">
                 <span className={`px-3 py-1 text-xs font-semibold rounded-full ${badgeColor}`}>
                    {task.status}
                </span>
                <select value={task.status} onChange={onStatusChange} className="p-2 rounded border-gray-300 focus:outline-none focus:ring-2 focus:ring-indigo-500 text-sm">
                    <option value="Pending">Pending</option>
                    <option value="In-progress">In-progress</option>
                    <option value="Done">Done</option>
                </select>
                <button onClick={onDelete} className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600 text-sm transition-colors">
                    Delete
                </button>
            </div>
        </div>
    );
};

export default Task;