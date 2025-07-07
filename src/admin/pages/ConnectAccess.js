import React, { useState, useEffect } from 'react';
import { useAdmin } from '../contexts/AdminContext';
import adminApi from '../utils/api';
import { internships } from '../../components/ForStudents/internshipsData';
import { courses } from './coursesData';
import Toast from '../../components/common/Toast';

const ConnectAccess = () => {
  const { theme } = useAdmin();
  const [email, setEmail] = useState('');
  const [selectedInternships, setSelectedInternships] = useState([]);
  const [selectedCourses, setSelectedCourses] = useState([]);
  const [toast, setToast] = useState(null);
  const [users, setUsers] = useState([]);

  useEffect(() => {
    const loadUsers = async () => {
      try {
        const response = await adminApi.fetchConnectUsers();
        if (response.success) {
          setUsers(response.users);
        }
      } catch (error) {
        console.error("Failed to fetch connect users", error);
      }
    };
    loadUsers();
  }, []);

  const handleInternshipChange = (internshipId) => {
    setSelectedInternships(prevSelected =>
      prevSelected.includes(internshipId)
        ? prevSelected.filter(id => id !== internshipId)
        : [...prevSelected, internshipId]
    );
  };

  const handleCourseChange = (courseId) => {
    setSelectedCourses(prevSelected =>
      prevSelected.includes(courseId)
        ? prevSelected.filter(id => id !== courseId)
        : [...prevSelected, courseId]
    );
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await adminApi.grantAccess({
        email,
        internship_ids: selectedInternships,
        course_ids: selectedCourses,
      });
      if (response.success) {
        setToast({ message: 'Access granted successfully!', type: 'success' });
        setEmail('');
        setSelectedInternships([]);
        setSelectedCourses([]);
      } else {
        setToast({ message: response.message || 'Failed to grant access.', type: 'error' });
      }
    } catch (error) {
      setToast({ message: 'An error occurred while granting access.', type: 'error' });
    }
  };

  const handleDeleteUser = async (userId) => {
    try {
      const response = await adminApi.deleteConnectUser(userId);
      if (response.success) {
        setToast({ message: 'User deleted successfully!', type: 'success' });
        setUsers(users.filter(user => user._id !== userId));
      } else {
        setToast({ message: response.message || 'Failed to delete user.', type: 'error' });
      }
    } catch (error) {
      setToast({ message: 'An error occurred while deleting the user.', type: 'error' });
    }
  };

  return (
    <div className={`container ${theme}`}>
      {toast && (
        <Toast
          message={toast.message}
          type={toast.type}
          onClose={() => setToast(null)}
        />
      )}
      <div className="form-wrapper">
        <div className="header">
          <h2>Grant Access</h2>
          <p>Select the resources to grant access to for the specified user.</p>
        </div>
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="email">User Email</label>
            <input
              type="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="e.g., user@example.com"
              required
            />
          </div>

          <div className="form-group">
            <label>Internships</label>
            <div className="checkbox-group">
              {internships.map((internship) => (
                <label key={internship.id} className="checkbox-label">
                  <input
                    type="checkbox"
                    checked={selectedInternships.includes(internship.id)}
                    onChange={() => handleInternshipChange(internship.id)}
                  />
                  <span>{internship.title}</span>
                </label>
              ))}
            </div>
          </div>

          <div className="form-group">
            <label>Courses</label>
            <div className="checkbox-group">
              {courses.map((course) => (
                <label key={course.id} className="checkbox-label">
                  <input
                    type="checkbox"
                    checked={selectedCourses.includes(course.id)}
                    onChange={() => handleCourseChange(course.id)}
                  />
                  <span>{course.name}</span>
                </label>
              ))}
            </div>
          </div>

          <button type="submit">Grant Access</button>
        </form>
      </div>

      <div className="user-list-container">
        <h2>Connected Users</h2>
        <table className="user-table">
          <thead>
            <tr>
              <th>Email</th>
              <th>Internships</th>
              <th>Courses</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {users.map(user => (
              <tr key={user._id}>
                <td>{user.email}</td>
                <td>{user.accessible_internship_ids.join(', ')}</td>
                <td>{user.accessible_course_ids.join(', ')}</td>
                <td>
                  <button onClick={() => handleDeleteUser(user._id)} className="delete-button">Delete</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <style jsx>{`
        .user-list-container {
          margin-top: 2rem;
          width: 100%;
          max-width: 800px;
        }
        .user-table {
          width: 100%;
          border-collapse: collapse;
        }
        .user-table th, .user-table td {
          border: 1px solid #ddd;
          padding: 8px;
        }
        .user-table th {
          background-color: #f2f2f2;
        }
        .container.dark .user-table th {
          background-color: #374151;
        }
        .container.dark .user-table td {
          border-color: #4b5563;
        }
        .delete-button {
          background-color: #ef4444;
        }
        .container {
          display: flex;
          justify-content: center;
          align-items: flex-start;
          min-height: 100vh;
          padding: 2rem;
          font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif;
        }
        .container.light {
          background-color: #f8f9fa;
        }
        .container.dark {
          background-color: #111827;
        }
        .form-wrapper {
          width: 100%;
          max-width: 550px;
          padding: 2.5rem;
          border-radius: 8px;
        }
        .container.light .form-wrapper {
          background: #ffffff;
          box-shadow: 0 4px 12px rgba(0, 0, 0, 0.05);
          border: 1px solid #e9ecef;
        }
        .container.dark .form-wrapper {
          background: #1f2937;
          box-shadow: 0 4px 12px rgba(0, 0, 0, 0.2);
          border: 1px solid #374151;
        }
        .header {
          margin-bottom: 2rem;
          text-align: center;
        }
        .header h2 {
          font-size: 1.75rem;
          font-weight: 600;
        }
        .container.light .header h2 {
          color: #212529;
        }
        .container.dark .header h2 {
          color: #f9fafb;
        }
        .header p {
          margin-top: 0.5rem;
          font-size: 1rem;
        }
        .container.light .header p {
          color: #6c757d;
        }
        .container.dark .header p {
          color: #9ca3af;
        }
        .form-group {
          margin-bottom: 1.75rem;
        }
        label {
          display: block;
          margin-bottom: 0.5rem;
          font-size: 0.875rem;
          font-weight: 500;
        }
        .container.light label {
          color: #495057;
        }
        .container.dark label {
          color: #d1d5db;
        }
        input[type="email"] {
          width: 100%;
          padding: 0.75rem 1rem;
          border-radius: 6px;
          font-size: 1rem;
          transition: border-color 0.2s ease, box-shadow 0.2s ease;
        }
        .container.light input[type="email"] {
          border: 1px solid #ced4da;
          background-color: #fff;
          color: #212529;
        }
        .container.dark input[type="email"] {
          border: 1px solid #4b5563;
          background-color: #374151;
          color: #f9fafb;
        }
        input[type="email"]:focus {
          outline: none;
          box-shadow: 0 0 0 3px rgba(0, 123, 255, 0.2);
        }
        .container.dark input[type="email"]:focus {
          border-color: #3b82f6;
          box-shadow: 0 0 0 3px rgba(59, 130, 246, 0.2);
        }
        input::placeholder {
          color: #adb5bd;
        }
        .container.dark input::placeholder {
          color: #9ca3af;
        }
        .checkbox-group {
          max-height: 160px;
          overflow-y: auto;
          border-radius: 6px;
          padding: 0.5rem;
        }
        .container.light .checkbox-group {
          border: 1px solid #ced4da;
          background-color: #f8f9fa;
        }
        .container.dark .checkbox-group {
          border: 1px solid #4b5563;
          background-color: #374151;
        }
        .checkbox-label {
          display: flex;
          align-items: center;
          padding: 0.75rem;
          cursor: pointer;
          border-radius: 4px;
          transition: background-color 0.2s ease;
        }
        .container.light .checkbox-label:hover {
          background-color: #e9ecef;
        }
        .container.dark .checkbox-label:hover {
          background-color: #4b5563;
        }
        .checkbox-label span {
          font-weight: 400;
        }
        .container.light .checkbox-label span {
          color: #212529;
        }
        .container.dark .checkbox-label span {
          color: #f9fafb;
        }
        .checkbox-label input[type="checkbox"] {
          margin-right: 0.75rem;
          height: 1.15em;
          width: 1.15em;
          cursor: pointer;
        }
        button {
          width: 100%;
          padding: 0.8rem 1.5rem;
          border-radius: 6px;
          border: none;
          color: white;
          font-size: 1rem;
          font-weight: 600;
          cursor: pointer;
          transition: background-color 0.2s ease, transform 0.1s ease;
        }
        .container.light button {
          background-color: #007bff;
        }
        .container.dark button {
          background-color: #3b82f6;
        }
        button:hover {
          opacity: 0.9;
        }
        button:active {
          transform: scale(0.99);
        }
      `}</style>
    </div>
  );
};

export default ConnectAccess;
