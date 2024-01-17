import { Routes, Route } from 'react-router-dom';
import Home from './pages/Home/Home';
import Profile from './pages/Profile/Profile';
import RequireAuth from './Auth/RequireAuth';
import Register from './pages/Register/Register';
import Update from './pages/Update/Update';
import Delete from './pages/Delete/Delete';
import Login from './pages/Login/Login';
import NotFound from './pages/NotFound/NotFound';

export const App = () => {

  return (
    <>
      <Routes>

        <Route path='*' element={<NotFound />} />
        <Route path='/' element={<Home />} />
        <Route path='/login' element={<Login />} />
        <Route path='/register' element={<Register />} />

        <Route path='/profile' element={
          <RequireAuth>
            <Profile />
          </RequireAuth>} />

        <Route path='/profile/update' element={
          <RequireAuth>
            <Update />
          </RequireAuth>} />

        <Route path='/profile/delete' element={
          <RequireAuth>
            <Delete />
          </RequireAuth>} />

      </Routes>
    </>
  )
}
