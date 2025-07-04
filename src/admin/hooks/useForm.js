import { useState, useEffect, useCallback } from "react";

// Basic deep comparison for objects/arrays - Add this helper function
const deepEqual = (a, b) => {
  if (a === b) return true;

  if (
    typeof a !== "object" ||
    a === null ||
    typeof b !== "object" ||
    b === null
  ) {
    return false;
  }

  const keysA = Object.keys(a);
  const keysB = Object.keys(b);

  if (keysA.length !== keysB.length) {
    return false;
  }

  for (const key of keysA) {
    if (!keysB.includes(key) || !deepEqual(a[key], b[key])) {
      return false;
    }
  }

  return true;
};

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
  const [values, setValues] = useState(initialValues); // <-- Raw setValues from useState
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
    [initialValues] // initialValues can change if passed dynamically
  );

  // Update form when initialValues change - Use deepEqual to avoid unnecessary updates
  useEffect(() => {
    // Only update if the content of initialValues has actually changed
    if (!deepEqual(values, initialValues)) {
      setValues(initialValues);
    }
  }, [initialValues, values]); // Dependencies needed for the deepEqual comparison

  // Validate a single field
  const validateField = useCallback(
    (name, value) => {
      // Handle nested fields (e.g., 'internshipFee.amount') for validation schema lookup
      const keys = name.split(".");
      let schema = validationSchema;
      let currentValues = values;
      let fieldError = "";

      for (let i = 0; i < keys.length; i++) {
        const key = keys[i];
        if (!schema || !schema[key]) {
          schema = null; // Schema path doesn't exist
          break;
        }
        if (i < keys.length - 1) {
          schema = schema[key]; // Move deeper into schema
          currentValues = currentValues[key] || {}; // Move deeper into values, handle undefined
        } else {
          schema = schema[key]; // This is the field's schema
        }
      }

      if (!schema) return ""; // No validation schema for this field

      // --- Start Validation Rules ---

      // Required validation
      if (
        schema.required &&
        (value === undefined || value === null || value === "")
      ) {
        return schema.required === true
          ? `${keys[keys.length - 1]} is required` // Use the last key for error message
          : schema.required;
      }

      // Type validation (optional, but good practice)
      if (schema.type && typeof value !== schema.type) {
        // console.warn(`Value for ${name} has unexpected type: ${typeof value}. Expected ${schema.type}`);
        // Decide if this should be an error or just a warning.
        // For now, let's proceed with other validations if type is mismatched,
        // but specific type validations (like min/max for numbers) might fail.
      }

      // Min length validation (for strings)
      if (
        schema.minLength &&
        typeof value === "string" &&
        value.length < schema.minLength.value
      ) {
        return (
          schema.minLength.message ||
          `${keys[keys.length - 1]} must be at least ${
            schema.minLength.value
          } characters`
        );
      }

      // Max length validation (for strings)
      if (
        schema.maxLength &&
        typeof value === "string" &&
        value.length > schema.maxLength.value
      ) {
        return (
          schema.maxLength.message ||
          `${keys[keys.length - 1]} must be at most ${
            schema.maxLength.value
          } characters`
        );
      }

      // Pattern validation (for strings)
      if (
        schema.pattern &&
        typeof value === "string" &&
        !schema.pattern.value.test(value)
      ) {
        return schema.pattern.message || `${keys[keys.length - 1]} is invalid`;
      }

      // Min value validation (for numbers)
      if (
        schema.min &&
        (typeof value === "number" ||
          (typeof value === "string" && !isNaN(parseFloat(value)))) && // Check if value can be treated as number
        parseFloat(value) < schema.min.value
      ) {
        return (
          schema.min.message ||
          `${keys[keys.length - 1]} must be at least ${schema.min.value}`
        );
      }

      // Max value validation (for numbers)
      if (
        schema.max &&
        (typeof value === "number" ||
          (typeof value === "string" && !isNaN(parseFloat(value)))) && // Check if value can be treated as number
        parseFloat(value) > schema.max.value
      ) {
        return (
          schema.max.message ||
          `${keys[keys.length - 1]} must be at most ${schema.max.value}`
        );
      }

      // Custom validation
      if (schema.validate) {
        // Pass full values object for cross-field validation if needed
        fieldError = schema.validate(value, values);
        if (fieldError) return fieldError;
      }

      // --- End Validation Rules ---

      return fieldError;
    },
    [validationSchema, values] // Need values here for custom validation that might depend on other fields
  );

  // Validate all fields
  const validateForm = useCallback(() => {
    const newErrors = {};
    let isValid = true;

    // Iterate over initialValues keys to ensure all expected fields are validated
    // or iterate over validationSchema keys if schema is exhaustive
    Object.keys(initialValues).forEach((field) => {
      // Iterate over initialValues keys
      // Handle nested fields for validation lookup
      const keys = field.split(".");
      let currentValue = values;
      let fieldExistsInValues = true;

      for (let i = 0; i < keys.length; i++) {
        if (
          !currentValue ||
          currentValue[keys[i]] === undefined ||
          currentValue[keys[i]] === null
        ) {
          fieldExistsInValues = false;
          break;
        }
        currentValue = currentValue[keys[i]];
      }
      const value = fieldExistsInValues ? currentValue : undefined; // Get the value, undefined if path doesn't exist

      const fieldError = validateField(field, value); // Pass full field name 'nested.field'

      if (fieldError) {
        // Store error under the full nested name
        newErrors[field] = fieldError;
        isValid = false;
      }
    });

    // Also validate fields present in schema but not initialValues, if applicable
    // (Less common, but ensures schema is fully checked)
    Object.keys(validationSchema).forEach((field) => {
      if (newErrors[field] === undefined) {
        // Only validate if not already covered by initialValues
        const keys = field.split(".");
        let currentValue = values;
        let fieldExistsInValues = true;
        for (let i = 0; i < keys.length; i++) {
          if (
            !currentValue ||
            currentValue[keys[i]] === undefined ||
            currentValue[keys[i]] === null
          ) {
            fieldExistsInValues = false;
            break;
          }
          currentValue = currentValue[keys[i]];
        }
        const value = fieldExistsInValues ? currentValue : undefined;

        const fieldError = validateField(field, value);
        if (fieldError) {
          newErrors[field] = fieldError;
          isValid = false;
        }
      }
    });

    setErrors(newErrors);
    return isValid;
  }, [initialValues, validateField, validationSchema, values]); // Added initialValues, validationSchema to dependencies

  // Handle field change
  const handleChange = useCallback(
    (event) => {
      const { name, value, type, checked } = event.target;

      // Handle nested fields (e.g., 'internshipFee.amount')
      const keys = name.split(".");
      if (keys.length > 1) {
        setValues((prevValues) => {
          const newValues = { ...prevValues };
          let current = newValues;
          for (let i = 0; i < keys.length - 1; i++) {
            // Ensure the path exists, create empty object if not
            current[keys[i]] = current[keys[i]] || {};
            current = current[keys[i]];
          }
          // Set the final value
          current[keys[keys.length - 1]] =
            type === "checkbox" ? checked : value;
          return newValues;
        });
      } else {
        // Handle top-level fields
        const newValue = type === "checkbox" ? checked : value;
        setValues((prev) => ({
          ...prev,
          [name]: newValue,
        }));
      }

      // Validate on change if enabled
      if (validateOnChange) {
        // Pass the correct value after state update (use the logic for nested/top-level)
        // This can be tricky with async state updates. A common pattern is to
        // validate based on the new full `values` state after `setValues`.
        // However, for simplicity and immediate feedback, we can try to validate
        // the changed field with the new value, assuming other values in `values` are mostly up-to-date.
        const newValueToValidate = type === "checkbox" ? checked : value; // Use the value from the event

        // If nested, get the updated state value after setValues has potentially processed it
        // This might require getting the latest state, or re-validating the whole form on change (less performant)
        // A simpler approach for validateOnChange on nested fields is to re-validate the specific field
        // based on the *event* value, but cross-field validation might be tricky.
        // Let's stick to validating the single field with the new value from the event for now.

        const fieldError = validateField(name, newValueToValidate);
        setErrors((prev) => ({
          ...prev,
          [name]: fieldError,
        }));
      }

      // Mark as touched (handle nested fields)
      setTouched((prevTouched) => {
        const newTouched = { ...prevTouched };
        const keys = name.split(".");
        let current = newTouched;
        for (let i = 0; i < keys.length - 1; i++) {
          current[keys[i]] = current[keys[i]] || {};
          current = current[keys[i]];
        }
        current[keys[keys.length - 1]] = true;
        return newTouched;
      });
    },
    [validateField, validateOnChange] // validateField depends on values, creating a cycle? Let's check deps.
    // validateField -> validationSchema (stable), values (state)
    // handleChange -> validateField, validateOnChange (stable)
    // This seems fine, the cycle is managed by React's hook rules.
  );

  // Handle field blur
  const handleBlur = useCallback(
    (event) => {
      const { name, value, type, checked } = event.target; // Get type and checked too in case of checkbox blur

      // Mark field as touched (handled in handleChange or separately here)
      // Handled in handleChange already, or you can do it here too for clarity on blur specifically
      setTouched((prevTouched) => {
        const newTouched = { ...prevTouched };
        const keys = name.split(".");
        let current = newTouched;
        for (let i = 0; i < keys.length - 1; i++) {
          current[keys[i]] = current[keys[i]] || {};
          current = current[keys[i]];
        }
        current[keys[keys.length - 1]] = true;
        return newTouched;
      });

      // Validate on blur if enabled
      if (validateOnBlur) {
        const valueToValidate = type === "checkbox" ? checked : value; // Use value from event

        const fieldError = validateField(name, valueToValidate);
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
      // Handle nested fields
      const keys = name.split(".");
      if (keys.length > 1) {
        setValues((prevValues) => {
          const newValues = { ...prevValues };
          let current = newValues;
          for (let i = 0; i < keys.length - 1; i++) {
            current[keys[i]] = current[keys[i]] || {};
            current = current[keys[i]];
          }
          current[keys[keys.length - 1]] = value;
          return newValues;
        });
      } else {
        setValues((prev) => ({
          ...prev,
          [name]: value,
        }));
      }

      if (validateOnChange) {
        // Or validateOnBlur? Depending on desired behavior for manual sets
        const fieldError = validateField(name, value); // Validate the field with the new value
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
      // Handle merging for nested structures if needed, or assume fieldValues
      // is already structured correctly. Assuming it's structured correctly.
      setValues((prev) => ({
        ...prev,
        ...fieldValues,
      }));

      // Re-validate all fields if validateOnChange or validateOnMount/Load is desired here
      // Or just validate the fields that were changed if schema allows.
      // A full form validation after setting multiple values is safer for cross-field validation.
      // Let's re-validate the entire form after setting multiple values.
      // Note: This means validateForm depends on values, and setMultipleValues
      // updates values. This cycle is managed by useCallback.

      // Validate the entire form after setting multiple values
      // This happens on the next render cycle after state update.
      // If you need immediate validation results *before* the next render,
      // you'd need to run validateForm synchronously here.
      // For typical form loading, async validation on next render is fine.

      // Option 1: Re-validate on next render (simpler, less immediate feedback)
      // No code needed here, the useEffect for validation based on `values` handles it.
      // (If you had such an effect - let's add one)

      // Option 2: Validate synchronously and update errors immediately
      if (validateOnChange) {
        // Or add a specific flag like validateOnSetMultiple?
        // To validate synchronously, you'd need to call validateForm() here
        // setErrors(validateForm()); // But validateForm depends on values, which might not be updated yet
        // A better pattern for synchronous validation is to pass the *new* values to validateForm.

        const newErrors = {};
        let isValid = true;

        // You need the *merged* values to validate correctly
        const mergedValues = { ...values, ...fieldValues }; // Get the state value and merge changes

        Object.keys(mergedValues).forEach((field) => {
          const fieldError = validateField(field, mergedValues[field]); // Validate using merged values
          // Store error under the correct field name
          newErrors[field] = fieldError;
          if (fieldError) isValid = false;
        });
        setErrors(newErrors);
      }
    },
    [validateField, validateOnChange, values] // Added validateField, validateOnChange, values to dependencies
  );

  // Add an effect to run initial validation after values are set (e.g., on initial load)
  // This is important for displaying errors on page load if initial values are invalid.
  useEffect(() => {
    if (
      Object.keys(values).length > 0 &&
      Object.keys(errors).length === 0 &&
      !isSubmitted
    ) {
      // Only run if values are populated (after initial load/setMultipleValues)
      // and errors are empty (avoid re-validating during user typing)
      // and form hasn't been submitted yet.
      validateForm(); // Run full form validation
    }
  }, [values, validateForm, errors, isSubmitted]); // Depend on values and validateForm

  // Handle form submission
  const handleSubmit = useCallback(
    async (event) => {
      if (event) {
        event.preventDefault();
      }

      // Touch all fields (handle nested)
      const touchAll = (obj, path = []) => {
        let newTouched = {};
        Object.keys(obj).forEach((key) => {
          const currentPath = [...path, key];
          if (
            typeof obj[key] === "object" &&
            obj[key] !== null &&
            !Array.isArray(obj[key])
          ) {
            newTouched = { ...newTouched, ...touchAll(obj[key], currentPath) };
          } else {
            // Store as flat path string in touched state
            newTouched[currentPath.join(".")] = true;
          }
        });
        return newTouched;
      };

      setTouched(touchAll(values)); // Touch all fields based on current values structure

      // Validate all fields
      const isValid = validateForm(); // validateForm already updates the errors state

      if (!isValid) {
        // console.log("Form validation failed:", errors); // Debug log
        return; // Prevent submission if validation fails
      }

      setIsSubmitting(true);
      setSubmitError(null);

      try {
        await onSubmit(values); // Submit with the current values
        setIsSubmitted(true);

        if (resetOnSubmit) {
          resetForm();
        }
      } catch (error) {
        console.error("onSubmit error:", error); // Log the actual error
        setSubmitError(error.message || "Form submission failed");
      } finally {
        setIsSubmitting(false);
      }
    },
    [onSubmit, resetForm, resetOnSubmit, validateForm, values] // Added values to dependency array
  );

  // Get field props
  const getFieldProps = (name) => {
    // Handle nested fields when getting value, error, touched
    const keys = name.split(".");
    let currentValue = values;
    let value;
    let valueExists = true;

    for (let i = 0; i < keys.length; i++) {
      const key = keys[i];
      if (
        currentValue === undefined ||
        currentValue === null
      ) {
        valueExists = false; // Path doesn't exist in values
        break;
      }
      if (i < keys.length - 1) {
        currentValue = currentValue[key];
      } else {
        // At the final key
        value = currentValue[key];
      }
    }

    return {
      name,
      value: valueExists
        ? value
        : values[name] !== undefined
        ? values[name]
        : "", // Fallback for non-nested or initial undefined
      onChange: handleChange,
      onBlur: handleBlur,
      error: errors[name], // Get error directly from the flat errors object
      touched: touched[name], // Get touched directly from the flat touched object
    };
  };

  return {
    // Form state
    values,
    setValues, // <-- Return setValues here for completeness
    errors,
    setErrors, // <-- Return setErrors if manual error setting is needed
    touched,
    setTouched, // <-- Return setTouched if manual touched setting is needed
    isSubmitting,
    isSubmitted,
    submitError,

    // Field helpers
    handleChange,
    handleBlur,
    setFieldValue,
    setMultipleValues, // <-- Return setMultipleValues
    getFieldProps,

    // Form helpers
    handleSubmit,
    resetForm,
    validateForm,

    // Form status
    isDirty: Object.keys(touched).length > 0, // Simple dirty check based on touched fields
    isValid: Object.keys(errors).length === 0, // Simple validity check based on no errors
  };
};

export default useForm;
