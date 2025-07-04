import React, { useState } from 'react';
import { Download, Calendar, Mail, FileText, BarChart3, Share2, Send } from 'lucide-react';

export function Reports() {
  const [showContactForm, setShowContactForm] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });

  const reportTemplates = [
    {
      name: 'Executive Summary',
      description: 'High-level SEO performance overview for stakeholders',
      format: 'PDF',
      pages: '2-3 pages',
      frequency: 'Monthly'
    },
    {
      name: 'Technical SEO Report',
      description: 'Detailed technical analysis and recommendations',
      format: 'PDF',
      pages: '8-12 pages',
      frequency: 'Quarterly'
    },
    {
      name: 'Keyword Performance',
      description: 'Keyword rankings and optimization opportunities',
      format: 'Excel',
      pages: 'Data sheets',
      frequency: 'Weekly'
    },
    {
      name: 'Backlink Analysis',
      description: 'Comprehensive backlink profile and opportunities',
      format: 'PDF',
      pages: '5-7 pages',
      frequency: 'Monthly'
    }
  ];

  const scheduledReports = [
    {
      name: 'Monthly SEO Dashboard',
      recipients: 'john@company.com, team@company.com',
      nextSend: 'Dec 1, 2024',
      status: 'Active'
    },
    {
      name: 'Weekly Ranking Update',
      recipients: 'seo-team@company.com',
      nextSend: 'Nov 25, 2024',
      status: 'Active'
    },
    {
      name: 'Quarterly Technical Audit',
      recipients: 'cto@company.com, dev-team@company.com',
      nextSend: 'Jan 1, 2025',
      status: 'Paused'
    }
  ];

  const recentReports = [
    {
      name: 'November SEO Performance',
      type: 'Executive Summary',
      generated: '2 hours ago',
      size: '2.3 MB',
      downloads: 12
    },
    {
      name: 'Q4 Technical Audit',
      type: 'Technical SEO Report',
      generated: '3 days ago',
      size: '5.7 MB',
      downloads: 8
    },
    {
      name: 'Keyword Rankings - Week 47',
      type: 'Keyword Performance',
      generated: '1 week ago',
      size: '1.1 MB',
      downloads: 15
    },
    {
      name: 'Backlink Analysis - November',
      type: 'Backlink Analysis',
      generated: '1 week ago',
      size: '3.2 MB',
      downloads: 6
    }
  ];

  const handleContactSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const subject = encodeURIComponent(formData.subject || 'SEOblend Support Request');
    const body = encodeURIComponent(`Name: ${formData.name}\nEmail: ${formData.email}\n\nMessage:\n${formData.message}`);
    window.open(`mailto:seo@theskillsquad.com?subject=${subject}&body=${body}`);
    setShowContactForm(false);
    setFormData({ name: '', email: '', subject: '', message: '' });
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">SEO Reports</h1>
          <p className="text-gray-600 mt-1">Generate, schedule, and manage comprehensive SEO reports</p>
        </div>
        <div className="flex space-x-3">
          <button 
            onClick={() => setShowContactForm(true)}
            className="bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 transition-colors text-sm font-medium flex items-center space-x-2"
          >
            <Mail className="h-4 w-4" />
            <span>Contact Support</span>
          </button>
          <a 
            href="http://paypal.me/marquesmedical"
            target="_blank"
            rel="noopener noreferrer"
            className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors text-sm font-medium"
          >
            Upgrade for More Reports
          </a>
        </div>
      </div>

      {/* Contact Form Modal */}
      {showContactForm && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-xl shadow-xl p-6 w-full max-w-md mx-4">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Contact Support</h3>
            <form onSubmit={handleContactSubmit} className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Name</label>
                <input
                  type="text"
                  required
                  value={formData.name}
                  onChange={(e) => setFormData({...formData, name: e.target.value})}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
                <input
                  type="email"
                  required
                  value={formData.email}
                  onChange={(e) => setFormData({...formData, email: e.target.value})}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Subject</label>
                <input
                  type="text"
                  value={formData.subject}
                  onChange={(e) => setFormData({...formData, subject: e.target.value})}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="SEOblend Support Request"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Message</label>
                <textarea
                  required
                  rows={4}
                  value={formData.message}
                  onChange={(e) => setFormData({...formData, message: e.target.value})}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="Describe your question or issue..."
                />
              </div>
              <div className="flex space-x-3 pt-4">
                <button
                  type="button"
                  onClick={() => setShowContactForm(false)}
                  className="flex-1 px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="flex-1 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors flex items-center justify-center space-x-2"
                >
                  <Send className="h-4 w-4" />
                  <span>Send Message</span>
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Quick Actions */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
        <h2 className="text-xl font-semibold text-gray-900 mb-4">Quick Report Generation</h2>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {reportTemplates.map((template, index) => (
            <div key={index} className="border border-gray-200 rounded-lg p-4 hover:shadow-md transition-shadow">
              <h3 className="font-medium text-gray-900 mb-2">{template.name}</h3>
              <p className="text-sm text-gray-600 mb-3">{template.description}</p>
              
              <div className="space-y-1 text-xs text-gray-500 mb-4">
                <div className="flex justify-between">
                  <span>Format:</span>
                  <span>{template.format}</span>
                </div>
                <div className="flex justify-between">
                  <span>Size:</span>
                  <span>{template.pages}</span>
                </div>
                <div className="flex justify-between">
                  <span>Recommended:</span>
                  <span>{template.frequency}</span>
                </div>
              </div>
              
              <button className="w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 text-sm font-medium flex items-center justify-center space-x-2">
                <Download className="h-4 w-4" />
                <span>Generate Report</span>
              </button>
            </div>
          ))}
        </div>
      </div>

      {/* Scheduled Reports */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center space-x-3">
            <Calendar className="h-6 w-6 text-blue-600" />
            <h2 className="text-xl font-semibold text-gray-900">Scheduled Reports</h2>
          </div>
          <button className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 text-sm font-medium">
            Schedule New Report
          </button>
        </div>
        
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-gray-200">
                <th className="text-left py-3 px-4 font-medium text-gray-600">Report Name</th>
                <th className="text-left py-3 px-4 font-medium text-gray-600">Recipients</th>
                <th className="text-left py-3 px-4 font-medium text-gray-600">Next Send</th>
                <th className="text-left py-3 px-4 font-medium text-gray-600">Status</th>
                <th className="text-left py-3 px-4 font-medium text-gray-600">Actions</th>
              </tr>
            </thead>
            <tbody>
              {scheduledReports.map((report, index) => (
                <tr key={index} className="border-b border-gray-100 hover:bg-gray-50">
                  <td className="py-3 px-4 font-medium text-gray-900">{report.name}</td>
                  <td className="py-3 px-4 text-sm text-gray-600">{report.recipients}</td>
                  <td className="py-3 px-4 text-sm text-gray-600">{report.nextSend}</td>
                  <td className="py-3 px-4">
                    <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                      report.status === 'Active' ? 'bg-green-100 text-green-800' : 'bg-gray-100 text-gray-800'
                    }`}>
                      {report.status}
                    </span>
                  </td>
                  <td className="py-3 px-4">
                    <div className="flex space-x-2">
                      <button className="text-blue-600 hover:text-blue-800 text-sm font-medium">
                        Edit
                      </button>
                      <button className="text-red-600 hover:text-red-800 text-sm font-medium">
                        Delete
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Recent Reports */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
        <div className="flex items-center space-x-3 mb-6">
          <FileText className="h-6 w-6 text-blue-600" />
          <h2 className="text-xl font-semibold text-gray-900">Recent Reports</h2>
        </div>
        
        <div className="space-y-4">
          {recentReports.map((report, index) => (
            <div key={index} className="flex items-center justify-between p-4 border border-gray-200 rounded-lg hover:bg-gray-50">
              <div className="flex items-center space-x-4">
                <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
                  <FileText className="h-6 w-6 text-blue-600" />
                </div>
                <div>
                  <h3 className="font-medium text-gray-900">{report.name}</h3>
                  <div className="flex items-center space-x-4 text-sm text-gray-600 mt-1">
                    <span>{report.type}</span>
                    <span>•</span>
                    <span>{report.generated}</span>
                    <span>•</span>
                    <span>{report.size}</span>
                    <span>•</span>
                    <span>{report.downloads} downloads</span>
                  </div>
                </div>
              </div>
              
              <div className="flex space-x-2">
                <button className="p-2 text-gray-400 hover:text-gray-600 transition-colors">
                  <Share2 className="h-4 w-4" />
                </button>
                <button 
                  onClick={() => setShowContactForm(true)}
                  className="p-2 text-gray-400 hover:text-gray-600 transition-colors"
                  title="Email report"
                >
                  <Mail className="h-4 w-4" />
                </button>
                <button className="p-2 text-blue-600 hover:text-blue-800 transition-colors">
                  <Download className="h-4 w-4" />
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Report Analytics */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
        <div className="flex items-center space-x-3 mb-6">
          <BarChart3 className="h-6 w-6 text-blue-600" />
          <h2 className="text-xl font-semibold text-gray-900">Report Analytics</h2>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="text-center p-6 bg-blue-50 rounded-lg border border-blue-200">
            <div className="text-3xl font-bold text-blue-600 mb-2">247</div>
            <div className="text-sm text-blue-800 font-medium">Total Reports Generated</div>
            <div className="text-xs text-blue-600 mt-1">This month</div>
          </div>
          
          <div className="text-center p-6 bg-green-50 rounded-lg border border-green-200">
            <div className="text-3xl font-bold text-green-600 mb-2">1,342</div>
            <div className="text-sm text-green-800 font-medium">Report Downloads</div>
            <div className="text-xs text-green-600 mt-1">Last 30 days</div>
          </div>
          
          <div className="text-center p-6 bg-purple-50 rounded-lg border border-purple-200">
            <div className="text-3xl font-bold text-purple-600 mb-2">18</div>
            <div className="text-sm text-purple-800 font-medium">Active Schedules</div>
            <div className="text-xs text-purple-600 mt-1">Automated reports</div>
          </div>
        </div>
      </div>

      {/* Contact Information Footer */}
      <div className="bg-gradient-to-r from-blue-50 to-purple-50 rounded-xl border border-blue-200 p-6">
        <div className="text-center">
          <h3 className="text-lg font-semibold text-gray-900 mb-2">Need Help or Custom Reports?</h3>
          <p className="text-gray-600 mb-4">
            Contact our SEO experts for personalized assistance and custom reporting solutions.
          </p>
          <div className="flex justify-center space-x-4">
            <button 
              onClick={() => setShowContactForm(true)}
              className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition-colors font-medium flex items-center space-x-2"
            >
              <Mail className="h-4 w-4" />
              <span>Contact Support</span>
            </button>
            <a 
              href="http://paypal.me/marquesmedical"
              target="_blank"
              rel="noopener noreferrer"
              className="bg-green-600 text-white px-6 py-2 rounded-lg hover:bg-green-700 transition-colors font-medium"
            >
              Upgrade Plan
            </a>
          </div>
          <p className="text-xs text-gray-500 mt-3">
            Email: seo@theskillsquad.com | Secure payments via PayPal
          </p>
        </div>
      </div>
    </div>
  );
}