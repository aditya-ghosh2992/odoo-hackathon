const express = require('express');
const User = require('../models/User');
const auth = require('../middleware/auth');
const upload = require('../middleware/upload');
const router = express.Router();

// @route   GET /api/users/profile
// @desc    Get current user's profile
// @access  Private
router.get('/profile', auth, async (req, res) => {
  try {
    const user = await User.findById(req.user._id);
    res.json({ user });
  } catch (error) {
    console.error('Get profile error:', error);
    res.status(500).json({
      message: 'Server error',
      error: error.message
    });
  }
});

// @route   PUT /api/users/profile
// @desc    Update user profile
// @access  Private
router.put('/profile', auth, async (req, res) => {
  try {
    const {
      fullName,
      bio,
      skillsOffered,
      skillsWanted,
      availability,
      isPublic,
      location
    } = req.body;

    const user = await User.findById(req.user._id);

    // Update fields
    if (fullName !== undefined) user.fullName = fullName;
    if (bio !== undefined) user.bio = bio;
    if (skillsOffered !== undefined) user.skillsOffered = skillsOffered;
    if (skillsWanted !== undefined) user.skillsWanted = skillsWanted;
    if (availability !== undefined) user.availability = availability;
    if (isPublic !== undefined) user.isPublic = isPublic;
    if (location !== undefined) user.location = location;

    await user.save();

    res.json({
      message: 'Profile updated successfully',
      user
    });
  } catch (error) {
    console.error('Update profile error:', error);
    res.status(500).json({
      message: 'Server error',
      error: error.message
    });
  }
});

// @route   POST /api/users/upload-photo
// @desc    Upload profile photo
// @access  Private
router.post('/upload-photo', auth, upload.single('profilePhoto'), async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ message: 'No file uploaded' });
    }

    const user = await User.findById(req.user._id);
    user.profilePhoto = `/uploads/profiles/${req.file.filename}`;
    await user.save();

    res.json({
      message: 'Profile photo uploaded successfully',
      profilePhoto: user.profilePhoto
    });
  } catch (error) {
    console.error('Upload photo error:', error);
    res.status(500).json({
      message: 'Server error',
      error: error.message
    });
  }
});

// @route   GET /api/users/search
// @desc    Search public users by skills
// @access  Private
router.get('/search', auth, async (req, res) => {
  try {
    const { skill, level, page = 1, limit = 10 } = req.query;
    
    const query = {
      isPublic: true,
      _id: { $ne: req.user._id } // Exclude current user
    };

    if (skill) {
      query.$or = [
        { 'skillsOffered.name': { $regex: skill, $options: 'i' } },
        { 'skillsWanted.name': { $regex: skill, $options: 'i' } }
      ];
    }

    if (level) {
      query.$or = query.$or ? query.$or.map(condition => ({
        ...condition,
        $or: [
          { 'skillsOffered.level': level },
          { 'skillsWanted.level': level }
        ]
      })) : [
        { 'skillsOffered.level': level },
        { 'skillsWanted.level': level }
      ];
    }

    const users = await User.find(query)
      .select('-password')
      .limit(limit * 1)
      .skip((page - 1) * limit)
      .sort({ createdAt: -1 });

    const total = await User.countDocuments(query);

    res.json({
      users,
      totalPages: Math.ceil(total / limit),
      currentPage: page,
      total
    });
  } catch (error) {
    console.error('Search users error:', error);
    res.status(500).json({
      message: 'Server error',
      error: error.message
    });
  }
});

// @route   GET /api/users/:id
// @desc    Get user by ID (public profiles only)
// @access  Private
router.get('/:id', auth, async (req, res) => {
  try {
    const user = await User.findById(req.params.id).select('-password');
    
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    // Only return public profiles or current user's profile
    if (!user.isPublic && !user._id.equals(req.user._id)) {
      return res.status(403).json({ message: 'Profile is private' });
    }

    res.json({ user });
  } catch (error) {
    console.error('Get user error:', error);
    res.status(500).json({
      message: 'Server error',
      error: error.message
    });
  }
});

// @route   GET /api/users
// @desc    Get all public users
// @access  Private
router.get('/', auth, async (req, res) => {
  try {
    const { page = 1, limit = 10 } = req.query;
    
    const users = await User.find({
      isPublic: true,
      _id: { $ne: req.user._id }
    })
      .select('-password')
      .limit(limit * 1)
      .skip((page - 1) * limit)
      .sort({ createdAt: -1 });

    const total = await User.countDocuments({
      isPublic: true,
      _id: { $ne: req.user._id }
    });

    res.json({
      users,
      totalPages: Math.ceil(total / limit),
      currentPage: page,
      total
    });
  } catch (error) {
    console.error('Get users error:', error);
    res.status(500).json({
      message: 'Server error',
      error: error.message
    });
  }
});

module.exports = router;
