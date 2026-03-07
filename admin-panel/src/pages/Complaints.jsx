import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { complaintService } from '../services/api';
import { Search, Filter, ChevronRight } from 'lucide-react';
import '../styles/Complaints.css';

const Complaints = () => {
    const navigate = useNavigate();
    const [complaints, setComplaints] = useState([]);
    const [loading, setLoading] = useState(true);
    const [filterStatus, setFilterStatus] = useState('');

    useEffect(() => {
        fetchComplaints();
    }, [filterStatus]);

    const fetchComplaints = async () => {
        setLoading(true);
        try {
            const params = filterStatus ? { status: filterStatus } : {};
            const res = await complaintService.getComplaints(params);
            if (res.data.success) {
                setComplaints(res.data.data);
            }
        } catch (err) {
            console.error('Error fetching complaints:', err);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="complaints-page">
            <div className="page-header">
                <h2>Manage Complaints</h2>
                <div className="header-actions">
                    <div className="search-bar glass">
                        <Search size={18} />
                        <input type="text" placeholder="Search by ID or Title..." />
                    </div>
                    <select
                        className="filter-select glass"
                        value={filterStatus}
                        onChange={(e) => setFilterStatus(e.target.value)}
                    >
                        <option value="">All Status</option>
                        <option value="SUBMITTED">Submitted</option>
                        <option value="VERIFIED">Verified</option>
                        <option value="IN_PROGRESS">In Progress</option>
                        <option value="RESOLVED">Resolved</option>
                    </select>
                </div>
            </div>

            <div className="complaints-table-container glass">
                <table className="complaints-table">
                    <thead>
                        <tr>
                            <th>ID</th>
                            <th>Complaint Title</th>
                            <th>Category</th>
                            <th>Citizen</th>
                            <th>Status</th>
                            <th>Date</th>
                            <th>Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {loading ? (
                            <tr><td colSpan="7" className="text-center">Loading...</td></tr>
                        ) : complaints.length === 0 ? (
                            <tr><td colSpan="7" className="text-center">No complaints found.</td></tr>
                        ) : (
                            complaints.map((c) => (
                                <tr key={c.id}>
                                    <td className="id-cell">{c.id.substring(0, 8)}...</td>
                                    <td className="title-cell">{c.title}</td>
                                    <td>{c.Category?.name}</td>
                                    <td>{c.Citizen?.name}</td>
                                    <td>
                                        <span className={`status-badge ${c.status.toLowerCase().replace('_', '-')}`}>
                                            {c.status}
                                        </span>
                                    </td>
                                    <td>{c.created_at || c.createdAt ? new Date(c.created_at || c.createdAt).toLocaleDateString() : 'N/A'}</td>
                                    <td>
                                        <button
                                            className="view-btn"
                                            onClick={() => navigate(`/complaints/${c.id}`)}
                                        >
                                            Details <ChevronRight size={14} />
                                        </button>
                                    </td>
                                </tr>
                            ))
                        )}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default Complaints;
