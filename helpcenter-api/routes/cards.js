const express = require('express');
const Card = require('../models/Card');
const router = express.Router();

// Create a new card
router.post('/', async (req, res) => {
  const { id, title, description } = req.body;
  try {
    const card = new Card({ id, title, description });
    await card.save();
    res.status(201).send(card);
  } catch (error) {
    res.status(400).send(error.message);
  }
});

// Get all cards
router.get('/', async (req, res) => {
  try {
    const cards = await Card.find({});
    res.send(cards);
  } catch (error) {
    res.status(500).send(error.message);
  }
});

// Get a specific card by title
router.get('/:title', async (req, res) => {
  const title = req.params.title;
  try {
    const card = await Card.findOne({ title });
    if (!card) {
      return res.status(404).send('Card not found');
    }
    res.send(card);
  } catch (error) {
    res.status(500).send(error.message);
  }
});



module.exports = router;
