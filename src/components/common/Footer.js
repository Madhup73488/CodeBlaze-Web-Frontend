import { Facebook, Twitter, Linkedin, Instagram, Youtube } from "lucide-react";
import { Link } from "react-router-dom";
import codeblazeLogo from "../../assets/images/codeblazelogoorange.png";

export default function Footer() {
  const footerLinks = {
    Courses: [
      { name: "All Courses", href: "/courses" },
      { name: "Web Development", href: "/courses?category=frontend" },
      { name: "Data Science", href: "/courses?category=data-science" },
      { name: "AI/ML", href: "/courses?category=ai-ml" },
    ],
    Internships: [
      { name: "All Internships", href: "/internships" },
      { name: "Full-Stack", href: "/internships?category=fullstack" },
      { name: "Frontend", href: "/internships?category=frontend" },
      { name: "Backend", href: "/internships?category=backend" },
    ],
    "Training Programs": [
      { name: "Corporate Training", href: "/training" },
      { name: "Placement Guidance", href: "/placement-guidance" },
    ],
    "Live Webinars": [{ name: "Upcoming Webinars", href: "/webinars" }],
    Company: [
      { name: "About Us", href: "/about" },
      { name: "Careers", href: "/careers" },
      { name: "Blog", href: "/blog" },
    ],
    Support: [
      { name: "Contact Us", href: "/contact" },
      { name: "FAQ", href: "/faq" },
    ],
  };

  return (
    <footer
      className="border-t border-gray-200"
      style={{ backgroundColor: "hsl(var(--website-background))" }}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-8 mb-12">
          {Object.entries(footerLinks).map(([category, links]) => (
            <div key={category}>
              <h3 className="font-semibold text-gray-900 mb-4">{category}</h3>
              <ul className="space-y-2">
                {links.map((link, index) => (
                  <li key={index}>
                    <Link
                      to={link.href}
                      className="text-sm text-gray-600 hover:text-primary transition-colors"
                    >
                      {link.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="border-t border-gray-200 pt-8">
          <div className="flex flex-col lg:flex-row justify-between items-center">
            <div className="mb-6 lg:mb-0">
              <Link to="/" className="flex items-center">
                <img src={codeblazeLogo} alt="Codeblaze" className="h-8" />
                <span className="ml-2 text-2xl font-bold text-primary">
                  Codeblaze
                </span>
              </Link>
            </div>

            <div>
              <h3 className="font-semibold text-gray-900 mb-4 text-center">
                Follow us
              </h3>
              <div className="flex space-x-4">
                <a
                  href="#"
                  className="text-gray-600 hover:text-primary transition-colors"
                >
                  <Facebook className="w-5 h-5" />
                </a>
                <a
                  href="#"
                  className="text-gray-600 hover:text-primary transition-colors"
                >
                  <Twitter className="w-5 h-5" />
                </a>
                <a
                  href="#"
                  className="text-gray-600 hover:text-primary transition-colors"
                >
                  <Linkedin className="w-5 h-5" />
                </a>
                <a
                  href="#"
                  className="text-gray-600 hover:text-primary transition-colors"
                >
                  <Instagram className="w-5 h-5" />
                </a>
                <a
                  href="#"
                  className="text-gray-600 hover:text-primary transition-colors"
                >
                  <Youtube className="w-5 h-5" />
                </a>
              </div>
            </div>
          </div>
        </div>

        <div className="border-t border-gray-200 pt-8 mt-8">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="mb-4 md:mb-0">
              <p className="text-sm text-gray-600">
                © 2024 Codeblaze Inc. All rights reserved.
              </p>
            </div>
            <div className="flex items-center space-x-6">
              <Link
                to="/terms"
                className="text-sm text-gray-600 hover:text-primary transition-colors"
              >
                Terms
              </Link>
              <Link
                to="/privacy"
                className="text-sm text-gray-600 hover:text-primary transition-colors"
              >
                Privacy
              </Link>
              <a
                href="#"
                className="text-sm text-gray-600 hover:text-primary transition-colors"
              >
                Cookie Preferences
              </a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
