import React, { useState } from 'react';
import './dashboard.css';

/**
 * Simple modal for creating a project.
 * onCreate(payload) -> should POST /api/projects and return created project
 */
const NewProjectModal = ({ onClose, onCreate }) => {
  const [form, setForm] = useState({ name: '', description: '' });
  const [saving, setSaving] = useState(false);
  const [err, setErr] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!form.name.trim()) {
      setErr('Project name is required');
      return;
    }
    setSaving(true);
    setErr('');
    try {
      await onCreate({ name: form.name.trim(), description: form.description });
    } catch (error) {
      setErr(error?.response?.data?.error || 'Could not create project');
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className="modal-backdrop">
      <div className="modal">
        <h3>Create new project</h3>
        <form onSubmit={handleSubmit} className="modal-form">
          <label>
            Name
            <input
              name="name"
              value={form.name}
              onChange={(e) => setForm({ ...form, name: e.target.value })}
              required
            />
          </label>

          <label>
            Description
            <textarea
              name="description"
              value={form.description}
              onChange={(e) => setForm({ ...form, description: e.target.value })}
            />
          </label>

          {err && <div className="error-message small">{err}</div>}

          <div className="modal-actions">
            <button type="button" className="ds-btn" onClick={onClose} disabled={saving}>Discard</button>
            <button type="submit" className="ds-btn primary" disabled={saving}>
              {saving ? 'Saving…' : 'Save'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default NewProjectModal;
