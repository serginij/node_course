const express = require('express');
// const fs = require('fs/promises');
// const path = require('path');

const { View } = require('../models');

const router = express.Router();

// const filePath = path.join(__dirname, '..', 'public', 'data.json');

router.get('/', async (req, res) => {
  try {
    const data = await View.find().select('-__v -_id');
    const views = data.reduce(
      (acc, { bookId, views }) => ({ ...acc, [bookId]: views }),
      {},
    );

    console.log(views);

    res.status(200).json(views);
  } catch {
    res.status(500).json({ message: 'Something went wrong' });
  }
});

// router.get('/:bookId', async (req, res) => {
//   const { bookId } = req.params;

//   try {
//     // const file = await fs.readFile(filePath, { encoding: 'utf-8' });
//     const data = await View.find({ bookId }).select('views');

//     if (data) {
//       res.status(404).send('Book not found');
//     } else {
//       res.status(200).json(data.views);
//     }
//   } catch {
//     // await fs.writeFile(filePath, JSON.stringify({ [bookId]: 0 }), 'utf-8');
//     res.status(200).json(0);
//   }
// });

router.post(`/:bookId/incr`, async (req, res) => {
  const { bookId } = req.params;
  // const book = req.body;

  try {
    const views = await View.findOneAndUpdate(
      { bookId },
      { $inc: { views: 1 } },
    );
    console.log(views);

    res.status(200).json(views);
  } catch {
    res.status(500).send('Something went wrong');
  }
});

module.exports = router;
