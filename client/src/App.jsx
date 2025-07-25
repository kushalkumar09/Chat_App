import { Navigate, Route, Routes, useNavigate } from 'react-router'
import HomePage from './pages/HomePage'
import ProfilePage from './pages/ProfilePage'
import LoginPage from './pages/LoginPage'
import {Toaster} from 'react-hot-toast'
import { AuthContext } from '../context/AuthContext'
import { useContext } from 'react'
import assets from './assets/assets.js'

const App = () => {
  const {authUser} = useContext(AuthContext);
  console.log(authUser);
  return (
    <div style={{ backgroundImage: `url(${assets.bgImage})` }} className="bg-contain" >
      <Toaster position="top-right" reverseOrder={false} />
      <Routes>
        <Route path="/" element={authUser?<HomePage />:<Navigate to={'/login'}/>} />
        <Route path="/login" element={!authUser?<LoginPage />:<Navigate to={'/'}/>} />
        <Route path="/profile" element={authUser?<ProfilePage />:<Navigate to={'/login'}/>} />
      </Routes>
    </div>
  )
}

export default App