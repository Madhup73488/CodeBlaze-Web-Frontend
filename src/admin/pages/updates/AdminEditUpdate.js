import React from 'react';
import { useParams } from 'react-router-dom';
import AdminCreateUpdate from './AdminCreateUpdate';

const AdminEditUpdate = () => {
  const { id } = useParams();
  
  // This is a placeholder component that reuses the create form
  // In a full implementation, you would fetch the update data and pre-populate the form
  return <AdminCreateUpdate isEdit={true} updateId={id} />;
};

export default AdminEditUpdate;
