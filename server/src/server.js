import express from 'express';

const app = express();

app.get('/', (req, res) => res.send('Hello world!'));

const server = app.listen('3000', 'localhost', () =>
  console.log(`\nServer listening at http://${server.address().address}:${server.address().port}`));
