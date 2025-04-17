import { useState } from "react";
import Navbar from "./contexts/Navbar";
import Careers from "./pages/Careers";
import Footer from "./components/landing/Footer";
import AboutUs from "./components/whoarewe/AboutUs";
import OurTeam from "./components/whoarewe/OurTeam";
import OurMission from "./components/whoarewe/OurMission";
import OurValues from "./components/whoarewe/OurValues";
import NotFound from "./components/micellaneos/NotFound";
import Support from "./components/micellaneos/Support";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import PrivacyPolicy from "./components/micellaneos/PrivacyPolicy";
import { LoaderProvider } from "./contexts/LoaderContext";
import Landing from "./pages/Landing";
import TermsOfService from "./components/micellaneos/TermsOfService";
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
    <LoaderProvider color={color}>
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
            <Route path="/" element={<Landing theme={theme} color={color} />} />
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
            <Route
              path="/terms-of-service"
              element={<TermsOfService theme={theme} color={color} />}
            />
            {/* Catch-all route should be last */}
            <Route
              path="*"
              element={<NotFound theme={theme} color={color} />}
            />
          </Routes>
          <Footer theme={theme} color={color} />
        </div>
      </Router>
    </LoaderProvider>
  );
}

export default App;
