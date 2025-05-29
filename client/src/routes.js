import React from 'react'

const Dashboard = React.lazy(() => import('./views/dashboard/Dashboard'))
const Players = React.lazy(() => import('./views/users/players/App'))
const Referees = React.lazy(() => import('./views/users/referees/App'))
const Treasurers = React.lazy(() => import('./views/users/treasurers/App'))
const Directors = React.lazy(() => import('./views/users/technicalsd/App'))
const Profile = React.lazy(() => import('./views/account/profile'))
const Registration = React.lazy(() => import('./views/users/Team/registration'))
const Tournament = React.lazy(() => import('./views/matches/tournament/definition'))
const Groups = React.lazy(() => import('./views/matches/groups/principal'))
const Clashes = React.lazy(() => import('./views/matches/clashes/App'))
const Results = React.lazy(() => import('./views/matches/results/result'))
const Payments = React.lazy(() => import('./views/payments/App'))
const LoginForm = React.lazy(() => import('./views/login/LoginForm'))
const Referee = React.lazy(() => import('./views/referee/App'))

const routes = [
  { path: '/dashboard', name: 'Dashboard', element: Dashboard },
  { path: '/users/players', name: 'Jugadores', element: Players },
  { path: '/users/referees', name: 'Árbitros', element: Referees },
  { path: '/users/treasurers', name: 'Delegados', element: Treasurers },
  { path: '/users/technicalsd', name: 'Técnicos', element: Directors },
  { path: '/account/profile', name: 'Perfil', element: Profile },
  { path: '/users/Team/', name: 'Registro de equipos', element: Registration },
  { path: '/matches/tournament', name: 'Torneos', element: Tournament },
  { path: '/matches/groups', name: 'Grupos', element: Groups },
  { path: '/matches/clashes', name: 'Partidos', element: Clashes },
  { path: '/matches/results', name: 'Resultados', element: Results },
  { path: '/payments', name: 'Pagos', element: Payments },
  { path: '/login', name: 'Login', element: LoginForm },
  { path: '/referee', name: 'Arbitro', element: Referee },
]

export default routes
