import React from 'react';
import { Link } from 'react-router-dom';
import { Icon } from 'semantic-ui-react';

export default function SidePanel() {
  return (
    <div className="search-side-panel">
      <ul>
        <li>
          <Link to="/"><Icon name='home'/>Home</Link>
        </li>
        <li>
          <a href="/search/compare"><Icon name='check square outline'/>Compare</a>
        </li>
        <li>
          <a href="/search?random"><Icon name='cube'/>Explore /bi-encoder</a>
        </li>
        <li>
          <a href="/search?random&alt"><Icon name='code branch'/>Explore /cross-encoder</a>
        </li>
        <li>
          <a href="https://arxiv.org/abs/1908.10084" target="blank"><Icon name='file'/> The paper - SBERT</a>
        </li>
        <li>
          <a href="https://www.kaggle.com/c/quora-question-pairs" target="blank"><Icon name='database'/> Quora's dataset</a>
        </li>
        <li>
          <a href="https://github.com/vitalivu/short-sentences-similarity" target="blank"><Icon name='book'/> Jupyter notebook</a>
        </li>
      </ul>
      <div className="memo">
        Made with: colab, kaggle, python, quart, react, rekit, semantic-ui
      </div>
    </div>
  );
}
