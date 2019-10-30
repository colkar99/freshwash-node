const config = require('config');
module.exports = function () {
    if (!config.has('jwtPrivateKey')) {
        throw new Error('FATTAL ERROR: jwtPrivateKey is not defined in env');
    }
}
