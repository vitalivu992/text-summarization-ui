import React from 'react';
import { Link } from 'react-router-dom';

export default function WelcomePage() {
  return (
    <div className="home-welcome-page">
      <header className="app-header">
        <img src={require('../../images/rekit-react.png')} className="rekit-logo" alt="logo" />
        <h1 className="app-title">Semantic Similarity Search</h1>
      </header>
      <div className="app-intro">
        <h3>To get started:</h3>
        <ul>
          <li>
            enter the <Link to="/search">/search</Link> page
          </li>
        </ul>
      </div>
    </div>
  );
}
