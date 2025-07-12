import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import { Users, MessageSquare, Star, Plus, TrendingUp } from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';
import { swapAPI, userAPI } from '../services/api';
import { formatDate, getStatusColor, getAvatarFallback } from '../lib/utils';

export default function DashboardPage() {
  const { user } = useAuth();
  const [stats, setStats] = useState({
    totalUsers: 0,
    pendingRequests: 0,
    completedSwaps: 0,
    averageRating: 0,
  });

  // Fetch recent swap requests
  const { data: recentRequests, isLoading: loadingRequests } = useQuery({
    queryKey: ['recent-requests'],
    queryFn: () => Promise.all([
      swapAPI.getSentRequests({ limit: 3 }),
      swapAPI.getReceivedRequests({ limit: 3 })
    ]),
  });

  // Fetch recent users
  const { data: recentUsers, isLoading: loadingUsers } = useQuery({
    queryKey: ['recent-users'],
    queryFn: () => userAPI.getUsers({ limit: 6 }),
  });

  useEffect(() => {
    // Update stats when data is loaded
    if (recentRequests && user) {
      const [sentRequests, receivedRequests] = recentRequests;
      const pendingCount = receivedRequests.swapRequests.filter(
        req => req.status === 'pending'
      ).length;

      setStats({
        totalUsers: recentUsers?.total || 0,
        pendingRequests: pendingCount,
        completedSwaps: user.completedSwaps,
        averageRating: user.rating.average,
      });
    }
  }, [recentRequests, recentUsers, user]);

  const statCards = [
    {
      title: 'Total Users',
      value: stats.totalUsers.toLocaleString(),
      icon: Users,
      color: 'bg-blue-500',
      change: '+12%',
    },
    {
      title: 'Pending Requests',
      value: stats.pendingRequests,
      icon: MessageSquare,
      color: 'bg-yellow-500',
      link: '/swaps?tab=received&status=pending',
    },
    {
      title: 'Completed Swaps',
      value: stats.completedSwaps,
      icon: TrendingUp,
      color: 'bg-green-500',
    },
    {
      title: 'Your Rating',
      value: stats.averageRating.toFixed(1),
      icon: Star,
      color: 'bg-purple-500',
      suffix: '/5.0',
    },
  ];

  return (
    <div className="space-y-8">
      {/* Welcome Header */}
      <div className="bg-gradient-to-r from-primary-600 to-secondary-600 rounded-2xl p-8 text-white">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold mb-2">
              Welcome back, {user?.fullName.split(' ')[0]}! 👋
            </h1>
            <p className="text-primary-100 text-lg">
              Ready to continue your skill sharing journey?
            </p>
          </div>
          <div className="hidden md:block">
            <Link
              to="/browse"
              className="bg-white text-primary-600 px-6 py-3 rounded-lg font-semibold hover:bg-gray-100 transition-colors inline-flex items-center"
            >
              <Plus className="w-5 h-5 mr-2" />
              Find Skills
            </Link>
          </div>
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {statCards.map((stat, index) => (
          <div key={index} className="bg-white rounded-xl p-6 shadow-sm border hover:shadow-md transition-shadow">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">{stat.title}</p>
                <p className="text-2xl font-bold text-gray-900 mt-1">
                  {stat.value}
                  {stat.suffix && <span className="text-sm text-gray-500">{stat.suffix}</span>}
                </p>
                {stat.change && (
                  <p className="text-sm text-green-600 mt-1">{stat.change} this month</p>
                )}
              </div>
              <div className={`w-12 h-12 rounded-xl ${stat.color} flex items-center justify-center`}>
                <stat.icon className="w-6 h-6 text-white" />
              </div>
            </div>
            {stat.link && (
              <Link to={stat.link} className="text-primary-600 text-sm font-medium mt-3 inline-block hover:text-primary-700">
                View all →
              </Link>
            )}
          </div>
        ))}
      </div>

      <div className="grid lg:grid-cols-2 gap-8">
        {/* Recent Swap Requests */}
        <div className="bg-white rounded-xl p-6 shadow-sm border">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-xl font-bold text-gray-900">Recent Requests</h2>
            <Link to="/swaps" className="text-primary-600 text-sm font-medium hover:text-primary-700">
              View all
            </Link>
          </div>

          {loadingRequests ? (
            <div className="space-y-4">
              {[1, 2, 3].map(i => (
                <div key={i} className="animate-pulse">
                  <div className="h-4 bg-gray-200 rounded w-3/4 mb-2"></div>
                  <div className="h-3 bg-gray-200 rounded w-1/2"></div>
                </div>
              ))}
            </div>
          ) : (
            <div className="space-y-4">
              {recentRequests && recentRequests[1].swapRequests.length > 0 ? (
                recentRequests[1].swapRequests.slice(0, 3).map((request) => (
                  <div key={request._id} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                    <div className="flex items-center space-x-3">
                      {request.requester.profilePhoto ? (
                        <img
                          src={`http://localhost:5000${request.requester.profilePhoto}`}
                          alt={request.requester.fullName}
                          className="w-10 h-10 rounded-full object-cover"
                        />
                      ) : (
                        <div className="w-10 h-10 bg-primary-600 rounded-full flex items-center justify-center">
                          <span className="text-white text-sm font-medium">
                            {getAvatarFallback(request.requester.fullName)}
                          </span>
                        </div>
                      )}
                      <div>
                        <p className="font-medium text-gray-900">{request.requester.fullName}</p>
                        <p className="text-sm text-gray-600">
                          Wants to learn {request.requestedSkill.name}
                        </p>
                      </div>
                    </div>
                    <div className="text-right">
                      <span className={`inline-block px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(request.status)}`}>
                        {request.status}
                      </span>
                      <p className="text-xs text-gray-500 mt-1">
                        {formatDate(request.createdAt)}
                      </p>
                    </div>
                  </div>
                ))
              ) : (
                <p className="text-gray-500 text-center py-8">No recent requests</p>
              )}
            </div>
          )}
        </div>

        {/* Recent Users */}
        <div className="bg-white rounded-xl p-6 shadow-sm border">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-xl font-bold text-gray-900">New Members</h2>
            <Link to="/browse" className="text-primary-600 text-sm font-medium hover:text-primary-700">
              Browse all
            </Link>
          </div>

          {loadingUsers ? (
            <div className="space-y-4">
              {[1, 2, 3].map(i => (
                <div key={i} className="animate-pulse">
                  <div className="flex items-center space-x-3">
                    <div className="w-10 h-10 bg-gray-200 rounded-full"></div>
                    <div className="flex-1">
                      <div className="h-4 bg-gray-200 rounded w-3/4 mb-1"></div>
                      <div className="h-3 bg-gray-200 rounded w-1/2"></div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="space-y-4">
              {recentUsers && recentUsers.users.length > 0 ? (
                recentUsers.users.slice(0, 6).map((member) => (
                  <div key={member._id} className="flex items-center justify-between">
                    <Link 
                      to={`/users/${member._id}`}
                      className="flex items-center space-x-3 hover:bg-gray-50 rounded-lg p-2 -m-2 transition-colors"
                    >
                      {member.profilePhoto ? (
                        <img
                          src={`http://localhost:5000${member.profilePhoto}`}
                          alt={member.fullName}
                          className="w-10 h-10 rounded-full object-cover"
                        />
                      ) : (
                        <div className="w-10 h-10 bg-primary-600 rounded-full flex items-center justify-center">
                          <span className="text-white text-sm font-medium">
                            {getAvatarFallback(member.fullName)}
                          </span>
                        </div>
                      )}
                      <div>
                        <p className="font-medium text-gray-900">{member.fullName}</p>
                        <p className="text-sm text-gray-600">
                          {member.skillsOffered.length} skills offered
                        </p>
                      </div>
                    </Link>
                    <div className="flex items-center space-x-1">
                      <Star className="w-4 h-4 text-yellow-400 fill-current" />
                      <span className="text-sm text-gray-600">
                        {member.rating.average.toFixed(1)}
                      </span>
                    </div>
                  </div>
                ))
              ) : (
                <p className="text-gray-500 text-center py-8">No users found</p>
              )}
            </div>
          )}
        </div>
      </div>

      {/* Quick Actions */}
      <div className="bg-white rounded-xl p-6 shadow-sm border">
        <h2 className="text-xl font-bold text-gray-900 mb-6">Quick Actions</h2>
        <div className="grid md:grid-cols-3 gap-4">
          <Link
            to="/profile"
            className="p-4 border-2 border-gray-200 rounded-lg hover:border-primary-300 hover:bg-primary-50 transition-colors text-center"
          >
            <Users className="w-8 h-8 text-primary-600 mx-auto mb-2" />
            <h3 className="font-medium text-gray-900">Update Profile</h3>
            <p className="text-sm text-gray-600 mt-1">Add new skills or update your info</p>
          </Link>
          
          <Link
            to="/browse"
            className="p-4 border-2 border-gray-200 rounded-lg hover:border-primary-300 hover:bg-primary-50 transition-colors text-center"
          >
            <MessageSquare className="w-8 h-8 text-primary-600 mx-auto mb-2" />
            <h3 className="font-medium text-gray-900">Find Skills</h3>
            <p className="text-sm text-gray-600 mt-1">Browse users and send swap requests</p>
          </Link>
          
          <Link
            to="/swaps"
            className="p-4 border-2 border-gray-200 rounded-lg hover:border-primary-300 hover:bg-primary-50 transition-colors text-center"
          >
            <Star className="w-8 h-8 text-primary-600 mx-auto mb-2" />
            <h3 className="font-medium text-gray-900">Manage Swaps</h3>
            <p className="text-sm text-gray-600 mt-1">View and manage your swap requests</p>
          </Link>
        </div>
      </div>
    </div>
  );
}
