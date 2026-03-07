import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { userService } from '../services/api';
import { Lock, Mail, Eye, EyeOff, Loader2 } from 'lucide-react';
import '../styles/Login.css';

const Login = () => {
    const navigate = useNavigate();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [showPassword, setShowPassword] = useState(false);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');

    const handleLogin = async (e) => {
        e.preventDefault();
        setLoading(true);
        setError('');

        try {
            const res = await userService.login({ email, password });
            if (res.data.success) {
                const { token, name, role } = res.data.data;
                if (role !== 'ADMIN') {
                    setError('Access denied. Admin role required.');
                    setLoading(false);
                    return;
                }
                localStorage.setItem('token', token);
                localStorage.setItem('user', JSON.stringify({ name, role }));
                navigate('/');
            }
        } catch (err) {
            setError(err.response?.data?.message || 'Login failed. Please check your credentials.');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="login-container">
            <div className="login-box glass">
                <div className="login-header">
                    <div className="logo-placeholder">P</div>
                    <h1>Public Complaint</h1>
                    <p>Admin Central Dashboard</p>
                </div>

                <form className="login-form" onSubmit={handleLogin}>
                    {error && <div className="error-message">{error}</div>}

                    <div className="form-group">
                        <label>Email Address</label>
                        <div className="input-wrapper">
                            <Mail size={18} />
                            <input
                                type="email"
                                placeholder="admin@service.gov"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                required
                            />
                        </div>
                    </div>

                    <div className="form-group">
                        <label>Password</label>
                        <div className="input-wrapper">
                            <Lock size={18} />
                            <input
                                type={showPassword ? "text" : "password"}
                                placeholder="••••••••"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                required
                            />
                            <button
                                type="button"
                                className="toggle-password"
                                onClick={() => setShowPassword(!showPassword)}
                            >
                                {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                            </button>
                        </div>
                    </div>

                    <div className="login-options">
                        <label className="remember-me">
                            <input type="checkbox" /> Remember me
                        </label>
                        <a href="#" className="forgot-link">Forgot Password?</a>
                    </div>

                    <button
                        type="submit"
                        className="login-btn"
                        disabled={loading}
                    >
                        {loading ? (
                            <><Loader2 className="spinner" size={18} /> Signing in...</>
                        ) : "Sign In to Dashboard"}
                    </button>
                </form>

                <div className="login-footer">
                    <p>&copy; 2026 Government Public Service. Secure Access.</p>
                </div>
            </div>
        </div>
    );
};

export default Login;
