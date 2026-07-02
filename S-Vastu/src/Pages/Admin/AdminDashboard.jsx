import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { PAGES_API } from '../../utils/api';

export default function AdminDashboard() {
  const [stats, setStats] = useState({ pagesCount: 0 });

  useEffect(() => {
    // In a real app, you might fetch actual stats from a /api/admin/dashboard endpoint
    // For now, we can just fetch the pages to get the count
    const fetchStats = async () => {
      try {
        const { data } = await axios.get(PAGES_API);
        setStats({ pagesCount: data.length });
      } catch (error) {
        console.error('Error fetching stats', error);
      }
    };
    fetchStats();
  }, []);

  return (
    <div className="max-w-7xl mx-auto px-4 py-12">
      <h1 className="text-3xl font-bold text-gray-900 mb-8">Admin Dashboard</h1>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200 flex items-center justify-between">
          <div>
            <p className="text-sm font-medium text-gray-500 uppercase">Total City Pages</p>
            <p className="text-3xl font-bold text-gray-900 mt-1">{stats.pagesCount}</p>
          </div>
          <div className="bg-orange-100 p-3 rounded-full">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-orange-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
            </svg>
          </div>
        </div>
      </div>
      
      <div className="mt-12 bg-white p-8 rounded-lg shadow-sm border border-gray-200">
        <h2 className="text-xl font-bold text-gray-900 mb-4">Welcome to S-Vastu Admin</h2>
        <p className="text-gray-600">
          Use the sidebar to navigate through the administration panel. You can manage your SEO-optimized city pages to improve your local search rankings.
        </p>
      </div>
    </div>
  );
}
