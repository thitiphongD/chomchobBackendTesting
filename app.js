const express = require('express');
const app = express();
const bodyParser = require('body-parser');
app.use(bodyParser.json());
require('dotenv').config();

const port = process.env.PORT;

const mainRoutes = require('./routes/mainRoutes');

app.use('/', mainRoutes);

app.listen(port, () => {
  console.log(
    `Server ready to launch! port : ${port} 🚀`,
  );
});
