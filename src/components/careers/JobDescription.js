// components/Careers/JobDescription.js
import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/router";
import JobApplicationForm from "./JobApplicationForm";

const JobDescription = ({ job, theme, colorStyles }) => {
  const router = useRouter();
  const [activeTab, setActiveTab] = useState("overview");

  if (!job) {
    return <div>Loading job details...</div>;
  }

  return (
    <div className="max-w-6xl mx-auto px-4 py-12">
      {/* Back Button */}
      <div className="mb-8">
        <button
          onClick={() => router.push("/careers")}
          className="flex items-center text-sm font-medium"
          style={{ color: colorStyles.primary }}
        >
          <svg
            width="20"
            height="20"
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            className="mr-1"
          >
            <path
              d="M19 12H5M5 12L12 19M5 12L12 5"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
          Back to All Jobs
        </button>
      </div>

      {/* Job Header */}
      <div className="mb-10">
        <h1 className="text-3xl font-bold mb-4">{job.title}</h1>
        <div className="flex flex-wrap gap-4 mb-6">
          <div className="flex items-center">
            <svg
              width="20"
              height="20"
              viewBox="0 0 24 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              className="mr-2"
              style={{ color: colorStyles.secondary }}
            >
              <path
                d="M20 10V7C20 5.89543 19.1046 5 18 5H6C4.89543 5 4 5.89543 4 7V10M20 10V19C20 20.1046 19.1046 21 18 21H6C4.89543 21 4 20.1046 4 19V10M20 10H4M8 3V7M16 3V7"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
              />
            </svg>
            <span>{job.employmentType}</span>
          </div>
          <div className="flex items-center">
            <svg
              width="20"
              height="20"
              viewBox="0 0 24 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              className="mr-2"
              style={{ color: colorStyles.secondary }}
            >
              <path
                d="M17.6569 16.6569C16.7202 17.5935 15.4798 18.2017 14.1467 18.391C12.8136 18.5803 11.4597 18.3397 10.286 17.7068C9.11228 17.0739 8.18325 16.0832 7.65432 14.8762C7.1254 13.6693 7.02737 12.3159 7.37629 11.0462C7.7252 9.77647 8.49845 8.66544 9.5552 7.89261C10.612 7.11977 11.8958 6.72911 13.1937 6.78921C14.4916 6.84932 15.7273 7.35765 16.6998 8.23017C17.6724 9.10268 18.3259 10.285 18.555 11.569M18.555 11.569L20.998 12.255M18.555 11.569L17.682 14.05"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
              <path
                d="M12 8V12L14 14"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
            <span>Posted {job.postedDate}</span>
          </div>
          <div className="flex items-center">
            <svg
              width="20"
              height="20"
              viewBox="0 0 24 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              className="mr-2"
              style={{ color: colorStyles.secondary }}
            >
              <path
                d="M3 21.0001L3.21945 20.5556C4.0786 18.8395 5.55852 17.5083 7.37402 16.8218C9.1895 16.1353 11.1905 16.1465 13 16.8531M20.9999 21.0001L20.7805 20.5556C19.9213 18.8395 18.4414 17.5083 16.626 16.8218C14.8105 16.1353 12.8095 16.1465 11 16.8531M15 7C15 8.65685 13.6569 10 12 10C10.3431 10 9 8.65685 9 7C9 5.34315 10.3431 4 12 4C13.6569 4 15 5.34315 15 7ZM22 7C22 8.65685 20.6569 10 19 10C17.3431 10 16 8.65685 16 7C16 5.34315 17.3431 4 19 4C20.6569 4 22 5.34315 22 7ZM8 7C8 8.65685 6.65685 10 5 10C3.34315 10 2 8.65685 2 7C2 5.34315 3.34315 4 5 4C6.65685 4 8 5.34315 8 7Z"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
            <span>{job.department}</span>
          </div>
          <div className="flex items-center">
            <svg
              width="20"
              height="20"
              viewBox="0 0 24 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              className="mr-2"
              style={{ color: colorStyles.secondary }}
            >
              <path
                d="M20 10C20 14.4183 12 22 12 22C12 22 4 14.4183 4 10C4 5.58172 7.58172 2 12 2C16.4183 2 20 5.58172 20 10Z"
                stroke="currentColor"
                strokeWidth="2"
              />
              <path
                d="M12 11C12.5523 11 13 10.5523 13 10C13 9.44772 12.5523 9 12 9C11.4477 9 11 9.44772 11 10C11 10.5523 11.4477 11 12 11Z"
                stroke="currentColor"
                strokeWidth="2"
              />
            </svg>
            <span>{job.location}</span>
          </div>
          <div className="flex items-center">
            <svg
              width="20"
              height="20"
              viewBox="0 0 24 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              className="mr-2"
              style={{ color: colorStyles.secondary }}
            >
              <path
                d="M12 6V12L16 16M22 12C22 17.5228 17.5228 22 12 22C6.47715 22 2 17.5228 2 12C2 6.47715 6.47715 2 12 2C17.5228 2 22 6.47715 22 12Z"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
            <span>{job.applicationDeadline || "Open until filled"}</span>
          </div>
        </div>
      </div>

      {/* Tabs */}
      <div className="flex border-b mb-8">
        <button
          onClick={() => setActiveTab("overview")}
          className={`py-3 px-5 font-medium ${
            activeTab === "overview"
              ? "border-b-2 font-semibold"
              : "text-gray-500"
          }`}
          style={
            activeTab === "overview"
              ? { borderColor: colorStyles.primary, color: colorStyles.primary }
              : {}
          }
        >
          Job Overview
        </button>
        <button
          onClick={() => setActiveTab("apply")}
          className={`py-3 px-5 font-medium ${
            activeTab === "apply" ? "border-b-2 font-semibold" : "text-gray-500"
          }`}
          style={
            activeTab === "apply"
              ? { borderColor: colorStyles.primary, color: colorStyles.primary }
              : {}
          }
        >
          Apply Now
        </button>
      </div>

      {/* Tab Content */}
      <div className="py-4">
        {activeTab === "overview" ? (
          <div className="job-description">
            <div className="mb-8">
              <h3 className="text-xl font-semibold mb-4">About the Role</h3>
              <div dangerouslySetInnerHTML={{ __html: job.description }} />
            </div>

            <div className="mb-8">
              <h3 className="text-xl font-semibold mb-4">Requirements</h3>
              <div dangerouslySetInnerHTML={{ __html: job.requirements }} />
            </div>

            <div className="mb-8">
              <h3 className="text-xl font-semibold mb-4">Responsibilities</h3>
              <div dangerouslySetInnerHTML={{ __html: job.responsibilities }} />
            </div>

            <div className="mb-8">
              <h3 className="text-xl font-semibold mb-4">Benefits</h3>
              <div dangerouslySetInnerHTML={{ __html: job.benefits }} />
            </div>

            <div className="text-center mt-10">
              <button
                onClick={() => setActiveTab("apply")}
                className="px-8 py-3 rounded-md text-white font-medium text-lg transition-all hover:opacity-90"
                style={{ backgroundColor: colorStyles.primary }}
              >
                Apply for this Position
              </button>
            </div>
          </div>
        ) : (
          <JobApplicationForm
            job={job}
            theme={theme}
            colorStyles={colorStyles}
          />
        )}
      </div>
    </div>
  );
};

export default JobDescription;
