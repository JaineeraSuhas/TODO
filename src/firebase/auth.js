import {
    createUserWithEmailAndPassword,
    signInWithEmailAndPassword,
    signOut,
    sendPasswordResetEmail,
    updateProfile
} from 'firebase/auth';
import { auth } from './config';

// Sign up new user
export const signup = async (email, password, displayName) => {
    try {
        const userCredential = await createUserWithEmailAndPassword(auth, email, password);

        // Update user profile with display name
        if (displayName) {
            await updateProfile(userCredential.user, { displayName });
        }

        return { user: userCredential.user, error: null };
    } catch (error) {
        return { user: null, error: error.message };
    }
};

// Login existing user
export const login = async (email, password) => {
    try {
        const userCredential = await signInWithEmailAndPassword(auth, email, password);
        return { user: userCredential.user, error: null };
    } catch (error) {
        let errorMessage = 'Failed to login';

        if (error.code === 'auth/user-not-found') {
            errorMessage = 'No account found with this email';
        } else if (error.code === 'auth/wrong-password') {
            errorMessage = 'Incorrect password';
        } else if (error.code === 'auth/invalid-email') {
            errorMessage = 'Invalid email address';
        }

        return { user: null, error: errorMessage };
    }
};

// Logout user
export const logout = async () => {
    try {
        await signOut(auth);
        return { error: null };
    } catch (error) {
        return { error: error.message };
    }
};

// Reset password
export const resetPassword = async (email) => {
    try {
        await sendPasswordResetEmail(auth, email);
        return { error: null };
    } catch (error) {
        return { error: error.message };
    }
};
