import { useState, useEffect } from "react";
import { ChevronRight, Package } from "lucide-react";

function Products({ theme = "dark", color = "purple" }) {
  const products = [
    "connectedlife",
    "cisgenics",
    "build studio",
    "engine",
    "taxbuddi",
    "infinix",
  ];

  const [animatedProducts, setAnimatedProducts] = useState([]);
  const [hoveredIndex, setHoveredIndex] = useState(null);

  // Theme configurations
  const themeConfig = {
    dark: {
      background: "bg-black",
      cardBg: "bg-zinc-900",
      text: "text-white",
      subtext: "text-gray-300",
      border: "border-zinc-800",
      hover: "hover:bg-zinc-800",
    },
    light: {
      background: "bg-white",
      cardBg: "bg-gray-50",
      text: "text-gray-900",
      subtext: "text-gray-600",
      border: "border-gray-200",
      hover: "hover:bg-gray-100",
    },
  };

  // Color configurations
  const colorConfig = {
    purple: {
      primary: "from-purple-600 to-indigo-700",
      accent: "bg-purple-600",
      glow: "shadow-purple-500/30",
      highlight: "text-purple-400",
    },
    orange: {
      primary: "from-orange-500 to-amber-600",
      accent: "bg-orange-500",
      glow: "shadow-orange-500/30",
      highlight: "text-orange-400",
    },
  };

  const currentTheme = themeConfig[theme] || themeConfig.dark;
  const currentColor = colorConfig[color] || colorConfig.purple;

  // Animate products entering one by one
  useEffect(() => {
    const timer = setTimeout(() => {
      const animateProducts = async () => {
        for (let i = 0; i < products.length; i++) {
          setAnimatedProducts((prev) => [...prev, products[i]]);
          await new Promise((resolve) => setTimeout(resolve, 150));
        }
      };

      animateProducts();
    }, 300);

    return () => clearTimeout(timer);
  }, [products]);

  // Card animation on hover
  const cardAnimation = (index) => {
    if (hoveredIndex === index) {
      return "scale-105 shadow-lg";
    }
    return "";
  };

  // Function to capitalize first letter of each word
  const formatProductName = (name) => {
    return name
      .split(" ")
      .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
      .join(" ");
  };

  return (
    <div
      className={`w-full rounded-xl overflow-hidden ${currentTheme.background} shadow-2xl`}
    >
      {/* Header with gradient */}
      <div
        className={`bg-gradient-to-r ${currentColor.primary} p-6 relative overflow-hidden`}
      >
        <div className="absolute top-0 right-0 w-64 h-64 bg-white/10 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2"></div>
        <div className="absolute bottom-0 left-16 w-32 h-32 bg-white/10 rounded-full blur-xl -translate-y-1/4"></div>
        <h2 className="text-white text-3xl font-bold relative z-10">
          Our Products
        </h2>
        <p className="text-white/80 mt-2 relative z-10">
          Innovative solutions transforming businesses
        </p>
      </div>

      {/* Products Section */}
      <div className="p-6 lg:p-8">
        <h3 className={`${currentTheme.text} text-xl font-semibold mb-6`}>
          Featured Solutions
        </h3>

        {/* Product Grid - Responsive */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {products.map((product, index) => (
            <div
              key={product}
              className={`${
                currentTheme.cardBg
              } rounded-lg overflow-hidden border ${
                currentTheme.border
              } transition-all duration-300 transform ${cardAnimation(index)} ${
                animatedProducts.includes(product)
                  ? "opacity-100"
                  : "opacity-0 translate-y-4"
              }`}
              onMouseEnter={() => setHoveredIndex(index)}
              onMouseLeave={() => setHoveredIndex(null)}
            >
              <div
                className={`h-2 bg-gradient-to-r ${currentColor.primary}`}
              ></div>
              <div className="p-5">
                <div className="flex items-start space-x-4">
                  <div
                    className={`bg-gradient-to-br ${currentColor.primary} p-3 rounded-lg ${currentColor.glow} shadow-lg`}
                  >
                    <Package className="text-white" size={20} />
                  </div>
                  <div>
                    <h4
                      className={`${currentTheme.text} font-semibold text-lg`}
                    >
                      {formatProductName(product)}
                    </h4>
                    <p className={`${currentTheme.subtext} text-sm mt-1`}>
                      Digital solution for modern businesses
                    </p>
                  </div>
                </div>
                <div
                  className={`mt-4 border-t ${currentTheme.border} pt-4 flex justify-between items-center`}
                >
                  <span
                    className={`text-xs ${currentColor.highlight} font-medium`}
                  >
                    EXPLORE SOLUTION
                  </span>
                  <ChevronRight size={16} className={currentColor.highlight} />
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* See More Button */}
        <div className="mt-8 flex justify-center">
          <button
            className={`group flex items-center space-x-2 bg-gradient-to-r ${currentColor.primary} px-6 py-3 rounded-full text-white font-medium shadow-lg ${currentColor.glow} transition-all duration-300 hover:shadow-xl hover:scale-105`}
          >
            <span>See All Products</span>
            <ChevronRight
              size={18}
              className="transition-transform duration-300 group-hover:translate-x-1"
            />
          </button>
        </div>
      </div>
    </div>
  );
}

export default Products;
