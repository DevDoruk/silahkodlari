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

module.exports = router; 