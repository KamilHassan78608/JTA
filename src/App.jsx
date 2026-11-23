import { Route, Routes } from 'react-router-dom'
import './App.css'
import Home from './pages/Home'
import SignIn from './pages/SignIn'
import SignUp from './pages/SignUp'
import EditProfile from './pages/EditProfile'
import Instructors from './components/Instructors'
import CourseDetails from './pages/CourseDetails'
import AnnouncementDetails from './pages/AnnouncementDetails'

const App = () => {
  return (
    <div>
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='edit-profile' element={<EditProfile />} />

        
        <Route path='/instructor' element={<Instructors />} />
        <Route path="/courses/:slug" element={<CourseDetails />} />
        <Route path="/announcements/:slug" element={<AnnouncementDetails />} />
        

        <Route path='/sign-in' element={<SignIn />} />
        <Route path="/sign-up/*" element={<SignUp />} />
      </Routes>
    </div>
  )
}

export default App