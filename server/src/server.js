import express from 'express';
import bodyParser from 'body-parser';
import expressJwt from 'express-jwt';

const app = express();

const secret = process.env.SECRET;

app.set('port', process.env.PORT || 3000);
app.set('host', process.env.HOST || 'localhost');

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Methods', 'PUT, GET, POST, DELETE');
  res.header(
    'Access-Control-Allow-Headers',
    'Origin, X-Requested-With, Content-Type, Accept, Authorization, Access-Control-Allow-Credentials');
  res.header('Access-Control-Allow-Credentials', 'true');
  next();
});

app.get('/', (req, res) => res.send('Hello World!'));

app.use('/users', expressJwt({ secret })
  .unless({ path: ['/users/auth', '/users/init', '/users/register'] }));

app.use('/items', expressJwt({ secret }));
app.use('/info', expressJwt({ secret }));


app.use('/users', require('./controllers/users.controller.js'));
app.use('/items', require('./controllers/items.controller.js'));
app.use('/info', require('./controllers/infos.controller.js'));

const server = app.listen(app.get('port'), app.get('host'), () =>
  console.log(`\nServer listening at http://${server.address().address}:${server.address().port}`));
