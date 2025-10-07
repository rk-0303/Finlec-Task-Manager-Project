import React from 'react';
import TaskForm from '../components/TaskForm';

const CreateTaskPage = () => {
    return (
        <div className="max-w-2xl mx-auto">
            <h1 className="text-3xl font-bold text-slate-800 mb-6">New Task</h1>
            <TaskForm />
        </div>
    );
};

export default CreateTaskPage;