import { useState, useEffect } from 'react';
import './App.css';
import Sidebar from './components/Sidebar';
import TodoList from './components/TodoList';
import CalendarView from './components/CalendarView';
import ThemeSelector from './components/ThemeSelector';

function App() {
  const [todos, setTodos] = useState(() => {
    const saved = localStorage.getItem('todos');
    return saved ? JSON.parse(saved) : [];
  });

  const [currentView, setCurrentView] = useState('all');
  const [theme, setTheme] = useState(() => {
    return localStorage.getItem('theme') || 'blue';
  });
  const [showCalendar, setShowCalendar] = useState(false);
  const [showThemeSelector, setShowThemeSelector] = useState(false);

  useEffect(() => {
    localStorage.setItem('todos', JSON.stringify(todos));
  }, [todos]);

  useEffect(() => {
    localStorage.setItem('theme', theme);
    document.body.className = `theme-${theme}`;
  }, [theme]);

  const addTodo = (todo) => {
    setTodos([...todos, { ...todo, id: Date.now(), completed: false, createdAt: new Date().toISOString() }]);
  };

  const toggleTodo = (id) => {
    setTodos(todos.map(todo =>
      todo.id === id ? { ...todo, completed: !todo.completed } : todo
    ));
  };

  const deleteTodo = (id) => {
    setTodos(todos.filter(todo => todo.id !== id));
  };

  const updateTodo = (id, updates) => {
    setTodos(todos.map(todo =>
      todo.id === id ? { ...todo, ...updates } : todo
    ));
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

  return (
    <div className="app-container">
      <Sidebar
        currentView={currentView}
        setCurrentView={setCurrentView}
        stats={stats}
        onCalendarClick={() => setShowCalendar(!showCalendar)}
        onThemeClick={() => setShowThemeSelector(!showThemeSelector)}
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

export default App;
