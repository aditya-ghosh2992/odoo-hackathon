import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Search, Filter, MapPin, Star, Clock, MessageSquare, X } from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';
import { userAPI, swapAPI } from '../services/api';
import toast from 'react-hot-toast';
import type { User, CreateSwapRequestData } from '../types';

interface SwapRequestModalProps {
  isOpen: boolean;
  onClose: () => void;
  targetUser: User | null;
  onSubmit: (data: CreateSwapRequestData) => void;
}

function SwapRequestModal({ isOpen, onClose, targetUser, onSubmit }: SwapRequestModalProps) {
  const { user } = useAuth();
  const [formData, setFormData] = useState<CreateSwapRequestData>({
    recipientId: '',
    offeredSkill: { name: '', level: 'Beginner', description: '' },
    requestedSkill: { name: '', level: 'Beginner', description: '' },
    message: '',
    meetingType: 'Online',
    duration: '1 hour'
  });

  if (!isOpen || !targetUser) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.offeredSkill.name || !formData.requestedSkill.name || !formData.message?.trim()) {
      toast.error('Please fill in all required fields');
      return;
    }
    if (targetUser) {
      onSubmit({
        ...formData,
        recipientId: targetUser._id
      });
    }
    onClose();
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
        <div className="flex items-center justify-between p-6 border-b">
          <h2 className="text-xl font-bold text-gray-900">Request Skill Swap</h2>
          <button onClick={onClose} className="text-gray-400 hover:text-gray-600">
            <X className="h-6 w-6" />
          </button>
        </div>

        <div className="p-6">
          <div className="flex items-center space-x-4 mb-6 p-4 bg-gray-50 rounded-lg">
            <div className="w-12 h-12 bg-primary-100 rounded-full flex items-center justify-center">
              <span className="text-primary-600 font-semibold">
                {targetUser.fullName.split(' ').map(n => n[0]).join('')}
              </span>
            </div>
            <div>
              <h3 className="font-semibold text-gray-900">{targetUser.fullName}</h3>
              <p className="text-sm text-gray-600">@{targetUser.username}</p>
            </div>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            {/* What you're offering */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                What skill are you offering? *
              </label>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <select
                  value={formData.offeredSkill.name}
                  onChange={(e) => setFormData(prev => ({
                    ...prev,
                    offeredSkill: { ...prev.offeredSkill, name: e.target.value }
                  }))}
                  className="block w-full rounded-md border-gray-300 shadow-sm focus:border-primary-500 focus:ring-primary-500"
                  required
                >
                  <option value="">Select a skill</option>
                  {user?.skillsOffered.map((skill, index) => (
                    <option key={index} value={skill.name}>{skill.name} ({skill.level})</option>
                  ))}
                </select>
                <select
                  value={formData.offeredSkill.level}
                  onChange={(e) => setFormData(prev => ({
                    ...prev,
                    offeredSkill: { ...prev.offeredSkill, level: e.target.value as any }
                  }))}
                  className="block w-full rounded-md border-gray-300 shadow-sm focus:border-primary-500 focus:ring-primary-500"
                >
                  <option value="Beginner">Beginner</option>
                  <option value="Intermediate">Intermediate</option>
                  <option value="Advanced">Advanced</option>
                  <option value="Expert">Expert</option>
                </select>
              </div>
            </div>

            {/* What you want to learn */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                What skill do you want to learn? *
              </label>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <select
                  value={formData.requestedSkill.name}
                  onChange={(e) => setFormData(prev => ({
                    ...prev,
                    requestedSkill: { ...prev.requestedSkill, name: e.target.value }
                  }))}
                  className="block w-full rounded-md border-gray-300 shadow-sm focus:border-primary-500 focus:ring-primary-500"
                  required
                >
                  <option value="">Select a skill</option>
                  {targetUser.skillsOffered.map((skill, index) => (
                    <option key={index} value={skill.name}>{skill.name} ({skill.level})</option>
                  ))}
                </select>
                <select
                  value={formData.requestedSkill.level}
                  onChange={(e) => setFormData(prev => ({
                    ...prev,
                    requestedSkill: { ...prev.requestedSkill, level: e.target.value as any }
                  }))}
                  className="block w-full rounded-md border-gray-300 shadow-sm focus:border-primary-500 focus:ring-primary-500"
                >
                  <option value="Beginner">Beginner</option>
                  <option value="Intermediate">Intermediate</option>
                  <option value="Advanced">Advanced</option>
                  <option value="Expert">Expert</option>
                </select>
              </div>
            </div>

            {/* Meeting preferences */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Meeting Type</label>
                <select
                  value={formData.meetingType}
                  onChange={(e) => setFormData(prev => ({ ...prev, meetingType: e.target.value as any }))}
                  className="block w-full rounded-md border-gray-300 shadow-sm focus:border-primary-500 focus:ring-primary-500"
                >
                  <option value="Online">Online</option>
                  <option value="In-Person">In-Person</option>
                  <option value="Flexible">Flexible</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Duration</label>
                <select
                  value={formData.duration}
                  onChange={(e) => setFormData(prev => ({ ...prev, duration: e.target.value }))}
                  className="block w-full rounded-md border-gray-300 shadow-sm focus:border-primary-500 focus:ring-primary-500"
                >
                  <option value="30 minutes">30 minutes</option>
                  <option value="1 hour">1 hour</option>
                  <option value="1.5 hours">1.5 hours</option>
                  <option value="2 hours">2 hours</option>
                  <option value="3 hours">3 hours</option>
                  <option value="Half day">Half day</option>
                  <option value="Full day">Full day</option>
                </select>
              </div>
            </div>

            {/* Message */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Message *
              </label>
              <textarea
                value={formData.message}
                onChange={(e) => setFormData(prev => ({ ...prev, message: e.target.value }))}
                rows={4}
                className="block w-full rounded-md border-gray-300 shadow-sm focus:border-primary-500 focus:ring-primary-500"
                placeholder="Introduce yourself and explain why you'd like to do this skill swap..."
                required
              />
            </div>

            <div className="flex justify-end space-x-4">
              <button
                type="button"
                onClick={onClose}
                className="px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md hover:bg-gray-50"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="px-4 py-2 text-sm font-medium text-white bg-primary-600 rounded-md hover:bg-primary-700"
              >
                Send Request
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default function BrowsePage() {
  const { user, isDemoMode } = useAuth();
  const navigate = useNavigate();
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedSkill, setSelectedSkill] = useState('');
  const [selectedLevel, setSelectedLevel] = useState('');
  const [showModal, setShowModal] = useState(false);
  const [selectedUser, setSelectedUser] = useState<User | null>(null);

  useEffect(() => {
    loadUsers();
  }, []);

  const loadUsers = async () => {
    try {
      setLoading(true);
      const response = await userAPI.getUsers({ page: 1, limit: 20 });
      setUsers(response.users || []);
    } catch (error) {
      console.error('Failed to load users:', error);
      toast.error('Failed to load users');
    } finally {
      setLoading(false);
    }
  };

  const handleSwapRequest = async (data: CreateSwapRequestData) => {
    if (!selectedUser) return;

    try {
      if (isDemoMode) {
        toast.success('Skill swap request sent! (Demo mode - request not actually sent)');
        return;
      }

      await swapAPI.createRequest({
        ...data,
        recipientId: selectedUser._id
      });
      toast.success('Skill swap request sent successfully!');
    } catch (error) {
      console.error('Failed to send swap request:', error);
      toast.error('Failed to send swap request');
    }
  };

  const filteredUsers = users.filter(u => {
    if (u._id === user?._id) return false; // Don't show current user
    
    const matchesSearch = !searchTerm || 
      u.fullName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      u.skillsOffered.some(skill => skill.name.toLowerCase().includes(searchTerm.toLowerCase()));
    
    const matchesSkill = !selectedSkill ||
      u.skillsOffered.some(skill => skill.name.toLowerCase().includes(selectedSkill.toLowerCase()));
    
    const matchesLevel = !selectedLevel ||
      u.skillsOffered.some(skill => skill.level === selectedLevel);
    
    return matchesSearch && matchesSkill && matchesLevel;
  });

  const allSkills = [...new Set(users.flatMap(u => u.skillsOffered.map(s => s.name)))].sort();

  if (loading) {
    return (
      <div className="flex items-center justify-center py-12">
        <div className="spinner"></div>
      </div>
    );
  }

  return (
    <div className="space-y-8">
      <div className="text-center">
        <h1 className="text-3xl font-bold text-gray-900 mb-4">Find Skills</h1>
        <p className="text-gray-600">Connect with skilled people and exchange knowledge</p>
      </div>

      {/* Search and Filters */}
      <div className="bg-white rounded-xl p-6 shadow-sm border">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <div className="md:col-span-2">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
              <input
                type="text"
                placeholder="Search by name or skill..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
              />
            </div>
          </div>
          <div>
            <select
              value={selectedSkill}
              onChange={(e) => setSelectedSkill(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
            >
              <option value="">All Skills</option>
              {allSkills.map(skill => (
                <option key={skill} value={skill}>{skill}</option>
              ))}
            </select>
          </div>
          <div>
            <select
              value={selectedLevel}
              onChange={(e) => setSelectedLevel(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
            >
              <option value="">All Levels</option>
              <option value="Beginner">Beginner</option>
              <option value="Intermediate">Intermediate</option>
              <option value="Advanced">Advanced</option>
              <option value="Expert">Expert</option>
            </select>
          </div>
        </div>
      </div>

      {/* Results */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredUsers.map((user) => (
          <div key={user._id} className="bg-white rounded-xl p-6 shadow-sm border hover:shadow-md transition-shadow">
            <div className="flex items-center space-x-4 mb-4">
              <div className="w-12 h-12 bg-primary-100 rounded-full flex items-center justify-center">
                <span className="text-primary-600 font-semibold">
                  {user.fullName.split(' ').map(n => n[0]).join('')}
                </span>
              </div>
              <div className="flex-1">
                <h3 className="font-semibold text-gray-900">{user.fullName}</h3>
                <p className="text-sm text-gray-600">@{user.username}</p>
              </div>
              <div className="flex items-center space-x-1 text-yellow-500">
                <Star className="h-4 w-4 fill-current" />
                <span className="text-sm font-medium">{user.rating.average}</span>
              </div>
            </div>

            <p className="text-sm text-gray-600 mb-4 line-clamp-2">{user.bio}</p>

            <div className="flex items-center space-x-4 text-xs text-gray-500 mb-4">
              <div className="flex items-center space-x-1">
                <MapPin className="h-3 w-3" />
                <span>{user.location}</span>
              </div>
              <div className="flex items-center space-x-1">
                <Clock className="h-3 w-3" />
                <span>{user.availability}</span>
              </div>
            </div>

            <div className="space-y-3">
              <div>
                <h4 className="text-sm font-medium text-gray-900 mb-2">Skills Offered</h4>
                <div className="flex flex-wrap gap-1">
                  {user.skillsOffered.slice(0, 3).map((skill, index) => (
                    <span
                      key={index}
                      className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-green-100 text-green-800"
                    >
                      {skill.name} ({skill.level})
                    </span>
                  ))}
                  {user.skillsOffered.length > 3 && (
                    <span className="text-xs text-gray-500">+{user.skillsOffered.length - 3} more</span>
                  )}
                </div>
              </div>

              <div>
                <h4 className="text-sm font-medium text-gray-900 mb-2">Looking to Learn</h4>
                <div className="flex flex-wrap gap-1">
                  {user.skillsWanted.slice(0, 2).map((skill, index) => (
                    <span
                      key={index}
                      className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-blue-100 text-blue-800"
                    >
                      {skill.name}
                    </span>
                  ))}
                  {user.skillsWanted.length > 2 && (
                    <span className="text-xs text-gray-500">+{user.skillsWanted.length - 2} more</span>
                  )}
                </div>
              </div>
            </div>

            <div className="flex space-x-2 mt-4 pt-4 border-t">
              <button
                onClick={() => navigate(`/users/${user._id}`)}
                className="flex-1 px-3 py-2 text-sm font-medium text-gray-700 bg-gray-100 rounded-md hover:bg-gray-200"
              >
                View Profile
              </button>
              <button
                onClick={() => {
                  setSelectedUser(user);
                  setShowModal(true);
                }}
                className="flex-1 px-3 py-2 text-sm font-medium text-white bg-primary-600 rounded-md hover:bg-primary-700 flex items-center justify-center space-x-1"
              >
                <MessageSquare className="h-4 w-4" />
                <span>Request Swap</span>
              </button>
            </div>
          </div>
        ))}
      </div>

      {filteredUsers.length === 0 && !loading && (
        <div className="text-center py-12">
          <Filter className="h-12 w-12 text-gray-400 mx-auto mb-4" />
          <h3 className="text-lg font-medium text-gray-900 mb-2">No users found</h3>
          <p className="text-gray-600">Try adjusting your search criteria</p>
        </div>
      )}

      <SwapRequestModal
        isOpen={showModal}
        onClose={() => setShowModal(false)}
        targetUser={selectedUser}
        onSubmit={handleSwapRequest}
      />
    </div>
  );
}
