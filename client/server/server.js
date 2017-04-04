const express = require('express');
const path = require('path');

const app = express();

const port = 8080;

app.set('views', './');
app.use('/static', express.static('./static'));

app.get('/', (req, res) => res.sendFile(path.join(__dirname + '/index.html')));

const server = app.listen(port, '0.0.0.0', () => console.log('And here we go!'));
