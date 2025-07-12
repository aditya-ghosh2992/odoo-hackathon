const mongoose = require('mongoose');

const swapRequestSchema = new mongoose.Schema({
  requester: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  recipient: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  offeredSkill: {
    name: {
      type: String,
      required: true
    },
    level: {
      type: String,
      enum: ['Beginner', 'Intermediate', 'Advanced', 'Expert'],
      required: true
    },
    description: String
  },
  requestedSkill: {
    name: {
      type: String,
      required: true
    },
    level: {
      type: String,
      enum: ['Beginner', 'Intermediate', 'Advanced', 'Expert'],
      required: true
    },
    description: String
  },
  status: {
    type: String,
    enum: ['pending', 'accepted', 'rejected', 'completed', 'cancelled'],
    default: 'pending'
  },
  message: {
    type: String,
    maxlength: [500, 'Message cannot exceed 500 characters']
  },
  scheduledDate: {
    type: Date
  },
  duration: {
    type: String // e.g., "1 hour", "2 hours", "1 day"
  },
  meetingType: {
    type: String,
    enum: ['Online', 'In-Person', 'Flexible'],
    default: 'Flexible'
  },
  feedback: {
    requesterFeedback: {
      rating: {
        type: Number,
        min: 1,
        max: 5
      },
      comment: {
        type: String,
        maxlength: [300, 'Feedback cannot exceed 300 characters']
      },
      submittedAt: Date
    },
    recipientFeedback: {
      rating: {
        type: Number,
        min: 1,
        max: 5
      },
      comment: {
        type: String,
        maxlength: [300, 'Feedback cannot exceed 300 characters']
      },
      submittedAt: Date
    }
  }
}, {
  timestamps: true
});

// Prevent self-swapping
swapRequestSchema.pre('save', function(next) {
  if (this.requester.equals(this.recipient)) {
    return next(new Error('Cannot create swap request with yourself'));
  }
  next();
});

module.exports = mongoose.model('SwapRequest', swapRequestSchema);
