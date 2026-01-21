import {
    collection,
    doc,
    addDoc,
    updateDoc,
    deleteDoc,
    getDocs,
    onSnapshot,
    query,
    orderBy,
    serverTimestamp
} from 'firebase/firestore';
import { db } from './config';

// Get user's todos collection reference
const getUserTodosRef = (userId) => {
    return collection(db, 'users', userId, 'todos');
};

// Add a new todo
export const addTodo = async (userId, todoData) => {
    try {
        const todosRef = getUserTodosRef(userId);
        const docRef = await addDoc(todosRef, {
            ...todoData,
            createdAt: serverTimestamp(),
            updatedAt: serverTimestamp()
        });
        return { id: docRef.id, error: null };
    } catch (error) {
        return { id: null, error: error.message };
    }
};

// Update a todo
export const updateTodo = async (userId, todoId, updates) => {
    try {
        const todoRef = doc(db, 'users', userId, 'todos', todoId);
        await updateDoc(todoRef, {
            ...updates,
            updatedAt: serverTimestamp()
        });
        return { error: null };
    } catch (error) {
        return { error: error.message };
    }
};

// Delete a todo
export const deleteTodo = async (userId, todoId) => {
    try {
        const todoRef = doc(db, 'users', userId, 'todos', todoId);
        await deleteDoc(todoRef);
        return { error: null };
    } catch (error) {
        return { error: error.message };
    }
};

// Get all todos (one-time fetch)
export const getTodos = async (userId) => {
    try {
        const todosRef = getUserTodosRef(userId);
        const q = query(todosRef, orderBy('createdAt', 'desc'));
        const querySnapshot = await getDocs(q);

        const todos = [];
        querySnapshot.forEach((doc) => {
            todos.push({ id: doc.id, ...doc.data() });
        });

        return { todos, error: null };
    } catch (error) {
        return { todos: [], error: error.message };
    }
};

// Subscribe to todos (real-time updates)
export const subscribeTodos = (userId, callback) => {
    const todosRef = getUserTodosRef(userId);
    const q = query(todosRef, orderBy('createdAt', 'desc'));

    return onSnapshot(q, (querySnapshot) => {
        const todos = [];
        querySnapshot.forEach((doc) => {
            todos.push({ id: doc.id, ...doc.data() });
        });
        callback(todos);
    }, (error) => {
        console.error('Error subscribing to todos:', error);
        callback([]);
    });
};

// Migrate localStorage todos to Firestore
export const migrateLocalTodos = async (userId, localTodos) => {
    try {
        const promises = localTodos.map(todo => addTodo(userId, todo));
        await Promise.all(promises);
        return { error: null };
    } catch (error) {
        return { error: error.message };
    }
};
