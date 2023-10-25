import { Route, Routes } from 'react-router-dom';
import { ForgetPassword, GetApp, Home, Login, ResetPassword } from '../pages';

export const General = () => {
  return (
    <Routes>
      <Route path='/' element={<Home />} />
      <Route path='/login' element={<Login />} />
      <Route path='/forget-password' element={<ForgetPassword />} />
      <Route path='/reset-password' element={<ResetPassword />} />
      <Route path='/get' element={<GetApp />} />
    </Routes>
  );
};
