import React from 'react'
import HeroSecText from '../../components/helper/HeroSecText'
import CategoryGrid from '../../components/Category/CategoryGrid'
import Navbar from '../../components/Navbar/Navbar'
import ImageText from '../../components/helper/ImageText'
import Footer from '../../components/Footer/Footer'

const Category = () => {
  return (
    <>
      <Navbar />
      <HeroSecText title="Our Specialties" caption="Category" />
      <CategoryGrid />
      <ImageText />
      <Footer />
    </>
  )
}

export default Category