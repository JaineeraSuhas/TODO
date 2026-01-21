import { useState } from 'react';
import { signup } from '../../firebase/auth';
import { signInWithPopup, GoogleAuthProvider } from 'firebase/auth';
import { auth } from '../../firebase/config';
import AnimatedGridBackground from '../AnimatedGridBackground';
import './Auth.css';
import { FiMail, FiLock, FiUser, FiAlertCircle } from 'react-icons/fi';
import { FcGoogle } from 'react-icons/fc';

const Signup = ({ onSwitchToLogin }) => {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');

        if (password !== confirmPassword) {
            setError('Passwords do not match');
            return;
        }

        if (password.length < 6) {
            setError('Password must be at least 6 characters');
            return;
        }

        setLoading(true);

        const { user, error: signupError } = await signup(email, password, name);

        if (signupError) {
            setError(signupError);
            setLoading(false);
        }
    };

    const handleGoogleSignIn = async () => {
        setError('');
        setLoading(true);

        try {
            const provider = new GoogleAuthProvider();
            await signInWithPopup(auth, provider);
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
                        <h1 className="auth-title-gradient">Create Account</h1>
                        <p className="auth-subtitle">Start organizing your tasks today</p>
                    </div>

                    {error && (
                        <div className="auth-error-modern">
                            <FiAlertCircle />
                            <span>{error}</span>
                        </div>
                    )}

                    <form onSubmit={handleSubmit} className="auth-form-modern">
                        <div className="form-group-modern">
                            <label>Name</label>
                            <div className="input-wrapper">
                                <FiUser className="input-icon" />
                                <input
                                    type="text"
                                    value={name}
                                    onChange={(e) => setName(e.target.value)}
                                    placeholder="Enter your name"
                                    required
                                    disabled={loading}
                                    className="input-modern"
                                />
                            </div>
                        </div>

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
                                    placeholder="Create a password"
                                    required
                                    disabled={loading}
                                    className="input-modern"
                                    minLength={6}
                                />
                            </div>
                        </div>

                        <div className="form-group-modern">
                            <label>Confirm Password</label>
                            <div className="input-wrapper">
                                <FiLock className="input-icon" />
                                <input
                                    type="password"
                                    value={confirmPassword}
                                    onChange={(e) => setConfirmPassword(e.target.value)}
                                    placeholder="Confirm your password"
                                    required
                                    disabled={loading}
                                    className="input-modern"
                                />
                            </div>
                        </div>

                        <button type="submit" className="auth-btn-modern primary" disabled={loading}>
                            {loading ? 'Creating account...' : 'Create Account'}
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
                            Already have an account?{' '}
                            <button onClick={onSwitchToLogin} className="link-btn-modern primary">
                                Sign in
                            </button>
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Signup;
