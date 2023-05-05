import './App.css'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import PublicDashboard from './pages/PublicDashboard'
import UserDashboard from './pages/UserDashboard'
import LoginPage from './pages/LoginPage'
import ResetPasswordPage from './pages/ResetPasswordPage'

function App() {

  return (
    <>
      <Router>
        <Routes>
          <Route path={'/'} element={<PublicDashboard />} />
          <Route path={'/dashboard'} element={<UserDashboard />} />
          <Route path={'/login'} element={<LoginPage />} />
          <Route path={'/resetpassword'} element={<ResetPasswordPage />} />
        </Routes>
      </Router>
    </>
  )
}

export default App
