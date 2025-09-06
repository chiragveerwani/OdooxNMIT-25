import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import Sidebar from './Sidebar';
import HeaderBar from './HeaderBar';
import ProjectsView from './ProjectsView';
import MyTasksView from './MyTasksView';
import './dashboard.css';

/**
 * Dashboard - main layout.
 * Expects `user` and `onLogout` to be provided by parent (App.js).
 */
const Dashboard = ({ user, onLogout }) => {
  if (!user) {
    // should not happen if App routes protect dashboard
    return <Navigate to="/login" replace />;
  }

  return (
    <div className="ds-root">
      <Sidebar user={user} onLogout={onLogout} />
      <div className="ds-main">
        <HeaderBar user={user} onLogout={onLogout} />
        <div className="ds-content">
          <Routes>
            <Route path="/" element={<Navigate to="projects" replace />} />
            <Route path="projects/*" element={<ProjectsView user={user} />} />
            <Route path="tasks" element={<MyTasksView user={user} />} />
            {/* Future: project detail route: /dashboard/projects/:id */}
          </Routes>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
