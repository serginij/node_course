const express = require('express');
const fs = require('fs/promises');
const path = require('path');

const router = express.Router();

const filePath = path.join(__dirname, '..', 'public', 'data.json');

router.get('/', async (req, res) => {
  try {
    const file = await fs.readFile(filePath, { encoding: 'utf-8' });
    const data = JSON.parse(file);

    res.status(200).json(data);
  } catch {
    res.status(500).json({ message: 'Something went wrong' });
  }
});

router.get('/:bookId', async (req, res) => {
  const { bookId } = req.params;

  try {
    const file = await fs.readFile(filePath, { encoding: 'utf-8' });
    const data = JSON.parse(file);

    const book = data[bookId];

    if (!book) {
      res.status(404).send('Book not found');
    } else {
      res.status(200).json(book);
    }
  } catch {
    await fs.writeFile(filePath, JSON.stringify({ [bookId]: 0 }), 'utf-8');
    res.status(200).json({ [bookId]: 0 });
  }
});

router.post(`/:bookId/incr`, async (req, res) => {
  const { bookId } = req.params;
  const book = req.body;

  try {
    const file = await fs.readFile(filePath, { encoding: 'utf-8' });
    const data = JSON.parse(file);

    let views = data[bookId].views || 0;
    views++;

    const updatedBook = { ...book, views };
    await fs.writeFile(
      filePath,
      JSON.stringify({ ...data, [bookId]: updatedBook }),
      'utf-8',
    );
    res.status(200).json(updatedBook);
  } catch {
    res.status(500).send('Something went wrong');
  }
});

module.exports = router;
