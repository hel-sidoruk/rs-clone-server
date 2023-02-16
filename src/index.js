require('dotenv').config();
const express = require('express');
const app = express();
const PORT = process.env.port || 5000;
const sequelize = require('./db');
const models = require('./models/models');
const cors = require('cors');
const router = require('./routes/index');
const errorHandler = require('./middleware/ErrorHandlingMiddleware');
const { wsServer, onConnect } = require('./ws/webSocket');
const fileUpload = require('express-fileupload');
const path = require('path');

app.use(cors());
app.use(express.json());
app.use(express.static(path.resolve(__dirname, 'assets')));
app.use(fileUpload({}));
app.use('/api', router);

app.use(errorHandler);

wsServer.on('connection', onConnect);

const start = async () => {
  try {
    await sequelize.authenticate();
    await sequelize.sync();
    app.listen(PORT, () => console.log(`Listening on port ${PORT}`));
  } catch (e) {
    console.log(`There is an error: ${e}`);
  }
};

start();
