import React, { useState } from 'react';
import { NavLink } from 'react-router-dom';
import './dashboard.css';

const Sidebar = ({ user, onLogout }) => {
  const [collapsed, setCollapsed] = useState(false);

  return (
    <aside className={`ds-sidebar ${collapsed ? 'collapsed' : ''}`}>
      <div className="ds-logo" onClick={() => setCollapsed(!collapsed)}>
        <div className="logo-mark">SS</div>
        {!collapsed && <div className="logo-text">SynergySphere</div>}
      </div>

      <nav className="ds-nav">
        <NavLink to="/dashboard/projects" className="ds-nav-link">
          <span className="ds-link-icon">📁</span>
          <span className="ds-link-text">Projects</span>
        </NavLink>

        <NavLink to="/dashboard/tasks" className="ds-nav-link">
          <span className="ds-link-icon">🗂️</span>
          <span className="ds-link-text">My Tasks</span>
        </NavLink>
      </nav>

      <div className="ds-bottom">
        <div className="ds-user">
          <div className="avatar">{user.name ? user.name[0].toUpperCase() : 'U'}</div>
          <div className="user-meta">
            <div className="user-name">{user.name}</div>
            <div className="user-email">{user.email}</div>
          </div>
        </div>

        <div className="ds-actions">
          <button className="ds-btn" onClick={onLogout}>Logout</button>
        </div>
      </div>
    </aside>
  );
};

export default Sidebar;
