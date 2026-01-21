import './Sidebar.css';
import {
  FiInbox, FiStar, FiCalendar, FiCheckCircle,
  FiClock, FiDroplet, FiGrid
} from 'react-icons/fi';

const Sidebar = ({ currentView, setCurrentView, stats, onCalendarClick, onThemeClick }) => {
  const menuItems = [
    { id: 'all', icon: FiInbox, label: 'All Tasks', count: stats.total },
    { id: 'today', icon: FiClock, label: 'Today', count: stats.today },
    { id: 'upcoming', icon: FiCalendar, label: 'Upcoming', count: null },
    { id: 'important', icon: FiStar, label: 'Important', count: null },
    { id: 'completed', icon: FiCheckCircle, label: 'Completed', count: stats.completed },
  ];

  return (
    <aside className="sidebar glass">
      <div className="sidebar-header">
        <h1 className="sidebar-title">
          <FiGrid className="logo-icon" />
          Tasks
        </h1>
        <div className="sidebar-actions">
          <button
            className="icon-btn"
            onClick={onCalendarClick}
            title="Calendar View"
          >
            <FiCalendar />
          </button>
          <button
            className="icon-btn"
            onClick={onThemeClick}
            title="Change Theme"
          >
            <FiDroplet />
          </button>
        </div>
      </div>

      <nav className="sidebar-nav">
        {menuItems.map((item) => (
          <button
            key={item.id}
            className={`nav-item ${currentView === item.id ? 'active' : ''}`}
            onClick={() => setCurrentView(item.id)}
          >
            <item.icon className="nav-icon" />
            <span className="nav-label">{item.label}</span>
            {item.count !== null && item.count > 0 && (
              <span className="nav-badge">{item.count}</span>
            )}
          </button>
        ))}
      </nav>

      <div className="sidebar-footer">
        <div className="stats-card glass-light">
          <div className="stat-item">
            <span className="stat-label">Pending</span>
            <span className="stat-value">{stats.pending}</span>
          </div>
          <div className="stat-divider"></div>
          <div className="stat-item">
            <span className="stat-label">Done</span>
            <span className="stat-value">{stats.completed}</span>
          </div>
        </div>
      </div>
    </aside>
  );
};

export default Sidebar;
