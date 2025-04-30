import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { FiSave, FiX, FiArrowLeft } from "react-icons/fi";
import useForm from "../../hooks/useForm";
import {
  InputField,
  TextAreaField,
  SelectField,
  CheckboxField,
  DateField,
} from "../../components/common/FormFields";
import {
  fetchAdminInternshipById,
  updateInternshipAdmin,
} from "../../utils/api";
import { validateInternshipForm } from "../../utils/validation";

const InternshipEdit = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState(null);

  const initialValues = {
    title: "",
    department: "",
    location: "",
    description: "",
    requirements: "",
    benefits: "",
    stipend: "",
    duration: "",
    hours: "full-time",
    postedDate: "",
    deadline: "",
    status: "draft",
    isRemote: false,
    isFlexible: false,
  };

  const {
    values,
    errors,
    handleChange,
    handleSubmit,
    setFieldValue,
    setValues,
  } = useForm({
    initialValues,
    validate: validateInternshipForm,
    onSubmit: async (formValues) => {
      try {
        setSaving(true);
        await updateInternshipAdmin(id, formValues);
        navigate(`/admin/internships/${id}`);
      } catch (error) {
        console.error("Failed to update internship", error);
        setSaving(false);
      }
    },
  });

  useEffect(() => {
    const loadInternship = async () => {
      try {
        setLoading(true);
        const data = await fetchAdminInternshipById(id);
        setValues({
          ...data,
          postedDate: data.postedDate.split("T")[0],
          deadline: data.deadline.split("T")[0],
        });
      } catch (error) {
        console.error("Failed to load internship", error);
        setError("Failed to load internship details. Please try again.");
      } finally {
        setLoading(false);
      }
    };

    loadInternship();
  }, [id, setValues]);

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
    { value: "active", label: "Active" },
    { value: "expired", label: "Expired" },
    { value: "filled", label: "Filled" },
  ];

  if (loading) {
    return (
      <div className="bg-white rounded-lg shadow p-6">
        <div className="flex justify-center items-center h-64">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="bg-white rounded-lg shadow p-6">
        <div className="text-center py-8">
          <p className="text-red-600 mb-4">{error}</p>
          <button
            onClick={() => navigate("/admin/internships")}
            className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
          >
            Back to Internships
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-lg shadow p-6">
      <div className="flex justify-between items-center mb-6">
        <div className="flex items-center">
          <button
            onClick={() => navigate(`/admin/internships/${id}`)}
            className="mr-4 text-gray-600 hover:text-blue-600"
          >
            <FiArrowLeft size={20} />
          </button>
          <h1 className="text-2xl font-bold text-gray-800">Edit Internship</h1>
        </div>
        <div className="flex space-x-3">
          <button
            onClick={() => navigate(`/admin/internships/${id}`)}
            className="flex items-center px-4 py-2 border rounded text-gray-700 hover:bg-gray-50"
          >
            <FiX className="mr-2" />
            Cancel
          </button>
          <button
            onClick={handleSubmit}
            disabled={saving}
            className="flex items-center px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 disabled:bg-blue-300"
          >
            <FiSave className="mr-2" />
            {saving ? "Saving..." : "Save Changes"}
          </button>
        </div>
      </div>

      <form className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <TextAreaField
            label="Internship Title"
            name="title"
            value={values.title}
            onChange={handleChange}
            error={errors.title}
            required
          />
          <SelectField
            label="Department"
            name="department"
            value={values.department}
            onChange={handleChange}
            options={departmentOptions}
            error={errors.department}
            required
          />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <SelectField
            label="Location Type"
            name="location"
            value={values.location}
            onChange={handleChange}
            options={locationOptions}
            error={errors.location}
            required
          />
          <TextAreaField
            label="Stipend"
            name="stipend"
            value={values.stipend}
            onChange={handleChange}
            error={errors.stipend}
            placeholder="e.g. $1000/month"
          />
          <TextAreaField
            label="Duration"
            name="duration"
            value={values.duration}
            onChange={handleChange}
            error={errors.duration}
            placeholder="e.g. 3 months"
            required
          />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <SelectField
            label="Hours"
            name="hours"
            value={values.hours}
            onChange={handleChange}
            options={hoursOptions}
            error={errors.hours}
          />
          <DateField
            label="Posted Date"
            name="postedDate"
            value={values.postedDate}
            onChange={handleChange}
            error={errors.postedDate}
            required
          />
          <DateField
            label="Application Deadline"
            name="deadline"
            value={values.deadline}
            onChange={handleChange}
            error={errors.deadline}
            required
          />
        </div>

        <TextAreaField
          label="Description"
          name="description"
          value={values.description}
          onChange={handleChange}
          error={errors.description}
          rows={5}
          required
        />

        <TextAreaField
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
        />

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="col-span-1">
            <SelectField
              label="Status"
              name="status"
              value={values.status}
              onChange={handleChange}
              options={statusOptions}
              error={errors.status}
            />
          </div>
          <div className="col-span-2 pt-6 flex space-x-6">
            <CheckboxField
              label="Remote Work Available"
              name="isRemote"
              checked={values.isRemote}
              onChange={(e) => setFieldValue("isRemote", e.target.checked)}
            />
            <CheckboxField
              label="Flexible Hours"
              name="isFlexible"
              checked={values.isFlexible}
              onChange={(e) => setFieldValue("isFlexible", e.target.checked)}
            />
          </div>
        </div>
      </form>
    </div>
  );
};

export default InternshipEdit;
