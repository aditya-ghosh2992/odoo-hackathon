import { useState, useEffect } from 'react';
import { Calendar, Clock, MapPin, MessageSquare, Check, X, Star, AlertCircle } from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';
import { swapAPI } from '../services/api';
import toast from 'react-hot-toast';
import type { SwapRequest, FeedbackData } from '../types';

interface FeedbackModalProps {
  isOpen: boolean;
  onClose: () => void;
  swapRequest: SwapRequest | null;
  onSubmit: (feedback: FeedbackData) => void;
}

function FeedbackModal({ isOpen, onClose, swapRequest, onSubmit }: FeedbackModalProps) {
  const [rating, setRating] = useState(5);
  const [comment, setComment] = useState('');

  if (!isOpen || !swapRequest) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit({ rating, comment });
    onClose();
    setRating(5);
    setComment('');
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-xl max-w-md w-full">
        <div className="p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Leave Feedback</h3>
          
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Rating</label>
              <div className="flex space-x-1">
                {[1, 2, 3, 4, 5].map((star) => (
                  <button
                    key={star}
                    type="button"
                    onClick={() => setRating(star)}
                    className={`h-8 w-8 ${star <= rating ? 'text-yellow-400' : 'text-gray-300'}`}
                  >
                    <Star className="h-full w-full fill-current" />
                  </button>
                ))}
              </div>
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Comment</label>
              <textarea
                value={comment}
                onChange={(e) => setComment(e.target.value)}
                rows={3}
                className="w-full rounded-md border-gray-300 shadow-sm focus:border-primary-500 focus:ring-primary-500"
                placeholder="Share your experience..."
                required
              />
            </div>
            
            <div className="flex justify-end space-x-3">
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
                Submit Feedback
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

function SwapCard({ swap, type, onAction }: { 
  swap: SwapRequest; 
  type: 'sent' | 'received'; 
  onAction: (action: string, swap: SwapRequest) => void;
}) {
  const otherUser = type === 'sent' ? swap.recipient : swap.requester;
  
  const getStatusColor = (status: string) => {
    switch (status) {
      case 'pending': return 'bg-yellow-100 text-yellow-800';
      case 'accepted': return 'bg-green-100 text-green-800';
      case 'rejected': return 'bg-red-100 text-red-800';
      case 'completed': return 'bg-blue-100 text-blue-800';
      case 'cancelled': return 'bg-gray-100 text-gray-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'pending': return <Clock className="h-4 w-4" />;
      case 'accepted': return <Check className="h-4 w-4" />;
      case 'rejected': return <X className="h-4 w-4" />;
      case 'completed': return <Star className="h-4 w-4" />;
      case 'cancelled': return <AlertCircle className="h-4 w-4" />;
      default: return <Clock className="h-4 w-4" />;
    }
  };

  return (
    <div className="bg-white rounded-xl p-6 shadow-sm border">
      <div className="flex items-start justify-between mb-4">
        <div className="flex items-center space-x-3">
          <div className="w-10 h-10 bg-primary-100 rounded-full flex items-center justify-center">
            <span className="text-primary-600 font-semibold text-sm">
              {otherUser.fullName.split(' ').map(n => n[0]).join('')}
            </span>
          </div>
          <div>
            <h3 className="font-semibold text-gray-900">{otherUser.fullName}</h3>
            <p className="text-sm text-gray-600">@{otherUser.username}</p>
          </div>
        </div>
        <div className={`inline-flex items-center space-x-1 px-3 py-1 rounded-full text-xs font-medium ${getStatusColor(swap.status)}`}>
          {getStatusIcon(swap.status)}
          <span className="capitalize">{swap.status}</span>
        </div>
      </div>

      <div className="space-y-3 mb-4">
        <div className="flex items-center space-x-2 text-sm">
          <span className="font-medium text-gray-700">Offering:</span>
          <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-green-100 text-green-800">
            {swap.offeredSkill.name} ({swap.offeredSkill.level})
          </span>
        </div>
        <div className="flex items-center space-x-2 text-sm">
          <span className="font-medium text-gray-700">Requesting:</span>
          <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
            {swap.requestedSkill.name} ({swap.requestedSkill.level})
          </span>
        </div>
      </div>

      {swap.message && (
        <div className="bg-gray-50 rounded-lg p-3 mb-4">
          <p className="text-sm text-gray-700">{swap.message}</p>
        </div>
      )}

      <div className="flex items-center space-x-4 text-xs text-gray-500 mb-4">
        <div className="flex items-center space-x-1">
          <MapPin className="h-3 w-3" />
          <span>{swap.meetingType}</span>
        </div>
        <div className="flex items-center space-x-1">
          <Clock className="h-3 w-3" />
          <span>{swap.duration}</span>
        </div>
        {swap.scheduledDate && (
          <div className="flex items-center space-x-1">
            <Calendar className="h-3 w-3" />
            <span>{new Date(swap.scheduledDate).toLocaleDateString()}</span>
          </div>
        )}
      </div>

      {/* Feedback display */}
      {swap.status === 'completed' && (swap.feedback.requesterFeedback || swap.feedback.recipientFeedback) && (
        <div className="border-t pt-4 mb-4">
          <h4 className="text-sm font-medium text-gray-700 mb-2">Feedback</h4>
          {swap.feedback.requesterFeedback && (
            <div className="mb-2">
              <div className="flex items-center space-x-2 mb-1">
                <span className="text-xs font-medium text-gray-600">From {swap.requester.fullName}:</span>
                <div className="flex items-center">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className={`h-3 w-3 ${i < swap.feedback.requesterFeedback!.rating ? 'text-yellow-400 fill-current' : 'text-gray-300'}`} />
                  ))}
                </div>
              </div>
              <p className="text-xs text-gray-600">{swap.feedback.requesterFeedback.comment}</p>
            </div>
          )}
          {swap.feedback.recipientFeedback && (
            <div>
              <div className="flex items-center space-x-2 mb-1">
                <span className="text-xs font-medium text-gray-600">From {swap.recipient.fullName}:</span>
                <div className="flex items-center">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className={`h-3 w-3 ${i < swap.feedback.recipientFeedback!.rating ? 'text-yellow-400 fill-current' : 'text-gray-300'}`} />
                  ))}
                </div>
              </div>
              <p className="text-xs text-gray-600">{swap.feedback.recipientFeedback.comment}</p>
            </div>
          )}
        </div>
      )}

      {/* Action buttons */}
      <div className="flex space-x-2">
        {type === 'received' && swap.status === 'pending' && (
          <>
            <button
              onClick={() => onAction('accept', swap)}
              className="flex-1 px-3 py-2 text-sm font-medium text-white bg-green-600 rounded-md hover:bg-green-700"
            >
              Accept
            </button>
            <button
              onClick={() => onAction('reject', swap)}
              className="flex-1 px-3 py-2 text-sm font-medium text-white bg-red-600 rounded-md hover:bg-red-700"
            >
              Reject
            </button>
          </>
        )}
        
        {swap.status === 'accepted' && (
          <button
            onClick={() => onAction('complete', swap)}
            className="flex-1 px-3 py-2 text-sm font-medium text-white bg-blue-600 rounded-md hover:bg-blue-700"
          >
            Mark as Complete
          </button>
        )}
        
        {swap.status === 'completed' && !swap.feedback.requesterFeedback && type === 'sent' && (
          <button
            onClick={() => onAction('feedback', swap)}
            className="flex-1 px-3 py-2 text-sm font-medium text-white bg-primary-600 rounded-md hover:bg-primary-700"
          >
            Leave Feedback
          </button>
        )}
        
        {swap.status === 'completed' && !swap.feedback.recipientFeedback && type === 'received' && (
          <button
            onClick={() => onAction('feedback', swap)}
            className="flex-1 px-3 py-2 text-sm font-medium text-white bg-primary-600 rounded-md hover:bg-primary-700"
          >
            Leave Feedback
          </button>
        )}
        
        {(swap.status === 'pending' || swap.status === 'accepted') && type === 'sent' && (
          <button
            onClick={() => onAction('cancel', swap)}
            className="flex-1 px-3 py-2 text-sm font-medium text-gray-700 bg-gray-100 rounded-md hover:bg-gray-200"
          >
            Cancel
          </button>
        )}
      </div>
    </div>
  );
}

export default function SwapsPage() {
  const { isDemoMode } = useAuth();
  const [activeTab, setActiveTab] = useState<'sent' | 'received'>('received');
  const [swaps, setSwaps] = useState<SwapRequest[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedStatus, setSelectedStatus] = useState('');
  const [showFeedbackModal, setShowFeedbackModal] = useState(false);
  const [selectedSwap, setSelectedSwap] = useState<SwapRequest | null>(null);

  useEffect(() => {
    loadSwaps();
  }, [activeTab, selectedStatus]);

  const loadSwaps = async () => {
    try {
      setLoading(true);
      const response = activeTab === 'sent' 
        ? await swapAPI.getSentRequests({ status: selectedStatus })
        : await swapAPI.getReceivedRequests({ status: selectedStatus });
      setSwaps(response.swapRequests || []);
    } catch (error) {
      console.error('Failed to load swaps:', error);
      toast.error('Failed to load swaps');
    } finally {
      setLoading(false);
    }
  };

  const handleAction = async (action: string, swap: SwapRequest) => {
    try {
      if (isDemoMode) {
        if (action === 'feedback') {
          setSelectedSwap(swap);
          setShowFeedbackModal(true);
          return;
        }
        toast.success(`${action} action completed! (Demo mode)`);
        return;
      }

      switch (action) {
        case 'accept':
          await swapAPI.acceptRequest(swap._id);
          toast.success('Request accepted!');
          break;
        case 'reject':
          await swapAPI.rejectRequest(swap._id);
          toast.success('Request rejected');
          break;
        case 'complete':
          await swapAPI.completeSwap(swap._id);
          toast.success('Swap marked as complete!');
          break;
        case 'cancel':
          await swapAPI.cancelRequest(swap._id);
          toast.success('Request cancelled');
          break;
        case 'feedback':
          setSelectedSwap(swap);
          setShowFeedbackModal(true);
          return;
      }
      loadSwaps();
    } catch (error) {
      console.error(`Failed to ${action} swap:`, error);
      toast.error(`Failed to ${action} swap`);
    }
  };

  const handleFeedbackSubmit = async (feedback: FeedbackData) => {
    if (!selectedSwap) return;

    try {
      if (isDemoMode) {
        toast.success('Feedback submitted! (Demo mode)');
        return;
      }

      await swapAPI.submitFeedback(selectedSwap._id, feedback);
      toast.success('Feedback submitted successfully!');
      loadSwaps();
    } catch (error) {
      console.error('Failed to submit feedback:', error);
      toast.error('Failed to submit feedback');
    }
  };

  const filteredSwaps = swaps.filter(swap => 
    !selectedStatus || swap.status === selectedStatus
  );

  const statusCounts = {
    all: swaps.length,
    pending: swaps.filter(s => s.status === 'pending').length,
    accepted: swaps.filter(s => s.status === 'accepted').length,
    completed: swaps.filter(s => s.status === 'completed').length,
    rejected: swaps.filter(s => s.status === 'rejected').length,
  };

  return (
    <div className="space-y-8">
      <div className="text-center">
        <h1 className="text-3xl font-bold text-gray-900 mb-4">My Skill Swaps</h1>
        <p className="text-gray-600">Manage your skill exchange requests</p>
      </div>

      {/* Tabs */}
      <div className="bg-white rounded-xl shadow-sm border">
        <div className="border-b border-gray-200">
          <nav className="flex space-x-8 px-6">
            <button
              onClick={() => setActiveTab('received')}
              className={`py-4 px-1 border-b-2 font-medium text-sm ${
                activeTab === 'received'
                  ? 'border-primary-500 text-primary-600'
                  : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
              }`}
            >
              Requests Received ({statusCounts.all})
            </button>
            <button
              onClick={() => setActiveTab('sent')}
              className={`py-4 px-1 border-b-2 font-medium text-sm ${
                activeTab === 'sent'
                  ? 'border-primary-500 text-primary-600'
                  : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
              }`}
            >
              Requests Sent ({statusCounts.all})
            </button>
          </nav>
        </div>

        {/* Status filters */}
        <div className="p-6 border-b border-gray-200">
          <div className="flex flex-wrap gap-2">
            <button
              onClick={() => setSelectedStatus('')}
              className={`px-3 py-1 rounded-full text-sm font-medium ${
                !selectedStatus
                  ? 'bg-primary-100 text-primary-800'
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
            >
              All ({statusCounts.all})
            </button>
            <button
              onClick={() => setSelectedStatus('pending')}
              className={`px-3 py-1 rounded-full text-sm font-medium ${
                selectedStatus === 'pending'
                  ? 'bg-yellow-100 text-yellow-800'
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
            >
              Pending ({statusCounts.pending})
            </button>
            <button
              onClick={() => setSelectedStatus('accepted')}
              className={`px-3 py-1 rounded-full text-sm font-medium ${
                selectedStatus === 'accepted'
                  ? 'bg-green-100 text-green-800'
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
            >
              Accepted ({statusCounts.accepted})
            </button>
            <button
              onClick={() => setSelectedStatus('completed')}
              className={`px-3 py-1 rounded-full text-sm font-medium ${
                selectedStatus === 'completed'
                  ? 'bg-blue-100 text-blue-800'
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
            >
              Completed ({statusCounts.completed})
            </button>
            <button
              onClick={() => setSelectedStatus('rejected')}
              className={`px-3 py-1 rounded-full text-sm font-medium ${
                selectedStatus === 'rejected'
                  ? 'bg-red-100 text-red-800'
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
            >
              Rejected ({statusCounts.rejected})
            </button>
          </div>
        </div>
      </div>

      {/* Swap list */}
      {loading ? (
        <div className="flex items-center justify-center py-12">
          <div className="spinner"></div>
        </div>
      ) : filteredSwaps.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {filteredSwaps.map((swap) => (
            <SwapCard
              key={swap._id}
              swap={swap}
              type={activeTab}
              onAction={handleAction}
            />
          ))}
        </div>
      ) : (
        <div className="text-center py-12">
          <MessageSquare className="h-12 w-12 text-gray-400 mx-auto mb-4" />
          <h3 className="text-lg font-medium text-gray-900 mb-2">No swaps found</h3>
          <p className="text-gray-600">
            {activeTab === 'sent' 
              ? "You haven't sent any skill swap requests yet" 
              : "You haven't received any skill swap requests yet"
            }
          </p>
        </div>
      )}

      <FeedbackModal
        isOpen={showFeedbackModal}
        onClose={() => setShowFeedbackModal(false)}
        swapRequest={selectedSwap}
        onSubmit={handleFeedbackSubmit}
      />
    </div>
  );
}
