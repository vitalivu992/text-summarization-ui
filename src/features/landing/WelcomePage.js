import React from 'react';
import { Link } from 'react-router-dom';

export default function WelcomePage() {
  return (
    <div className="landing-welcome-page">
      <header className="app-header">
        <img src={require('../../images/rekit-react.png')} className="rekit-logo" alt="logo" />
        <h1 className="app-title">Text summarization</h1>
        <p> By Hoang Cao, Linh Vu, Duc Nguyen, Long Vu<br/>
        NLP - Dr. Nguyen Van Vinh
        </p>
      </header>
      <div className="app-intro">
        <h3>To get started:</h3>
        <ul>
          <li>
            enter the <Link to="/summarize">/summarize</Link> page
          </li>
        </ul>
      </div>
    </div>
  );
}
