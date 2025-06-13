import React from 'react';
import HeroSection from '../Hero/HeroSection';
import CategoriesSection from '../CategoriesSection/CategoriesSection';
import StatsSection from '../StatsSection/StatsSection';
import NewsletterSection from '../NewsletterSection/NewsletterSection';
import FeaturedArticles from '../AllArticles/FeaturedArticles';
import TopContributors from '../topContributors/TopContributors';

const Home = () => {
    return (
        <div>
           <HeroSection></HeroSection>
           
           <StatsSection></StatsSection>
           <FeaturedArticles></FeaturedArticles>
           <CategoriesSection></CategoriesSection>
           <TopContributors></TopContributors>
           <NewsletterSection></NewsletterSection>
        </div>
    );
};

export default Home;