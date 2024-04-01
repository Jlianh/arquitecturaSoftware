import './App.css'
import Footer from './components/Footer';
import Header from './components/Header';
import Example from './components/Example';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import UserList from './components/user/userList';
import UserForm from './components/user/userForm';
import Login from './components/auth/Login';
import ChangePassword from './components/auth/ChangePassword';
import PrivateRoute from './components/PrivateRoute'
import { useDispatch } from 'react-redux';
import { useEffect } from 'react';
import { loginSuccess } from './components/features/authSlice';
import HouseList from './components/house/houseList';
import HouseForm from './components/house/houseForm';

function App() {

  const dispach = useDispatch();

  useEffect(()=>{
    const sessionData = localStorage.getItem('sessionData');
    if(sessionData){
      dispach(loginSuccess(JSON.parse(sessionData)))
    }
  })

  return (
    <>
      <BrowserRouter>
        <Header />
        <Routes>
          <Route path='/' element={<PrivateRoute Component ={Example}/>} />
          <Route path='/user' element={<PrivateRoute Component ={UserList}/>} />
          <Route path="/user/:id" element={<PrivateRoute Component ={UserForm}/>} />
          <Route path='/house' element={<PrivateRoute Component ={HouseList}/>} />
          <Route path="/house/:id" element={<PrivateRoute Component ={HouseForm}/>} />
          <Route path="/change-password" element={<PrivateRoute Component ={ChangePassword}/>} />
          <Route path='/create-user' element={<UserForm />} />
          <Route path='/login' element={<Login />} />
        </Routes>
        <Footer />
      </BrowserRouter>
      
    </>
  )
}

export default App
