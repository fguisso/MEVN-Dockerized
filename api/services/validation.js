const mongoose = require('mongoose')

const string = (value, field) => {
    if (typeof value !== 'string' || !value.trim()) throw new TypeError(`Invalid ${field}.`)
    return value
}

const objectId = value => {
    if (typeof value !== 'string' || !/^[a-f\d]{24}$/i.test(value)) throw new TypeError('Invalid id.')
    return new mongoose.Types.ObjectId(value)
}

const fields = (input, names) => {
    if (!input || typeof input !== 'object' || Array.isArray(input)) throw new TypeError('Invalid body.')
    const result = {}
    for (const name of names) {
        if (Object.hasOwn(input, name)) result[name] = string(input[name], name)
    }
    return result
}

module.exports = { string, objectId, fields }
