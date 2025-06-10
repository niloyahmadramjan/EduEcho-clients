import React from 'react';
import HeroSection from '../Hero/HeroSection';
import CategoriesSection from '../CategoriesSection/CategoriesSection';
import StatsSection from '../StatsSection/StatsSection';

const Home = () => {
    return (
        <div>
           <HeroSection></HeroSection>
           <StatsSection></StatsSection>
           <CategoriesSection></CategoriesSection>
        </div>
    );
};

export default Home;