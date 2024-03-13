import './App.css'
import Footer from './components/Footer';
import Header from './components/Header';
import Example from './components/Example';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import UserList from './components/user/userList';

function App() {

  return (
    <>
      <BrowserRouter>
        <Header />
        <Routes>
          <Route path='/' element={<Example />} />
          <Route path='/user' element={<UserList />} />
        </Routes>
        <Footer />
      </BrowserRouter>
      
    </>
  )
}

export default App
