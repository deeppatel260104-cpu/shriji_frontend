import Navbar from "../../components/Navbar/Navbar";
import ImageText from './../../components/helper/ImageText';
import HeroSecText from "../../components/helper/HeroSecText";
import ContactForm from "../../components/ContactUs/ContactForm";
import Footer from "../../components/Footer/Footer";

export default function Contact() {
  return (
    <>
      <Navbar />
      <HeroSecText caption="Contact Us" title="Get In Touch" subText="We capture moments that last forever — weddings, portraits, events, and more.
          Reach out to book your session or ask us anything about our packages and availability.
      "  />
      <ContactForm />
      <ImageText />
      <Footer  />
    </>
  );
}