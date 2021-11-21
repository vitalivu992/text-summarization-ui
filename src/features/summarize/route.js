// This is the JSON way to define React Router rules in a Rekit app.
// Learn more from: http://rekit.js.org/docs/routing.html

import { Layout, ToolPage } from './';

export default {
  component: Layout,
  path: process.env.PUBLIC_URL + 'summarize',
  childRoutes: [
    { path: '', component: ToolPage, isIndex: true },
  ],
};
