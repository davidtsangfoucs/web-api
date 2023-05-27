import HomePage from './page/HomePage'
import './app.scss'
import { BrowserRouter as Router, Route, Link, Routes } from 'react-router-dom';
import NotFound from './page/NotFound';
import ApplicationPage from './page/ApplicationPage';
import RegistrationPage from './page/RegistrationPage';
import LoginPage from './page/LoginPage';
import ApplicationListPage from './page/ApplicationListPage';
import ProtectedRoute from './component/ProtectedRoute';

function App() {
  const token = localStorage.getItem('auth-token');


  return (
    // <div className='App'>
    //   <HomePage></HomePage>
    // </div>
    <Router>
      <div>

        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/application" element={<ApplicationPage />} />
          {!token && <Route path="/login" element={<LoginPage />} />}
          <Route path="/registration" element={<RegistrationPage />} />
          <Route path="/application-list" element={<ProtectedRoute> <ApplicationListPage /> </ProtectedRoute>} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
