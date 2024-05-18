const express = require('express');
const app = express();
const bodyParser = require('body-parser');
app.use(bodyParser.json());
const port = 3000;

app.get('/', (req, res) => {
  res.send('Hello   World!');
});


app.listen(port, () => {
  console.log(
    `🚀 Server ready to launch! port : ${port}`,
  );
});
