import api from './api'; // Assuming a base API utility exists

const CONTENT_API_BASE_URL = '/admin/content'; // Define your API endpoint

const contentApi = {
  /**
   * Fetches all banner and carousel data.
   * @returns {Promise<Array>} A promise that resolves to an array of content items.
   */
  getBannersAndCarousels: async () => {
    try {
      // In a real application, this would be an actual API call:
      // const response = await api.get(`${CONTENT_API_BASE_URL}/all`);
      // return response.data;

      // Mock data for development
      await new Promise(resolve => setTimeout(resolve, 300)); // Simulate network delay
      const mockData = [
        {
          "id": "banner-1",
          "type": "banner",
          "imageUrl": "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 1200 400'%3E%3Crect width='100%25' height='100%25' fill='%23FF5733'/%3E%3Ctext x='50%25' y='50%25' font-family='Arial' font-size='80' fill='%23FFFFFF' text-anchor='middle' dominant-baseline='middle'%3EBanner 1</text>%3C/svg%3E",
          "title": "Welcome to CodeBlaze!",
          "description": "Your journey to a successful tech career starts here.",
          "linkUrl": "/careers",
          "buttonText": "Explore Careers",
          "isActive": true,
          "order": 1,
          "startDate": "2023-01-01T00:00:00Z",
          "endDate": "2024-12-31T23:59:59Z"
        },
        {
          "id": "carousel-1",
          "type": "carousel",
          "imageUrl": "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 1200 400'%3E%3Crect width='100%25' height='100%25' fill='%2333FF57'/%3E%3Ctext x='50%25' y='50%25' font-family='Arial' font-size='80' fill='%23FFFFFF' text-anchor='middle' dominant-baseline='middle'%3ECarousel Item 1</text>%3C/svg%3E",
          "title": "New Internship Opportunities",
          "description": "Apply now for exciting roles in AI and Machine Learning.",
          "linkUrl": "/internships",
          "buttonText": "View Internships",
          "isActive": true,
          "order": 2,
          "startDate": "2023-01-01T00:00:00Z",
          "endDate": "2024-12-31T23:59:59Z"
        }
      ];
      return mockData;
    } catch (error) {
      console.error("Error fetching banners and carousels:", error);
      throw error;
    }
  },

  /**
   * Saves (creates or updates) an array of banner and carousel data.
   * @param {Array} data An array of content items to save.
   * @returns {Promise<Array>} A promise that resolves to the saved content items.
   */
  saveBannersAndCarousels: async (data) => {
    try {
      // In a real application, this would be an actual API call:
      // const response = await api.post(`${CONTENT_API_BASE_URL}/save`, data); // Or PUT/PATCH depending on API design
      // return response.data;

      // Simulate successful save
      await new Promise(resolve => setTimeout(resolve, 300)); // Simulate network delay
      console.log("Mock API: Saved data:", data);
      return data;
    } catch (error) {
      console.error("Error saving banners and carousels:", error);
      throw error;
    }
  },

  // You might add more specific functions like:
  // getBannerById: async (id) => { ... },
  // createBanner: async (bannerData) => { ... },
  // updateBanner: async (id, bannerData) => { ... },
  // deleteBanner: async (id) => { ... },
};

export default contentApi;
