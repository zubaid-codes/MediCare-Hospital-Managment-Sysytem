import React from 'react'
import Navbar from '../componenets/Navbar'
import Banner from '../componenets/Banner'
import Certifications from '../componenets/Certifications'
import HomeDoctors from '../componenets/HomeDoctors'
import Testimonials from '../componenets/Testimonials'
import Footer from '../componenets/Footer'

const Home = () => {
  return (
    <div>
      <Navbar/>
      <Banner/>
      <Certifications />
      <HomeDoctors />
      <Testimonials/>
      <Footer/>
    </div>
  )
}

export default Home

