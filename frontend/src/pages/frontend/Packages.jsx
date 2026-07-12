import { useState, useRef, useEffect } from "react";
import { Link } from "react-router-dom";
import Navbar from "../../components/Navbar/Navbar";
import { Check, Info, ShieldCheck, Camera, Video, Clock, Layout, ArrowRight } from "lucide-react";
import Packages from './../../components/HomePage/Package';
import Footer from './../../components/Footer/Footer';
import ImageText from "../../components/helper/ImageText";
import HeroPackages from './../../components/Packages/HeroPackages';
import AddOnsPackages from "../../components/Packages/AddOnsPackages";
import FaqPackages from "../../components/Packages/FaqPackages";
import HeroSecText from "../../components/helper/HeroSecText";

export default function PackagePage() {
  return (
    <>
      <Navbar />
      <HeroSecText caption="Packages" title="Invest in Your Legacy"  subText="                    Every celebration is unique. Our packages are designed to give you peace of mind while we preserve the magic of your most cherished moments with cinematic precision.
"/>
      <Packages showTitle={false} showViewAll={false} />
      <AddOnsPackages />
      <FaqPackages />
      <ImageText />
      <Footer />
    </>
  );
}