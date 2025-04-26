import { useState, useEffect, useCallback } from "react";

/**
 * Custom hook for form handling with validation, submission, and state management
 *
 * @param {Object} options - Configuration options
 * @param {Object} options.initialValues - Initial form values
 * @param {Function} options.onSubmit - Function to handle form submission
 * @param {Object} options.validationSchema - Schema for form validation
 * @param {boolean} options.validateOnChange - Run validation on every change (default: true)
 * @param {boolean} options.validateOnBlur - Run validation on field blur (default: true)
 * @param {boolean} options.resetOnSubmit - Reset form after successful submission (default: false)
 * @return {Object} Form state and handlers
 */
const useForm = (options = {}) => {
  const {
    initialValues = {},
    onSubmit,
    validationSchema = {},
    validateOnChange = true,
    validateOnBlur = true,
    resetOnSubmit = false,
  } = options;

  // Form state
  const [values, setValues] = useState(initialValues);
  const [errors, setErrors] = useState({});
  const [touched, setTouched] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [submitError, setSubmitError] = useState(null);

  // Reset form to initial values or new values
  const resetForm = useCallback(
    (newValues = initialValues) => {
      setValues(newValues);
      setErrors({});
      setTouched({});
      setIsSubmitted(false);
      setSubmitError(null);
    },
    [initialValues]
  );

  // Update form when initialValues change
  useEffect(() => {
    setValues(initialValues);
  }, [initialValues]);

  // Validate a single field
  const validateField = useCallback(
    (name, value) => {
      if (!validationSchema[name]) return "";

      const fieldSchema = validationSchema[name];
      let fieldError = "";

      // Required validation
      if (
        fieldSchema.required &&
        (value === undefined || value === null || value === "")
      ) {
        return fieldSchema.required === true
          ? `${name} is required`
          : fieldSchema.required;
      }

      // Min length validation
      if (
        fieldSchema.minLength &&
        typeof value === "string" &&
        value.length < fieldSchema.minLength.value
      ) {
        return (
          fieldSchema.minLength.message ||
          `${name} must be at least ${fieldSchema.minLength.value} characters`
        );
      }

      // Max length validation
      if (
        fieldSchema.maxLength &&
        typeof value === "string" &&
        value.length > fieldSchema.maxLength.value
      ) {
        return (
          fieldSchema.maxLength.message ||
          `${name} must be at most ${fieldSchema.maxLength.value} characters`
        );
      }

      // Pattern validation
      if (
        fieldSchema.pattern &&
        typeof value === "string" &&
        !fieldSchema.pattern.value.test(value)
      ) {
        return fieldSchema.pattern.message || `${name} is invalid`;
      }

      // Min value validation
      if (
        fieldSchema.min &&
        typeof value === "number" &&
        value < fieldSchema.min.value
      ) {
        return (
          fieldSchema.min.message ||
          `${name} must be at least ${fieldSchema.min.value}`
        );
      }

      // Max value validation
      if (
        fieldSchema.max &&
        typeof value === "number" &&
        value > fieldSchema.max.value
      ) {
        return (
          fieldSchema.max.message ||
          `${name} must be at most ${fieldSchema.max.value}`
        );
      }

      // Custom validation
      if (fieldSchema.validate) {
        fieldError = fieldSchema.validate(value, values);
        if (fieldError) return fieldError;
      }

      return fieldError;
    },
    [validationSchema, values]
  );

  // Validate all fields
  const validateForm = useCallback(() => {
    const newErrors = {};
    let isValid = true;

    Object.keys(validationSchema).forEach((field) => {
      const value = values[field];
      const fieldError = validateField(field, value);

      if (fieldError) {
        newErrors[field] = fieldError;
        isValid = false;
      }
    });

    setErrors(newErrors);
    return isValid;
  }, [validateField, validationSchema, values]);

  // Handle field change
  const handleChange = useCallback(
    (event) => {
      const { name, value, type, checked } = event.target;

      // Handle different input types
      const newValue = type === "checkbox" ? checked : value;

      setValues((prev) => ({
        ...prev,
        [name]: newValue,
      }));

      // Validate on change if enabled
      if (validateOnChange) {
        const fieldError = validateField(name, newValue);
        setErrors((prev) => ({
          ...prev,
          [name]: fieldError,
        }));
      }

      // Mark as touched
      setTouched((prev) => ({
        ...prev,
        [name]: true,
      }));
    },
    [validateField, validateOnChange]
  );

  // Handle field blur
  const handleBlur = useCallback(
    (event) => {
      const { name, value } = event.target;

      // Mark field as touched
      setTouched((prev) => ({
        ...prev,
        [name]: true,
      }));

      // Validate on blur if enabled
      if (validateOnBlur) {
        const fieldError = validateField(name, value);
        setErrors((prev) => ({
          ...prev,
          [name]: fieldError,
        }));
      }
    },
    [validateField, validateOnBlur]
  );

  // Set field value manually
  const setFieldValue = useCallback(
    (name, value) => {
      setValues((prev) => ({
        ...prev,
        [name]: value,
      }));

      if (validateOnChange) {
        const fieldError = validateField(name, value);
        setErrors((prev) => ({
          ...prev,
          [name]: fieldError,
        }));
      }
    },
    [validateField, validateOnChange]
  );

  // Set multiple field values at once
  const setMultipleValues = useCallback(
    (fieldValues) => {
      setValues((prev) => ({
        ...prev,
        ...fieldValues,
      }));

      if (validateOnChange) {
        const newErrors = { ...errors };

        Object.entries(fieldValues).forEach(([name, value]) => {
          const fieldError = validateField(name, value);
          newErrors[name] = fieldError;
        });

        setErrors(newErrors);
      }
    },
    [errors, validateField, validateOnChange]
  );

  // Handle form submission
  const handleSubmit = useCallback(
    async (event) => {
      if (event) {
        event.preventDefault();
      }

      // Touch all fields
      const allFieldsTouched = Object.keys(validationSchema).reduce(
        (acc, field) => {
          acc[field] = true;
          return acc;
        },
        {}
      );

      setTouched(allFieldsTouched);

      // Validate all fields
      const isValid = validateForm();

      if (!isValid) {
        return;
      }

      setIsSubmitting(true);
      setSubmitError(null);

      try {
        await onSubmit(values);
        setIsSubmitted(true);

        if (resetOnSubmit) {
          resetForm();
        }
      } catch (error) {
        setSubmitError(error.message || "Form submission failed");
      } finally {
        setIsSubmitting(false);
      }
    },
    [onSubmit, resetForm, resetOnSubmit, validateForm, validationSchema, values]
  );

  // Get field props
  const getFieldProps = (name) => ({
    name,
    value: values[name] !== undefined ? values[name] : "",
    onChange: handleChange,
    onBlur: handleBlur,
    error: errors[name],
    touched: touched[name],
  });

  return {
    // Form state
    values,
    errors,
    touched,
    isSubmitting,
    isSubmitted,
    submitError,

    // Field helpers
    handleChange,
    handleBlur,
    setFieldValue,
    setMultipleValues,
    getFieldProps,

    // Form helpers
    handleSubmit,
    resetForm,
    validateForm,

    // Field state checks
    isDirty: Object.keys(touched).length > 0,
    isValid: Object.keys(errors).every((key) => !errors[key]),
  };
};

export default useForm;
