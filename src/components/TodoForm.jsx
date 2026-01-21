import { useState } from 'react';
import './TodoForm.css';
import { FiX, FiCalendar, FiRepeat, FiFlag, FiList } from 'react-icons/fi';

const TodoForm = ({ onSubmit, onCancel }) => {
    const [formData, setFormData] = useState({
        text: '',
        note: '',
        dueDate: '',
        priority: 'medium',
        repeat: '',
        listType: 'personal'
    });

    const handleSubmit = (e) => {
        e.preventDefault();
        if (formData.text.trim()) {
            onSubmit(formData);
        }
    };

    const handleChange = (field, value) => {
        setFormData(prev => ({ ...prev, [field]: value }));
    };

    return (
        <div className="todo-form-overlay" onClick={onCancel}>
            <form className="todo-form glass" onClick={(e) => e.stopPropagation()} onSubmit={handleSubmit}>
                <div className="form-header">
                    <h3>New Task</h3>
                    <button type="button" className="close-btn" onClick={onCancel}>
                        <FiX />
                    </button>
                </div>

                <div className="form-body">
                    <input
                        type="text"
                        placeholder="Task name"
                        value={formData.text}
                        onChange={(e) => handleChange('text', e.target.value)}
                        className="form-input task-input"
                        autoFocus
                    />

                    <textarea
                        placeholder="Add a note..."
                        value={formData.note}
                        onChange={(e) => handleChange('note', e.target.value)}
                        className="form-input note-input"
                        rows="3"
                    />

                    <div className="form-grid">
                        <div className="form-field">
                            <label>
                                <FiCalendar />
                                Due Date
                            </label>
                            <input
                                type="date"
                                value={formData.dueDate}
                                onChange={(e) => handleChange('dueDate', e.target.value)}
                                className="form-input"
                            />
                        </div>

                        <div className="form-field">
                            <label>
                                <FiFlag />
                                Priority
                            </label>
                            <select
                                value={formData.priority}
                                onChange={(e) => handleChange('priority', e.target.value)}
                                className="form-input"
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
                                value={formData.repeat}
                                onChange={(e) => handleChange('repeat', e.target.value)}
                                className="form-input"
                            >
                                <option value="">None</option>
                                <option value="daily">Daily</option>
                                <option value="weekly">Weekly</option>
                                <option value="monthly">Monthly</option>
                            </select>
                        </div>

                        <div className="form-field">
                            <label>
                                <FiList />
                                List
                            </label>
                            <select
                                value={formData.listType}
                                onChange={(e) => handleChange('listType', e.target.value)}
                                className="form-input"
                            >
                                <option value="personal">👤 Personal</option>
                                <option value="work">💼 Work</option>
                                <option value="shopping">🛒 Shopping</option>
                                <option value="health">❤️ Health</option>
                                <option value="study">📚 Study</option>
                            </select>
                        </div>
                    </div>
                </div>

                <div className="form-footer">
                    <button type="button" className="btn-secondary" onClick={onCancel}>
                        Cancel
                    </button>
                    <button type="submit" className="btn-primary">
                        Create Task
                    </button>
                </div>
            </form>
        </div>
    );
};

export default TodoForm;
