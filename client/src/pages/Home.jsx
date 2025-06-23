import React from 'react'
import MainBanner from '../components/MainBanner'
import Categories from '../components/Categories'
import BestSeller from '../components/BestSeller'
import Testimonials from '../components/Testimonials'
import BottomBanner from '../components/BottomBanner'
import NewsLetter from '../components/NewsLetter'

const Home = () => {
  return (
    <div>
      <MainBanner/>
      <Categories/>
      <BestSeller/>
      <Testimonials/>
      <BottomBanner/>
      <NewsLetter/>
    </div>
  )
}

export default Home
