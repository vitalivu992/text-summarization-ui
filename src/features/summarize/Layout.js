import React from 'react';
// import PropTypes from 'prop-types';
import { SidePanel } from './';

export default function Layout({ children }) {
  return (
    <div className="summarize-layout">
      <SidePanel />
      <div className="summarize-page-container">{children}</div>
    </div>
  );
};

Layout.propTypes = {};
Layout.defaultProps = {};
