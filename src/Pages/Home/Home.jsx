import React from "react";
import Banner from "../../Component/Banner/Banner";
import AboutSection from "../../Component/AboutSection/AboutSection";
import HowCanBeDonor from "../../Component/HowCanBeDonor/HowCanBeDonor";
import Stats from "../../Component/Stats/Stats";
import { Helmet } from "react-helmet";
import CallToAction from "../../Component/CallToAction/CallToAction";
import Newsletter from "../../Component/Newsletter/Newsletter";
import Faqs from "../../Component/faqs/faqs";
import Footer from "../../Component/Footer/Footer";

const Home = () => {
  return (
    <div>
      <Helmet>
        <title>Blood Wave - Donate Blood, Save Lives Easily</title>
        <meta
          name="description"
          content="Join Blood Wave to find blood donors, request blood donations, and help save lives in emergencies quickly."
        />
        <meta
          name="keywords"
          content="blood donation, blood donors, emergency blood request, find donor near me, blood wave"
        />
        <link rel="canonical" href="https://blood-wave.netlify.app/" />
      </Helmet>

      <Banner></Banner>
      <CallToAction></CallToAction>
      <Stats></Stats>
      <HowCanBeDonor></HowCanBeDonor>
      <AboutSection></AboutSection>
      <Faqs></Faqs>
      <Newsletter></Newsletter>
      <Footer></Footer>
    </div>
  );
};

export default Home;
