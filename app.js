const express = require('express');
const app = express();
const bodyParser = require('body-parser');
app.use(bodyParser.json());
require('dotenv').config();
const syncModels = require('./sync');
const port = process.env.PORT;

const mainRoutes = require('./routes/mainRoutes');

app.use('/', mainRoutes);

syncModels()
  .then(() => {
    app.listen(port, () => {
      console.log(`Server ready to launch! port: ${port} 🚀`);
    });
  })
  .catch(error => {
    console.error('Error synchronizing models:', error);
    process.exit(1);
  });
