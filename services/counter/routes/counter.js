const express = require('express');

const { View } = require('../models');

const router = express.Router();

router.get('/', async (req, res) => {
  try {
    const data = await View.find().select('-__v -_id').lean();
    const views = data.reduce(
      (acc, { bookId, views }) => ({ ...acc, [bookId]: views }),
      {},
    );

    res.status(200).json(views);
  } catch {
    res.status(500).json({ message: 'Something went wrong' });
  }
});

router.post(`/:bookId/incr`, async (req, res) => {
  const { bookId } = req.params;

  try {
    const views = await View.findOneAndUpdate(
      { bookId },
      { $inc: { views: 1 } },
      { upsert: true, new: true, setDefaultsOnInsert: true },
    )
      .select('views')
      .lean();

    res.status(200).json(views);
  } catch {
    res.status(500).send('Something went wrong');
  }
});

module.exports = router;
