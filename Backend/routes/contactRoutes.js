const express = require('express');
const router = express.Router();
const Contact = require('../models/Contact');
const { protect } = require('../middlewares/auth');

// @desc    Submit a new contact form
// @route   POST /api/contact
// @access  Public
router.post('/', async (req, res) => {
  try {
    const { name, email, phone, state, problem, date, time } = req.body;
    
    if (!name || !email || !phone || !problem) {
      return res.status(400).json({ message: 'Name, email, phone, and problem are required' });
    }

    const newContact = new Contact({
      name, email, phone, state, problem, date, time
    });

    const savedContact = await newContact.save();
    res.status(201).json(savedContact);
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
});

// @desc    Get all contact submissions
// @route   GET /api/contact
// @access  Private (Admin)
router.get('/', protect, async (req, res) => {
  try {
    const contacts = await Contact.find({}).sort({ createdAt: -1 });
    res.json(contacts);
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
});

// @desc    Update contact status
// @route   PUT /api/contact/:id
// @access  Private (Admin)
router.put('/:id', protect, async (req, res) => {
  try {
    const { status } = req.body;
    const contact = await Contact.findById(req.params.id);
    
    if (!contact) {
      return res.status(404).json({ message: 'Contact not found' });
    }

    contact.status = status || contact.status;
    const updatedContact = await contact.save();
    res.json(updatedContact);
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
});

// @desc    Delete a contact submission
// @route   DELETE /api/contact/:id
// @access  Private (Admin)
router.delete('/:id', protect, async (req, res) => {
  try {
    const contact = await Contact.findById(req.params.id);
    if (!contact) {
      return res.status(404).json({ message: 'Contact not found' });
    }
    await contact.deleteOne();
    res.json({ message: 'Contact removed' });
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
});

module.exports = router;
