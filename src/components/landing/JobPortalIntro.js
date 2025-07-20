import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from '../ui/button';
import './JobPortalIntro.css';

const JobPortalIntro = () => {
  return (
    <section className="py-16" style={{ backgroundColor: 'hsl(var(--website-background))' }}>
      <div className="container mx-auto">
        <div className="grid lg:grid-cols-2 gap-8 items-center">
          <div>
            <h2 className="text-2xl sm:text-3xl font-bold text-left sm:text-center text-gray-900 mb-4">
              Find Your <span className="text-red-500">Dream Job</span> with Codeblaze
            </h2>
            <p className="text-gray-600 mb-6">
              Our job portal is designed to connect talented individuals with top companies. Whether you're a recent graduate or an experienced professional, we have opportunities for you.
            </p>
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
