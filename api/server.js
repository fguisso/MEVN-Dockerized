const express = require('express')
const { expressjwt } = require('express-jwt')
const { authRateLimit } = require('./middleware/auth-rate-limit')

const app = express()
const secret = process.env.SECRET

app.set('port', process.env.PORT || 3000)
app.set('host', process.env.HOST || '0.0.0.0')

app.use(express.urlencoded({ extended: false }))
app.use(express.json())

app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*')
    res.header('Access-Control-Allow-Methods', 'PUT, GET, POST, DELETE')
    res.header(
        'Access-Control-Allow-Headers',
        'Origin, X-Requested-With, Content-Type, Accept, Authorization, Access-Control-Allow-Credentials')
    res.header('Access-Control-Allow-Credentials', 'true')
    next()
})

app.get('/', (req, res) => res.send('Hello World!'))
app.use('/users/auth', authRateLimit)

app.use('/users', expressjwt({ secret, algorithms: ['HS256'] })
    .unless({ path: ['/users/auth', '/users/init', '/users/register'] }))

app.use('/items', expressjwt({ secret, algorithms: ['HS256'] }))
app.use('/info', expressjwt({ secret, algorithms: ['HS256'] }))


app.use('/users', require('./controllers/users.controller.js'))
app.use('/items', require('./controllers/items.controller.js'))
app.use('/info', require('./controllers/infos.controller.js'))

app.use((err, req, res, next) => {
    if (err.name === 'UnauthorizedError') res.status(401).send('Invalid token.')
    else next(err)
})

const server = app.listen(app.get('port'), app.get('host'), () =>
    console.log(`\nServer listening at http://${server.address().address}:${server.address().port}`))
