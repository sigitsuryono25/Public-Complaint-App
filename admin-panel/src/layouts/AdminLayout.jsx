import React from 'react';
import { Outlet } from 'react-router-dom';
import Sidebar from '../components/Sidebar';
import '../styles/AdminLayout.css';

const AdminLayout = () => {
    return (
        <div className="admin-layout">
            <Sidebar />
            <main className="main-content">
                <header className="main-header glass">
                    <div className="header-search">
                        <input type="text" placeholder="Search complaints, SKPD..." className="search-input" />
                    </div>
                    <div className="header-user">
                        <div className="user-info">
                            <span className="user-name">Admin User</span>
                            <span className="user-role">Super Admin</span>
                        </div>
                        <div className="user-avatar"></div>
                    </div>
                </header>
                <div className="content-area">
                    <Outlet />
                </div>
            </main>
        </div>
    );
};

export default AdminLayout;
