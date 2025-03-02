import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';

const Navbar = () => {
    const navigate = useNavigate();
    const [isLoggedIn, setIsLoggedIn] = useState(!!localStorage.getItem('token')); // يتحقق من التوكن عند تحميل الصفحة

    useEffect(() => {
        const checkLoginStatus = () => {
            setIsLoggedIn(!!localStorage.getItem('token')); // تحديث حالة تسجيل الدخول عند تغيير `localStorage`
        };

        window.addEventListener('storage', checkLoginStatus); // مراقبة تغييرات localStorage

        return () => {
            window.removeEventListener('storage', checkLoginStatus); // تنظيف الحدث عند إلغاء تحميل المكون
        };
    }, []);

    const handleLogout = () => {
        localStorage.removeItem('token'); // حذف التوكن
        setIsLoggedIn(false); // تحديث الحالة إلى تسجيل خروج
        navigate('/login'); // إعادة التوجيه إلى تسجيل الدخول
    };

    return (
        <nav className="navbar navbar-expand-lg navbar-light bg-light">
            <div className="container-fluid">
                <Link className="navbar-brand" to="/">
                    My App
                </Link>
                <button
                    className="navbar-toggler"
                    type="button"
                    data-bs-toggle="collapse"
                    data-bs-target="#navbarNav"
                    aria-controls="navbarNav"
                    aria-expanded="false"
                    aria-label="Toggle navigation"
                >
                    <span className="navbar-toggler-icon"></span>
                </button>
                <div className="collapse navbar-collapse" id="navbarNav">
                    <ul className="navbar-nav ms-auto">
                        {isLoggedIn && ( // عرض "Tasks" و "Profile" فقط عند تسجيل الدخول
                            <>
                                <li className="nav-item">
                                    <Link className="nav-link" to="/tasks">
                                        Tasks
                                    </Link>
                                </li>
                                <li className="nav-item">
                                    <Link className="nav-link" to="/profile">
                                        Profile
                                    </Link>
                                </li>
                            </>
                        )}
                        {isLoggedIn ? (
                            <li className="nav-item">
                                <button className="btn btn-link nav-link" onClick={handleLogout}>
                                    Logout
                                </button>
                            </li>
                        ) : (
                            <>
                                <li className="nav-item">
                                    <Link className="nav-link" to="/login">
                                        Login
                                    </Link>
                                </li>
                                <li className="nav-item">
                                    <Link className="nav-link" to="/register">
                                        Register
                                    </Link>
                                </li>
                            </>
                        )}
                    </ul>
                </div>
            </div>
        </nav>
    );
};

export default Navbar;
