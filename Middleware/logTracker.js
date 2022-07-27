const logger = require('../Scripts/logger')
const crypto = require('crypto')
const logTracker = (req, res, next) => {
    req.loggerID = crypto.randomUUID()
    logger.info(`${req.loggerID} - ${req.path} - ${req.method} - ${req.body || req.query}`)
    return next()
}
module.exports = logTracker