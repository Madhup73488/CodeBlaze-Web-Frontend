import Hero from "../components/landing/Hero";
import ProductDevelopment from "../components/landing/ProductDevelopment";
// import Products from "../components/landing/Products";
import Services from "../components/landing/Services";
import Strategy from "../components/landing/Strategy";
import FeaturedTechnology from "../components/landing/FeaturedTechnology";

const Landing = ({ theme, color }) => {
  return (
    <div className="careers-page">
      <Hero theme={theme} color={color} />
      <Services theme={theme} color={color} />
      <Strategy theme={theme} color={color} />
      <ProductDevelopment theme={theme} color={color} />
      <FeaturedTechnology theme={theme} color={color} />
      {/* <Products theme={theme} color={color} /> */}
    </div>
  );
};

export default Landing;
