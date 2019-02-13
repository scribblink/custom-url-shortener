import request from 'request';

const REGEX = /^(?:http(s)?:\/\/)?[\w.-]+(?:\.[\w\.-]+)+[\w\-\._~:/?#[\]@!\$&'\(\)\*\+,;=.]+$/
const validUrls = ["aexp.com", "google.com"]
const validate = async (url) => {
    const isValidUrl = REGEX.test(url);
    console.log('isValidUrl: ', isValidUrl)
    if (isValidUrl) {
        const ued = await urlExistsDeep(url);
        const validator = await ued;
        if (validator && validUrls.some(value => url.indexOf(value) >= 0 )) {
            return true;
        } else {
            console.log(`${url} does not exist`);
            return false;
        }
    }
    return false;
}

const urlExistsDeep = (url, header = {}, method = 'HEAD', timeout = 5000, pool = {}, prevStatus = 0) =>
  new Promise((resolve, reject) => {
    let headers = header;
    request({
      url,
      method,
      headers,
      followRedirect: false,
      timeout,
      pool,
    }, (err, res) => {
      if (err) {
        reject(err);
        return;
      }

      let checkUrl;
      if (/4\d\d/.test(res.statusCode) && res.statusCode !== 403) {
        resolve(false);
        return;
      }

      if (res.statusCode === 403) {
        if (prevStatus === 403) {
          resolve(false);
          return;
        }
        checkUrl = res.request.uri.href;
        headers = { Accept: 'text/html', 'User-Agent': 'Mozilla/5.0' };
        method = 'GET';
      } else if (res.statusCode === 301) {
        if (!res.headers.location.includes('://')) {
          checkUrl = res.request.uri.protocol + '//' + res.request.uri.host + res.headers.location;
        } else checkUrl = res.headers.location;
      }

      if (checkUrl) {
        urlExistsDeep(checkUrl, headers, method, timeout, pool, res.statusCode)
          .then(resolve)
          .catch(reject);
      } else resolve(res.request.uri);
    });
  });


module.exports = {
  validate,
  urlExistsDeep,
}
