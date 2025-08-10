import React from 'react';
import Banner from '../../Component/Banner/Banner';
import AboutSection from '../../Component/AboutSection/AboutSection';
import HowCanBeDonor from '../../Component/HowCanBeDonor/HowCanBeDonor';
import Stats from '../../Component/Stats/Stats';
import { Helmet } from 'react-helmet';

const Home = () => {
    return (
        <div>

            <Helmet>
                <title>Blood Wave || Home</title>
                <meta name="description" content="Blood Wave homepage to find blood donors easily." />
            </Helmet>


            <Banner></Banner>
            <Stats></Stats>
            <HowCanBeDonor></HowCanBeDonor>
            <AboutSection></AboutSection>
        </div>
    );
};

export default Home;