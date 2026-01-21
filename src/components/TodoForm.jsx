import { useState } from 'react';
import ReactDOM from 'react-dom';
import './TodoForm.css';
import { FiX, FiCalendar, FiFlag, FiRepeat } from 'react-icons/fi';

const TodoForm = ({ onSubmit, onCancel, initialData = {} }) => {
    const [task, setTask] = useState(initialData.task || '');
    const [note, setNote] = useState(initialData.note || '');
    const [dueDate, setDueDate] = useState(initialData.dueDate || '');
    const [priority, setPriority] = useState(initialData.priority || 'medium');
    const [repeat, setRepeat] = useState(initialData.repeat || 'none');

    const handleSubmit = (e) => {
        e.preventDefault();
        if (!task.trim()) return;

        onSubmit({
            task: task.trim(),
            note: note.trim(),
            dueDate,
            priority,
            repeat
        });
    };

    // Render the form using a portal at document.body level
    return ReactDOM.createPortal(
        <div className="todo-form-overlay" onClick={onCancel}>
            <form
                className="todo-form glass"
                onClick={(e) => e.stopPropagation()}
                onSubmit={handleSubmit}
            >
                <div className="form-header">
                    <h3>{initialData.task ? 'Edit Task' : 'New Task'}</h3>
                    <button type="button" className="close-btn" onClick={onCancel}>
                        <FiX />
                    </button>
                </div>

                <div className="form-body">
                    <input
                        type="text"
                        className="form-input task-input"
                        placeholder="Task name"
                        value={task}
                        onChange={(e) => setTask(e.target.value)}
                        autoFocus
                    />

                    <textarea
                        className="form-input note-input"
                        placeholder="Add a note..."
                        value={note}
                        onChange={(e) => setNote(e.target.value)}
                        rows={3}
                    />

                    <div className="form-grid">
                        <div className="form-field">
                            <label>
                                <FiCalendar />
                                Due Date
                            </label>
                            <input
                                type="date"
                                className="form-input"
                                value={dueDate}
                                onChange={(e) => setDueDate(e.target.value)}
                            />
                        </div>

                        <div className="form-field">
                            <label>
                                <FiFlag />
                                Priority
                            </label>
                            <select
                                className="form-input"
                                value={priority}
                                onChange={(e) => setPriority(e.target.value)}
                            >
                                <option value="low">Low</option>
                                <option value="medium">Medium</option>
                                <option value="high">High</option>
                            </select>
                        </div>

                        <div className="form-field">
                            <label>
                                <FiRepeat />
                                Repeat
                            </label>
                            <select
                                className="form-input"
                                value={repeat}
                                onChange={(e) => setRepeat(e.target.value)}
                            >
                                <option value="none">None</option>
                                <option value="daily">Daily</option>
                                <option value="weekly">Weekly</option>
                                <option value="monthly">Monthly</option>
                            </select>
                        </div>
                    </div>
                </div>

                <div className="form-footer">
                    <button type="button" className="btn-secondary" onClick={onCancel}>
                        Cancel
                    </button>
                    <button type="submit" className="btn-primary">
                        {initialData.task ? 'Update' : 'Create'} Task
                    </button>
                </div>
            </form>
        </div>,
        document.body
    );
};

export default TodoForm;
