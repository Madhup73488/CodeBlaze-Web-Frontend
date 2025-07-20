import React from 'react';
import { CheckCircle } from 'lucide-react';
import './WhyChooseCodeblaze.css';

const WhyChooseCodeblaze = () => {
  return (
    <section className="py-16" style={{ backgroundColor: 'hsl(var(--website-background))' }}>
      <div className="container mx-auto">
        <div className="text-left sm:text-center mb-12">
          <h2 className="text-2xl sm:text-3xl font-bold text-gray-900">
            Why Choose <span className="text-red-500">Codeblaze</span>?
          </h2>
          <p className="text-gray-600 mt-4 max-w-2xl mx-auto">
            Our internship programs are designed to give you real-world experience with the tools and methodologies top companies use.
          </p>
        </div>
        <div className="grid lg:grid-cols-2 gap-8 items-center">
          <div>
            <h3 className="text-2xl font-bold text-gray-900 mb-4">
              Embracing Agile Methodology
            </h3>
            <p className="text-gray-600 mb-6">
              We follow the Agile methodology to manage our projects, ensuring that you learn to work in a collaborative, iterative, and flexible environment. This approach will prepare you for the fast-paced world of software development.
            </p>
            <ul className="space-y-4">
              <li className="flex items-start">
                <CheckCircle className="w-6 h-6 text-green-500 mr-3 flex-shrink-0" />
                <span>Gain hands-on experience with industry-standard project management tools like Jira, Slack, and GitHub.</span>
              </li>
              <li className="flex items-start">
                <CheckCircle className="w-6 h-6 text-green-500 mr-3 flex-shrink-0" />
                <span>Learn to collaborate effectively with a team, manage tasks, and track progress using Atlassian's powerful suite of tools.</span>
              </li>
              <li className="flex items-start">
                <CheckCircle className="w-6 h-6 text-green-500 mr-3 flex-shrink-0" />
                <span>Get familiar with Git for version control, a fundamental skill for any software developer.</span>
              </li>
            </ul>
          </div>
          <div>
            <img
              src="https://images.unsplash.com/photo-1556761175-5973dc0f32e7?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
              alt="Agile Methodology"
              className="rounded-lg shadow-lg"
            />
          </div>
        </div>
      </div>
    </section>
  );
};

export default WhyChooseCodeblaze;
