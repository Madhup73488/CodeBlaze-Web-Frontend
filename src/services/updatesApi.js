import api from './api';

const updatesApi = {
  // Get all updates (public and admin-created)
  getAllUpdates: async (filters = {}) => {
    try {
      const params = new URLSearchParams();
      
      if (filters.category && filters.category !== 'all') {
        params.append('category', filters.category);
      }
      if (filters.search) {
        params.append('search', filters.search);
      }
      if (filters.type) {
        params.append('type', filters.type);
      }
      if (filters.page) {
        params.append('page', filters.page);
      }
      if (filters.limit) {
        params.append('limit', filters.limit);
      }

      const response = await api.get(`/updates?${params.toString()}`);
      return response.data;
    } catch (error) {
      console.error('Error fetching updates:', error);
      throw error;
    }
  },

  // Get featured updates
  getFeaturedUpdates: async () => {
    try {
      const response = await api.get('/updates/featured');
      return response.data;
    } catch (error) {
      console.error('Error fetching featured updates:', error);
      throw error;
    }
  },

  // Get single update by ID
  getUpdateById: async (id) => {
    try {
      const response = await api.get(`/updates/${id}`);
      return response.data;
    } catch (error) {
      console.error('Error fetching update:', error);
      throw error;
    }
  },

  // Subscribe to newsletter
  subscribeToNewsletter: async (email) => {
    try {
      const response = await api.post('/updates/subscribe', { email });
      return response.data;
    } catch (error) {
      console.error('Error subscribing to newsletter:', error);
      throw error;
    }
  },

  // Mark update as read (for authenticated users)
  markAsRead: async (updateId) => {
    try {
      const response = await api.post(`/updates/${updateId}/read`);
      return response.data;
    } catch (error) {
      console.error('Error marking update as read:', error);
      throw error;
    }
  },

  // Get user's read status for updates
  getUserReadStatus: async () => {
    try {
      const response = await api.get('/updates/read-status');
      return response.data;
    } catch (error) {
      console.error('Error fetching read status:', error);
      throw error;
    }
  },

  // Admin APIs
  admin: {
    // Create new update
    createUpdate: async (updateData) => {
      try {
        const response = await api.post('/admin/updates', updateData);
        return response.data;
      } catch (error) {
        console.error('Error creating update:', error);
        throw error;
      }
    },

    // Update existing update
    updateUpdate: async (id, updateData) => {
      try {
        const response = await api.put(`/admin/updates/${id}`, updateData);
        return response.data;
      } catch (error) {
        console.error('Error updating update:', error);
        throw error;
      }
    },

    // Delete update
    deleteUpdate: async (id) => {
      try {
        const response = await api.delete(`/admin/updates/${id}`);
        return response.data;
      } catch (error) {
        console.error('Error deleting update:', error);
        throw error;
      }
    },

    // Send notification to all users
    sendNotification: async (updateId, notificationData) => {
      try {
        const response = await api.post(`/admin/updates/${updateId}/notify`, notificationData);
        return response.data;
      } catch (error) {
        console.error('Error sending notification:', error);
        throw error;
      }
    },

    // Get update analytics
    getAnalytics: async (updateId) => {
      try {
        const response = await api.get(`/admin/updates/${updateId}/analytics`);
        return response.data;
      } catch (error) {
        console.error('Error fetching analytics:', error);
        throw error;
      }
    },

    // Upload media for updates
    uploadMedia: async (file, type = 'image') => {
      try {
        const formData = new FormData();
        formData.append('file', file);
        formData.append('type', type);

        const response = await api.post('/admin/updates/upload', formData, {
          headers: {
            'Content-Type': 'multipart/form-data',
          },
        });
        return response.data;
      } catch (error) {
        console.error('Error uploading media:', error);
        throw error;
      }
    }
  }
};

export default updatesApi;
