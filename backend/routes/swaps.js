const express = require('express');
const SwapRequest = require('../models/SwapRequest');
const User = require('../models/User');
const auth = require('../middleware/auth');
const router = express.Router();

// @route   POST /api/swaps/request
// @desc    Create a new swap request
// @access  Private
router.post('/request', auth, async (req, res) => {
  try {
    const {
      recipientId,
      offeredSkill,
      requestedSkill,
      message,
      scheduledDate,
      duration,
      meetingType
    } = req.body;

    // Check if recipient exists and profile is public
    const recipient = await User.findById(recipientId);
    if (!recipient) {
      return res.status(404).json({ message: 'Recipient not found' });
    }

    if (!recipient.isPublic) {
      return res.status(403).json({ message: 'Cannot send request to private profile' });
    }

    // Prevent self-swapping
    if (recipientId === req.user._id.toString()) {
      return res.status(400).json({ message: 'Cannot create swap request with yourself' });
    }

    // Check for existing pending request between these users for the same skills
    const existingRequest = await SwapRequest.findOne({
      requester: req.user._id,
      recipient: recipientId,
      'offeredSkill.name': offeredSkill.name,
      'requestedSkill.name': requestedSkill.name,
      status: 'pending'
    });

    if (existingRequest) {
      return res.status(400).json({ message: 'A similar swap request already exists' });
    }

    const swapRequest = new SwapRequest({
      requester: req.user._id,
      recipient: recipientId,
      offeredSkill,
      requestedSkill,
      message,
      scheduledDate,
      duration,
      meetingType
    });

    await swapRequest.save();
    await swapRequest.populate(['requester', 'recipient']);

    res.status(201).json({
      message: 'Swap request sent successfully',
      swapRequest
    });
  } catch (error) {
    console.error('Create swap request error:', error);
    res.status(500).json({
      message: 'Server error',
      error: error.message
    });
  }
});

// @route   GET /api/swaps/sent
// @desc    Get swap requests sent by current user
// @access  Private
router.get('/sent', auth, async (req, res) => {
  try {
    const { status, page = 1, limit = 10 } = req.query;
    
    const query = { requester: req.user._id };
    if (status) query.status = status;

    const swapRequests = await SwapRequest.find(query)
      .populate('recipient', '-password')
      .limit(limit * 1)
      .skip((page - 1) * limit)
      .sort({ createdAt: -1 });

    const total = await SwapRequest.countDocuments(query);

    res.json({
      swapRequests,
      totalPages: Math.ceil(total / limit),
      currentPage: page,
      total
    });
  } catch (error) {
    console.error('Get sent requests error:', error);
    res.status(500).json({
      message: 'Server error',
      error: error.message
    });
  }
});

// @route   GET /api/swaps/received
// @desc    Get swap requests received by current user
// @access  Private
router.get('/received', auth, async (req, res) => {
  try {
    const { status, page = 1, limit = 10 } = req.query;
    
    const query = { recipient: req.user._id };
    if (status) query.status = status;

    const swapRequests = await SwapRequest.find(query)
      .populate('requester', '-password')
      .limit(limit * 1)
      .skip((page - 1) * limit)
      .sort({ createdAt: -1 });

    const total = await SwapRequest.countDocuments(query);

    res.json({
      swapRequests,
      totalPages: Math.ceil(total / limit),
      currentPage: page,
      total
    });
  } catch (error) {
    console.error('Get received requests error:', error);
    res.status(500).json({
      message: 'Server error',
      error: error.message
    });
  }
});

// @route   PUT /api/swaps/:id/accept
// @desc    Accept a swap request
// @access  Private
router.put('/:id/accept', auth, async (req, res) => {
  try {
    const swapRequest = await SwapRequest.findById(req.params.id);
    
    if (!swapRequest) {
      return res.status(404).json({ message: 'Swap request not found' });
    }

    // Only recipient can accept
    if (!swapRequest.recipient.equals(req.user._id)) {
      return res.status(403).json({ message: 'Unauthorized to accept this request' });
    }

    if (swapRequest.status !== 'pending') {
      return res.status(400).json({ message: 'Request is no longer pending' });
    }

    swapRequest.status = 'accepted';
    await swapRequest.save();
    await swapRequest.populate(['requester', 'recipient']);

    res.json({
      message: 'Swap request accepted',
      swapRequest
    });
  } catch (error) {
    console.error('Accept request error:', error);
    res.status(500).json({
      message: 'Server error',
      error: error.message
    });
  }
});

// @route   PUT /api/swaps/:id/reject
// @desc    Reject a swap request
// @access  Private
router.put('/:id/reject', auth, async (req, res) => {
  try {
    const swapRequest = await SwapRequest.findById(req.params.id);
    
    if (!swapRequest) {
      return res.status(404).json({ message: 'Swap request not found' });
    }

    // Only recipient can reject
    if (!swapRequest.recipient.equals(req.user._id)) {
      return res.status(403).json({ message: 'Unauthorized to reject this request' });
    }

    if (swapRequest.status !== 'pending') {
      return res.status(400).json({ message: 'Request is no longer pending' });
    }

    swapRequest.status = 'rejected';
    await swapRequest.save();
    await swapRequest.populate(['requester', 'recipient']);

    res.json({
      message: 'Swap request rejected',
      swapRequest
    });
  } catch (error) {
    console.error('Reject request error:', error);
    res.status(500).json({
      message: 'Server error',
      error: error.message
    });
  }
});

// @route   PUT /api/swaps/:id/complete
// @desc    Mark swap as completed
// @access  Private
router.put('/:id/complete', auth, async (req, res) => {
  try {
    const swapRequest = await SwapRequest.findById(req.params.id);
    
    if (!swapRequest) {
      return res.status(404).json({ message: 'Swap request not found' });
    }

    // Both parties can mark as completed
    if (!swapRequest.requester.equals(req.user._id) && !swapRequest.recipient.equals(req.user._id)) {
      return res.status(403).json({ message: 'Unauthorized' });
    }

    if (swapRequest.status !== 'accepted') {
      return res.status(400).json({ message: 'Request must be accepted first' });
    }

    swapRequest.status = 'completed';
    await swapRequest.save();

    // Update completed swaps count for both users
    await User.findByIdAndUpdate(swapRequest.requester, { $inc: { completedSwaps: 1 } });
    await User.findByIdAndUpdate(swapRequest.recipient, { $inc: { completedSwaps: 1 } });

    await swapRequest.populate(['requester', 'recipient']);

    res.json({
      message: 'Swap marked as completed',
      swapRequest
    });
  } catch (error) {
    console.error('Complete swap error:', error);
    res.status(500).json({
      message: 'Server error',
      error: error.message
    });
  }
});

// @route   PUT /api/swaps/:id/feedback
// @desc    Submit feedback for a completed swap
// @access  Private
router.put('/:id/feedback', auth, async (req, res) => {
  try {
    const { rating, comment } = req.body;
    const swapRequest = await SwapRequest.findById(req.params.id);
    
    if (!swapRequest) {
      return res.status(404).json({ message: 'Swap request not found' });
    }

    if (swapRequest.status !== 'completed') {
      return res.status(400).json({ message: 'Can only provide feedback for completed swaps' });
    }

    // Determine if user is requester or recipient
    let isRequester = false;
    let isRecipient = false;

    if (swapRequest.requester.equals(req.user._id)) {
      isRequester = true;
    } else if (swapRequest.recipient.equals(req.user._id)) {
      isRecipient = true;
    } else {
      return res.status(403).json({ message: 'Unauthorized' });
    }

    // Update feedback
    if (isRequester) {
      if (swapRequest.feedback.requesterFeedback.rating) {
        return res.status(400).json({ message: 'Feedback already submitted' });
      }
      swapRequest.feedback.requesterFeedback = {
        rating,
        comment,
        submittedAt: new Date()
      };
      
      // Update recipient's rating
      const recipient = await User.findById(swapRequest.recipient);
      const newCount = recipient.rating.count + 1;
      const newAverage = ((recipient.rating.average * recipient.rating.count) + rating) / newCount;
      recipient.rating = { average: newAverage, count: newCount };
      await recipient.save();
    }

    if (isRecipient) {
      if (swapRequest.feedback.recipientFeedback.rating) {
        return res.status(400).json({ message: 'Feedback already submitted' });
      }
      swapRequest.feedback.recipientFeedback = {
        rating,
        comment,
        submittedAt: new Date()
      };
      
      // Update requester's rating
      const requester = await User.findById(swapRequest.requester);
      const newCount = requester.rating.count + 1;
      const newAverage = ((requester.rating.average * requester.rating.count) + rating) / newCount;
      requester.rating = { average: newAverage, count: newCount };
      await requester.save();
    }

    await swapRequest.save();
    await swapRequest.populate(['requester', 'recipient']);

    res.json({
      message: 'Feedback submitted successfully',
      swapRequest
    });
  } catch (error) {
    console.error('Submit feedback error:', error);
    res.status(500).json({
      message: 'Server error',
      error: error.message
    });
  }
});

// @route   DELETE /api/swaps/:id
// @desc    Cancel/delete a swap request
// @access  Private
router.delete('/:id', auth, async (req, res) => {
  try {
    const swapRequest = await SwapRequest.findById(req.params.id);
    
    if (!swapRequest) {
      return res.status(404).json({ message: 'Swap request not found' });
    }

    // Only requester can delete their own requests, and only if pending
    if (!swapRequest.requester.equals(req.user._id)) {
      return res.status(403).json({ message: 'Unauthorized' });
    }

    if (swapRequest.status !== 'pending') {
      return res.status(400).json({ message: 'Can only cancel pending requests' });
    }

    await SwapRequest.findByIdAndDelete(req.params.id);

    res.json({ message: 'Swap request cancelled successfully' });
  } catch (error) {
    console.error('Cancel request error:', error);
    res.status(500).json({
      message: 'Server error',
      error: error.message
    });
  }
});

// @route   GET /api/swaps/:id
// @desc    Get swap request by ID
// @access  Private
router.get('/:id', auth, async (req, res) => {
  try {
    const swapRequest = await SwapRequest.findById(req.params.id)
      .populate(['requester', 'recipient']);
    
    if (!swapRequest) {
      return res.status(404).json({ message: 'Swap request not found' });
    }

    // Only involved parties can view the request
    if (!swapRequest.requester._id.equals(req.user._id) && !swapRequest.recipient._id.equals(req.user._id)) {
      return res.status(403).json({ message: 'Unauthorized' });
    }

    res.json({ swapRequest });
  } catch (error) {
    console.error('Get swap request error:', error);
    res.status(500).json({
      message: 'Server error',
      error: error.message
    });
  }
});

module.exports = router;
