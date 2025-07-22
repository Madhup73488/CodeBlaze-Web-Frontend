import React, { useState, useEffect } from "react";
import { useAdmin } from "../contexts/AdminContext";
import adminApi from "../utils/api";
import { internships } from "../../components/ForStudents/internshipsData";
import Toast from "../../components/common/Toast";
import GrantAccessModal from "../components/common/GrantAccessModal";

const ConnectAccess = () => {
  const { theme } = useAdmin();
  const [toast, setToast] = useState(null);
  const [users, setUsers] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);

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

  const handleDeleteUser = async (userId) => {
    try {
      const response = await adminApi.deleteConnectUser(userId);
      if (response.success) {
        setToast({ message: "User deleted successfully!", type: "success" });
        setUsers(users.filter((user) => user._id !== userId));
      } else {
        setToast({
          message: response.message || "Failed to delete user.",
          type: "error",
        });
      }
    } catch (error) {
      setToast({
        message: "An error occurred while deleting the user.",
        type: "error",
      });
    }
  };

  const getInternshipTagColor = (internshipTitle) => {
    let hash = 0;
    for (let i = 0; i < internshipTitle.length; i++) {
      hash = internshipTitle.charCodeAt(i) + ((hash << 5) - hash);
    }
    const h = hash % 360;
    return `hsl(${h}, 70%, 50%)`;
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
      {isModalOpen && (
        <GrantAccessModal
          theme={theme}
          onClose={() => setIsModalOpen(false)}
          setToast={setToast}
          users={users}
        />
      )}
      <div className="header">
        <h2>Connect Users</h2>
        <button
          onClick={() => setIsModalOpen(true)}
          className="grant-access-button"
        >
          Grant Access
        </button>
      </div>
      <div className="user-list-container">
        <table className="user-table">
          <thead>
            <tr>
              <th>Email</th>
              <th>Internships</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {users.map((user) => (
              <tr key={user._id}>
                <td>{user.email}</td>
                <td className="internship-tags">
                  {user.accessible_internship_ids.map((id) => {
                    const internship = internships.find((i) => i.id === id);
                    const title = internship ? internship.title : id;
                    const color = getInternshipTagColor(title);
                    return (
                      <span
                        key={id}
                        className="internship-tag"
                        style={{ backgroundColor: color }}
                      >
                        {title}
                      </span>
                    );
                  })}
                </td>
                <td>
                  <button
                    onClick={() => handleDeleteUser(user._id)}
                    className="delete-button"
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <style jsx>{`
        .container {
          padding: 2rem;
        }
        .header {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-bottom: 1.5rem;
        }
        .grant-access-button {
          background-color: #007bff;
          color: white;
          padding: 0.5rem 1rem;
          border-radius: 0.375rem;
          border: none;
          cursor: pointer;
        }
        .user-list-container {
          width: 100%;
        }
        .user-table {
          width: 100%;
          border-collapse: collapse;
        }
        .user-table th,
        .user-table td {
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
          background-color: transparent;
          color: #dc2626;
          border: none;
          cursor: pointer;
        }
        .internship-tags {
          display: flex;
          flex-wrap: wrap;
          gap: 0.5rem;
        }
        .internship-tag {
          padding: 0.25rem 0.75rem;
          border-radius: 1rem;
          color: white;
          font-size: 0.8rem;
          font-weight: 500;
        }
      `}</style>
    </div>
  );
};

export default ConnectAccess;
