import InternshipCard from "../Internships/InternshipCard";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { Button } from "../ui/button";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { internships as internshipsData } from "../ForStudents/internshipsData";
import { motion } from "framer-motion";
import "./AvailableInternships.css";

export default function AvailableInternships() {
  const navigate = useNavigate();
  const [currentSlide, setCurrentSlide] = useState(0);
  const [itemsPerSlide, setItemsPerSlide] = useState(4);

  const internships = internshipsData;

  const updateItemsPerSlide = () => {
    if (window.innerWidth < 768) {
      setItemsPerSlide(1);
    } else if (window.innerWidth < 1024) {
      setItemsPerSlide(2);
    } else {
      setItemsPerSlide(2);
    }
  };

  useEffect(() => {
    updateItemsPerSlide();
    window.addEventListener("resize", updateItemsPerSlide);
    return () => window.removeEventListener("resize", updateItemsPerSlide);
  }, []);

  const nextSlide = () => {
    setCurrentSlide((prev) => {
      if (prev >= internships.length - itemsPerSlide) {
        return 0;
      }
      return prev + 1;
    });
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => {
      if (prev === 0) {
        return internships.length - itemsPerSlide;
      }
      return prev - 1;
    });
  };

  useEffect(() => {
    const interval = setInterval(() => {
      nextSlide();
    }, 3000);
    return () => clearInterval(interval);
  }, [itemsPerSlide]);

  return (
    <section className="py-16 available-internships" style={{ backgroundColor: 'hsl(var(--website-background))' }}>
      <div className="container max-w-7xl mx-auto">
        {/* Section Header */}
        <div className="text-left sm:text-center mb-8">
          <h2 className="text-2xl sm:text-3xl font-bold text-gray-900">Available <span className="text-red-500">Internships</span></h2>
          <div className="hidden md:flex items-center space-x-2 justify-center">
            <Button
              variant="outline"
              size="sm"
              onClick={prevSlide}
              className="w-10 h-10 p-0 rounded-full"
            >
              <ChevronLeft className="w-5 h-5" />
            </Button>
            <Button
              variant="outline"
              size="sm"
              onClick={nextSlide}
              className="w-10 h-10 p-0 rounded-full"
            >
              <ChevronRight className="w-5 h-5" />
            </Button>
          </div>
        </div>

        {/* Internship Cards Slider */}
        <div className="relative h-[450px]">
          <motion.div
            className="flex items-center h-full"
            animate={{ x: `-${currentSlide * (100 / itemsPerSlide)}%` }}
            transition={{ duration: 0.5, ease: "easeInOut" }}
          >
            {internships.map((internship, index) => (
              <div
                key={internship.id}
                className={`flex-shrink-0 p-2 ${index === currentSlide ? 'active' : ''}`}
                style={{ width: `${100 / itemsPerSlide}%` }}
              >
                <div className="h-full">
                <InternshipCard
                  internship={internship}
                  savedInternships={[]}
                  appliedInternships={[]}
                  toggleSaveInternship={() => {}}
                  formatDate={() => {}}
                />
                </div>
              </div>
            ))}
          </motion.div>
        </div>

        <div className="flex md:hidden items-center justify-center space-x-4 mt-8">
          <div className="flex items-center space-x-2">
            <Button
              variant="outline"
              size="sm"
              onClick={prevSlide}
              className="w-10 h-10 p-0 rounded-full"
            >
              <ChevronLeft className="w-5 h-5" />
            </Button>
            <Button
              variant="outline"
              size="sm"
              onClick={nextSlide}
              className="w-10 h-10 p-0 rounded-full"
            >
              <ChevronRight className="w-5 h-5" />
            </Button>
          </div>
          <Button
            variant="outline"
            className="px-8 py-2 text-primary border-primary hover:bg-primary hover:text-white"
            onClick={() => navigate("/internships")}
          >
            Show More
          </Button>
        </div>
      </div>
    </section>
  );
}
