import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';

const TaskList = () => {
    const [tasks, setTasks] = useState([]);
    const [newTask, setNewTask] = useState({ title: '', description: '', due_date: '' });
    const [editingTask, setEditingTask] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');
    const [filter, setFilter] = useState('all');
    const navigate = useNavigate();

    const fetchTasks = async () => {
        const token = localStorage.getItem('token');
        if (!token) {
            navigate('/login');
            return;
        }

        try {
            const response = await axios.get('http://localhost:8000/api/tasks', {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });
            setTasks(response.data);
            setLoading(false);
        } catch (error) {
            setError('Failed to load tasks. Please try again.');
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchTasks();
    }, [navigate]);

    const handleCreateTask = async (e) => {
        e.preventDefault();
        const token = localStorage.getItem('token');
        try {
            await axios.post('http://localhost:8000/api/tasks', newTask, {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });
            setNewTask({ title: '', description: '', due_date: '' });
            fetchTasks();
            setError('');
        } catch (error) {
            setError('Failed to create task. Please try again.');
        }
    };

    const handleUpdateTask = async () => {
        if (!editingTask) return;

        const token = localStorage.getItem('token');
        try {
            await axios.put(`http://localhost:8000/api/tasks/${editingTask.id}`, editingTask, {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });
            setEditingTask(null); // Close the edit form after update
            fetchTasks();
            setError('');
        } catch (error) {
            setError('Failed to update task. Please try again.');
        }
    };

    const handleDeleteTask = async (taskId) => {
        const token = localStorage.getItem('token');
        try {
            await axios.delete(`http://localhost:8000/api/tasks/${taskId}`, {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });
            fetchTasks();
            setError('');
        } catch (error) {
            setError('Failed to delete task. Please try again.');
        }
    };

    const handleToggleComplete = async (taskId, completed) => {
        const token = localStorage.getItem('token');
        try {
            await axios.put(
                `http://localhost:8000/api/tasks/${taskId}`,
                { completed: !completed },
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                }
            );
            fetchTasks();
            setError('');
        } catch (error) {
            setError('Failed to update task status. Please try again.');
        }
    };

    const filteredTasks = tasks.filter(task => {
        if (filter === 'completed') return task.completed;
        if (filter === 'incomplete') return !task.completed;
        return true;
    });

    if (loading) {
        return (
            <div className="text-center mt-5">
                <div className="spinner-border" role="status">
                    <span className="visually-hidden">Loading...</span>
                </div>
            </div>
        );
    }

    if (error) {
        return <p className="text-center text-danger mt-5">{error}</p>;
    }

    return (
        <div className="container mt-5">
            <h1 className="text-center mb-4 text-primary">Task List</h1>

            <div className="mb-4 d-flex justify-content-center">
                <button
                    onClick={() => setFilter('all')}
                    className={`btn ${filter === 'all' ? 'btn-primary' : 'btn-outline-primary'} me-2`}
                >
                    All
                </button>
                <button
                    onClick={() => setFilter('completed')}
                    className={`btn ${filter === 'completed' ? 'btn-success' : 'btn-outline-success'} me-2`}
                >
                    Completed
                </button>
                <button
                    onClick={() => setFilter('incomplete')}
                    className={`btn ${filter === 'incomplete' ? 'btn-warning' : 'btn-outline-warning'}`}
                >
                    Incomplete
                </button>
            </div>

            {/* Form for adding new task */}
            <form onSubmit={handleCreateTask} className="card p-4 mb-4 shadow-lg">
                <h2 className="card-title mb-4">Add New Task</h2>
                <div className="mb-3">
                    <label className="form-label">Task Title:</label>
                    <input
                        type="text"
                        placeholder="Task Title"
                        value={newTask.title}
                        onChange={(e) => setNewTask({ ...newTask, title: e.target.value })}
                        className="form-control"
                        required
                    />
                </div>
                <div className="mb-3">
                    <label className="form-label">Task Description:</label>
                    <input
                        type="text"
                        placeholder="Task Description"
                        value={newTask.description}
                        onChange={(e) => setNewTask({ ...newTask, description: e.target.value })}
                        className="form-control"
                    />
                </div>
                <div className="mb-3">
                    <label className="form-label">Due Date:</label>
                    <input
                        type="date"
                        value={newTask.due_date}
                        onChange={(e) => setNewTask({ ...newTask, due_date: e.target.value })}
                        className="form-control"
                    />
                </div>
                <button type="submit" className="btn btn-primary w-100">
                    Add Task
                </button>
            </form>

            {/* Edit task form */}
            {editingTask && (
                <form onSubmit={handleUpdateTask} className="card p-4 mb-4 shadow-lg">
                    <h2 className="card-title mb-4">Edit Task</h2>
                    <div className="mb-3">
                        <label className="form-label">Task Title:</label>
                        <input
                            type="text"
                            value={editingTask.title}
                            onChange={(e) => setEditingTask({ ...editingTask, title: e.target.value })}
                            className="form-control"
                            required
                        />
                    </div>
                    <div className="mb-3">
                        <label className="form-label">Task Description:</label>
                        <input
                            type="text"
                            value={editingTask.description}
                            onChange={(e) => setEditingTask({ ...editingTask, description: e.target.value })}
                            className="form-control"
                        />
                    </div>
                    <div className="mb-3">
                        <label className="form-label">Due Date:</label>
                        <input
                            type="date"
                            value={editingTask.due_date}
                            onChange={(e) => setEditingTask({ ...editingTask, due_date: e.target.value })}
                            className="form-control"
                        />
                    </div>
                    <button type="submit" className="btn btn-success w-100">
                        Save Changes
                    </button>
                </form>
            )}

            {/* Task list */}
            <ul className="list-group">
                {filteredTasks.map(task => (
                    <li key={task.id} className="list-group-item mb-3 d-flex justify-content-between align-items-center">
                        <div>
                            <h5 className="mb-1 text-info">{task.title}</h5>
                            <p className="mb-1 text-muted">{task.description}</p>
                            <small className="text-muted">Due Date: {task.due_date}</small>
                        </div>
                        <div>
                            <span className={`badge ${task.completed ? 'bg-success' : 'bg-danger'} ms-2`}>
                                {task.completed ? 'Completed' : 'Not Completed'}
                            </span>
                            <div className="btn-group ms-2" role="group" aria-label="Basic example">
                                <button
                                    onClick={() => handleToggleComplete(task.id, task.completed)}
                                    className="btn btn-sm btn-outline-success"
                                >
                                    {task.completed ? 'Mark Incomplete' : 'Mark Complete'}
                                </button>
                                <button
                                    onClick={() => setEditingTask(task)}
                                    className="btn btn-sm btn-outline-warning"
                                >
                                    Edit
                                </button>
                                <button
                                    onClick={() => handleDeleteTask(task.id)}
                                    className="btn btn-sm btn-outline-danger"
                                >
                                    Delete
                                </button>
                            </div>
                        </div>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default TaskList;
