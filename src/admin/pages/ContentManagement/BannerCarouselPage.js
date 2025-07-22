import React, { useState, useEffect } from "react";
import AdminLayout from "../../components/layout/AdminLayout";
import LoadingSpinner from "../../components/common/LoadingSpinner";
import ErrorMessage from "../../components/common/ErrorMessage";
import JsonEditor from "../../components/ContentManagement/JsonEditor";
import contentApi from "../../utils/contentApi"; // Import the content API

function BannerCarouselPage() {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [bannerData, setBannerData] = useState([]); // This will hold the array of banner/carousel objects

  const fetchBanners = async () => {
    setLoading(true);
    setError(null);
    try {
      const data = await contentApi.getBannersAndCarousels();
      setBannerData(data);
    } catch (err) {
      setError("Failed to fetch banner data.");
      console.error("Error fetching banner data:", err);
    } finally {
      setLoading(false);
    }
  };

  const saveBanners = async (data) => {
    setLoading(true);
    setError(null);
    try {
      const savedData = await contentApi.saveBannersAndCarousels(data);
      setBannerData(savedData); // Update local state after successful save
      alert("Banner data saved successfully!");
    } catch (err) {
      setError("Failed to save banner data.");
      console.error("Error saving banner data:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchBanners();
  }, []);

  if (loading) {
    return (
      <AdminLayout>
        <LoadingSpinner />
      </AdminLayout>
    );
  }

  if (error) {
    return (
      <AdminLayout>
        <ErrorMessage message={error} />
      </AdminLayout>
    );
  }

  return (
    <div className="p-6 md:p-8 space-y-8 bg-gray-100 dark:bg-gray-900">
      <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
        Banner & Carousel Management
      </h1>
      <p className="text-lg text-gray-600 dark:text-gray-400">
        Manage the banners and carousels for the main website.
      </p>

      <div className="p-6 rounded-xl shadow-lg bg-white dark:bg-gray-800">
        <JsonEditor
          initialData={bannerData}
          onSave={saveBanners}
          schema={{
            type: "array",
            items: {
              type: "object",
              properties: {
                id: { type: "string", description: "Unique ID for the item" },
                type: {
                  type: "string",
                  enum: ["banner", "carousel"],
                  description: "Type of content",
                },
                imageUrl: {
                  type: "string",
                  format: "uri",
                  description: "URL of the image",
                },
                title: { type: "string", description: "Main heading text" },
                description: {
                  type: "string",
                  description: "Short description text",
                },
                linkUrl: {
                  type: "string",
                  format: "uri",
                  description: "URL to navigate to on click",
                },
                buttonText: {
                  type: "string",
                  description: "Text for the call-to-action button",
                  optional: true,
                },
                isActive: {
                  type: "boolean",
                  description: "Whether the item is currently active",
                },
                order: {
                  type: "number",
                  description: "Display order (lower number appears first)",
                },
                startDate: {
                  type: "string",
                  format: "date-time",
                  description: "Start date for display (ISO format)",
                  optional: true,
                },
                endDate: {
                  type: "string",
                  format: "date-time",
                  description: "End date for display (ISO format)",
                  optional: true,
                },
              },
              required: [
                "id",
                "type",
                "imageUrl",
                "title",
                "description",
                "linkUrl",
                "isActive",
                "order",
              ],
            },
          }}
        />
      </div>
    </div>
  );
}

export default BannerCarouselPage;
