import React, { useState, useEffect, useCallback } from 'react';
import { v4 as uuidv4 } from 'uuid'; // For generating unique IDs
import ErrorMessage from '../common/ErrorMessage';
import LoadingSpinner from '../common/LoadingSpinner';

function JsonEditor({ initialData, onSave, schema }) {
  const [data, setData] = useState(initialData);
  const [rawJson, setRawJson] = useState(JSON.stringify(initialData, null, 2));
  const [isRawMode, setIsRawMode] = useState(false);
  const [editError, setEditError] = useState(null);
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    setData(initialData);
    setRawJson(JSON.stringify(initialData, null, 2));
  }, [initialData]);

  const handleStructuredChange = useCallback((index, field, value) => {
    setData(prevData => {
      const newData = [...prevData];
      newData[index] = { ...newData[index], [field]: value };
      setRawJson(JSON.stringify(newData, null, 2)); // Keep raw JSON in sync
      return newData;
    });
  }, []);

  const handleRawJsonChange = useCallback((e) => {
    setRawJson(e.target.value);
    try {
      const parsed = JSON.parse(e.target.value);
      setData(parsed);
      setEditError(null);
    } catch (err) {
      setEditError("Invalid JSON format. Please correct it.");
    }
  }, []);

  const handleAddItem = useCallback(() => {
    const newItem = {};
    // Initialize with default values or empty strings based on schema
    if (schema && schema.items && schema.items.properties) {
      Object.keys(schema.items.properties).forEach(key => {
        const prop = schema.items.properties[key];
        if (key === "id") {
          newItem[key] = uuidv4();
        } else if (prop.type === "string") {
          newItem[key] = "";
        } else if (prop.type === "boolean") {
          newItem[key] = false;
        } else if (prop.type === "number") {
          newItem[key] = 0;
        }
      });
      // Ensure required fields are present, even if empty
      if (schema.items.required) {
        schema.items.required.forEach(key => {
          if (!(key in newItem)) {
            newItem[key] = ""; // Or appropriate default
          }
        });
      }
    }
    setData(prevData => {
      const newData = [...prevData, newItem];
      setRawJson(JSON.stringify(newData, null, 2));
      return newData;
    });
  }, [schema]);

  const handleRemoveItem = useCallback((index) => {
    setData(prevData => {
      const newData = prevData.filter((_, i) => i !== index);
      setRawJson(JSON.stringify(newData, null, 2));
      return newData;
    });
  }, []);

  const handleSave = async () => {
    if (editError) {
      alert("Cannot save due to invalid JSON. Please fix the errors.");
      return;
    }
    setSaving(true);
    await onSave(data);
    setSaving(false);
  };

  const renderField = useCallback((item, index, fieldName, fieldSchema) => {
    const value = item[fieldName];
    const commonProps = {
      className: "w-full p-2 border rounded-md bg-gray-50 dark:bg-gray-700 border-gray-300 dark:border-gray-600 text-gray-900 dark:text-white focus:ring-primary-500 focus:border-primary-500",
      value: value || '',
      onChange: (e) => handleStructuredChange(index, fieldName, e.target.value),
      placeholder: fieldSchema.description || fieldName,
      title: fieldSchema.description || fieldName,
    };

    switch (fieldSchema.type) {
      case "string":
        if (fieldSchema.format === "uri") {
          return <input type="url" {...commonProps} />;
        }
        if (fieldSchema.format === "date-time") {
          return <input type="datetime-local" {...commonProps} value={value ? value.substring(0, 16) : ''} onChange={(e) => handleStructuredChange(index, fieldName, e.target.value + ':00Z')} />;
        }
        if (fieldSchema.enum) {
          return (
            <select {...commonProps}>
              {fieldSchema.enum.map(option => (
                <option key={option} value={option}>{option}</option>
              ))}
            </select>
          );
        }
        return <input type="text" {...commonProps} />;
      case "boolean":
        return (
          <input
            type="checkbox"
            className="form-checkbox h-5 w-5 text-primary-600 rounded border-gray-300 dark:border-gray-600 focus:ring-primary-500"
            checked={!!value}
            onChange={(e) => handleStructuredChange(index, fieldName, e.target.checked)}
            title={fieldSchema.description || fieldName}
          />
        );
      case "number":
        return <input type="number" {...commonProps} onChange={(e) => handleStructuredChange(index, fieldName, Number(e.target.value))} />;
      default:
        return <input type="text" {...commonProps} />;
    }
  }, [handleStructuredChange, schema]);

  return (
    <div className="bg-white dark:bg-gray-800 shadow-lg rounded-lg p-6 mb-8">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-xl font-semibold text-gray-900 dark:text-white">Edit Content</h2>
        <div className="flex space-x-4">
          <button
            onClick={() => setIsRawMode(false)}
            className={`px-4 py-2 rounded-md text-sm font-medium ${
              !isRawMode
                ? 'bg-primary-600 text-white'
                : 'bg-gray-200 text-gray-800 dark:bg-gray-700 dark:text-gray-200 hover:bg-gray-300 dark:hover:bg-gray-600'
            }`}
          >
            Structured View
          </button>
          <button
            onClick={() => setIsRawMode(true)}
            className={`px-4 py-2 rounded-md text-sm font-medium ${
              isRawMode
                ? 'bg-primary-600 text-white'
                : 'bg-gray-200 text-gray-800 dark:bg-gray-700 dark:text-gray-200 hover:bg-gray-300 dark:hover:bg-gray-600'
            }`}
          >
            Raw JSON View
          </button>
        </div>
      </div>

      {editError && <ErrorMessage message={editError} className="mb-4" />}

      {isRawMode ? (
        <textarea
          className="w-full h-96 p-4 border rounded-md bg-gray-50 dark:bg-gray-700 border-gray-300 dark:border-gray-600 text-gray-900 dark:text-white font-mono text-sm resize-y"
          value={rawJson}
          onChange={handleRawJsonChange}
          spellCheck="false"
        />
      ) : (
        <div className="space-y-6">
          {data.map((item, itemIndex) => (
            <div key={item.id || itemIndex} className="border border-gray-300 dark:border-gray-600 rounded-lg p-4 relative bg-gray-50 dark:bg-gray-700">
              <h3 className="text-lg font-semibold mb-4 text-gray-900 dark:text-white">Item {itemIndex + 1}</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {schema && schema.items && schema.items.properties &&
                  Object.entries(schema.items.properties).map(([fieldName, fieldSchema]) => (
                    <div key={fieldName} className="flex flex-col">
                      <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                        {fieldSchema.description || fieldName}
                        {schema.items.required && schema.items.required.includes(fieldName) && <span className="text-red-500 ml-1">*</span>}
                      </label>
                      {renderField(item, itemIndex, fieldName, fieldSchema)}
                    </div>
                  ))
                }
              </div>
              <button
                onClick={() => handleRemoveItem(itemIndex)}
                className="mt-4 px-4 py-2 bg-red-600 text-white rounded-md hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2 dark:focus:ring-offset-gray-800"
              >
                Remove Item
              </button>
            </div>
          ))}
          <button
            onClick={handleAddItem}
            className="w-full px-4 py-2 border border-dashed border-gray-400 dark:border-gray-600 text-gray-700 dark:text-gray-300 rounded-md hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors duration-200"
          >
            + Add New Item
          </button>
        </div>
      )}

      <div className="mt-6 flex justify-end">
        <button
          onClick={handleSave}
          disabled={saving || !!editError}
          className="px-6 py-3 bg-primary-600 text-white rounded-md font-semibold hover:bg-primary-700 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-2 dark:focus:ring-offset-gray-800 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {saving ? <LoadingSpinner size="sm" /> : "Save All Changes"}
        </button>
      </div>
    </div>
  );
}

export default JsonEditor;
