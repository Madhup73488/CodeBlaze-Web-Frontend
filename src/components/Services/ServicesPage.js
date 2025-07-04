import React, { useState } from "react";
import {
  Code,
  Smartphone,
  ShoppingCart,
  Database,
  CreditCard,
  Palette,
  Megaphone,
  Users,
  ArrowRight,
  CheckCircle,
  Zap,
  Shield,
  Settings,
  Briefcase,
  Heart,
  MessageSquare,
  Phone,
  Target,
} from "lucide-react";

// Services Hero Component
const ServicesHero = ({ theme }) => {
  const isDarkMode = theme === "dark";

  return (
    <div className="py-20 px-6">
      <div className="container mx-auto text-center">
        <div className="max-w-4xl mx-auto space-y-8">
          <div
            className={`inline-flex items-center px-4 py-2 rounded-full border ${
              isDarkMode
                ? "bg-neutral-900 border-neutral-700"
                : "bg-gray-100 border-gray-300"
            }`}
          >
            <Briefcase className="w-4 h-4 text-orange-500 mr-2" />
            <span className="text-sm font-medium">
              Complete Engineering Solutions
            </span>
          </div>

          <h1 className="text-5xl lg:text-7xl font-black leading-tight">
            Our
            <span className="text-orange-500"> Services</span>
          </h1>

          <p
            className={`text-xl lg:text-2xl max-w-3xl mx-auto ${
              isDarkMode ? "text-neutral-300" : "text-gray-600"
            }`}
          >
            From web development to payment orchestration, we provide end-to-end
            engineering solutions that transform your ideas into scalable
            digital products.
          </p>

          <div className="flex flex-wrap justify-center gap-4 pt-8">
            {[
              "100+ Projects",
              "15+ Tech Stacks",
              "24/7 Support",
              "Global Clients",
            ].map((stat, index) => (
              <div
                key={index}
                className={`px-6 py-3 rounded-full border ${
                  isDarkMode
                    ? "border-neutral-700 bg-neutral-800"
                    : "border-gray-300 bg-gray-50"
                }`}
              >
                <span className="font-semibold">{stat}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

// Service Card Component
const ServiceCard = ({
  service,
  theme,
  isActive,
  onHover,
  onOpenCallbackModal,
}) => {
  // Add onOpenCallbackModal prop
  const isDarkMode = theme === "dark";

  return (
    <div
      className={`p-8 rounded-2xl border-2 transition-all duration-300 cursor-pointer transform hover:scale-105 ${
        isActive
          ? isDarkMode
            ? "bg-neutral-900 border-orange-500 shadow-2xl"
            : "bg-orange-50 border-orange-500 shadow-2xl"
          : isDarkMode
          ? "bg-[#1c1c1c] border-neutral-800 hover:border-neutral-700"
          : "bg-white border-gray-200 hover:border-gray-300"
      }`}
      onMouseEnter={() => onHover(service.id)}
      onMouseLeave={() => onHover(null)}
    >
      <div className="space-y-6">
        <div
          className={`w-16 h-16 rounded-2xl flex items-center justify-center ${
            isActive
              ? "bg-orange-500"
              : isDarkMode
              ? "bg-neutral-900"
              : "bg-gray-100"
          }`}
        >
          <service.icon
            className={`w-8 h-8 ${isActive ? "text-white" : "text-orange-500"}`}
          />
        </div>

        <div>
          <h3 className="text-2xl font-bold mb-3">{service.title}</h3>
          <p
            className={`text-lg leading-relaxed ${
              isDarkMode ? "text-neutral-400" : "text-gray-600"
            }`}
          >
            {service.description}
          </p>
        </div>

        <div className="space-y-3">
          <h4 className="font-semibold text-lg">Key Features:</h4>
          <ul className="space-y-2">
            {service.features.map((feature, index) => (
              <li key={index} className="flex items-center">
                <CheckCircle className="w-5 h-5 text-green-500 mr-3 flex-shrink-0" />
                <span
                  className={isDarkMode ? "text-neutral-400" : "text-gray-700"}
                >
                  {feature}
                </span>
              </li>
            ))}
          </ul>
        </div>

        <div className="pt-4">
          <button
            className={`flex items-center font-semibold transition-colors cursor-pointer ${
              isActive
                ? "text-orange-500"
                : isDarkMode
                ? "text-neutral-300 hover:text-orange-500"
                : "text-gray-700 hover:text-orange-500"
            }`}
            onClick={() => onOpenCallbackModal(service.title)} // Add onClick handler
          >
            Request a Call Back
            <ArrowRight className="w-5 h-5 ml-2" />
          </button>
        </div>
      </div>
    </div>
  );
};

// Tech Stack Component
const TechStackSection = ({ theme }) => {
  const isDarkMode = theme === "dark";

  const techStacks = [
    {
      category: "Frontend",
      techs: [
        {
          name: "React",
          logoUrl: "https://www.vectorlogo.zone/logos/reactjs/reactjs-icon.svg",
        },
        {
          name: "Next.js",
          logoUrl: "https://www.vectorlogo.zone/logos/nextjs/nextjs-icon.svg",
        },
        {
          name: "Vue.js",
          logoUrl: "https://www.vectorlogo.zone/logos/vuejs/vuejs-icon.svg",
        },
        {
          name: "Angular",
          logoUrl: "https://www.vectorlogo.zone/logos/angular/angular-icon.svg",
        },
        {
          name: "Flutter",
          logoUrl:
            "https://www.vectorlogo.zone/logos/flutterio/flutterio-icon.svg",
        },
        {
          name: "Xamarin",
          logoUrl: "https://upload.wikimedia.org/wikipedia/commons/thumb/f/f2/Xamarin-logo.svg/1280px-Xamarin-logo.svg.png",
        },
      ],
    },
    {
      category: "Backend",
      techs: [
        {
          name: "Node.js",
          logoUrl: "https://www.vectorlogo.zone/logos/nodejs/nodejs-icon.svg",
        },
        {
          name: "Python",
          logoUrl: "https://www.vectorlogo.zone/logos/python/python-icon.svg",
        },
        {
          name: "Java",
          logoUrl: "https://www.vectorlogo.zone/logos/java/java-icon.svg",
        },
        {
          name: "PHP",
          logoUrl: "https://www.vectorlogo.zone/logos/php/php-icon.svg",
        },
        {
          name: "Ruby",
          logoUrl:
            "https://www.vectorlogo.zone/logos/ruby-lang/ruby-lang-icon.svg",
        },
        {
          name: ".NET",
          logoUrl: "https://www.vectorlogo.zone/logos/dotnet/dotnet-icon.svg",
        },
      ],
    },
    {
      category: "Database",
      techs: [
        {
          name: "MongoDB",
          logoUrl: "https://www.vectorlogo.zone/logos/mongodb/mongodb-icon.svg",
        },
        {
          name: "PostgreSQL",
          logoUrl:
            "https://www.vectorlogo.zone/logos/postgresql/postgresql-icon.svg",
        },
        {
          name: "MySQL",
          logoUrl: "https://www.vectorlogo.zone/logos/mysql/mysql-icon.svg",
        },
        {
          name: "Redis",
          logoUrl: "https://www.vectorlogo.zone/logos/redis/redis-icon.svg",
        },
        {
          name: "Firebase",
          logoUrl:
            "https://www.vectorlogo.zone/logos/firebase/firebase-icon.svg",
        },
        {
          name: "DynamoDB",
          logoUrl:
            "https://www.vectorlogo.zone/logos/amazon_aws/amazon_aws-icon.svg",
        },
      ],
    },
    {
      category: "Cloud",
      techs: [
        {
          name: "AWS",
          logoUrl:
            "https://www.vectorlogo.zone/logos/amazon_aws/amazon_aws-icon.svg",
        },
        {
          name: "Azure",
          logoUrl:
            "https://www.vectorlogo.zone/logos/microsoft_azure/microsoft_azure-icon.svg",
        },
        {
          name: "GCP",
          logoUrl: "https://icon2.cleanpng.com/20180526/loh/avqydaga0.webp",
        },
        {
          name: "Docker",
          logoUrl: "https://www.vectorlogo.zone/logos/docker/docker-icon.svg",
        },
        {
          name: "Kubernetes",
          logoUrl:
            "https://www.vectorlogo.zone/logos/kubernetes/kubernetes-icon.svg",
        },
        {
          name: "Serverless",
          logoUrl:
            "https://www.vectorlogo.zone/logos/serverless/serverless-icon.svg",
        },
      ],
    },
    {
      category: "Mobile",
      techs: [
        {
          name: "iOS",
          logoUrl: "https://www.vectorlogo.zone/logos/apple/apple-icon.svg",
        },
        {
          name: "Android",
          logoUrl: "https://www.vectorlogo.zone/logos/android/android-icon.svg",
        },
        {
          name: "Flutter",
          logoUrl:
            "https://www.vectorlogo.zone/logos/flutterio/flutterio-icon.svg",
        },
        {
          name: "React Native",
          logoUrl: "https://www.vectorlogo.zone/logos/reactjs/reactjs-icon.svg",
        },
        {
          name: "Ionic",
          logoUrl:
            "https://www.vectorlogo.zone/logos/ionicframework/ionicframework-icon.svg",
        },
        {
          name: "Xamarin",
          logoUrl: "https://upload.wikimedia.org/wikipedia/commons/thumb/f/f2/Xamarin-logo.svg/1280px-Xamarin-logo.svg.png",
        },
      ],
    },
    {
      category: "E-commerce",
      techs: [
        {
          name: "Shopify",
          logoUrl: "https://www.vectorlogo.zone/logos/shopify/shopify-icon.svg",
        },
        {
          name: "WooCommerce",
          logoUrl:
            "https://w7.pngwing.com/pngs/371/350/png-transparent-woocommerce-full-logo-tech-companies-thumbnail.png",
        },
        {
          name: "Magento",
          logoUrl:
            "https://toppng.com/uploads/preview/magento-logo-png-11536003311yclvjruylw.png",
        },
        {
          name: "Custom Solutions",
          logoUrl:
            "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRTewh9bnDa7pz4TUZ0jYvj53j2790hpWc-JA&s",
        },
      ],
    },
  ];

  return (
    <div className="py-20 px-6">
      <div className="container mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-4xl lg:text-5xl font-bold mb-6">
            Technology <span className="text-orange-500">Stack</span>
          </h2>
          <p
            className={`text-xl max-w-3xl mx-auto ${
              isDarkMode ? "text-neutral-400" : "text-gray-600"
            }`}
          >
            We work with cutting-edge technologies to deliver robust and
            scalable solutions
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {techStacks.map((stack, index) => (
            <div
              key={index}
              className={`p-6 rounded-2xl border ${
                isDarkMode
                  ? "bg-[#1d1d1d] border-neutral-800"
                  : "bg-white border-gray-200"
              }`}
            >
              <h3 className="text-xl font-bold mb-4 text-orange-500">
                {stack.category}
              </h3>
              <div className="flex flex-wrap gap-2">
                {stack.techs.map((tech, techIndex) => (
                  <div // Changed from span to div
                    key={techIndex}
                    className={`flex items-center px-3 py-1 rounded-full text-sm font-medium ${
                      // Added flex items-center
                      isDarkMode
                        ? "bg-[oklch(0.33_0.01_65.83)] text-neutral-300"
                        : "bg-gray-100 text-gray-700"
                    }`}
                  >
                    {tech.logoUrl && (
                      <img
                        src={tech.logoUrl}
                        alt={`${tech.name} logo`}
                        className="w-4 h-4 mr-2 object-contain"
                      />
                    )}
                    <span>{tech.name}</span>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

// Payment Partners Component
const PaymentPartnersSection = ({ theme }) => {
  const isDarkMode = theme === "dark";

  const paymentPartners = [
    {
      name: "Razorpay",
      type: "Gateway",
      logoUrl:
        "https://w7.pngwing.com/pngs/93/992/png-transparent-razorpay-logo-tech-companies-thumbnail.png",
    },
    {
      name: "Easebuzz",
      type: "Gateway",
      logoUrl:
        "https://mma.prnewswire.com/media/1717353/Easebuzz_Logo.jpg?p=facebook",
    },
    {
      name: "Pine Labs",
      type: "Gateway",
      logoUrl:
        "https://mma.prnewswire.com/media/812226/Pine_Labs_Logo.jpg?p=twitter",
    },
    {
      name: "PhonePe",
      type: "Gateway",
      logoUrl: "https://cdn.worldvectorlogo.com/logos/phonepe-1.svg",
    },
    {
      name: "Cashfree",
      type: "Gateway",
      logoUrl:
        "https://logowik.com/content/uploads/images/cashfree-payments7934.logowik.com.webp",
    },
    {
      name: "Juspay",
      type: "Orchestration",
      logoUrl:
        "https://5.imimg.com/data5/SELLER/Default/2023/9/348660587/XG/UI/FE/10194922/juspay-software.png",
    },
  ];

  return (
    <div
      className={`py-20 px-6 ${isDarkMode ? "bg-neutral-950" : "bg-gray-50"}`}
    >
      <div className="container mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-4xl lg:text-5xl font-bold mb-6">
            Payment <span className="text-orange-500">Partners</span>
          </h2>
          <p
            className={`text-xl max-w-3xl mx-auto ${
              isDarkMode ? "text-neutral-400" : "text-gray-600"
            }`}
          >
            Integrated with leading payment providers for seamless transaction
            processing
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {paymentPartners.map((partner, index) => (
            <div
              key={index}
              className={`p-6 rounded-xl border text-center transition-transform hover:scale-105 flex flex-col items-center justify-center ${
                isDarkMode
                  ? "bg-neutral-900 border-neutral-800"
                  : "bg-white border-gray-200"
              }`}
            >
              {partner.logoUrl ? (
                <img
                  src={partner.logoUrl}
                  alt={`${partner.name} logo`}
                  className="h-10 w-auto max-w-[120px] mx-auto mb-4 object-contain flex-shrink-0"
                />
              ) : (
                <CreditCard className="w-12 h-12 text-orange-500 mx-auto mb-4" />
              )}
              <h3 className="font-bold text-lg mb-2 mt-auto">{partner.name}</h3>
              <span
                className={`px-3 py-1 rounded-full text-sm ${
                  partner.type === "Orchestration"
                    ? isDarkMode
                      ? "bg-purple-900 text-purple-200"
                      : "bg-purple-100 text-purple-700"
                    : isDarkMode
                    ? "bg-green-900 text-green-200"
                    : "bg-green-100 text-green-700"
                }`}
              >
                {partner.type}
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

// Process Component
const ProcessSection = ({ theme }) => {
  const isDarkMode = theme === "dark";

  const processes = [
    {
      step: "01",
      title: "Discovery",
      description: "Understanding your requirements and objectives",
      icon: Users,
    },
    {
      step: "02",
      title: "Planning",
      description: "Strategic roadmap and technology selection",
      icon: Settings,
    },
    {
      step: "03",
      title: "Development",
      description: "Agile development with regular updates",
      icon: Code,
    },
    {
      step: "04",
      title: "Testing",
      description: "Comprehensive quality assurance",
      icon: Shield,
    },
    {
      step: "05",
      title: "Deployment",
      description: "Seamless launch and go-live support",
      icon: Zap,
    },
    {
      step: "06",
      title: "Support",
      description: "Ongoing maintenance and optimization",
      icon: Heart,
    },
  ];

  return (
    <div className="py-20 px-6">
      <div className="container mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-4xl lg:text-5xl font-bold mb-6">
            Our <span className="text-orange-500">Process</span>
          </h2>
          <p
            className={`text-xl max-w-3xl mx-auto ${
              isDarkMode ? "text-neutral-400" : "text-gray-600"
            }`}
          >
            A proven methodology that ensures successful project delivery
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {processes.map((process, index) => (
            <div
              key={index}
              className={`relative p-8 rounded-2xl border transition-all hover:scale-105 ${
                isDarkMode
                  ? "bg-[#191818] border-neutral-800"
                  : "bg-white border-gray-200"
              }`}
            >
              <div className="absolute -top-4 -left-4 w-12 h-12 bg-orange-500 rounded-full flex items-center justify-center text-white font-bold">
                {process.step}
              </div>
              <process.icon className="w-12 h-12 text-orange-500 mb-4" />
              <h3 className="text-xl font-bold mb-3">{process.title}</h3>
              <p className={isDarkMode ? "text-neutral-400" : "text-gray-600"}>
                {process.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

// CTA Section Component
const CTASection = ({ theme, openCallbackModal }) => {
  const isDarkMode = theme === "dark";

  return (
    <div className={`py-20 px-6 ${isDarkMode ? "bg-black" : "bg-orange-50"}`}>
      <div className="container mx-auto text-center">
        <div className="max-w-4xl mx-auto space-y-8">
          <h2 className="text-4xl lg:text-6xl font-bold">
            Ready to Start Your
            <span className="text-orange-500"> Project?</span>
          </h2>

          <p
            className={`text-xl lg:text-2xl ${
              isDarkMode ? "text-neutral-400" : "text-gray-600"
            }`}
          >
            Let's discuss how we can help transform your ideas into reality
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center pt-8">
            <button className="flex items-center justify-center px-8 py-4 bg-orange-500 text-white rounded-full font-semibold hover:bg-orange-600 transition-colors">
              <MessageSquare className="w-5 h-5 mr-2" />
              Start a Project
            </button>
            <button
              onClick={openCallbackModal}
              className={`flex items-center justify-center px-8 py-4 rounded-full font-semibold border-2 transition-colors ${
                isDarkMode
                  ? "border-neutral-300 text-neutral-300 hover:bg-neutral-300 hover:text-black"
                  : "border-black text-black hover:bg-black hover:text-white"
              }`}
            >
              <Phone className="w-5 h-5 mr-2" />
              Schedule Call
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

// Main Services Component
const ServicesPage = ({ theme = "light", color = "orange", openCallbackModal }) => { // Add openCallbackModal prop
  const [hoveredService, setHoveredService] = useState(null);

  const services = [
    {
      id: 1,
      icon: Code,
      title: "Web Development",
      description:
        "Custom web applications built with modern frameworks and best practices for optimal performance and user experience.",
      features: [
        "Responsive Design",
        "SEO Optimization",
        "Performance Optimization",
        "Cross-browser Compatibility",
        "Progressive Web Apps",
      ],
    },
    {
      id: 2,
      icon: Smartphone,
      title: "Mobile App Development",
      description:
        "Native and cross-platform mobile applications that provide seamless user experiences across all devices.",
      features: [
        "iOS & Android Development",
        "Cross-platform Solutions",
        "UI/UX Design",
        "App Store Optimization",
        "Push Notifications",
      ],
    },
    {
      id: 3,
      icon: ShoppingCart,
      title: "E-commerce Solutions",
      description:
        "Complete e-commerce platforms including Shopify, WooCommerce, and custom solutions tailored to your business needs.",
      features: [
        "Shopify Development",
        "WooCommerce Customization",
        "Payment Integration",
        "Inventory Management",
        "Multi-vendor Support",
      ],
    },
    {
      id: 4,
      icon: Database,
      title: "Software Development",
      description:
        "Enterprise-grade software solutions designed to streamline your business operations and boost productivity.",
      features: [
        "Custom Software",
        "API Development",
        "Database Design",
        "System Integration",
        "Cloud Migration",
      ],
    },
    {
      id: 5,
      icon: CreditCard,
      title: "Payment Solutions",
      description:
        "Comprehensive payment infrastructure setup including gateways and orchestration for secure transactions.",
      features: [
        "Payment Gateway Integration",
        "Payment Orchestration",
        "Fraud Prevention",
        "Multi-currency Support",
        "Compliance & Security",
      ],
    },
    {
      id: 6,
      icon: Palette,
      title: "Design Services",
      description:
        "Creative design solutions including UI/UX design, branding, and visual identity for digital products.",
      features: [
        "UI/UX Design",
        "Figma Prototyping",
        "Brand Identity",
        "Graphic Design",
        "Design Systems",
      ],
    },
    {
      id: 7,
      icon: Megaphone,
      title: "Digital Marketing",
      description:
        "Comprehensive digital marketing strategies to boost your online presence and drive business growth.",
      features: [
        "SEO & SEM",
        "Social Media Marketing",
        "Content Marketing",
        "Email Marketing",
        "Analytics & Reporting",
      ],
    },
    {
      id: 8,
      icon: Users,
      title: "Consulting & Support",
      description:
        "Expert consulting and ongoing support services to ensure your projects succeed and continue to evolve.",
      features: [
        "Technical Consulting",
        "Architecture Review",
        "24/7 Support",
        "Maintenance Services",
        "Team Augmentation",
      ],
    },
  ];

  return (
    <div
      className="transition-colors duration-500 min-h-screen"
      style={{
        backgroundColor: "var(--bg-primary)",
        color: "var(--text-primary)",
      }}
    >
      <ServicesHero theme={theme} />

      <div className="py-20 px-6">
        <div className="container mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl lg:text-5xl font-bold mb-6">
              What We <span className="text-orange-500">Offer</span>
            </h2>
            <p
              className={`text-xl max-w-3xl mx-auto ${
                theme === "dark" ? "text-neutral-400" : "text-gray-600"
              }`}
            >
              Comprehensive engineering solutions designed to accelerate your
              digital transformation
            </p>
          </div>

          <div className="grid lg:grid-cols-2 gap-8">
            {services.map((service) => (
              <ServiceCard
                key={service.id}
                service={service}
                theme={theme}
                isActive={hoveredService === service.id}
                onHover={setHoveredService}
                onOpenCallbackModal={(serviceTitle) => { // Use passed-in openCallbackModal
                  openCallbackModal(serviceTitle);
                }}
              />
            ))}
          </div>
        </div>
      </div>

      <TechStackSection theme={theme} />
      <PaymentPartnersSection theme={theme} />
      <ProcessSection theme={theme} />
      <CTASection
        theme={theme}
        openCallbackModal={() => { // Use passed-in openCallbackModal
          openCallbackModal(); // No argument for general CTA, or pass ''
        }}
      />
      {/* CallbackModal is now rendered in App.js */}
    </div>
  );
};

export default ServicesPage;
