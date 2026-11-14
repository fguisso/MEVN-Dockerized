const userService = require('../services/users.service')

const actorFor = async (req, res) => {
    try {
        const actor = await userService.access(req.auth?.sub)
        if (actor) return actor
    } catch (_) { /* Invalid or revoked identity. */ }
    res.status(401).type('text/plain').send('Invalid token.')
    return null
}

const canEditUser = async (req, res, next) => {
    const actor = await actorFor(req, res)
    if (!actor) return
    if (actor.admin) return next()
    if (String(req.auth.sub) !== req.params._id || Object.hasOwn(req.body || {}, 'admin')) {
        return res.status(403).type('text/plain').send('Forbidden.')
    }
    next()
}

const requireAdmin = async (req, res, next) => {
    const actor = await actorFor(req, res)
    if (!actor) return
    if (!actor.admin) return res.status(403).type('text/plain').send('Forbidden.')
    next()
}

module.exports = { canEditUser, requireAdmin }
