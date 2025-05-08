const express = require('express');
const router = express.Router();
const Weapon = require('../models/Weapon');

// Get all weapons
router.get('/', async (req, res) => {
  try {
    const weapons = await Weapon.find();
    res.json(weapons);
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
});

// Add new weapon
router.post('/', async (req, res) => {
  try {
    const weapon = new Weapon(req.body);
    await weapon.save();
    res.status(201).json(weapon);
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
});

// Upvote weapon
router.post('/:id/upvote', async (req, res) => {
  try {
    const weapon = await Weapon.findById(req.params.id);
    if (!weapon) return res.status(404).json({ message: 'Weapon not found' });
    const voter = req.ip;
    if (weapon.voters.includes(voter)) {
      return res.status(400).json({ message: 'You have already voted' });
    }
    weapon.votes += 1;
    weapon.voters.push(voter);
    await weapon.save();
    res.json({ votes: weapon.votes });
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
});

// Downvote weapon
router.post('/:id/downvote', async (req, res) => {
  try {
    const weapon = await Weapon.findById(req.params.id);
    if (!weapon) return res.status(404).json({ message: 'Weapon not found' });
    const voter = req.ip;
    if (weapon.voters.includes(voter)) {
      return res.status(400).json({ message: 'You have already voted' });
    }
    weapon.votes -= 1;
    weapon.voters.push(voter);
    await weapon.save();
    res.json({ votes: weapon.votes });
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
});

module.exports = router; 