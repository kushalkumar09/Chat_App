import { Route, Routes } from 'react-router'
import HomePage from './pages/HomePage'
import ProfilePage from './pages/ProfilePage'
import LoginPage from './pages/LoginPage'
import {Toaster} from 'react-hot-toast'

const App = () => {
  return (
    <div className="bg-[url('./src/assets/bgImage.svg')] bg-contain" >
      <Toaster position="top-right" reverseOrder={false} />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/profile" element={<ProfilePage />} />
      </Routes>
    </div>
  )
}

export default App