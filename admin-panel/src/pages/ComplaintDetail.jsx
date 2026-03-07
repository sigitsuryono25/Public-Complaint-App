import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { complaintService, adminService } from '../services/api';
import {
    ChevronLeft, MapPin, Calendar, User,
    Tag, Briefcase, History, Send
} from 'lucide-react';
import '../styles/ComplaintDetail.css';

const ComplaintDetail = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const [complaint, setComplaint] = useState(null);
    const [skpds, setSkpds] = useState([]);
    const [loading, setLoading] = useState(true);
    const [updating, setUpdating] = useState(false);

    // Update states
    const [newStatus, setNewStatus] = useState('');
    const [notes, setNotes] = useState('');
    const [assignedSkpd, setAssignedSkpd] = useState('');

    useEffect(() => {
        const loadDetail = async () => {
            try {
                const [res, skpdRes] = await Promise.all([
                    complaintService.getComplaintById(id),
                    adminService.getSKPDs()
                ]);
                if (res.data.success) {
                    const data = res.data.data;
                    setComplaint(data);
                    setNewStatus(data.status);
                    setAssignedSkpd(data.skpd_id || '');
                }
                if (skpdRes.data.success) {
                    setSkpds(skpdRes.data.data);
                }
            } catch (err) {
                console.error('Failed to load complaint detail', err);
            } finally {
                setLoading(false);
            }
        };
        loadDetail();
    }, [id]);

    const handleUpdate = async (e) => {
        e.preventDefault();
        setUpdating(true);
        try {
            const res = await complaintService.updateStatus(id, {
                status: newStatus,
                notes: notes,
                skpd_id: assignedSkpd
            });
            if (res.data.success) {
                // Reload data to show new log
                const updated = await complaintService.getComplaintById(id);
                setComplaint(updated.data.data);
                setNotes('');
                alert('Status updated successfully!');
            }
        } catch (err) {
            alert('Failed to update status');
        } finally {
            setUpdating(false);
        }
    };

    if (loading) return <div className="p-32">Loading detail...</div>;
    if (!complaint) return <div className="p-32">Complaint not found.</div>;

    return (
        <div className="complaint-detail-page">
            <button className="back-btn" onClick={() => navigate('/complaints')}>
                <ChevronLeft size={18} /> Back to List
            </button>

            <div className="detail-layout">
                {/* Left Side: Info & Map */}
                <div className="detail-main">
                    <div className="detail-card glass">
                        <div className="detail-header">
                            <span className="complaint-id-large">{complaint.id}</span>
                            <span className={`status-badge large ${complaint.status.toLowerCase().replace('_', '-')}`}>
                                {complaint.status}
                            </span>
                        </div>

                        <h2 className="complaint-title-large">{complaint.title}</h2>

                        <div className="meta-info-grid">
                            <div className="meta-item">
                                <User size={18} className="icon-primary" />
                                <div>
                                    <label>Reporter</label>
                                    <p>{complaint.Citizen?.name}</p>
                                </div>
                            </div>
                            <div className="meta-item">
                                <Calendar size={18} className="icon-primary" />
                                <div>
                                    <label>Reported On</label>
                                    <p>{complaint.created_at || complaint.createdAt ? new Date(complaint.created_at || complaint.createdAt).toLocaleString() : 'N/A'}</p>
                                </div>
                            </div>
                            <div className="meta-item">
                                <Tag size={18} className="icon-primary" />
                                <div>
                                    <label>Category</label>
                                    <p>{complaint.Category?.name}</p>
                                </div>
                            </div>
                            <div className="meta-item">
                                <Briefcase size={18} className="icon-primary" />
                                <div>
                                    <label>Assigned SKPD</label>
                                    <p>{complaint.SKPD?.name || 'Not assigned'}</p>
                                </div>
                            </div>
                        </div>

                        <div className="description-section">
                            <label>Report Description</label>
                            <p>{complaint.description}</p>
                        </div>

                        {complaint.photo_url && (
                            <div className="photo-section">
                                <label>Attached Photo</label>
                                <img src={complaint.photo_url} alt="Evidence" className="evidence-img" />
                            </div>
                        )}

                        <div className="location-section">
                            <label><MapPin size={16} /> Location</label>
                            <div className="mini-map-placeholder">
                                <p>Lat: {complaint.latitude}, Long: {complaint.longitude}</p>
                                <p>(Map visualization pending SDK integration)</p>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Right Side: Action & History */}
                <div className="detail-sidebar">
                    {/* Action Form */}
                    <div className="action-card glass">
                        <h3>Update Status & Assign</h3>
                        <form onSubmit={handleUpdate}>
                            <div className="form-group">
                                <label>Status</label>
                                <select value={newStatus} onChange={e => setNewStatus(e.target.value)}>
                                    <option value="SUBMITTED">Submitted</option>
                                    <option value="VERIFIED">Verified</option>
                                    <option value="IN_PROGRESS">In Progress</option>
                                    <option value="RESOLVED">Resolved</option>
                                    <option value="CLOSED">Closed</option>
                                </select>
                            </div>
                            <div className="form-group">
                                <label>Assign SKPD</label>
                                <select value={assignedSkpd} onChange={e => setAssignedSkpd(e.target.value)}>
                                    <option value="">Unassigned</option>
                                    {skpds.map(s => (
                                        <option key={s.id} value={s.id}>{s.name}</option>
                                    ))}
                                </select>
                            </div>
                            <div className="form-group">
                                <label>Notes</label>
                                <textarea
                                    value={notes}
                                    onChange={e => setNotes(e.target.value)}
                                    placeholder="Reason for change or update instructions..."
                                    required
                                />
                            </div>
                            <button className="btn btn-primary w-full" disabled={updating}>
                                <Send size={18} /> {updating ? 'Updating...' : 'Update Complaint'}
                            </button>
                        </form>
                    </div>

                    {/* Tracking Logs */}
                    <div className="history-card glass">
                        <div className="history-header">
                            <History size={18} />
                            <h3>Tracking History</h3>
                        </div>
                        <div className="timeline">
                            {complaint.ComplaintLogs?.map((log, index) => (
                                <div key={log.id} className="timeline-item">
                                    <div className="timeline-marker"></div>
                                    <div className="timeline-content">
                                        <div className="log-status">
                                            {log.status_from && <span className="old-status">{log.status_from} → </span>}
                                            <span className="new-status">{log.status_to}</span>
                                        </div>
                                        <p className="log-notes">{log.notes}</p>
                                        <span className="log-time">{log.created_at || log.createdAt ? new Date(log.created_at || log.createdAt).toLocaleString() : 'N/A'}</span>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ComplaintDetail;
