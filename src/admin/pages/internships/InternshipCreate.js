// src/admin/pages/internships/InternshipCreate.js

import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { FiSave, FiX } from "react-icons/fi";
import useForm from "../../hooks/useForm"; // Path appears correct
import {
  InputField,
  TextAreaField,
  SelectField,
  CheckboxField,
  DateField,
} from "../../components/common/FormFields"; // Path appears correct
// FIX: Import the function with the correct name
import { createInternshipAdmin } from "../../utils/api"; // Path appears correct
// Validation function import is correct
import { validateInternshipForm } from "../../utils/validation";

const InternshipCreate = () => {
  const navigate = useNavigate();
  const [saving, setSaving] = useState(false);

  // Note: The initialValues structure should ideally match your backend Internship model
  // Your backend controller didn't list all these fields for create, only implied them via model
  // Ensure this matches what your createJobAdmin/createInternshipAdmin endpoint expects.
  const initialValues = {
    title: "",
    // department: "", // Not explicitly in your backend Internship model fields shown
    // location: "", // Backend model has location
    description: "",
    // requirements: "", // Not explicitly in your backend Internship model fields shown
    // benefits: "", // Not explicitly in your backend Internship model fields shown
    stipend: "", // Backend model might have salary/stipend
    duration: "", // Backend model might have duration
    // hours: "full-time", // Not explicitly in your backend Internship model fields shown
    // postedDate: new Date().toISOString().split("T")[0], // Backend uses createdAt automatically? Or needs a posted date?
    deadline: "", // Backend model doesn't seem to have deadline based on controller
    status: "draft", // Backend model has status
    isRemote: false, // Backend model might have isRemote
    // isFlexible: false, // Not explicitly in your backend Internship model fields shown
    company: "", // Added based on your backend Job/Internship models having 'company'
    // userId: "auto" // Assuming user ID is added by the backend based on auth
  };

  const { values, errors, handleChange, handleSubmit, setFieldValue } = useForm(
    {
      initialValues,
      validate: validateInternshipForm, // Make sure validateInternshipForm matches the schema you intend to send
      onSubmit: async (formValues) => {
        try {
          setSaving(true);
          // FIX: Call the function with the correct name
          // Assuming the API call returns the created internship object in response.data
          const response = await createInternshipAdmin(formValues);
          // Assuming the created object has an _id field from MongoDB
          navigate(`/admin/internships/${response.data._id}`); // Use _id from backend response
        } catch (error) {
          console.error("Failed to create internship", error);
          // TODO: Display error message to the user
          setSaving(false);
        }
      },
    }
  );

  // Ensure these options align with your backend's expected values if applicable
  const departmentOptions = [
    { value: "", label: "Select Department" },
    { value: "engineering", label: "Engineering" },
    { value: "marketing", label: "Marketing" },
    { value: "design", label: "Design" },
    { value: "hr", label: "Human Resources" },
    { value: "finance", label: "Finance" },
    { value: "operations", label: "Operations" },
    { value: "sales", label: "Sales" },
    { value: "customer-service", label: "Customer Service" },
    { value: "research", label: "Research & Development" },
  ];

  const locationOptions = [
    { value: "", label: "Select Location Type" },
    { value: "remote", label: "Remote" },
    { value: "hybrid", label: "Hybrid" },
    { value: "onsite", label: "On-site" },
  ];

  const hoursOptions = [
    { value: "full-time", label: "Full-time" },
    { value: "part-time", label: "Part-time" },
  ];

  const statusOptions = [
    { value: "draft", label: "Draft" },
    { value: "active", label: "Active" }, // Match backend statuses if needed
    // Add other statuses like 'closed', 'expired' if applicable
  ];


  // Add AdminLayout wrapper if this page is meant to be within the admin layout
  // Assuming AdminLayout handles the padding/margins, move the p-6 to content area
  return (
     // If this page is rendered within the AdminLayout already (e.g., via AdminRoute),
     // you might not need this wrapper here. If it's a standalone page, keep it.
    // <AdminLayout>
      <div className="bg-white rounded-lg shadow p-6">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-2xl font-bold text-gray-800">
            Create New Internship
          </h1>
          <div className="flex space-x-3">
            <button
              onClick={() => navigate("/admin/internships")} // Ensure this is the correct navigation path
              className="flex items-center px-4 py-2 border rounded text-gray-700 hover:bg-gray-50"
              disabled={saving} // Disable cancel button while saving
            >
              <FiX className="mr-2" />
              Cancel
            </button>
            <button
              onClick={handleSubmit}
              disabled={saving} // Disable while saving
              className="flex items-center px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 disabled:bg-blue-300"
            >
              <FiSave className="mr-2" />
              {saving ? "Saving..." : "Save Internship"}
            </button>
          </div>
        </div>

        {/* TODO: Add ErrorMessage component here if errors occur outside form validation */}
         {/* Example: {apiError && <ErrorMessage message={apiError} />} */}

        <form className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <InputField
              label="Internship Title"
              name="title"
              value={values.title}
              onChange={handleChange}
              error={errors.title}
              required
            />
             <InputField // Added Company field based on backend model
                label="Company Name"
                name="company"
                value={values.company}
                onChange={handleChange}
                error={errors.company}
                required
              />
          </div>

           {/* Adjust form fields and sections based on your final Internship model */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
             {/* Assuming location type is selected, maybe add a specific address/city field? */}
            <SelectField
              label="Location Type"
              name="location" // Matches backend model field name
              value={values.location}
              onChange={handleChange}
              options={locationOptions} // Ensure options match expected backend values
              error={errors.location}
              required
            />
             {/* Department was not in backend model, remove or adjust */}
            {/* <SelectField
              label="Department"
              name="department"
              value={values.department}
              onChange={handleChange}
              options={departmentOptions}
              error={errors.department}
              required
            /> */}
            <InputField
              label="Stipend"
              name="stipend"
              value={values.stipend}
              onChange={handleChange}
              error={errors.stipend}
              placeholder="e.g. $1000/month"
              // Add validation for number if needed
            />
            <InputField
              label="Duration"
              name="duration"
              value={values.duration}
              onChange={handleChange}
              error={errors.duration}
              placeholder="e.g. 3 months"
              required
            />
          </div>

           <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Hours was not in backend model, remove or adjust */}
             {/* <SelectField
               label="Hours"
               name="hours"
               value={values.hours}
               onChange={handleChange}
               options={hoursOptions}
               error={errors.hours}
             /> */}
             {/* Posted Date was not in backend model's controller, remove or adjust */}
             {/* <DateField
               label="Posted Date"
               name="postedDate"
               value={values.postedDate}
               onChange={handleChange}
               error={errors.postedDate}
               required
             /> */}
             {/* Deadline was not in backend model's controller, remove or adjust */}
             {/* <DateField
               label="Application Deadline"
               name="deadline"
               value={values.deadline}
               onChange={handleChange}
               error={errors.deadline}
               required
             /> */}

              {/* Assuming status is sent in the initial create payload */}
               <SelectField
                 label="Status"
                 name="status" // Matches backend model field name
                 value={values.status}
                 onChange={handleChange}
                 options={statusOptions} // Ensure options match expected backend values
                 error={errors.status}
                 required // Status is likely required
               />
               {/* Assuming isRemote checkbox exists */}
               <div className="pt-6"> {/* Add padding top to align baseline */}
                   <CheckboxField
                     label="Remote Work Available"
                     name="isRemote" // Matches backend model field name
                     checked={values.isRemote}
                     onChange={(e) => setFieldValue("isRemote", e.target.checked)}
                   />
               </div>
           </div>


          <TextAreaField
            label="Description"
            name="description" // Matches backend model field name
            value={values.description}
            onChange={handleChange}
            error={errors.description}
            rows={5}
            required
          />

           {/* Requirements and Benefits were not explicitly in backend model, remove or adjust */}
           {/* <TextAreaField
             label="Requirements"
             name="requirements"
             value={values.requirements}
             onChange={handleChange}
             error={errors.requirements}
             rows={5}
             required
           />

           <TextAreaField
             label="Benefits"
             name="benefits"
             value={values.benefits}
             onChange={handleChange}
             error={errors.benefits}
             rows={3}
           /> */}


           {/* isFlexible checkbox was not in backend model, remove or adjust */}
           {/* <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
             <div className="col-span-2 pt-6 flex space-x-6">
               <CheckboxField
                 label="Flexible Hours"
                 name="isFlexible"
                 checked={values.isFlexible}
                 onChange={(e) => setFieldValue("isFlexible", e.target.checked)}
               />
             </div>
           </div> */}
        </form>
      </div>
    // </AdminLayout>
  );
};

export default InternshipCreate;