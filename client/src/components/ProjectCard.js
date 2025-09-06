import React from 'react';
import './dashboard.css';

/**
 * Simple project card - adapt to include thumbnails, status chips, dates.
 * Expects `project` object { id, name, description, createdAt }
 */
const ProjectCard = ({ project }) => {
  const created = project.createdAt ? new Date(project.createdAt).toLocaleDateString() : '';

  return (
    <div className="project-card">
      <div className="project-thumb">📁</div>

      <div className="project-body">
        <h3 className="project-title">{project.name}</h3>
        <div className="project-meta">
          <span className="chip">Active</span>
          <span className="project-date">{created}</span>
        </div>
        <p className="project-desc">{project.description || 'No description'}</p>
      </div>

      <div className="project-actions">
        <button className="icon-btn">...</button>
      </div>
    </div>
  );
};

export default ProjectCard;
