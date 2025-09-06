import React, { useState } from 'react';
import './dashboard.css';

const HeaderBar = ({ user }) => {
  const [query, setQuery] = useState('');

  // placeholder search handler (hook into backend searching later)
  const handleSearch = (e) => {
    e.preventDefault();
    // For now, we just log; ProjectsView can read query via context or lifting state later
    console.log('Search:', query);
  };

  return (
    <header className="ds-header">
      <form onSubmit={handleSearch} className="ds-search">
        <input
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Search projects, tasks..."
          aria-label="Search"
        />
      </form>

      <div className="ds-header-right">
        <button className="icon-btn" title="Notifications">🔔</button>
        <div className="avatar-circle">{user.name ? user.name[0].toUpperCase() : 'U'}</div>
      </div>
    </header>
  );
};

export default HeaderBar;
