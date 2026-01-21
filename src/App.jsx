import { useState, useEffect } from 'react';
import './App.css';
import Sidebar from './components/Sidebar';
import TodoList from './components/TodoList';
import CalendarView from './components/CalendarView';
import ThemeSelector from './components/ThemeSelector';
import Login from './components/Auth/Login';
import Signup from './components/Auth/Signup';
import SubtleGridBackground from './components/SubtleGridBackground';
import { AuthProvider, useAuth } from './contexts/AuthContext';
import { subscribeTodos, addTodo as addTodoToDb, updateTodo as updateTodoInDb, deleteTodo as deleteTodoFromDb, migrateLocalTodos } from './firebase/db';

function AppContent() {
  const { user } = useAuth();
  const [todos, setTodos] = useState([]);
  const [currentView, setCurrentView] = useState('all');
  const [theme, setTheme] = useState(() => {
    return localStorage.getItem('theme') || 'blue';
  });
  const [showCalendar, setShowCalendar] = useState(false);
  const [showThemeSelector, setShowThemeSelector] = useState(false);
  const [showSignup, setShowSignup] = useState(false);
  const [migrated, setMigrated] = useState(false);

  // Theme persistence
  useEffect(() => {
    localStorage.setItem('theme', theme);
    document.body.className = `theme-${theme}`;
  }, [theme]);

  // Migrate localStorage todos to Firestore on first login
  useEffect(() => {
    if (user && !migrated) {
      const localTodos = localStorage.getItem('todos');
      if (localTodos) {
        const parsedTodos = JSON.parse(localTodos);
        if (parsedTodos.length > 0) {
          migrateLocalTodos(user.uid, parsedTodos).then(() => {
            localStorage.removeItem('todos');
            setMigrated(true);
          });
        }
      }
      setMigrated(true);
    }
  }, [user, migrated]);

  // Subscribe to user's todos from Firestore
  useEffect(() => {
    if (user) {
      const unsubscribe = subscribeTodos(user.uid, (todos) => {
        setTodos(todos);
      });
      return unsubscribe;
    } else {
      setTodos([]);
    }
  }, [user]);

  const addTodo = async (todo) => {
    if (user) {
      await addTodoToDb(user.uid, {
        ...todo,
        completed: false,
        createdAt: new Date().toISOString()
      });
    }
  };

  const toggleTodo = async (id) => {
    if (user) {
      const todo = todos.find(t => t.id === id);
      if (todo) {
        await updateTodoInDb(user.uid, id, { completed: !todo.completed });
      }
    }
  };

  const deleteTodo = async (id) => {
    if (user) {
      await deleteTodoFromDb(user.uid, id);
    }
  };

  const updateTodo = async (id, updates) => {
    if (user) {
      await updateTodoInDb(user.uid, id, updates);
    }
  };

  const getFilteredTodos = () => {
    const now = new Date();
    const today = new Date(now.getFullYear(), now.getMonth(), now.getDate());
    const tomorrow = new Date(today);
    tomorrow.setDate(tomorrow.getDate() + 1);
    const weekFromNow = new Date(today);
    weekFromNow.setDate(weekFromNow.getDate() + 7);

    switch (currentView) {
      case 'today':
        return todos.filter(todo => {
          if (!todo.dueDate) return false;
          const dueDate = new Date(todo.dueDate);
          return dueDate >= today && dueDate < tomorrow;
        });
      case 'upcoming':
        return todos.filter(todo => {
          if (!todo.dueDate) return false;
          const dueDate = new Date(todo.dueDate);
          return dueDate >= tomorrow && dueDate < weekFromNow;
        });
      case 'completed':
        return todos.filter(todo => todo.completed);
      case 'important':
        return todos.filter(todo => todo.priority === 'high');
      default:
        return todos;
    }
  };

  const stats = {
    total: todos.length,
    completed: todos.filter(t => t.completed).length,
    pending: todos.filter(t => !t.completed).length,
    today: todos.filter(t => {
      if (!t.dueDate) return false;
      const today = new Date().toDateString();
      return new Date(t.dueDate).toDateString() === today;
    }).length
  };

  // Show auth pages if not logged in
  if (!user) {
    return showSignup ? (
      <Signup onSwitchToLogin={() => setShowSignup(false)} />
    ) : (
      <Login onSwitchToSignup={() => setShowSignup(true)} />
    );
  }

  return (
    <div className="app-container">
      <SubtleGridBackground opacity={0.1} />

      <Sidebar
        currentView={currentView}
        setCurrentView={setCurrentView}
        stats={stats}
        onCalendarClick={() => setShowCalendar(!showCalendar)}
        onThemeClick={() => setShowThemeSelector(!showThemeSelector)}
        user={user}
      />

      <main className="main-content">
        {showCalendar ? (
          <CalendarView todos={todos} onDateClick={(date) => {
            setCurrentView('all');
            setShowCalendar(false);
          }} />
        ) : (
          <TodoList
            todos={getFilteredTodos()}
            currentView={currentView}
            onAdd={addTodo}
            onToggle={toggleTodo}
            onDelete={deleteTodo}
            onUpdate={updateTodo}
          />
        )}
      </main>

      {showThemeSelector && (
        <ThemeSelector
          currentTheme={theme}
          onThemeChange={setTheme}
          onClose={() => setShowThemeSelector(false)}
        />
      )}
    </div>
  );
}

function App() {
  return (
    <AuthProvider>
      <AppContent />
    </AuthProvider>
  );
}

export default App;
