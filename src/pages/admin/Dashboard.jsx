import React, { useState } from 'react';

const AdminDashboard = () => {
  const [activeTab, setActiveTab] = useState('overview');
  
  // Simulated statistics data
  const stats = {
    totalUsers: 1250,
    activeDrivers: 85,
    completedRides: 3427,
    totalRevenue: 425000,
    averageRating: 4.8,
    pendingVerifications: 12,
  };

  // Simulated recent activities
  const recentActivities = [
    {
      id: 1,
      type: 'new_driver',
      user: 'Jean Pierre',
      timestamp: '2024-01-20T10:30:00',
      status: 'pending',
    },
    {
      id: 2,
      type: 'completed_ride',
      driver: 'Marie Claire',
      passenger: 'Robert Louis',
      amount: 1200,
      timestamp: '2024-01-20T10:15:00',
    },
    {
      id: 3,
      type: 'user_report',
      reporter: 'Sophie Martin',
      reported: 'Paul Henri',
      reason: 'Comportement inapproprié',
      timestamp: '2024-01-20T09:45:00',
      status: 'pending',
    },
  ];

  // Simulated pending verifications
  const pendingVerifications = [
    {
      id: 1,
      name: 'Pierre Joseph',
      type: 'driver',
      documents: ['license', 'insurance', 'registration'],
      submittedAt: '2024-01-19T15:30:00',
    },
    {
      id: 2,
      name: 'Marie Rose',
      type: 'driver',
      documents: ['license', 'insurance'],
      submittedAt: '2024-01-19T14:20:00',
    },
  ];

  const renderOverview = () => (
    <div className="space-y-6">
      {/* Statistics Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <div className="bg-white rounded-lg shadow p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Utilisateurs totaux</p>
              <p className="text-2xl font-semibold text-gray-900">{stats.totalUsers}</p>
            </div>
            <div className="p-3 bg-blue-100 rounded-full">
              <i className="fas fa-users text-blue-600 text-xl"></i>
            </div>
          </div>
          <div className="mt-4">
            <div className="flex items-center text-sm text-green-600">
              <i className="fas fa-arrow-up mr-1"></i>
              <span>12% depuis le mois dernier</span>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Chauffeurs actifs</p>
              <p className="text-2xl font-semibold text-gray-900">{stats.activeDrivers}</p>
            </div>
            <div className="p-3 bg-green-100 rounded-full">
              <i className="fas fa-car text-green-600 text-xl"></i>
            </div>
          </div>
          <div className="mt-4">
            <div className="flex items-center text-sm text-green-600">
              <i className="fas fa-arrow-up mr-1"></i>
              <span>8% depuis le mois dernier</span>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Trajets complétés</p>
              <p className="text-2xl font-semibold text-gray-900">{stats.completedRides}</p>
            </div>
            <div className="p-3 bg-purple-100 rounded-full">
              <i className="fas fa-route text-purple-600 text-xl"></i>
            </div>
          </div>
          <div className="mt-4">
            <div className="flex items-center text-sm text-green-600">
              <i className="fas fa-arrow-up mr-1"></i>
              <span>15% depuis le mois dernier</span>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Revenu total (HTG)</p>
              <p className="text-2xl font-semibold text-gray-900">{stats.totalRevenue.toLocaleString()}</p>
            </div>
            <div className="p-3 bg-yellow-100 rounded-full">
              <i className="fas fa-dollar-sign text-yellow-600 text-xl"></i>
            </div>
          </div>
          <div className="mt-4">
            <div className="flex items-center text-sm text-green-600">
              <i className="fas fa-arrow-up mr-1"></i>
              <span>20% depuis le mois dernier</span>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Note moyenne</p>
              <p className="text-2xl font-semibold text-gray-900">{stats.averageRating}</p>
            </div>
            <div className="p-3 bg-orange-100 rounded-full">
              <i className="fas fa-star text-orange-600 text-xl"></i>
            </div>
          </div>
          <div className="mt-4">
            <div className="flex items-center text-sm text-gray-600">
              <i className="fas fa-equals mr-1"></i>
              <span>Stable depuis le mois dernier</span>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Vérifications en attente</p>
              <p className="text-2xl font-semibold text-gray-900">{stats.pendingVerifications}</p>
            </div>
            <div className="p-3 bg-red-100 rounded-full">
              <i className="fas fa-clock text-red-600 text-xl"></i>
            </div>
          </div>
          <div className="mt-4">
            <div className="flex items-center text-sm text-red-600">
              <i className="fas fa-arrow-up mr-1"></i>
              <span>5 nouvelles aujourd'hui</span>
            </div>
          </div>
        </div>
      </div>

      {/* Recent Activity */}
      <div className="bg-white rounded-lg shadow">
        <div className="p-6">
          <h3 className="text-lg font-semibold text-gray-900">Activité récente</h3>
        </div>
        <div className="border-t">
          {recentActivities.map((activity) => (
            <div key={activity.id} className="p-6 border-b last:border-b-0">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  <div className={`p-2 rounded-full ${
                    activity.type === 'new_driver' 
                      ? 'bg-blue-100 text-blue-600'
                      : activity.type === 'completed_ride'
                      ? 'bg-green-100 text-green-600'
                      : 'bg-red-100 text-red-600'
                  }`}>
                    <i className={`fas fa-${
                      activity.type === 'new_driver'
                        ? 'user-plus'
                        : activity.type === 'completed_ride'
                        ? 'check-circle'
                        : 'exclamation-circle'
                    }`}></i>
                  </div>
                  <div>
                    {activity.type === 'new_driver' && (
                      <p className="text-sm font-medium text-gray-900">
                        Nouveau chauffeur: {activity.user}
                      </p>
                    )}
                    {activity.type === 'completed_ride' && (
                      <p className="text-sm font-medium text-gray-900">
                        Course complétée: {activity.driver} → {activity.passenger}
                      </p>
                    )}
                    {activity.type === 'user_report' && (
                      <p className="text-sm font-medium text-gray-900">
                        Signalement: {activity.reporter} → {activity.reported}
                      </p>
                    )}
                    <p className="text-sm text-gray-500">
                      {new Date(activity.timestamp).toLocaleString()}
                    </p>
                  </div>
                </div>
                {activity.status && (
                  <span className={`px-3 py-1 rounded-full text-xs font-medium ${
                    activity.status === 'pending'
                      ? 'bg-yellow-100 text-yellow-800'
                      : 'bg-green-100 text-green-800'
                  }`}>
                    {activity.status === 'pending' ? 'En attente' : 'Approuvé'}
                  </span>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );

  const renderVerifications = () => (
    <div className="bg-white rounded-lg shadow">
      <div className="p-6">
        <h3 className="text-lg font-semibold text-gray-900">Vérifications en attente</h3>
      </div>
      <div className="border-t">
        {pendingVerifications.map((verification) => (
          <div key={verification.id} className="p-6 border-b last:border-b-0">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-4">
                <div className="h-12 w-12 rounded-full bg-gray-200 flex items-center justify-center">
                  <i className="fas fa-user text-gray-600"></i>
                </div>
                <div>
                  <p className="font-medium text-gray-900">{verification.name}</p>
                  <p className="text-sm text-gray-500">
                    Soumis le {new Date(verification.submittedAt).toLocaleDateString()}
                  </p>
                </div>
              </div>
              <div className="flex items-center space-x-2">
                <button className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500">
                  Approuver
                </button>
                <button className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500">
                  Rejeter
                </button>
              </div>
            </div>
            <div className="mt-4">
              <p className="text-sm font-medium text-gray-700 mb-2">Documents soumis:</p>
              <div className="flex space-x-2">
                {verification.documents.map((doc, index) => (
                  <span
                    key={index}
                    className="px-3 py-1 bg-gray-100 rounded-full text-sm text-gray-700"
                  >
                    {doc}
                  </span>
                ))}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-gray-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-2xl font-bold text-gray-900">Tableau de bord administrateur</h1>
          <p className="mt-1 text-sm text-gray-500">
            Gérez les utilisateurs, surveillez les activités et analysez les performances
          </p>
        </div>

        {/* Tabs */}
        <div className="mb-6">
          <nav className="flex space-x-4">
            <button
              onClick={() => setActiveTab('overview')}
              className={`px-3 py-2 rounded-md text-sm font-medium ${
                activeTab === 'overview'
                  ? 'bg-blue-100 text-blue-700'
                  : 'text-gray-500 hover:text-gray-700'
              }`}
            >
              Vue d'ensemble
            </button>
            <button
              onClick={() => setActiveTab('verifications')}
              className={`px-3 py-2 rounded-md text-sm font-medium ${
                activeTab === 'verifications'
                  ? 'bg-blue-100 text-blue-700'
                  : 'text-gray-500 hover:text-gray-700'
              }`}
            >
              Vérifications
              {stats.pendingVerifications > 0 && (
                <span className="ml-2 px-2 py-0.5 text-xs bg-red-100 text-red-600 rounded-full">
                  {stats.pendingVerifications}
                </span>
              )}
            </button>
          </nav>
        </div>

        {/* Content */}
        {activeTab === 'overview' ? renderOverview() : renderVerifications()}
      </div>
    </div>
  );
};

export default AdminDashboard;
