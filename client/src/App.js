import HomePage from './page/HomePage'
import './app.scss'
import { BrowserRouter as Router, Route, Link, Routes } from 'react-router-dom';
import NotFound from './page/NotFound';
import ApplicationPage from './page/ApplicationPage';
import RegistrationPage from './page/RegistrationPage';
import LoginPage from './page/LoginPage';
import ApplicationListPage from './page/ApplicationListPage';
import ProtectedRoute from './component/ProtectedRoute';
import { useEffect } from 'react';
import AutoLogout from './component/AutoLogout';

function App() {
  const token = localStorage.getItem('auth-token');
  const position = localStorage.getItem('position');


  return (
    // <div className='App'>
    //   <HomePage></HomePage>
    // </div>
    <Router>
      <div>
        <Routes>
          <Route path="/" element={<><HomePage /><AutoLogout /></>} />
          <Route path="/application" element={<><ApplicationPage /><AutoLogout /></>} />
          {!token && <Route path="/login" element={<LoginPage />} />}
          <Route path="/registration" element={<><RegistrationPage /><AutoLogout /></>} />
          {token && position === 'System admin1' && <Route path="/application-list" element={<ProtectedRoute><ApplicationListPage /><AutoLogout /></ProtectedRoute>} />}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
