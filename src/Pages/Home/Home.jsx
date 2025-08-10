import React from 'react';
import Banner from '../../Component/Banner/Banner';
import AboutSection from '../../Component/AboutSection/AboutSection';
import HowCanBeDonor from '../../Component/HowCanBeDonor/HowCanBeDonor';
import Stats from '../../Component/Stats/Stats';

const Home = () => {
    return (
        <div>
            <Banner></Banner>
            <Stats></Stats>
            <HowCanBeDonor></HowCanBeDonor>
            <AboutSection></AboutSection>
        </div>
    );
};

export default Home;