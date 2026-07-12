import Hero from '../../components/HomePage/Hero'
import HappyCustomers from '../../components/HomePage/HappyCustomers'
import PortfolioWithStory from "../../components/HomePage/PortfolioWithStory";
import AboutUs from "../../components/HomePage/AboutUs";
import Package from "../../components/HomePage/Package";
import Category from '../../components/HomePage/Category';
import MapSection from '../../components/HomePage/MapSection';
import Navbar from './../../components/Navbar/Navbar';
import SocialFloat from '../../components/HomePage/SocialFloat';
import Footer from './../../components/Footer/Footer';
import ImageText from './../../components/helper/ImageText';



const HomePage = () => {
  return (
    <>
      <SocialFloat />
      <Navbar />
      <Hero />
      <Category />
      <PortfolioWithStory categorySlug="pre-wedding"   />
      <PortfolioWithStory categorySlug="wedding" />
      <AboutUs />
      <HappyCustomers />
      <Package />
      <MapSection />
      <ImageText />
      <Footer />
    </>
  )
}


export default HomePage