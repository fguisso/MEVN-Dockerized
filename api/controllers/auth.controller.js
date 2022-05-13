const express = require('express')
const axios = require('axios').default

const router = express.Router()

const login = (req, res) => {
    req.session.stateValue = req.csrfToken()
    res.redirect(`${process.env.OIDC_URI}/auth?`
        + `scope=openid`
        + `&response_type=code`
        + `&client_id=${process.env.OIDC_CLIENT_ID}`
        + `&redirect_uri=${process.env.OIDC_REDIRECT_URI}`
        + `&state=${req.csrfToken()}`
    )
}

const callback = (req, res) => {
    console.log(req.query)
    const stateFromServer = req.query.state
    if (stateFromServer !== req.session.stateValue) {
        console.log(`State does'nt match.`)
        console.log(`State: ${stateFromServer}, but expected: ${req.session.stateValue}`)
        res.redirect(302, '/')
    }

    axios.post(
        `${process.env.OIDC_URI}/token`,
            `grant_type=authorization_code`
            + `&code=${req.query.code}`
            + `&redirect_uri=${process.env.OIDC_REDIRECT_URI}`
        , {
            headers: { 
                "Content-Type": "application/x-www-form-urlencoded",
                "Authorization": `Basic ${btoa(process.env.OIDC_CLIENT_ID+':'+process.env.OIDC_CLIENT_SECRET)}` 
            }
        })
    .then(result => {
        console.log(`token request: ${JSON.stringify(result.data)}`)
        req.session.token = result.data.access_token
        res.cookie('access_token', 'Bearer ' +
            + result.data.access_token, {
                expires: new Date(Date.now() + 8 * 3600000)
            }).redirect(301, `http://localhost:8080`)
    })
    .catch(err => {
        console.log(err)
        res.status(500).send(err)
    })
}

const logout = (req, res) => {
    req.session.destroy()
    res.redirect(`${process.env.OIDC_URI}/logout?client_id=${process.env.OIDC_CLIENT_ID}`)
}

router.get('/login', login)
router.get('/callback', callback)
router.get('/logout', logout)

module.exports = router
