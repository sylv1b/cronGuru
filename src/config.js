if (process.env.NODE_ENV === 'production') {
    module.exports = require('./prodConfig');
} else {
    module.exports = require('./devConfig');
}