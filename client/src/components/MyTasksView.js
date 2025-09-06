import React, { useEffect, useState } from 'react';
import api from '../services/authService';
import './dashboard.css';

const MyTasksView = ({ user }) => {
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [err, setErr] = useState('');

  useEffect(() => {
    const load = async () => {
      setLoading(true);
      setErr('');
      try {
        // Endpoint not implemented earlier for user tasks; backend can implement GET /api/tasks?assigneeId=<id>
        const res = await api.get(`/tasks/project/${user.id}`) // fallback: adjust backend route
        setTasks(res.data || []);
      } catch (e) {
        console.error('My tasks error', e);
        setErr(e?.response?.data?.error || 'Could not load tasks');
      } finally {
        setLoading(false);
      }
    };
    load();
  }, [user.id]);

  return (
    <div className="mt-root">
      <div className="pv-header">
        <h2>My Tasks</h2>
      </div>

      {err && <div className="error-message small">{err}</div>}

      {loading ? (
        <div className="loader">Loading tasks...</div>
      ) : (
        <div className="tasks-grid">
          {tasks.length === 0 && <div className="empty">No tasks assigned to you.</div>}
          {tasks.map((t) => (
            <div key={t.id} className="task-card">
              <div className="task-title">{t.title}</div>
              <div className="task-meta">{t.status} • {t.dueDate ? new Date(t.dueDate).toLocaleDateString() : 'No due'}</div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default MyTasksView;
