const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');

const { counterRouter } = require('./routes');
const { notFoundMiddleware } = require('./middleware');

const app = express();
app.use(cors());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

const PORT = process.env.PORT || 3001;

app.use('/counter', counterRouter);
app.use(notFoundMiddleware);

app.listen(PORT, '0.0.0.0', () => {
  console.log(`App available on http://localhost:${PORT}`);
});
