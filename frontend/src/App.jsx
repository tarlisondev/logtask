import { Routes, Route, Link, Navigate } from 'react-router-dom';
import Home from './pages/Home/Home';
import Profile from './pages/Profile/Profile';
import RequireAuth from './Auth/RequireAuth';
import { useContext, useState } from 'react';
import { AuthContext } from './Auth/AuthContext';
import Register from './pages/Register/Register';
import Update from './pages/Update/Update';
import Delete from './pages/Delete/Delete';
import Login from './pages/Login/Login';
import NotFound from './pages/NotFound/NotFound';

export const App = () => {

  const [auth, setAuth] = useState(false);

  function handleRefresh() {
    localStorage.removeItem("id")
    localStorage.removeItem("token")
    localStorage.removeItem("user")
  }

  return (
    <>
      {auth && <Link onClick={handleRefresh} to="/" >Exit</Link>}

      <Routes>

        <Route path='/' element={<Home />} />
        <Route path='/login' element={<Login />} />
        <Route path='/register' element={<Register />} />

        <Route path='/profile/update' element={
          <RequireAuth>
            <Update />
          </RequireAuth>} />

        <Route path='/profile/delete' element={
          <RequireAuth>
            <Delete />
          </RequireAuth>} />

        <Route path='/profile' element={
          <RequireAuth>
            <Profile />
          </RequireAuth>} />

        <Route path='*' element={<NotFound />} />

      </Routes>

    </>
  )
}
