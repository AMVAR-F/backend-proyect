import React from 'react';

const Dashboard = React.lazy(() => import('./views/dashboard/Dashboard'));
const Users = React.lazy(() => import('./views/users/board'));
const Profile = React.lazy(() => import('./views/account/profile'));
const Registration = React.lazy(() => import('./views/users/Team/registration'));
const Tournament = React.lazy(() => import('./views/matches/tournament/definition'));
const Groups = React.lazy(() => import('./views/matches/groups/principal'));
const Clashes = React.lazy(() => import('./views/matches/clashes/App'));
const Results = React.lazy(() => import('./views/matches/results/result'));
const Payments = React.lazy(() => import('./views/payments/App'));


const routes = [

  { path: '/dashboard', name: 'Dashboard', element: Dashboard },
  { path: '/users', name: 'Users', element: Users },
  { path: '/account/profile', name: 'Profile', element: Profile },
  { path: '/users/Team/', name: 'Registration', element: Registration },
  { path: '/matches/tournament', name: 'Tournament', element: Tournament },
  { path: '/matches/groups', name: 'Groups', element: Groups },
  { path: '/matches/clashes', name: 'Groups', element: Clashes },
  { path: '/matches/results', name: 'Results', element: Results },
  { path: '/payments', name: 'Payments', element: Payments },
];

export default routes;
