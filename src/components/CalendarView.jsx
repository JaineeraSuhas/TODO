import { useState } from 'react';
import './CalendarView.css';
import { FiChevronLeft, FiChevronRight } from 'react-icons/fi';

const CalendarView = ({ todos, onDateClick }) => {
    const [currentDate, setCurrentDate] = useState(new Date());

    const getDaysInMonth = (date) => {
        const year = date.getFullYear();
        const month = date.getMonth();
        const firstDay = new Date(year, month, 1);
        const lastDay = new Date(year, month + 1, 0);
        const daysInMonth = lastDay.getDate();
        const startingDayOfWeek = firstDay.getDay();

        return { daysInMonth, startingDayOfWeek, year, month };
    };

    const getTodosForDate = (date) => {
        return todos.filter(todo => {
            if (!todo.dueDate) return false;
            const todoDate = new Date(todo.dueDate);
            return todoDate.toDateString() === date.toDateString();
        });
    };

    const { daysInMonth, startingDayOfWeek, year, month } = getDaysInMonth(currentDate);
    const monthNames = ['January', 'February', 'March', 'April', 'May', 'June',
        'July', 'August', 'September', 'October', 'November', 'December'];
    const dayNames = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];

    const previousMonth = () => {
        setCurrentDate(new Date(year, month - 1, 1));
    };

    const nextMonth = () => {
        setCurrentDate(new Date(year, month + 1, 1));
    };

    const today = new Date();
    const isToday = (day) => {
        return day === today.getDate() &&
            month === today.getMonth() &&
            year === today.getFullYear();
    };

    const days = [];
    for (let i = 0; i < startingDayOfWeek; i++) {
        days.push(<div key={`empty-${i}`} className="calendar-day empty"></div>);
    }

    for (let day = 1; day <= daysInMonth; day++) {
        const date = new Date(year, month, day);
        const dayTodos = getTodosForDate(date);
        const hasTodos = dayTodos.length > 0;
        const completedCount = dayTodos.filter(t => t.completed).length;

        days.push(
            <div
                key={day}
                className={`calendar-day ${isToday(day) ? 'today' : ''} ${hasTodos ? 'has-todos' : ''}`}
                onClick={() => onDateClick(date)}
            >
                <span className="day-number">{day}</span>
                {hasTodos && (
                    <div className="day-todos">
                        <div className="todo-dots">
                            {dayTodos.slice(0, 3).map((todo, i) => (
                                <div
                                    key={i}
                                    className={`todo-dot ${todo.completed ? 'completed' : ''}`}
                                    style={{
                                        background: todo.completed ? 'var(--text-tertiary)' : 'var(--primary-color)'
                                    }}
                                />
                            ))}
                            {dayTodos.length > 3 && (
                                <span className="more-todos">+{dayTodos.length - 3}</span>
                            )}
                        </div>
                    </div>
                )}
            </div>
        );
    }

    return (
        <div className="calendar-view">
            <div className="calendar-header">
                <h2 className="calendar-title">
                    {monthNames[month]} {year}
                </h2>
                <div className="calendar-nav">
                    <button className="nav-btn" onClick={previousMonth}>
                        <FiChevronLeft />
                    </button>
                    <button className="nav-btn" onClick={nextMonth}>
                        <FiChevronRight />
                    </button>
                </div>
            </div>

            <div className="calendar-grid">
                {dayNames.map(day => (
                    <div key={day} className="calendar-day-name">
                        {day}
                    </div>
                ))}
                {days}
            </div>

            <div className="calendar-legend">
                <div className="legend-item">
                    <div className="legend-dot" style={{ background: 'var(--primary-color)' }}></div>
                    <span>Tasks due</span>
                </div>
                <div className="legend-item">
                    <div className="legend-dot" style={{ background: 'var(--text-tertiary)' }}></div>
                    <span>Completed</span>
                </div>
            </div>
        </div>
    );
};

export default CalendarView;
