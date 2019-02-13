const yaml = require('js-yaml');
const fs = require('fs');

let config = {};
try {
    config = yaml.safeLoad(fs.readFileSync('/Users/jwood50/Documents/aexp-url-shortener/src/server/config.yml', 'utf8'));
} catch (e) {
    console.log(e);
}

config.redis = {
    host: "127.0.0.1",
    port: "6379"
}

module.exports = config;

