import React from "react";
import { Link } from "react-router-dom";
import { Button } from "../ui/button";
import { Search, FileText, Briefcase } from "lucide-react";
import "./JobPortalIntro.css";

const JobPortalIntro = () => {
  return (
    <section className="pt-16">
      <div className="container mx-auto">
        <div className="text-left sm:text-center mb-4 md:mb-12">
          <h2 className="text-2xl sm:text-3xl font-bold text-gray-900">
            Find Your <span className="text-red-500">Dream Job</span> with
            Codeblaze
          </h2>
        </div>
        <div className="grid lg:grid-cols-2 gap-8 items-center">
          <div>
            <h3 className="hidden lg:block text-xl font-semibold text-gray-800 mb-4">
              Your Journey to a New Career Starts Here
            </h3>
            <p className="text-gray-600 mb-6">
              Our job portal is designed to connect talented individuals with
              top companies. Whether you're a recent graduate or an experienced
              professional, we have opportunities for you.
            </p>
            <ul className="hidden lg:flex flex-col space-y-4 mb-6">
              <li className="flex items-start">
                <Search className="w-6 h-6 text-red-500 mr-4 mt-1" />
                <div>
                  <h4 className="font-semibold">Explore Opportunities</h4>
                  <p className="text-gray-600">
                    Explore thousands of job listings from top companies in
                    various industries.
                  </p>
                </div>
              </li>
              <li className="flex items-start">
                <FileText className="w-6 h-6 text-red-500 mr-4 mt-1" />
                <div>
                  <h4 className="font-semibold">Apply with Ease</h4>
                  <p className="text-gray-600">
                    Apply with your resume and cover letter in just a few
                    clicks.
                  </p>
                </div>
              </li>
              <li className="flex items-start">
                <Briefcase className="w-6 h-6 text-red-500 mr-4 mt-1" />
                <div>
                  <h4 className="font-semibold">Get Hired</h4>
                  <p className="text-gray-600">
                    Get interview calls from top companies and land your dream
                    job.
                  </p>
                </div>
              </li>
            </ul>
            <Button asChild>
              <Link to="/job-seekers">Explore Job Portal</Link>
            </Button>
          </div>
          <div>
            <img
              src="https://images.unsplash.com/photo-1521791136064-7986c2920216?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
              alt="Job Portal"
              className="rounded-lg shadow-lg"
            />
          </div>
        </div>
      </div>
    </section>
  );
};

export default JobPortalIntro;
