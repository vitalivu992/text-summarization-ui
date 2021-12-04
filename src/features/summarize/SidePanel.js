import React from 'react';
import { Link } from 'react-router-dom';
import { Icon } from 'semantic-ui-react';

export default function SidePanel() {
  return (
    <div className="summarize-side-panel">
      <ul>
        <li>
          <Link to="/"><Icon name='home'/>Home</Link>
        </li>
        <li>
          <a href="/summarize"><Icon name='check square outline'/>Text summarization</a>
        </li>
        <li>
          <a href="https://arxiv.org/abs/1912.08777" target="blank"><Icon name='file'/> The paper - Pegasus</a>
        </li>
        <li>
          <a href="https://paperswithcode.com/dataset/cnn-daily-mail-1" target="blank"><Icon name='database'/> CNN Dailymail dataset</a>
        </li>
        <li>
          <a href="https://colab.research.google.com/drive/1qdvcK8xLUiyEIWtQZ_hkcbG9IpELQ96u?usp=sharing#scrollTo=NF0SLRgee834" target="blank"><Icon name='book'/> The notebook</a>
        </li>
      </ul>
      <div className="memo">
        Made with: colab, python, quart, react, rekit, semantic-ui
      </div>
    </div>
  );
}
