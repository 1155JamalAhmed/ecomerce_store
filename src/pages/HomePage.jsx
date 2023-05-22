import React from "react";

import Header from "../components/layout/Header";
import Hero from "../components/root/Hero.jsx";
import Categories from "../components/root/Categories";
import BestDeals from "../components/root/BestDeals";
import FeaturedProducts from "../components/root/FeaturedProducts";
import Events from "../components/root/Events";
import Sponsored from "../components/root/Sponsored";
import Footer from "../components/layout/Footer";

const HomePage = () => {
  return (
    <div>
      <Header activeHeading={1} />
      <Hero />
      <Categories />
      <BestDeals />
      <Events />
      <FeaturedProducts />
      <Sponsored />
      <Footer />
    </div>
  );
};

export default HomePage;
