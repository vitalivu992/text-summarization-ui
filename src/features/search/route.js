import { Layout, SearchPage, ComparePage } from './';
// This is the JSON way to define React Router rules in a Rekit app.
// Learn more from: http://rekit.js.org/docs/routing.html


export default {
  component: Layout,
  path: process.env.PUBLIC_URL+'/search',
  childRoutes: [
    { path: '', component: SearchPage, isIndex: true },
    { path: 'compare', component: ComparePage },
  ],
};
