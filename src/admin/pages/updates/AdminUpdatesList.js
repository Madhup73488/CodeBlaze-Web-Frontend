import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import {
  Plus,
  Search,
  Filter,
  Edit,
  Trash2,
  Eye,
  Send,
  Calendar,
  Video,
  FileText,
  Megaphone,
  Users,
  TrendingUp,
  MoreVertical,
  Star,
  StarOff
} from 'lucide-react';
import updatesApi from '../../../services/updatesApi';

const AdminUpdatesList = () => {
  const [updates, setUpdates] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterType, setFilterType] = useState('all');
  const [filterStatus, setFilterStatus] = useState('all');
  const [selectedUpdates, setSelectedUpdates] = useState([]);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [updateToDelete, setUpdateToDelete] = useState(null);

  const updateTypes = ['all', 'vlog', 'blog', 'announcement'];
  const statusOptions = ['all', 'published', 'draft', 'scheduled'];

  useEffect(() => {
    loadUpdates();
  }, []);

  const loadUpdates = async () => {
    try {
      setLoading(true);
      const response = await updatesApi.getAllUpdates();
      setUpdates(response.updates || []);
    } catch (error) {
      console.error('Error loading updates:', error);
      // Fallback to mock data for development
      setUpdates([
        {
          id: 1,
          title: 'Behind the Scenes: AI Research Lab Tour',
          type: 'vlog',
          status: 'published',
          featured: true,
          publishedAt: '2025-01-03T10:00:00Z',
          views: 15200,
          likes: 892,
          author: 'Admin',
          category: 'Research'
        },
        {
          id: 2,
          title: 'New Partnership with Google Cloud',
          type: 'announcement',
          status: 'published',
          featured: false,
          publishedAt: '2025-01-02T14:30:00Z',
          views: 8500,
          likes: 234,
          author: 'Admin',
          category: 'Partnership'
        },
        {
          id: 3,
          title: 'The Future of Machine Learning in 2025',
          type: 'blog',
          status: 'draft',
          featured: false,
          publishedAt: null,
          views: 0,
          likes: 0,
          author: 'Admin',
          category: 'Technology'
        }
      ]);
    } finally {
      setLoading(false);
    }
  };

  const filteredUpdates = updates.filter(update => {
    const matchesSearch = update.title.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesType = filterType === 'all' || update.type === filterType;
    const matchesStatus = filterStatus === 'all' || update.status === filterStatus;
    return matchesSearch && matchesType && matchesStatus;
  });

  const handleDelete = async (updateId) => {
    try {
      await updatesApi.admin.deleteUpdate(updateId);
      setUpdates(updates.filter(update => update.id !== updateId));
      setShowDeleteModal(false);
      setUpdateToDelete(null);
    } catch (error) {
      console.error('Error deleting update:', error);
    }
  };

  const handleToggleFeatured = async (updateId, featured) => {
    try {
      await updatesApi.admin.updateUpdate(updateId, { featured: !featured });
      setUpdates(updates.map(update => 
        update.id === updateId ? { ...update, featured: !featured } : update
      ));
    } catch (error) {
      console.error('Error updating featured status:', error);
    }
  };

  const handleSendNotification = async (updateId) => {
    try {
      await updatesApi.admin.sendNotification(updateId, {
        title: 'New Update Available',
        message: 'Check out our latest update!'
      });
      alert('Notification sent to all users!');
    } catch (error) {
      console.error('Error sending notification:', error);
    }
  };

  const getTypeIcon = (type) => {
    switch (type) {
      case 'vlog': return <Video className="w-4 h-4" />;
      case 'blog': return <FileText className="w-4 h-4" />;
      case 'announcement': return <Megaphone className="w-4 h-4" />;
      default: return <FileText className="w-4 h-4" />;
    }
  };

  const getTypeColor = (type) => {
    switch (type) {
      case 'vlog': return 'bg-red-100 text-red-700';
      case 'blog': return 'bg-blue-100 text-blue-700';
      case 'announcement': return 'bg-green-100 text-green-700';
      default: return 'bg-gray-100 text-gray-700';
    }
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'published': return 'bg-green-100 text-green-700';
      case 'draft': return 'bg-yellow-100 text-yellow-700';
      case 'scheduled': return 'bg-blue-100 text-blue-700';
      default: return 'bg-gray-100 text-gray-700';
    }
  };

  const formatDate = (dateString) => {
    if (!dateString) return 'Not published';
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  return (
    <div className="p-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6">
        <div>
          <h1 className="text-2xl font-bold text-gray-900 mb-2">Updates Management</h1>
          <p className="text-gray-600">Create and manage updates for all users</p>
        </div>
        <button
          onClick={() => window.location.href = '/admin/updates/create'}
          className="mt-4 sm:mt-0 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors flex items-center gap-2"
        >
          <Plus className="w-4 h-4" />
          Create Update
        </button>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-6">
        <div className="bg-white p-6 rounded-lg shadow-sm border">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Total Updates</p>
              <p className="text-2xl font-bold text-gray-900">{updates.length}</p>
            </div>
            <FileText className="w-8 h-8 text-blue-600" />
          </div>
        </div>
        <div className="bg-white p-6 rounded-lg shadow-sm border">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Published</p>
              <p className="text-2xl font-bold text-gray-900">
                {updates.filter(u => u.status === 'published').length}
              </p>
            </div>
            <Eye className="w-8 h-8 text-green-600" />
          </div>
        </div>
        <div className="bg-white p-6 rounded-lg shadow-sm border">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Total Views</p>
              <p className="text-2xl font-bold text-gray-900">
                {updates.reduce((sum, u) => sum + (u.views || 0), 0).toLocaleString()}
              </p>
            </div>
            <TrendingUp className="w-8 h-8 text-purple-600" />
          </div>
        </div>
        <div className="bg-white p-6 rounded-lg shadow-sm border">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Featured</p>
              <p className="text-2xl font-bold text-gray-900">
                {updates.filter(u => u.featured).length}
              </p>
            </div>
            <Star className="w-8 h-8 text-yellow-600" />
          </div>
        </div>
      </div>

      {/* Filters */}
      <div className="bg-white p-4 rounded-lg shadow-sm border mb-6">
        <div className="flex flex-col sm:flex-row gap-4">
          <div className="flex-1">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
              <input
                type="text"
                placeholder="Search updates..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
          </div>
          <select
            value={filterType}
            onChange={(e) => setFilterType(e.target.value)}
            className="px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            {updateTypes.map(type => (
              <option key={type} value={type}>
                {type === 'all' ? 'All Types' : type.charAt(0).toUpperCase() + type.slice(1)}
              </option>
            ))}
          </select>
          <select
            value={filterStatus}
            onChange={(e) => setFilterStatus(e.target.value)}
            className="px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            {statusOptions.map(status => (
              <option key={status} value={status}>
                {status === 'all' ? 'All Status' : status.charAt(0).toUpperCase() + status.slice(1)}
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* Updates Table */}
      <div className="bg-white rounded-lg shadow-sm border overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Update
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Type
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Status
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Published
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Engagement
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {loading ? (
                <tr>
                  <td colSpan="6" className="px-6 py-12 text-center">
                    <div className="flex items-center justify-center">
                      <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
                      <span className="ml-2 text-gray-600">Loading updates...</span>
                    </div>
                  </td>
                </tr>
              ) : filteredUpdates.length === 0 ? (
                <tr>
                  <td colSpan="6" className="px-6 py-12 text-center text-gray-500">
                    No updates found
                  </td>
                </tr>
              ) : (
                filteredUpdates.map((update) => (
                  <tr key={update.id} className="hover:bg-gray-50">
                    <td className="px-6 py-4">
                      <div className="flex items-center">
                        <div className="flex-1">
                          <div className="flex items-center gap-2">
                            <h3 className="text-sm font-medium text-gray-900">{update.title}</h3>
                            {update.featured && (
                              <Star className="w-4 h-4 text-yellow-500 fill-current" />
                            )}
                          </div>
                          <p className="text-sm text-gray-500">{update.category}</p>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <span className={`inline-flex items-center gap-1 px-2 py-1 rounded-full text-xs font-medium ${getTypeColor(update.type)}`}>
                        {getTypeIcon(update.type)}
                        {update.type.charAt(0).toUpperCase() + update.type.slice(1)}
                      </span>
                    </td>
                    <td className="px-6 py-4">
                      <span className={`inline-flex px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(update.status)}`}>
                        {update.status.charAt(0).toUpperCase() + update.status.slice(1)}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-sm text-gray-900">
                      {formatDate(update.publishedAt)}
                    </td>
                    <td className="px-6 py-4">
                      <div className="text-sm text-gray-900">
                        <div className="flex items-center gap-4">
                          <span className="flex items-center gap-1">
                            <Eye className="w-3 h-3" />
                            {update.views?.toLocaleString() || 0}
                          </span>
                          <span className="flex items-center gap-1">
                            <TrendingUp className="w-3 h-3" />
                            {update.likes?.toLocaleString() || 0}
                          </span>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-2">
                        <button
                          onClick={() => handleToggleFeatured(update.id, update.featured)}
                          className={`p-1 rounded hover:bg-gray-100 ${update.featured ? 'text-yellow-600' : 'text-gray-400'}`}
                          title={update.featured ? 'Remove from featured' : 'Add to featured'}
                        >
                          {update.featured ? <Star className="w-4 h-4 fill-current" /> : <StarOff className="w-4 h-4" />}
                        </button>
                        <button
                          onClick={() => window.location.href = `/admin/updates/${update.id}/edit`}
                          className="p-1 text-blue-600 hover:bg-blue-50 rounded"
                          title="Edit update"
                        >
                          <Edit className="w-4 h-4" />
                        </button>
                        <button
                          onClick={() => handleSendNotification(update.id)}
                          className="p-1 text-green-600 hover:bg-green-50 rounded"
                          title="Send notification"
                        >
                          <Send className="w-4 h-4" />
                        </button>
                        <button
                          onClick={() => {
                            setUpdateToDelete(update);
                            setShowDeleteModal(true);
                          }}
                          className="p-1 text-red-600 hover:bg-red-50 rounded"
                          title="Delete update"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Delete Confirmation Modal */}
      {showDeleteModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded-lg max-w-md w-full mx-4">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Delete Update</h3>
            <p className="text-gray-600 mb-6">
              Are you sure you want to delete "{updateToDelete?.title}"? This action cannot be undone.
            </p>
            <div className="flex gap-3 justify-end">
              <button
                onClick={() => setShowDeleteModal(false)}
                className="px-4 py-2 text-gray-600 hover:text-gray-800 transition-colors"
              >
                Cancel
              </button>
              <button
                onClick={() => handleDelete(updateToDelete.id)}
                className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors"
              >
                Delete
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default AdminUpdatesList;
