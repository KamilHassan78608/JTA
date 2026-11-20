import Navbar from './components/Navbar'
import './App.css'
import Hero from './components/Hero'
import Courses from './components/Courses'
import Instructors from './components/Instructors'
import Reviews from './components/Reviews'
import Footer from './components/Footer'
import ReviewForm from './components/ReviewForm'

const App = () => {
  return (
    <div>
      <Navbar />
      <Hero />
      <Courses />
      <Instructors />
      <Reviews />
      <ReviewForm />
      <Footer />
    </div>
  )
}

export default App