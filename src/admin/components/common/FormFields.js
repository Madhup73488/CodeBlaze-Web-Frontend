import React from "react";
// import { Form } from "react-router-dom"; // Removed unused Form import

export const InputField = ({
  id,
  label,
  type = "text",
  placeholder,
  value,
  onChange,
  name,
  error,
  required = false,
  disabled = false,
  readOnly = false,
  className = "",
  helperText,
  icon,
  theme = "light",
  onBlur,
  onFocus,
  companyInput = false, // New prop to handle company-specific input
  ...rest
}) => {
  // Function to handle company input transformations
  const handleCompanyInputChange = (e) => {
    const { value } = e.target;

    // If it's a company input, we'll add some special handling
    if (companyInput) {
      // Remove leading protocols and www
      const cleanValue = value
        .toLowerCase()
        .replace(/^https?:\/\//, "")
        .replace(/^www\./, "");

      // Call the original onChange with the potentially modified value
      if (onChange) {
        // Create a new event-like object to maintain interface compatibility
        const modifiedEvent = {
          ...e,
          target: {
            ...e.target,
            value: cleanValue,
          },
        };
        onChange(modifiedEvent);
      }
    } else {
      // For non-company inputs, just call onChange normally
      onChange && onChange(e);
    }
  };

  return (
    <div className={`form-field ${className}`}>
      {label && (
        <label htmlFor={id} className="form-label">
          {label} {required && <span className="required">*</span>}
        </label>
      )}
      <div className={`input-container ${icon ? "with-icon" : ""}`}>
        {icon && <div className="input-icon">{icon}</div>}
        <input
          id={id}
          type={type}
          name={name || id}
          value={value}
          onChange={companyInput ? handleCompanyInputChange : onChange}
          placeholder={placeholder}
          disabled={disabled}
          readOnly={readOnly}
          className={`form-input ${error ? "has-error" : ""}`}
          required={required}
          onBlur={onBlur}
          onFocus={onFocus}
          {...rest}
        />
      </div>
      {helperText && <p className="helper-text">{helperText}</p>}
      {error && <p className="error-text">{error}</p>}

      <style jsx>{`
        .form-field {
          margin-bottom: 1.25rem;
          width: 100%;
        }

        .form-label {
          display: block;
          margin-bottom: 0.5rem;
          font-weight: 500;
          font-size: 0.9rem;
          color: ${theme === "dark" ? "#e0e0e0" : "#333"};
        }

        .required {
          color: #ef4444;
          margin-left: 0.25rem;
        }

        .input-container {
          position: relative;
        }

        .input-container.with-icon .form-input {
          padding-left: 2.5rem;
        }

        .input-icon {
          position: absolute;
          left: 0.75rem;
          top: 50%;
          transform: translateY(-50%);
          color: ${theme === "dark" ? "#a0a0a0" : "#666"};
          width: 1rem;
          height: 1rem;
          display: flex;
          align-items: center;
          justify-content: center;
        }

        .input-icon svg {
          width: 16px;
          height: 16px;
        }

        .form-input {
          width: 100%;
          padding: 0.625rem 0.75rem;
          border: 1px solid ${theme === "dark" ? "#333" : "#e6e6e6"};
          border-radius: 4px;
          background-color: ${theme === "dark" ? "#2C2C2C" : "#fff"};
          color: ${theme === "dark" ? "#e0e0e0" : "#333"};
          font-size: 0.95rem;
          transition: border-color 0.2s ease, box-shadow 0.2s ease;
        }

        .form-input:focus {
          outline: none;
          border-color: #3b82f6;
          box-shadow: 0 0 0 3px rgba(59, 130, 246, 0.15);
        }

        .form-input::placeholder {
          color: ${theme === "dark" ? "#717171" : "#a3a3a3"};
        }

        .form-input:disabled,
        .form-input:read-only {
          background-color: ${theme === "dark" ? "#252525" : "#f5f7fa"};
          cursor: not-allowed;
          opacity: 0.7;
        }

        .form-input.has-error {
          border-color: #ef4444;
        }

        .form-input.has-error:focus {
          box-shadow: 0 0 0 3px rgba(239, 68, 68, 0.15);
        }

        .helper-text {
          margin: 0.35rem 0 0;
          font-size: 0.75rem;
          color: ${theme === "dark" ? "#a0a0a0" : "#666"};
        }

        .error-text {
          margin: 0.35rem 0 0;
          font-size: 0.75rem;
          color: #ef4444;
        }
      `}</style>
    </div>
  );
};

// Textarea field component
export const TextAreaField = ({
  id,
  label,
  placeholder,
  value,
  onChange,
  name,
  error,
  required = false,
  disabled = false,
  readOnly = false,
  className = "",
  helperText,
  rows = 4,
  maxLength,
  showCount = false,
  theme = "light",
  ...rest
}) => {
  return (
    <div className={`form-field ${className}`}>
      {label && (
        <label htmlFor={id} className="form-label">
          {label} {required && <span className="required">*</span>}
        </label>
      )}
      <textarea
        id={id}
        name={name || id}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        disabled={disabled}
        readOnly={readOnly}
        className={`form-textarea ${error ? "has-error" : ""}`}
        required={required}
        rows={rows}
        maxLength={maxLength}
        {...rest}
      />
      {showCount && maxLength && (
        <div className="textarea-count">
          {value?.length || 0}/{maxLength}
        </div>
      )}
      {helperText && <p className="helper-text">{helperText}</p>}
      {error && <p className="error-text">{error}</p>}

      <style jsx>{`
        .form-field {
          margin-bottom: 1.25rem;
          width: 100%;
        }

        .form-label {
          display: block;
          margin-bottom: 0.5rem;
          font-weight: 500;
          font-size: 0.9rem;
          color: ${theme === "dark" ? "#e0e0e0" : "#333"};
        }

        .required {
          color: #ef4444;
          margin-left: 0.25rem;
        }

        .form-textarea {
          width: 100%;
          padding: 0.625rem 0.75rem;
          border: 1px solid ${theme === "dark" ? "#333" : "#e6e6e6"};
          border-radius: 4px;
          background-color: ${theme === "dark" ? "#2C2C2C" : "#fff"};
          color: ${theme === "dark" ? "#e0e0e0" : "#333"};
          font-size: 0.95rem;
          font-family: inherit;
          resize: vertical;
          transition: border-color 0.2s ease, box-shadow 0.2s ease;
        }

        .form-textarea:focus {
          outline: none;
          border-color: #3b82f6;
          box-shadow: 0 0 0 3px rgba(59, 130, 246, 0.15);
        }

        .form-textarea::placeholder {
          color: ${theme === "dark" ? "#717171" : "#a3a3a3"};
        }

        .form-textarea:disabled,
        .form-textarea:read-only {
          background-color: ${theme === "dark" ? "#252525" : "#f5f7fa"};
          cursor: not-allowed;
          opacity: 0.7;
        }

        .form-textarea.has-error {
          border-color: #ef4444;
        }

        .form-textarea.has-error:focus {
          box-shadow: 0 0 0 3px rgba(239, 68, 68, 0.15);
        }

        .textarea-count {
          display: flex;
          justify-content: flex-end;
          margin-top: 0.25rem;
          font-size: 0.75rem;
          color: ${theme === "dark" ? "#a0a0a0" : "#666"};
        }

        .helper-text {
          margin: 0.35rem 0 0;
          font-size: 0.75rem;
          color: ${theme === "dark" ? "#a0a0a0" : "#666"};
        }

        .error-text {
          margin: 0.35rem 0 0;
          font-size: 0.75rem;
          color: #ef4444;
        }
      `}</style>
    </div>
  );
};

// DateField component
export const DateField = ({
  id,
  label,
  value,
  onChange,
  name,
  error,
  required = false,
  disabled = false,
  readOnly = false,
  className = "",
  helperText,
  min,
  max,
  theme = "light",
  ...rest
}) => {
  return (
    <div className={`form-field ${className}`}>
      {label && (
        <label htmlFor={id} className="form-label">
          {label} {required && <span className="required">*</span>}
        </label>
      )}
      <input
        id={id}
        type="date"
        name={name || id}
        value={value}
        onChange={onChange}
        disabled={disabled}
        readOnly={readOnly}
        className={`form-input ${error ? "has-error" : ""}`}
        required={required}
        min={min}
        max={max}
        {...rest}
      />
      {helperText && <p className="helper-text">{helperText}</p>}
      {error && <p className="error-text">{error}</p>}

      <style jsx>{`
        .form-field {
          margin-bottom: 1.25rem;
          width: 100%;
        }

        .form-label {
          display: block;
          margin-bottom: 0.5rem;
          font-weight: 500;
          font-size: 0.9rem;
          color: ${theme === "dark" ? "#e0e0e0" : "#333"};
        }

        .required {
          color: #ef4444;
          margin-left: 0.25rem;
        }

        .form-input {
          width: 100%;
          padding: 0.625rem 0.75rem;
          border: 1px solid ${theme === "dark" ? "#333" : "#e6e6e6"};
          border-radius: 4px;
          background-color: ${theme === "dark" ? "#2C2C2C" : "#fff"};
          color: ${theme === "dark" ? "#e0e0e0" : "#333"};
          font-size: 0.95rem;
          transition: border-color 0.2s ease, box-shadow 0.2s ease;
        }

        .form-input::-webkit-calendar-picker-indicator {
          filter: ${theme === "dark" ? "invert(0.8)" : "none"};
          cursor: pointer;
        }

        .form-input:focus {
          outline: none;
          border-color: #3b82f6;
          box-shadow: 0 0 0 3px rgba(59, 130, 246, 0.15);
        }

        .form-input:disabled,
        .form-input:read-only {
          background-color: ${theme === "dark" ? "#252525" : "#f5f7fa"};
          cursor: not-allowed;
          opacity: 0.7;
        }

        .form-input.has-error {
          border-color: #ef4444;
        }

        .form-input.has-error:focus {
          box-shadow: 0 0 0 3px rgba(239, 68, 68, 0.15);
        }

        .helper-text {
          margin: 0.35rem 0 0;
          font-size: 0.75rem;
          color: ${theme === "dark" ? "#a0a0a0" : "#666"};
        }

        .error-text {
          margin: 0.35rem 0 0;
          font-size: 0.75rem;
          color: #ef4444;
        }
      `}</style>
    </div>
  );
};

// Select field component
export const SelectField = ({
  id,
  label,
  value,
  onChange,
  name,
  options = [],
  error,
  required = false,
  disabled = false,
  className = "",
  helperText,
  placeholder = "Select an option",
  theme = "light",
  ...rest
}) => {
  return (
    <div className={`form-field ${className}`}>
      {label && (
        <label htmlFor={id} className="form-label">
          {label} {required && <span className="required">*</span>}
        </label>
      )}
      <select
        id={id}
        name={name || id}
        value={value}
        onChange={onChange}
        disabled={disabled}
        className={`form-select ${error ? "has-error" : ""}`}
        required={required}
        {...rest}
      >
        {placeholder && (
          <option value="" disabled>
            {placeholder}
          </option>
        )}
        {options.map((option) => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
      {helperText && <p className="helper-text">{helperText}</p>}
      {error && <p className="error-text">{error}</p>}

      <style jsx>{`
        .form-field {
          margin-bottom: 1.25rem;
          width: 100%;
        }

        .form-label {
          display: block;
          margin-bottom: 0.5rem;
          font-weight: 500;
          font-size: 0.9rem;
          color: ${theme === "dark" ? "#e0e0e0" : "#333"};
        }

        .required {
          color: #ef4444;
          margin-left: 0.25rem;
        }

        .form-select {
          width: 100%;
          padding: 0.625rem 0.75rem;
          border: 1px solid ${theme === "dark" ? "#333" : "#e6e6e6"};
          border-radius: 4px;
          background-color: ${theme === "dark" ? "#2C2C2C" : "#fff"};
          color: ${theme === "dark" ? "#e0e0e0" : "#333"};
          font-size: 0.95rem;
          appearance: none;
          background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='16' height='16' viewBox='0 0 24 24' fill='none' stroke='%23666' stroke-width='2' stroke-linecap='round' stroke-linejoin='round'%3E%3Cpolyline points='6 9 12 15 18 9'%3E%3C/polyline%3E%3C/svg%3E");
          background-repeat: no-repeat;
          background-position: right 0.75rem center;
          background-size: 16px;
          padding-right: 2.5rem;
          transition: border-color 0.2s ease, box-shadow 0.2s ease;
        }

        .form-select:focus {
          outline: none;
          border-color: #3b82f6;
          box-shadow: 0 0 0 3px rgba(59, 130, 246, 0.15);
        }

        .form-select:disabled {
          background-color: ${theme === "dark" ? "#252525" : "#f5f7fa"};
          cursor: not-allowed;
          opacity: 0.7;
        }

        .form-select.has-error {
          border-color: #ef4444;
        }

        .form-select.has-error:focus {
          box-shadow: 0 0 0 3px rgba(239, 68, 68, 0.15);
        }

        .helper-text {
          margin: 0.35rem 0 0;
          font-size: 0.75rem;
          color: ${theme === "dark" ? "#a0a0a0" : "#666"};
        }

        .error-text {
          margin: 0.35rem 0 0;
          font-size: 0.75rem;
          color: #ef4444;
        }
      `}</style>
    </div>
  );
};

// Checkbox component
export const CheckboxField = ({
  id,
  label,
  checked,
  onChange,
  name,
  error,
  disabled = false,
  className = "",
  helperText,
  theme = "light",
  ...rest
}) => {
  return (
    <div className={`form-field checkbox-field ${className}`}>
      <div className="checkbox-container">
        <input
          id={id}
          type="checkbox"
          name={name || id}
          checked={checked}
          onChange={onChange}
          disabled={disabled}
          className={`form-checkbox ${error ? "has-error" : ""}`}
          {...rest}
        />
        {label && (
          <label htmlFor={id} className="checkbox-label">
            {label}
          </label>
        )}
      </div>
      {helperText && <p className="helper-text">{helperText}</p>}
      {error && <p className="error-text">{error}</p>}

      <style jsx>{`
        .form-field.checkbox-field {
          margin-bottom: 1rem;
        }

        .checkbox-container {
          display: flex;
          align-items: center;
        }

        .form-checkbox {
          width: 1rem;
          height: 1rem;
          margin: 0;
          appearance: none;
          border: 1px solid ${theme === "dark" ? "#444" : "#d1d5db"};
          border-radius: 4px;
          background-color: ${theme === "dark" ? "#2C2C2C" : "#fff"};
          transition: border-color 0.2s ease, background-color 0.2s ease;
          position: relative;
          cursor: pointer;
        }

        .form-checkbox:checked {
          background-color: #3b82f6;
          border-color: #3b82f6;
        }

        .form-checkbox:checked::after {
          content: "";
          position: absolute;
          left: 4px;
          top: 1px;
          width: 4px;
          height: 8px;
          border: solid white;
          border-width: 0 2px 2px 0;
          transform: rotate(45deg);
        }

        .form-checkbox:focus {
          outline: none;
          box-shadow: 0 0 0 3px rgba(59, 130, 246, 0.15);
        }

        .form-checkbox:disabled {
          opacity: 0.5;
          cursor: not-allowed;
        }

        .checkbox-label {
          margin-left: 0.5rem;
          font-size: 0.95rem;
          color: ${theme === "dark" ? "#e0e0e0" : "#333"};
          cursor: pointer;
        }

        .form-checkbox.has-error {
          border-color: #ef4444;
        }

        .helper-text {
          margin: 0.35rem 0 0 1.5rem;
          font-size: 0.75rem;
          color: ${theme === "dark" ? "#a0a0a0" : "#666"};
        }

        .error-text {
          margin: 0.35rem 0 0 1.5rem;
          font-size: 0.75rem;
          color: #ef4444;
        }
      `}</style>
    </div>
  );
};

// Radio button group component
export const RadioGroup = ({
  id,
  label,
  options = [],
  value,
  onChange,
  name,
  error,
  required = false,
  disabled = false,
  className = "",
  helperText,
  inline = false,
  theme = "light",
  ...rest
}) => {
  return (
    <div className={`form-field ${className}`}>
      {label && (
        <label className="form-label">
          {label} {required && <span className="required">*</span>}
        </label>
      )}
      <div className={`radio-group ${inline ? "inline" : ""}`}>
        {options.map((option) => (
          <div key={option.value} className="radio-option">
            <input
              id={`${id}-${option.value}`}
              type="radio"
              name={name || id}
              value={option.value}
              checked={value === option.value}
              onChange={onChange}
              disabled={disabled || option.disabled}
              className="form-radio"
              {...rest}
            />
            <label htmlFor={`${id}-${option.value}`} className="radio-label">
              {option.label}
            </label>
          </div>
        ))}
      </div>
      {helperText && <p className="helper-text">{helperText}</p>}
      {error && <p className="error-text">{error}</p>}

      <style jsx>{`
        .form-field {
          margin-bottom: 1.25rem;
          width: 100%;
        }

        .form-label {
          display: block;
          margin-bottom: 0.5rem;
          font-weight: 500;
          font-size: 0.9rem;
          color: ${theme === "dark" ? "#e0e0e0" : "#333"};
        }

        .required {
          color: #ef4444;
          margin-left: 0.25rem;
        }

        .radio-group {
          display: flex;
          flex-direction: column;
          gap: 0.5rem;
        }

        .radio-group.inline {
          flex-direction: row;
          flex-wrap: wrap;
          gap: 1rem;
        }

        .radio-option {
          display: flex;
          align-items: center;
        }

        .form-radio {
          width: 1rem;
          height: 1rem;
          margin: 0;
          appearance: none;
          border: 1px solid ${theme === "dark" ? "#444" : "#d1d5db"};
          border-radius: 50%;
          background-color: ${theme === "dark" ? "#2C2C2C" : "#fff"};
          transition: border-color 0.2s ease;
          position: relative;
          cursor: pointer;
        }

        .form-radio:checked {
          border-color: #3b82f6;
          border-width: 4px;
        }

        .form-radio:focus {
          outline: none;
          box-shadow: 0 0 0 3px rgba(59, 130, 246, 0.15);
        }

        .form-radio:disabled {
          opacity: 0.5;
          cursor: not-allowed;
        }

        .radio-label {
          margin-left: 0.5rem;
          font-size: 0.95rem;
          color: ${theme === "dark" ? "#e0e0e0" : "#333"};
          cursor: pointer;
        }

        .helper-text {
          margin: 0.35rem 0 0;
          font-size: 0.75rem;
          color: ${theme === "dark" ? "#a0a0a0" : "#666"};
        }

        .error-text {
          margin: 0.35rem 0 0;
          font-size: 0.75rem;
          color: #ef4444;
        }
      `}</style>
    </div>
  );
};

// Switch toggle component
export const SwitchField = ({
  id,
  label,
  checked,
  onChange,
  name,
  error,
  disabled = false,
  className = "",
  helperText,
  theme = "light",
  ...rest
}) => {
  return (
    <div className={`form-field switch-field ${className}`}>
      <div className="switch-container">
        <div className="switch-toggle-container">
          <input
            id={id}
            type="checkbox"
            role="switch"
            name={name || id}
            checked={checked}
            onChange={onChange}
            disabled={disabled}
            className={`form-switch ${error ? "has-error" : ""}`}
            {...rest}
          />
          <label htmlFor={id} className="switch-toggle"></label>
        </div>
        {label && (
          <label htmlFor={id} className="switch-label">
            {label}
          </label>
        )}
      </div>
      {helperText && <p className="helper-text">{helperText}</p>}
      {error && <p className="error-text">{error}</p>}

      <style jsx>{`
        .form-field.switch-field {
          margin-bottom: 1rem;
        }

        .switch-container {
          display: flex;
          align-items: center;
        }

        .switch-toggle-container {
          position: relative;
          display: inline-block;
          width: 36px;
          height: 20px;
        }

        .form-switch {
          opacity: 0;
          width: 0;
          height: 0;
          position: absolute;
        }

        .switch-toggle {
          position: absolute;
          cursor: pointer;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          background-color: ${theme === "dark" ? "#333" : "#e6e6e6"};
          transition: 0.4s;
          border-radius: 34px;
        }

        .switch-toggle:before {
          position: absolute;
          content: "";
          height: 16px;
          width: 16px;
          left: 2px;
          bottom: 2px;
          background-color: white;
          transition: 0.4s;
          border-radius: 50%;
        }

        .form-switch:checked + .switch-toggle {
          background-color: #3b82f6;
        }

        .form-switch:focus + .switch-toggle {
          box-shadow: 0 0 0 3px rgba(59, 130, 246, 0.15);
        }

        .form-switch:checked + .switch-toggle:before {
          transform: translateX(16px);
        }

        .form-switch:disabled + .switch-toggle {
          opacity: 0.5;
          cursor: not-allowed;
        }

        .switch-label {
          margin-left: 0.75rem;
          font-size: 0.95rem;
          color: ${theme === "dark" ? "#e0e0e0" : "#333"};
          cursor: pointer;
        }

        .form-switch.has-error + .switch-toggle {
          box-shadow: 0 0 0 1px #ef4444;
        }

        .helper-text {
          margin: 0.35rem 0 0 2.75rem;
          font-size: 0.75rem;
          color: ${theme === "dark" ? "#a0a0a0" : "#666"};
        }

        .error-text {
          margin: 0.35rem 0 0 2.75rem;
          font-size: 0.75rem;
          color: #ef4444;
        }
      `}</style>
    </div>
  );
};

// File upload component
export const FileField = ({
  id,
  label,
  onChange,
  name,
  error,
  required = false,
  disabled = false,
  className = "",
  helperText,
  accept,
  multiple = false,
  theme = "light",
  ...rest
}) => {
  return (
    <div className={`form-field ${className}`}>
      {label && (
        <label htmlFor={id} className="form-label">
          {label} {required && <span className="required">*</span>}
        </label>
      )}
      <div className={`file-input-container ${error ? "has-error" : ""}`}>
        <input
          id={id}
          type="file"
          name={name || id}
          onChange={onChange}
          disabled={disabled}
          className="file-input"
          required={required}
          accept={accept}
          multiple={multiple}
          {...rest}
        />
        <label htmlFor={id} className="file-input-label">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="20"
            height="20"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"></path>
            <polyline points="17 8 12 3 7 8"></polyline>
            <line x1="12" y1="3" x2="12" y2="15"></line>
          </svg>
          <span>Choose file{multiple ? "s" : ""}</span>
        </label>
      </div>
      {helperText && <p className="helper-text">{helperText}</p>}
      {error && <p className="error-text">{error}</p>}

      <style jsx>{`
        .form-field {
          margin-bottom: 1.25rem;
          width: 100%;
        }

        .form-label {
          display: block;
          margin-bottom: 0.5rem;
          font-weight: 500;
          font-size: 0.9rem;
          color: ${theme === "dark" ? "#e0e0e0" : "#333"};
        }

        .required {
          color: #ef4444;
          margin-left: 0.25rem;
        }

        .file-input-container {
          position: relative;
          width: 100%;
        }

        .file-input {
          position: absolute;
          width: 1px;
          height: 1px;
          padding: 0;
          margin: -1px;
          overflow: hidden;
          clip: rect(0, 0, 0, 0);
          white-space: nowrap;
          border-width: 0;
        }

        .file-input-label {
          display: flex;
          align-items: center;
          gap: 0.5rem;
          padding: 0.625rem 1rem;
          background-color: ${theme === "dark" ? "#333" : "#f3f4f6"};
          color: ${theme === "dark" ? "#e0e0e0" : "#333"};
          border-radius: 4px;
          border: 1px dashed ${theme === "dark" ? "#444" : "#d1d5db"};
          cursor: pointer;
          font-size: 0.95rem;
          transition: border-color 0.2s ease, background-color 0.2s ease;
        }

        .file-input-label:hover {
          background-color: ${theme === "dark" ? "#383838" : "#e9ecef"};
        }

        .file-input:focus + .file-input-label {
          outline: none;
          border-color: #3b82f6;
          box-shadow: 0 0 0 3px rgba(59, 130, 246, 0.15);
        }

        .file-input:disabled + .file-input-label {
          opacity: 0.5;
          cursor: not-allowed;
        }

        .file-input-container.has-error .file-input-label {
          border-color: #ef4444;
        }

        .helper-text {
          margin: 0.35rem 0 0;
          font-size: 0.75rem;
          color: ${theme === "dark" ? "#a0a0a0" : "#666"};
        }

        .error-text {
          margin: 0.35rem 0 0;
          font-size: 0.75rem;
          color: #ef4444;
        }
      `}</style>
    </div>
  );
};

// Form group component for layout organization
export const FormGroup = ({
  children,
  title,
  description,
  className = "",
  theme = "light",
}) => {
  return (
    <div className={`form-group ${className}`}>
      {(title || description) && (
        <div className="form-group-header">
          {title && <h3 className="form-group-title">{title}</h3>}
          {description && (
            <p className="form-group-description">{description}</p>
          )}
        </div>
      )}
      <div className="form-group-content">{children}</div>

      <style jsx>{`
        .form-group {
          margin-bottom: 2rem;
          padding-bottom: 2rem;
          border-bottom: 1px solid ${theme === "dark" ? "#333" : "#e6e6e6"};
        }

        .form-group:last-child {
          border-bottom: none;
          padding-bottom: 0;
        }

        .form-group-header {
          margin-bottom: 1.5rem;
        }

        .form-group-title {
          font-size: 1.125rem;
          font-weight: 600;
          color: ${theme === "dark" ? "#e0e0e0" : "#111"};
          margin: 0 0 0.5rem 0;
        }

        .form-group-description {
          font-size: 0.875rem;
          color: ${theme === "dark" ? "#a0a0a0" : "#666"};
          margin: 0;
        }

        .form-group-content {
          display: grid;
          grid-template-columns: 1fr;
          gap: 1rem;
        }

        @media (min-width: 768px) {
          .form-group-content {
            grid-template-columns: repeat(2, 1fr);
            gap: 1.5rem;
          }
        }
      `}</style>
    </div>
  );
};

// Form footer with action buttons
export const FormFooter = ({
  onSubmit,
  onCancel,
  submitText = "Submit",
  cancelText = "Cancel",
  isLoading = false,
  className = "",
  theme = "light",
}) => {
  return (
    <div className={`form-footer ${className}`}>
      {onCancel && (
        <button
          type="button"
          onClick={onCancel}
          className="cancel-button"
          disabled={isLoading}
        >
          {cancelText}
        </button>
      )}
      <button
        type="submit"
        onClick={onSubmit}
        className="submit-button"
        disabled={isLoading}
      >
        {isLoading ? (
          <div className="loading-spinner">
            <div className="spinner"></div>
            <span>Loading...</span>
          </div>
        ) : (
          submitText
        )}
      </button>

      <style jsx>{`
        .form-footer {
          display: flex;
          justify-content: flex-end;
          gap: 1rem;
          margin-top: 2rem;
          padding-top: 1.5rem;
          border-top: 1px solid ${theme === "dark" ? "#333" : "#e6e6e6"};
        }

        .cancel-button {
          padding: 0.625rem 1.25rem;
          background-color: transparent;
          color: ${theme === "dark" ? "#e0e0e0" : "#666"};
          border: 1px solid ${theme === "dark" ? "#444" : "#d1d5db"};
          border-radius: 4px;
          font-size: 0.95rem;
          font-weight: 500;
          cursor: pointer;
          transition: background-color 0.2s ease, border-color 0.2s ease;
        }

        .cancel-button:hover {
          background-color: ${theme === "dark" ? "#292929" : "#f3f4f6"};
        }

        .cancel-button:focus {
          outline: none;
          box-shadow: 0 0 0 3px rgba(156, 163, 175, 0.15);
        }

        .cancel-button:disabled {
          opacity: 0.5;
          cursor: not-allowed;
        }

        .submit-button {
          padding: 0.625rem 1.25rem;
          background-color: #3b82f6;
          color: white;
          border: 1px solid #3b82f6;
          border-radius: 4px;
          font-size: 0.95rem;
          font-weight: 500;
          cursor: pointer;
          transition: background-color 0.2s ease, border-color 0.2s ease;
        }

        .submit-button:hover {
          background-color: #2563eb;
          border-color: #2563eb;
        }

        .submit-button:focus {
          outline: none;
          box-shadow: 0 0 0 3px rgba(59, 130, 246, 0.15);
        }

        .submit-button:disabled {
          opacity: 0.7;
          cursor: not-allowed;
        }

        .loading-spinner {
          display: flex;
          align-items: center;
          gap: 0.5rem;
        }

        .spinner {
          width: 1rem;
          height: 1rem;
          border: 2px solid rgba(255, 255, 255, 0.3);
          border-radius: 50%;
          border-top-color: white;
          animation: spin 0.8s linear infinite;
        }

        @keyframes spin {
          to {
            transform: rotate(360deg);
          }
        }
      `}</style>
    </div>
  );
};

export default FormFooter;
