import React, { useEffect, useState } from 'react';
import { AlertCircle, Clock, CheckCircle2, MapPin } from 'lucide-react';
import { complaintService } from '../services/api';
import '../styles/Dashboard.css';

const Dashboard = () => {
    const [complaints, setComplaints] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const res = await complaintService.getComplaints();
                if (res.data.success) {
                    setComplaints(res.data.data);
                }
            } catch (err) {
                console.error('Failed to fetch data', err);
            } finally {
                setLoading(false);
            }
        };
        fetchData();
    }, []);

    const stats = [
        { label: 'Total Complaints', value: complaints.length, color: 'var(--primary)', icon: <AlertCircle /> },
        { label: 'Pending', value: complaints.filter(c => ['SUBMITTED', 'VERIFIED'].includes(c.status)).length, color: 'var(--warning)', icon: <Clock /> },
        { label: 'Completed', value: complaints.filter(c => c.status === 'RESOLVED').length, color: 'var(--success)', icon: <CheckCircle2 /> },
    ];

    const recentComplaints = complaints.slice(0, 5);

    return (
        <div className="dashboard-page">
            <div className="stats-grid">
                {stats.map((stat) => (
                    <div key={stat.label} className="stat-card glass">
                        <div className="stat-icon" style={{ color: stat.color }}>{stat.icon}</div>
                        <div className="stat-info">
                            <span className="stat-value">{stat.value}</span>
                            <span className="stat-label">{stat.label}</span>
                        </div>
                    </div>
                ))}
            </div>

            <div className="dashboard-content">
                <div className="map-view glass">
                    <div className="map-header">
                        <h3>Live Complaint Map</h3>
                        <span className="live-badge">Live</span>
                    </div>
                    <div className="map-placeholder">
                        <MapPin size={48} color="var(--primary)" />
                        <p>Google Maps Integration Pending API Key</p>
                    </div>
                </div>

                <div className="recent-list glass">
                    <div className="list-header">
                        <h3>Recent Complaints</h3>
                    </div>
                    <div className="complaints-list">
                        {recentComplaints.map((item) => (
                            <div key={item.id} className="complaint-item">
                                <div className="complaint-main">
                                    <span className="complaint-id">#{item.id.substring(0, 8)}</span>
                                    <span className="complaint-cat">{item.Category?.name || 'General'}</span>
                                </div>
                                <div className="complaint-meta">
                                    <span className={`status-badge ${item.status.toLowerCase().replace('_', '-')}`}>{item.status}</span>
                                    <span className="complaint-time">
                                        {item.created_at || item.createdAt ? new Date(item.created_at || item.createdAt).toLocaleDateString() : 'N/A'}
                                    </span>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Dashboard;
