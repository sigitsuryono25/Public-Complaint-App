import React, { useEffect, useState } from 'react';
import { adminService } from '../services/api';
import { Plus, UserCheck, Briefcase, Tag } from 'lucide-react';
import '../styles/SKPDManagement.css';

const SKPDManagement = () => {
    const [skpds, setSkpds] = useState([]);
    const [categories, setCategories] = useState([]);
    const [loading, setLoading] = useState(true);

    // Form states
    const [showSkpdForm, setShowSkpdForm] = useState(false);
    const [showCatForm, setShowCatForm] = useState(false);
    const [newSkpd, setNewSkpd] = useState({ name: '', description: '', category_id: '' });
    const [newCat, setNewCat] = useState({ name: '' });

    useEffect(() => {
        fetchData();
    }, []);

    const fetchData = async () => {
        setLoading(true);
        try {
            const [skpdRes, catRes] = await Promise.all([
                adminService.getSKPDs(),
                adminService.getCategories()
            ]);
            if (skpdRes.data.success) setSkpds(skpdRes.data.data);
            if (catRes.data.success) setCategories(catRes.data.data);
        } catch (err) {
            console.error('Error fetching admin data:', err);
        } finally {
            setLoading(false);
        }
    };

    const handleAddSkpd = async (e) => {
        e.preventDefault();
        try {
            const res = await adminService.createSKPD(newSkpd);
            if (res.data.success) {
                fetchData();
                setShowSkpdForm(false);
                setNewSkpd({ name: '', description: '', category_id: '' });
            }
        } catch (err) {
            alert('Failed to add SKPD');
        }
    };

    const handleAddCat = async (e) => {
        e.preventDefault();
        try {
            const res = await adminService.createCategory(newCat);
            if (res.data.success) {
                fetchData();
                setShowCatForm(false);
                setNewCat({ name: '' });
            }
        } catch (err) {
            alert('Failed to add Category');
        }
    };

    return (
        <div className="admin-management-page">
            <div className="page-header">
                <h2>SKPD & Category Management</h2>
                <div className="header-actions">
                    <button className="btn btn-secondary glass" onClick={() => setShowCatForm(true)}>
                        <Plus size={18} /> Add Category
                    </button>
                    <button className="btn btn-primary" onClick={() => setShowSkpdForm(true)}>
                        <Plus size={18} /> Add SKPD
                    </button>
                </div>
            </div>

            <div className="management-grid">
                {/* SKPD List */}
                <div className="management-card glass">
                    <div className="card-header">
                        <div className="header-title">
                            <Briefcase className="icon-primary" size={20} />
                            <h3>Active SKPD Departments</h3>
                        </div>
                    </div>
                    <div className="card-content">
                        {loading ? <p>Loading...</p> : skpds.map(skpd => (
                            <div key={skpd.id} className="item-row">
                                <div className="item-info">
                                    <span className="item-name">{skpd.name}</span>
                                    <span className="item-subtext">{skpd.Category?.name || 'Uncategorized'}</span>
                                </div>
                                <div className="item-badge">{skpd.description || 'No description'}</div>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Category List */}
                <div className="management-card glass">
                    <div className="card-header">
                        <div className="header-title">
                            <Tag className="icon-secondary" size={20} />
                            <h3>Complaint Categories</h3>
                        </div>
                    </div>
                    <div className="card-content">
                        {loading ? <p>Loading...</p> : categories.map(cat => (
                            <div key={cat.id} className="item-row">
                                <div className="item-info">
                                    <span className="item-name">{cat.name}</span>
                                </div>
                                <div className="item-action-small">
                                    {/* Actions like Edit/Delete could go here */}
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>

            {/* Modal for SKPD Add */}
            {showSkpdForm && (
                <div className="modal-overlay">
                    <div className="modal-content glass">
                        <h3>Add New SKPD</h3>
                        <form onSubmit={handleAddSkpd}>
                            <div className="form-group">
                                <label>Department Name</label>
                                <input
                                    type="text"
                                    value={newSkpd.name}
                                    onChange={e => setNewSkpd({ ...newSkpd, name: e.target.value })}
                                    placeholder="e.g. Dinas Perhubungan"
                                    required
                                />
                            </div>
                            <div className="form-group">
                                <label>Link to Category</label>
                                <select
                                    value={newSkpd.category_id}
                                    onChange={e => setNewSkpd({ ...newSkpd, category_id: e.target.value })}
                                    required
                                >
                                    <option value="">Select Category</option>
                                    {categories.map(cat => (
                                        <option key={cat.id} value={cat.id}>{cat.name}</option>
                                    ))}
                                </select>
                            </div>
                            <div className="form-group">
                                <label>Description</label>
                                <textarea
                                    value={newSkpd.description}
                                    onChange={e => setNewSkpd({ ...newSkpd, description: e.target.value })}
                                    placeholder="Brief responsibility description"
                                />
                            </div>
                            <div className="modal-actions">
                                <button type="button" className="btn-text" onClick={() => setShowSkpdForm(false)}>Cancel</button>
                                <button type="submit" className="btn btn-primary">Create SKPD</button>
                            </div>
                        </form>
                    </div>
                </div>
            )}

            {/* Modal for Category Add */}
            {showCatForm && (
                <div className="modal-overlay">
                    <div className="modal-content glass">
                        <h3>Add New Category</h3>
                        <form onSubmit={handleAddCat}>
                            <div className="form-group">
                                <label>Category Name</label>
                                <input
                                    type="text"
                                    value={newCat.name}
                                    onChange={e => setNewCat({ ...newCat, name: e.target.value })}
                                    placeholder="e.g. Kebersihan"
                                    required
                                />
                            </div>
                            <div className="modal-actions">
                                <button type="button" className="btn-text" onClick={() => setShowCatForm(false)}>Cancel</button>
                                <button type="submit" className="btn btn-primary">Create Category</button>
                            </div>
                        </form>
                    </div>
                </div>
            )}
        </div>
    );
};

export default SKPDManagement;
