import { useState } from 'react';
import './TodoList.css';
import TodoItem from './TodoItem';
import TodoForm from './TodoForm';
import { FiPlus } from 'react-icons/fi';

const TodoList = ({ todos, currentView, onAdd, onToggle, onDelete, onUpdate }) => {
  const [showForm, setShowForm] = useState(false);

  const viewTitles = {
    all: 'All Tasks',
    today: 'Today',
    upcoming: 'Upcoming',
    important: 'Important',
    completed: 'Completed'
  };

  const viewDescriptions = {
    all: 'All your tasks in one place',
    today: 'Tasks due today',
    upcoming: 'Tasks coming up this week',
    important: 'High priority tasks',
    completed: 'Completed tasks'
  };

  return (
    <div className="todo-list-container">
      <div className="todo-list-header">
        <div className="header-content">
          <h2 className="view-title">{viewTitles[currentView]}</h2>
          <p className="view-description">{viewDescriptions[currentView]}</p>
        </div>
        <button
          className="add-btn"
          onClick={() => setShowForm(!showForm)}
        >
          <FiPlus />
          <span>New Task</span>
        </button>
      </div>

      {showForm && (
        <TodoForm
          onSubmit={(todo) => {
            onAdd(todo);
            setShowForm(false);
          }}
          onCancel={() => setShowForm(false)}
        />
      )}

      <div className="todo-list">
        {todos.length === 0 ? (
          <div className="empty-state">
            <div className="empty-icon">📝</div>
            <h3>No tasks yet</h3>
            <p>Create a new task to get started</p>
          </div>
        ) : (
          todos.map((todo, index) => (
            <TodoItem
              key={todo.id}
              todo={todo}
              onToggle={onToggle}
              onDelete={onDelete}
              onUpdate={onUpdate}
              index={index}
            />
          ))
        )}
      </div>
    </div>
  );
};

export default TodoList;
