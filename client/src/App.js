import React, { Suspense, useEffect, useState } from 'react';
import { HashRouter, Route, Routes, Navigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { CSpinner, useColorModes } from '@coreui/react';
import './scss/style.scss';
import LoginForm from './views/login/LoginForm';
import { logoutRequest } from './views/api/auth';

// Containers
const DefaultLayout = React.lazy(() => import('./layout/DefaultLayout'));

// Pages
const Dashboard = React.lazy(() => import('./views/dashboard/Dashboard'));
const Register = React.lazy(() => import('./views/register/register'));
const ForgotPassword = React.lazy(() => import('./views/login/forgot-password'));
const Code = React.lazy(() => import('./views/login/code'));
const NewPassword = React.lazy(() => import('./views/login/newpassword'));
const Registration = React.lazy(() => import('./views/users/Team/registration'));
const Profile = React.lazy(() => import('./views/account/profile'));
const Tournament = React.lazy(() => import('./views/matches/tournament/definition'));
const Groups = React.lazy(() => import('./views/matches/groups/principal'));
const Clashes = React.lazy(() => import('./views/matches/clashes/App'));
const Results = React.lazy(() => import('./views/matches/results/result'));
const Payments = React.lazy(() => import('./views/payments/App'));
const Referee = React.lazy(() => import('./views/referee/App'));

const App = () => {
  const { isColorModeSet, setColorMode } = useColorModes('coreui-free-react-admin-template-theme');
  const storedTheme = useSelector((state) => state.theme);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const dispatch = useDispatch();

  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.href.split('?')[1]);
    const theme = urlParams.get('theme') && urlParams.get('theme').match(/^[A-Za-z0-9\s]+/)[0];
    if (theme) {
      setColorMode(theme);
    }

    if (!isColorModeSet()) {
      setColorMode(storedTheme);
    }

    checkAuth();

    const handleStorageChange = () => {
      checkAuth();
    };
    window.addEventListener('storage', handleStorageChange);
    return () => window.removeEventListener('storage', handleStorageChange);
  }, [isColorModeSet, setColorMode, storedTheme]);

  const checkAuth = () => {
    const token = localStorage.getItem('jwtToken');
    setIsAuthenticated(!!token);
  };

  const handleLogin = (token) => {
    localStorage.setItem('jwtToken', token);
    setIsAuthenticated(true);
  };

  const handleLogout = async () => {
    try {
      await logoutRequest();
      localStorage.removeItem('jwtToken');
      setIsAuthenticated(false);
    } catch (error) {
      console.error('Error logging out:', error);
      alert('Error logging out. Please try again.');
    }
  };

  return (
    <HashRouter>
      <Suspense
        fallback={
          <div className="pt-3 text-center">
            <CSpinner color="light" variant="grow" />
          </div>
        }
      >
        <Routes>
          <Route
            path="/login"
            element={<LoginForm onLogin={handleLogin} isAuthenticated={isAuthenticated} />}
          />
          <Route path="/register" element={<Register />} />
          <Route path="/forgot-password" element={<ForgotPassword />} />
          <Route path="/code" element={<Code />} />
          <Route path="/newpassword" element={<NewPassword />} />

          {isAuthenticated ? (
            <Route element={<DefaultLayout />}>
              <Route path="/dashboard" element={<Dashboard />} />
              <Route path="/users/Team" element={<Registration />} />
              <Route path="/profile" element={<Profile />} />
              <Route path="/matches/tournament" element={<Tournament />} />
              <Route path="/matches/groups" element={<Groups />} />
              <Route path="/matches/clashes" element={<Clashes />} />
              <Route path="/matches/results" element={<Results />} />
              <Route path="/payments/payments" element={<Payments />} />
              <Route path="/referee" element={<Referee />} />
              <Route path="*" element={<Navigate to="/dashboard" replace />} />
            </Route>
          ) : (
            <Route path="*" element={<Navigate to="/login" replace />} />
          )}
        </Routes>
      </Suspense>
    </HashRouter>
  );
};

export default App;