import { WelcomePage } from '../home';
export default {
  path: process.env.PUBLIC_URL,
  childRoutes: [
    { path: 'welcome-page', component: WelcomePage, isIndex: true },
  ],
};
