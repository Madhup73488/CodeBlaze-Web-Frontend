// App.js - Updated with Careers component
import { useState } from "react";
import Navbar from "./components/Navbar";
import Hero from "./components/Hero";
import Services from "./components/Services";
import Strategy from "./components/Strategy";
import ProductDevelopment from "./components/ProductDevelopment";
import FeaturedTechnology from "./components/FeaturedTechnology";
import Products from "./components/Products";
import Careers from "./pages/Careers"; // Import the new Careers component
// import ContactCTA from "./components/ContactCTA";
import Footer from "./components/Footer";
import AboutUs from "./components/whoarewe/AboutUs";
import OurTeam from "./components/whoarewe/OurTeam";
import OurMission from "./components/whoarewe/OurMission";
import OurValues from "./components/whoarewe/OurValues";
import NotFound from "./components/micellaneos/NotFound";
import Support from "./components/micellaneos/Support";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import PrivacyPolicy from "./components/micellaneos/PrivacyPolicy";

function App() {
  const [theme, setTheme] = useState("dark");
  const [color, setColor] = useState("orange");

  const toggleTheme = () => {
    setTheme(theme === "dark" ? "light" : "dark");
  };

  const toggleColor = () => {
    setColor(color === "purple" ? "orange" : "purple");
  };

  return (
    <Router>
      <div
        className={`app ${theme}`}
        style={{
          backgroundColor: theme === "dark" ? "#0a0a0a" : "#ffffff",
          color: theme === "dark" ? "#ffffff" : "#0a0a0a",
        }}
      >
        <Navbar
          theme={theme}
          color={color}
          toggleTheme={toggleTheme}
          toggleColor={toggleColor}
        />

        <Routes>
          <Route
            path="/"
            element={
              <>
                <Hero theme={theme} color={color} />
                <Services theme={theme} color={color} />
                <Strategy theme={theme} color={color} />
                <ProductDevelopment theme={theme} color={color} />
                <FeaturedTechnology theme={theme} color={color} />
                <Products theme={theme} color={color} />
              </>
            }
          />
          <Route
            path="/careers"
            element={<Careers theme={theme} color={color} />}
          />
          <Route
            path="/aboutus"
            element={<AboutUs theme={theme} color={color} />}
          />
          <Route
            path="/ourteam"
            element={<OurTeam theme={theme} color={color} />}
          />
          <Route
            path="/ourmission"
            element={<OurMission theme={theme} color={color} />}
          />
          <Route
            path="/ourvalues"
            element={<OurValues theme={theme} color={color} />}
          />
          <Route
            path="/support"
            element={<Support theme={theme} color={color} />}
          />
          <Route
            path="/privacy"
            element={<PrivacyPolicy theme={theme} color={color} />}
          />
          {/* Catch-all route should be last */}
          <Route path="*" element={<NotFound />} />
        </Routes>

        {/* <ContactCTA theme={theme} color={color} /> */}
        <Footer theme={theme} color={color} />
      </div>
    </Router>
  );
}

export default App;
