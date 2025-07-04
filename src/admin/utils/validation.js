// Validation helper functions for form inputs

/**
 * Validates if a value is not empty
 * @param {string} value - The value to check
 * @returns {boolean} - True if the value is not empty
 */
export const isNotEmpty = (value) => {
  if (value === null || value === undefined) return false;
  return value.toString().trim().length > 0;
};

/**
 * Validates if a value is a valid email format
 * @param {string} email - Email to validate
 * @returns {boolean} - True if email is valid
 */
export const isValidEmail = (email) => {
  if (!email) return false;
  const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
  return emailRegex.test(email);
};

/**
 * Validates if a value is a valid URL format
 * @param {string} url - URL to validate
 * @returns {boolean} - True if URL is valid
 */
export const isValidUrl = (url) => {
  if (!url) return false;
  try {
    new URL(url);
    return true;
  } catch (e) {
    return false;
  }
};

/**
 * Validates if a value is a valid phone number
 * @param {string} phone - Phone number to validate
 * @returns {boolean} - True if phone number is valid
 */
export const isValidPhone = (phone) => {
  if (!phone) return false;
  // Basic phone validation - adjust regex as needed for your requirements
  const phoneRegex = /^\+?[0-9]{10,15}$/;
  return phoneRegex.test(phone.replace(/[\s()-]/g, ""));
};

/**
 * Validates if a value has a minimum length
 * @param {string} value - The value to check
 * @param {number} minLength - Minimum required length
 * @returns {boolean} - True if value meets minimum length
 */
export const hasMinLength = (value, minLength) => {
  if (!value) return false;
  return value.toString().length >= minLength;
};

/**
 * Validates if a value doesn't exceed maximum length
 * @param {string} value - The value to check
 * @param {number} maxLength - Maximum allowed length
 * @returns {boolean} - True if value doesn't exceed maximum length
 */
export const hasMaxLength = (value, maxLength) => {
  if (!value) return true; // Empty values pass max length check
  return value.toString().length <= maxLength;
};

/**
 * Validates if a value is a number
 * @param {any} value - The value to check
 * @returns {boolean} - True if value is a number
 */
export const isNumber = (value) => {
  if (value === null || value === undefined || value === "") return false;
  return !isNaN(Number(value));
};

/**
 * Validates if a value is within a numeric range
 * @param {number} value - The value to check
 * @param {number} min - Minimum value
 * @param {number} max - Maximum value
 * @returns {boolean} - True if value is within range
 */
export const isInRange = (value, min, max) => {
  if (!isNumber(value)) return false;
  const num = Number(value);
  return num >= min && num <= max;
};

/**
 * Validates if a date is in the future
 * @param {string|Date} date - Date to check
 * @returns {boolean} - True if date is in the future
 */
export const isFutureDate = (date) => {
  if (!date) return false;
  const currentDate = new Date();
  const checkDate = new Date(date);
  return checkDate > currentDate;
};

/**
 * Validates if a date is in the past
 * @param {string|Date} date - Date to check
 * @returns {boolean} - True if date is in the past
 */
export const isPastDate = (date) => {
  if (!date) return false;
  const currentDate = new Date();
  const checkDate = new Date(date);
  return checkDate < currentDate;
};

/**
 * Validates if a value matches a pattern
 * @param {string} value - The value to check
 * @param {RegExp} pattern - Regular expression to match against
 * @returns {boolean} - True if value matches pattern
 */
export const matchesPattern = (value, pattern) => {
  if (!value) return false;
  return pattern.test(value);
};

/**
 * Validate password strength
 * @param {string} password - Password to validate
 * @returns {object} - Validation results with specific checks
 */
export const validatePassword = (password) => {
  const minLength = password.length >= 8;
  const hasUppercase = /[A-Z]/.test(password);
  const hasLowercase = /[a-z]/.test(password);
  const hasNumbers = /[0-9]/.test(password);
  const hasSpecialChar = /[!@#$%^&*(),.?":{}|<>]/.test(password);

  const isValid =
    minLength && hasUppercase && hasLowercase && hasNumbers && hasSpecialChar;

  return {
    isValid,
    checks: {
      minLength,
      hasUppercase,
      hasLowercase,
      hasNumbers,
      hasSpecialChar,
    },
  };
};

/**
 * Form validator that takes a schema and data and returns validation errors
 * @param {object} schema - Validation schema with field rules
 * @param {object} data - Form data to validate
 * @returns {object} - Object with validation errors
 */
export const validateForm = (schema, data) => {
  const errors = {};

  Object.entries(schema).forEach(([field, rules]) => {
    const value = data[field];

    // Process each validation rule for the field
    for (const rule of rules) {
      let isValid = true;
      let message = "";

      switch (rule.type) {
        case "required":
          isValid = isNotEmpty(value);
          message = rule.message || `${field} is required`;
          break;

        case "email":
          isValid = !value || isValidEmail(value);
          message = rule.message || `Invalid email format`;
          break;

        case "url":
          isValid = !value || isValidUrl(value);
          message = rule.message || `Invalid URL format`;
          break;

        case "phone":
          isValid = !value || isValidPhone(value);
          message = rule.message || `Invalid phone number`;
          break;

        case "minLength":
          isValid = !value || hasMinLength(value, rule.value);
          message =
            rule.message || `Minimum length is ${rule.value} characters`;
          break;

        case "maxLength":
          isValid = !value || hasMaxLength(value, rule.value);
          message =
            rule.message || `Maximum length is ${rule.value} characters`;
          break;

        case "number":
          isValid = !value || isNumber(value);
          message = rule.message || `Must be a number`;
          break;

        case "range":
          isValid = !value || isInRange(value, rule.min, rule.max);
          message =
            rule.message || `Must be between ${rule.min} and ${rule.max}`;
          break;

        case "futureDate":
          isValid = !value || isFutureDate(value);
          message = rule.message || `Date must be in the future`;
          break;

        case "pastDate":
          isValid = !value || isPastDate(value);
          message = rule.message || `Date must be in the past`;
          break;

        case "pattern":
          isValid = !value || matchesPattern(value, rule.pattern);
          message = rule.message || `Invalid format`;
          break;

        case "custom":
          isValid = rule.validate(value, data);
          message = rule.message || `Invalid value`;
          break;

        default:
          isValid = true;
      }

      // If validation fails, add error message and break the loop
      if (!isValid) {
        errors[field] = message;
        break;
      }
    }
  });

  return errors;
};

// Example form validation schemas
export const jobFormSchema = {
  title: [
    { type: "required", message: "Job title is required" },
    {
      type: "maxLength",
      value: 100,
      message: "Title must be less than 100 characters",
    },
  ],
  description: [
    { type: "required", message: "Job description is required" },
    {
      type: "minLength",
      value: 50,
      message: "Description must be at least 50 characters",
    },
  ],
  location: [{ type: "required", message: "Job location is required" }],
  salary: [{ type: "number", message: "Salary must be a number" }],
  deadline: [
    { type: "required", message: "Application deadline is required" },
    { type: "futureDate", message: "Deadline must be a future date" },
  ],
  requirements: [
    { type: "required", message: "Job requirements are required" },
  ],
};

export const internshipFormSchema = {
  title: [
    { type: "required", message: "Internship title is required" },
    {
      type: "maxLength",
      value: 100,
      message: "Title must be less than 100 characters",
    },
  ],
  description: [
    { type: "required", message: "Internship description is required" },
    {
      type: "minLength",
      value: 50,
      message: "Description must be at least 50 characters",
    },
  ],
  duration: [{ type: "required", message: "Internship duration is required" }],
  startDate: [
    { type: "required", message: "Start date is required" },
    { type: "futureDate", message: "Start date must be in the future" },
  ],
  isPaid: [
    { type: "required", message: "Please specify if the internship is paid" },
  ],
  location: [{ type: "required", message: "Internship location is required" }],
  deadline: [
    { type: "required", message: "Application deadline is required" },
    { type: "futureDate", message: "Deadline must be a future date" },
  ],
};

export const loginFormSchema = {
  email: [
    { type: "required", message: "Email is required" },
    { type: "email", message: "Please enter a valid email address" },
  ],
  password: [
    { type: "required", message: "Password is required" },
    {
      type: "minLength",
      value: 8,
      message: "Password must be at least 8 characters",
    },
  ],
};

/**
 * Specific validator for internship form data
 * @param {object} formData - Internship form data to validate
 * @returns {object} - Validation errors, if any
 */
export const validateInternshipForm = (formData) => {
  return validateForm(internshipFormSchema, formData);
};

/**
 * Specific validator for job form data
 * @param {object} formData - Job form data to validate
 * @returns {object} - Validation errors, if any
 */
export const validateJobForm = (formData) => {
  return validateForm(jobFormSchema, formData);
};

const validationUtils = {
  isNotEmpty,
  isValidEmail,
  isValidUrl,
  isValidPhone,
  hasMinLength,
  hasMaxLength,
  isNumber,
  isInRange,
  isFutureDate,
  isPastDate,
  matchesPattern,
  validatePassword,
  validateForm,
  validateInternshipForm,
  validateJobForm,
  jobFormSchema,
  internshipFormSchema,
  loginFormSchema,
};

export default validationUtils;
