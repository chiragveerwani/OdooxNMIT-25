import React, { useEffect, useState } from 'react';
import api from '../services/authService'; // default export is axios instance
import ProjectCard from './ProjectCard';
import NewProjectModal from './NewProjectModal';
import './dashboard.css';

const ProjectsView = ({ user }) => {
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showCreate, setShowCreate] = useState(false);
  const [error, setError] = useState('');

  const fetchProjects = async () => {
    setLoading(true);
    setError('');
    try {
      const res = await api.get('/projects');
      // Expecting an array in res.data
      setProjects(res.data || []);
    } catch (err) {
      console.error('Fetch projects error', err);
      setError(err?.response?.data?.error || 'Could not load projects');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProjects();
  }, []);

  const handleCreate = async (payload) => {
    try {
      const res = await api.post('/projects', payload);
      // push new project into list
      setProjects((p) => [res.data, ...p]);
      setShowCreate(false);
    } catch (err) {
      throw err; // NewProjectModal will handle showing an error
    }
  };

  return (
    <div className="pv-root">
      <div className="pv-header">
        <h2>Projects</h2>
        <div>
          <button className="ds-btn primary" onClick={() => setShowCreate(true)}>New Project</button>
        </div>
      </div>

      {error && <div className="error-message small">{error}</div>}

      {loading ? (
        <div className="loader">Loading projects...</div>
      ) : (
        <div className="projects-grid">
          {projects.length === 0 && <div className="empty">No projects yet. Create one to get started.</div>}
          {projects.map((p) => (
            <ProjectCard key={p.id} project={p} />
          ))}
        </div>
      )}

      {showCreate && (
        <NewProjectModal
          onClose={() => setShowCreate(false)}
          onCreate={handleCreate}
        />
      )}
    </div>
  );
};

export default ProjectsView;
