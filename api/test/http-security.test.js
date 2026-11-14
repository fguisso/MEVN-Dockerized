const test = require('node:test')
const assert = require('node:assert/strict')
const express = require('express')
const servicePath = require.resolve('../services/users.service')
require.cache[servicePath] = {
    id: servicePath, filename: servicePath, loaded: true,
    exports: { auth: async () => { throw new Error('<script>alert(1)</script>') } }
}
const controller = require('../controllers/users.controller')

const serve = async (app, fn) => {
    const server = app.listen(0, '127.0.0.1')
    await new Promise(resolve => server.once('listening', resolve))
    try { await fn(`http://127.0.0.1:${server.address().port}`) }
    finally { await new Promise(resolve => server.close(resolve)) }
}

test('auth error does not reflect exception HTML', async () => {
    const app = express()
    app.use(express.json())
    app.use('/users', controller)
    await serve(app, async url => {
        const response = await fetch(`${url}/users/auth`, {
            method: 'POST', headers: { 'content-type': 'application/json' },
            body: JSON.stringify({ email: '<script>alert(1)</script>', password: 'wrong' })
        })
        assert.equal(response.status, 400)
        assert.match(response.headers.get('content-type'), /^text\/plain/)
        assert.doesNotMatch(await response.text(), /script|alert|Error:/i)
    })
})

test('auth route limits repeated attempts', async () => {
    const { authRateLimit } = require('../middleware/auth-rate-limit')
    const app = express()
    app.use(express.json())
    app.use('/users/auth', authRateLimit)
    app.use('/users', controller)
    await serve(app, async url => {
        const statuses = []
        for (let i = 0; i < 11; i++) {
            const response = await fetch(`${url}/users/auth`, {
                method: 'POST', headers: { 'content-type': 'application/json' },
                body: JSON.stringify({ email: 'me@example.com', password: 'wrong' })
            })
            statuses.push(response.status)
        }
        assert.equal(statuses.at(-1), 429)
        assert.equal(statuses[0], 400)
    })
})
