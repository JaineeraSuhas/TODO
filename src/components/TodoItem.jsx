import { useState } from 'react';
import './TodoItem.css';
import { FiTrash2, FiEdit2, FiCheck, FiX, FiCalendar, FiRepeat, FiAlertCircle } from 'react-icons/fi';

const TodoItem = ({ todo, onToggle, onDelete, onUpdate, index }) => {
    const [isEditing, setIsEditing] = useState(false);
    const [editText, setEditText] = useState(todo.text);
    const [editNote, setEditNote] = useState(todo.note || '');

    const handleSave = () => {
        if (editText.trim()) {
            onUpdate(todo.id, { text: editText, note: editNote });
            setIsEditing(false);
        }
    };

    const handleCancel = () => {
        setEditText(todo.text);
        setEditNote(todo.note || '');
        setIsEditing(false);
    };

    const formatDate = (dateString) => {
        if (!dateString) return null;
        const date = new Date(dateString);
        const today = new Date();
        const tomorrow = new Date(today);
        tomorrow.setDate(tomorrow.getDate() + 1);

        if (date.toDateString() === today.toDateString()) return 'Today';
        if (date.toDateString() === tomorrow.toDateString()) return 'Tomorrow';

        return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
    };

    const getPriorityColor = (priority) => {
        switch (priority) {
            case 'high': return '#FF3B30';
            case 'medium': return '#FF9500';
            case 'low': return '#34C759';
            default: return 'transparent';
        }
    };

    const getIconForList = (listType) => {
        const icons = {
            work: '💼',
            personal: '👤',
            shopping: '🛒',
            health: '❤️',
            study: '📚',
            default: '📝'
        };
        return icons[listType] || icons.default;
    };

    return (
        <div
            className={`todo-item glass-light ${todo.completed ? 'completed' : ''}`}
            style={{
                animationDelay: `${index * 0.05}s`,
                borderLeft: `3px solid ${getPriorityColor(todo.priority)}`
            }}
        >
            <button
                className="checkbox"
                onClick={() => onToggle(todo.id)}
            >
                {todo.completed && <FiCheck />}
            </button>

            {isEditing ? (
                <div className="edit-form">
                    <input
                        type="text"
                        value={editText}
                        onChange={(e) => setEditText(e.target.value)}
                        className="edit-input"
                        autoFocus
                    />
                    <textarea
                        value={editNote}
                        onChange={(e) => setEditNote(e.target.value)}
                        placeholder="Add a note..."
                        className="edit-textarea"
                        rows="2"
                    />
                    <div className="edit-actions">
                        <button className="save-btn" onClick={handleSave}>
                            <FiCheck /> Save
                        </button>
                        <button className="cancel-btn" onClick={handleCancel}>
                            <FiX /> Cancel
                        </button>
                    </div>
                </div>
            ) : (
                <>
                    <div className="todo-content">
                        <div className="todo-main">
                            <span className="todo-text">{todo.text}</span>
                            {todo.note && <p className="todo-note">{todo.note}</p>}
                        </div>

                        <div className="todo-meta">
                            {todo.listType && (
                                <span className="meta-badge list-badge">
                                    {getIconForList(todo.listType)} {todo.listType}
                                </span>
                            )}
                            {todo.dueDate && (
                                <span className="meta-badge date-badge">
                                    <FiCalendar /> {formatDate(todo.dueDate)}
                                </span>
                            )}
                            {todo.repeat && (
                                <span className="meta-badge repeat-badge">
                                    <FiRepeat /> {todo.repeat}
                                </span>
                            )}
                            {todo.priority === 'high' && (
                                <span className="meta-badge priority-badge">
                                    <FiAlertCircle /> High Priority
                                </span>
                            )}
                        </div>
                    </div>

                    <div className="todo-actions">
                        <button
                            className="action-btn edit-btn"
                            onClick={() => setIsEditing(true)}
                            title="Edit"
                        >
                            <FiEdit2 />
                        </button>
                        <button
                            className="action-btn delete-btn"
                            onClick={() => onDelete(todo.id)}
                            title="Delete"
                        >
                            <FiTrash2 />
                        </button>
                    </div>
                </>
            )}
        </div>
    );
};

export default TodoItem;
