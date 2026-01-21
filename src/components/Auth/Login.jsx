import { useState } from 'react';
import { login } from '../../firebase/auth';
import { signInWithPopup, GoogleAuthProvider } from 'firebase/auth';
import { auth } from '../../firebase/config';
import AnimatedGridBackground from '../AnimatedGridBackground';
import './Auth.css';
import { FiMail, FiLock, FiAlertCircle } from 'react-icons/fi';
import { FcGoogle } from 'react-icons/fc';

const Login = ({ onSwitchToSignup }) => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);
    const [rememberMe, setRememberMe] = useState(false);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');
        setLoading(true);

        const { user, error: loginError } = await login(email, password);

        if (loginError) {
            setError(loginError);
            setLoading(false);
        }
    };

    const handleGoogleSignIn = async () => {
        setError('');
        setLoading(true);

        try {
            const provider = new GoogleAuthProvider();
            await signInWithPopup(auth, provider);
            // Success - AuthContext will handle the state update
        } catch (error) {
            setError(error.message);
            setLoading(false);
        }
    };

    return (
        <div className="auth-container-3d">
            <AnimatedGridBackground />

            <div className="auth-content">
                <div className="auth-card-glass">
                    <div className="auth-header-modern">
                        <h1 className="auth-title-gradient">Login</h1>
                        <p className="auth-subtitle">Welcome back! Please enter your details</p>
                    </div>

                    {error && (
                        <div className="auth-error-modern">
                            <FiAlertCircle />
                            <span>{error}</span>
                        </div>
                    )}

                    <form onSubmit={handleSubmit} className="auth-form-modern">
                        <div className="form-group-modern">
                            <label>Email</label>
                            <div className="input-wrapper">
                                <FiMail className="input-icon" />
                                <input
                                    type="email"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    placeholder="Enter your email"
                                    required
                                    disabled={loading}
                                    className="input-modern"
                                />
                            </div>
                        </div>

                        <div className="form-group-modern">
                            <label>Password</label>
                            <div className="input-wrapper">
                                <FiLock className="input-icon" />
                                <input
                                    type="password"
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                    placeholder="Enter your password"
                                    required
                                    disabled={loading}
                                    className="input-modern"
                                />
                            </div>
                        </div>

                        <div className="form-options">
                            <label className="checkbox-label">
                                <input
                                    type="checkbox"
                                    checked={rememberMe}
                                    onChange={(e) => setRememberMe(e.target.checked)}
                                    className="checkbox-modern"
                                />
                                <span>Remember me</span>
                            </label>
                            <button type="button" className="link-btn-modern">
                                Forgot password?
                            </button>
                        </div>

                        <button type="submit" className="auth-btn-modern primary" disabled={loading}>
                            {loading ? 'Signing in...' : 'Login'}
                        </button>

                        <div className="divider">
                            <span>or</span>
                        </div>

                        <button
                            type="button"
                            className="auth-btn-modern google"
                            onClick={handleGoogleSignIn}
                            disabled={loading}
                        >
                            <FcGoogle className="google-icon" />
                            Continue with Google
                        </button>
                    </form>

                    <div className="auth-footer-modern">
                        <p>
                            Don't have an account?{' '}
                            <button onClick={onSwitchToSignup} className="link-btn-modern primary">
                                Register
                            </button>
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Login;
