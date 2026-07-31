import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Plus, Trash2, Shield, User, Key } from 'lucide-react';
import { ADMIN_API } from '../../utils/api';

export default function AdminUsers() {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  
  const [formData, setFormData] = useState({
    username: '',
    password: '',
    role: 'subadmin',
    name: '',
    email: '',
    phone: ''
  });

  const getAuthHeaders = () => {
    const token = localStorage.getItem('adminToken');
    return { headers: { Authorization: `Bearer ${token}` } };
  };

  const fetchUsers = async () => {
    try {
      setLoading(true);
      const { data } = await axios.get(`${ADMIN_API}/users`, getAuthHeaders());
      setUsers(data);
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to fetch users');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  const handleInputChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleCreateUser = async (e) => {
    e.preventDefault();
    try {
      await axios.post(`${ADMIN_API}/users`, formData, getAuthHeaders());
      setFormData({ username: '', password: '', role: 'subadmin', name: '', email: '', phone: '' });
      fetchUsers();
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to create user');
    }
  };

  const handleDeleteUser = async (id) => {
    if (window.confirm('Are you sure you want to delete this user?')) {
      try {
        await axios.delete(`${ADMIN_API}/users/${id}`, getAuthHeaders());
        fetchUsers();
      } catch (err) {
        setError(err.response?.data?.message || 'Failed to delete user');
      }
    }
  };

  const handleRoleChange = async (id, newRole) => {
    try {
      await axios.put(`${ADMIN_API}/users/${id}/role`, { role: newRole }, getAuthHeaders());
      fetchUsers();
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to change role');
    }
  };

  const handleChangePassword = async (id) => {
    const newPassword = window.prompt("Enter new password for this user:");
    if (newPassword === null || newPassword.trim() === "") return;
    
    try {
      await axios.put(`${ADMIN_API}/users/${id}/password`, { password: newPassword }, getAuthHeaders());
      alert('Password updated successfully!');
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to change password');
    }
  };

  return (
    <div>
      <h1 className="text-2xl font-bold text-gray-800 mb-6 flex items-center gap-2">
        <Shield className="text-orange-500" /> User Management
      </h1>

      {error && (
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative mb-4">
          {error}
        </div>
      )}

      {/* Create User Form */}
      <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200 mb-8 max-w-4xl">
        <h2 className="text-lg font-semibold mb-4">Create New User</h2>
        <form onSubmit={handleCreateUser} className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 items-end">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Name</label>
            <input 
              type="text" 
              name="name"
              value={formData.name}
              onChange={handleInputChange}
              required
              placeholder="e.g. Rahul Sharma"
              className="w-full border border-gray-300 rounded p-2 focus:ring-orange-500 focus:border-orange-500 outline-none"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
            <input 
              type="email" 
              name="email"
              value={formData.email}
              onChange={handleInputChange}
              required
              placeholder="rahul@example.com"
              className="w-full border border-gray-300 rounded p-2 focus:ring-orange-500 focus:border-orange-500 outline-none"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Phone</label>
            <input 
              type="text" 
              name="phone"
              value={formData.phone}
              onChange={handleInputChange}
              required
              placeholder="9876543210"
              className="w-full border border-gray-300 rounded p-2 focus:ring-orange-500 focus:border-orange-500 outline-none"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Username (Login ID)</label>
            <input 
              type="text" 
              name="username"
              value={formData.username}
              onChange={handleInputChange}
              required
              className="w-full border border-gray-300 rounded p-2 focus:ring-orange-500 focus:border-orange-500 outline-none"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Password</label>
            <input 
              type="password" 
              name="password"
              value={formData.password}
              onChange={handleInputChange}
              required
              className="w-full border border-gray-300 rounded p-2 focus:ring-orange-500 focus:border-orange-500 outline-none"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Role</label>
            <select 
              name="role"
              value={formData.role}
              onChange={handleInputChange}
              className="w-full border border-gray-300 rounded p-2 focus:ring-orange-500 focus:border-orange-500 outline-none"
            >
              <option value="subadmin">Sub-Admin</option>
              <option value="admin">Admin</option>
            </select>
          </div>
          <div className="lg:col-span-3">
            <button 
              type="submit" 
              className="bg-orange-500 hover:bg-orange-600 text-white px-6 py-2 rounded flex items-center justify-center gap-2 transition-colors w-full md:w-auto mt-2"
            >
              <Plus size={18} /> Add User
            </button>
          </div>
        </form>
      </div>

      {/* Users List */}
      <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-x-auto">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">User Details</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Contact</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Role</th>
              <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {loading ? (
              <tr><td colSpan="4" className="text-center py-4">Loading users...</td></tr>
            ) : users.map(user => (
              <tr key={user._id} className="hover:bg-gray-50">
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="flex items-center gap-3">
                    <div className="bg-gray-100 p-2 rounded-full hidden sm:block">
                      <User size={16} className="text-gray-600" />
                    </div>
                    <div>
                      <p className="font-medium text-gray-900">{user.name || 'N/A'}</p>
                      <p className="text-sm text-gray-500">@{user.username}</p>
                    </div>
                  </div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <p className="text-sm text-gray-900">{user.email || 'N/A'}</p>
                  <p className="text-sm text-gray-500">{user.phone || 'N/A'}</p>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <select 
                    value={user.role} 
                    onChange={(e) => handleRoleChange(user._id, e.target.value)}
                    className={`text-sm rounded-full px-3 py-1 font-semibold border-none outline-none focus:ring-2 focus:ring-orange-500 ${
                      user.role === 'admin' ? 'bg-purple-100 text-purple-800' : 'bg-blue-100 text-blue-800'
                    }`}
                  >
                    <option value="admin">Admin</option>
                    <option value="subadmin">Sub-Admin</option>
                  </select>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                  <button 
                    onClick={() => handleChangePassword(user._id)}
                    className="text-blue-600 hover:text-blue-900 p-2 hover:bg-blue-50 rounded-full transition-colors mr-2"
                    title="Change Password"
                  >
                    <Key size={18} />
                  </button>
                  <button 
                    onClick={() => handleDeleteUser(user._id)}
                    className="text-red-600 hover:text-red-900 p-2 hover:bg-red-50 rounded-full transition-colors"
                    title="Delete User"
                  >
                    <Trash2 size={18} />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
