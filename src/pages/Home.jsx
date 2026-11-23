import Navbar from '../components/Navbar'
import Hero from '../components/Hero'
import Courses from '../components/Courses'
import Instructors from '../components/Instructors'
import Reviews from '../components/Reviews'
import Footer from '../components/Footer'
import ReviewForm from '../components/ReviewForm'
import RecentAnnouncements from '../components/RecentAnnouncements'

const Home = () => {
  return (
    <div>
      <Navbar />
      <Hero />
      <RecentAnnouncements />
      <Courses />
      <Instructors />
      <Reviews />
      <ReviewForm />
      <Footer />
    </div>
  )
}

export default Home