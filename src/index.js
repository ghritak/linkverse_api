import express from 'express';

const app = express();

app.get('/', function (req, res) {
  res.type('text/plain');
  res.status(200);
  res.send('Welcome to linkverse api');
});

app.listen(4000, function () {
  console.log('Listening.....');
});
