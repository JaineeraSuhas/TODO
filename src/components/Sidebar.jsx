import './Sidebar.css';
import {
  FiInbox, FiStar, FiCalendar, FiCheckCircle,
  FiClock, FiDroplet, FiGrid, FiLogOut
} from 'react-icons/fi';
import { logout } from '../firebase/auth';

const Sidebar = ({ currentView, setCurrentView, stats, onCalendarClick, onThemeClick, user }) => {
  const menuItems = [
    { id: 'all', icon: FiInbox, label: 'All Tasks', count: stats.total },
    { id: 'today', icon: FiClock, label: 'Today', count: stats.today },
    { id: 'upcoming', icon: FiCalendar, label: 'Upcoming', count: null },
    { id: 'important', icon: FiStar, label: 'Important', count: null },
    { id: 'completed', icon: FiCheckCircle, label: 'Completed', count: stats.completed },
  ];

  const handleLogout = async () => {
    await logout();
  };

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
        {user && (
          <div className="user-menu glass-light">
            <div className="user-info">
              <div className="user-avatar">
                {user.displayName ? user.displayName.charAt(0).toUpperCase() : user.email.charAt(0).toUpperCase()}
              </div>
              <div className="user-details">
                <span className="user-name">{user.displayName || 'User'}</span>
                <span className="user-email">{user.email}</span>
              </div>
            </div>
            <button
              className="logout-btn"
              onClick={handleLogout}
              title="Logout"
            >
              <FiLogOut />
            </button>
          </div>
        )}

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
