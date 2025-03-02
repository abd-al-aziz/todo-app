import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Login from './components/Login';
import Register from './components/Register';
import TaskList from './components/TaskList';
import Profile from './components/Profile';

const App = () => {
    return (
        <Router>
            <Navbar /> {/* إضافة Navbar هنا */}
            <Routes>
                <Route path="/login" element={<Login />} />
                <Route path="/register" element={<Register />} />
                <Route path="/tasks" element={<TaskList />} />
                <Route path="/profile" element={<Profile />} />
                <Route path="/" element={<Login />} />
            </Routes>
        </Router>
    );
};

export default App;