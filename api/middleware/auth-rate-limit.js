const { rateLimit } = require('express-rate-limit')

// Keep the default IP key generator (IPv6 subnet aware); do not trust client-supplied IP headers.
const authRateLimit = rateLimit({
    windowMs: 15 * 60 * 1000,
    limit: 10,
    standardHeaders: 'draft-8',
    legacyHeaders: false,
    message: 'Too many login attempts. Please try again later.'
})

const registrationRateLimit = rateLimit({
    windowMs: 60 * 60 * 1000,
    limit: 10,
    standardHeaders: 'draft-8',
    legacyHeaders: false,
    message: 'Too many registrations. Please try again later.'
})

module.exports = { authRateLimit, registrationRateLimit }
