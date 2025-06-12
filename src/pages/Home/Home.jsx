import React from 'react';
import HeroSection from '../Hero/HeroSection';
import CategoriesSection from '../CategoriesSection/CategoriesSection';
import StatsSection from '../StatsSection/StatsSection';
import NewsletterSection from '../NewsletterSection/NewsletterSection';
import FeaturedArticles from '../AllArticles/FeaturedArticles';

const Home = () => {
    return (
        <div>
           <HeroSection></HeroSection>
           
           <StatsSection></StatsSection>
           <FeaturedArticles></FeaturedArticles>
           <CategoriesSection></CategoriesSection>
           <NewsletterSection></NewsletterSection>
        </div>
    );
};

export default Home;