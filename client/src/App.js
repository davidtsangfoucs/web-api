import HomePage from './page/HomePage'
import './app.scss'
import { BrowserRouter as Router, Route, Link, Routes } from 'react-router-dom';
import NotFound from './page/NotFound';
import ApplicationPage from './page/ApplicationPage';
import AddCat from './page/AddCat';
import RegistrationPage from './page/RegistrationPage';
import LoginPage from './page/LoginPage';
import ApplicationListPage from './page/ApplicationListPage';
import ProtectedRoute from './component/ProtectedRoute';
import { useEffect } from 'react';
import AutoLogout from './component/AutoLogout';
import ManageAccountsPage from './page/ManageAccountsPage';
import ManageCatsPage from './page/ManageCatsPage';
import ManageFavCartPage from './page/ManageFavCartPage';
import MessageListPage from './page/MessageListPage';
import MessageFormPage from './page/MessageFormPage';

function App() {
  const token = localStorage.getItem('auth-token');
  const premission = localStorage.getItem('premission');


  return (
    // <div className='App'>
    //   <HomePage></HomePage>
    // </div>
    <Router>
      <div>
        <Routes>
          <Route path="/" element={<><HomePage /><AutoLogout /></>} />
          <Route path="/application" element={<><ApplicationPage /><AutoLogout /></>} />
          {token && premission === 'Admin' && premission || 'Charity Worker' && <Route path="/add-cat" element={<><AddCat /><AutoLogout /></>} />}
          {/* <Route path="/add-cat"></Route> */}
          {token && <Route path="/fav-cart" element={<><ManageFavCartPage /><AutoLogout /></>} />}
          {token && premission === 'Admin' && premission || 'Charity Worker' && <Route path="/msg-form" element={<><MessageFormPage /><AutoLogout /></>} />}
          {token && premission === 'Admin' && premission || 'Charity Worker' && <Route path="/msg-list" element={<><MessageListPage /><AutoLogout /></>} />}
          {!token && <Route path="/login" element={<LoginPage />} />}
          <Route path="/registration" element={<><RegistrationPage /><AutoLogout /></>} />
          {token && premission === 'Admin' && premission || 'Charity Worker' && <Route path="/application-list" element={<ProtectedRoute><ApplicationListPage /><AutoLogout /></ProtectedRoute>} />}
          {token && premission === 'Admin' && premission || 'Charity Worker' && <Route path="/manage-accounts" element={<ProtectedRoute><ManageAccountsPage /><AutoLogout /></ProtectedRoute>} />}
          {token && premission === 'Admin' && premission || 'Charity Worker' && <Route path="/manage-cats" element={<ProtectedRoute><ManageCatsPage /><AutoLogout /></ProtectedRoute>} />}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
