const yaml = require('js-yaml');
const fs = require('fs');

let config = {};
try {
    config = yaml.safeLoad(fs.readFileSync('src/server/config.yml', 'utf8'));
    console.log('config: ', config);
} catch (e) {
    console.log(e);
}

module.exports = config;

