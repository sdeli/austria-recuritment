const crypto = require('crypto');

// Generate random number between 5 and 15: generateRandomStr(Math.floor((Math.random() * 10) + 5));
function generateRandomStr(strLength) {
  var randomStr = "";
  var possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789%$@!^&*()";

  for (var i = 0; i < strLength - 1; i++) {
    randomStr += possible.charAt(Math.floor(Math.random() * possible.length));
  }
    
  return randomStr;
}

function getCookie(req, cookieName) {
    var name = cookieName + "=";
    var decodedCookie = decodeURIComponent(req.headers.cookie);
    var cookiesArr = decodedCookie.split(';');

    for(var i = 0; i < cookiesArr.length; i++) {
        var cookie = cookiesArr[i];

        while (cookie.charAt(0) == ' ') {
            cookie = cookie.substring(1);
        }

        if (cookie.indexOf(name) == 0) {
            return cookie.substring(name.length, cookie.length);
        }
    }

    return false;
}

function checkIfCredentialsMatching(encrCredentials, maybeMatchingSession) {
    try {
        let credentialsFromCookieStr = decryptCredentials(encrCredentials, maybeMatchingSession.ecnryptionKey);

        let credentialsFromCookieArr = credentialsFromCookieStr.split(',');
        let passwordFromCookie = credentialsFromCookieArr[1];
        let emailFromCookie = credentialsFromCookieArr[0]

        let ifPassWordsMatch = passwordFromCookie === maybeMatchingSession.password;
        let ifEmailsMatch = emailFromCookie === maybeMatchingSession.email;

        if (ifPassWordsMatch && ifEmailsMatch) return true;
    } catch(e) {
        return e;
    }
}

function decryptCredentials(encrCredentials, key) {
    const decryptedSessionCredentials = crypto.createDecipher('aes-256-ctr', key).update(encrCredentials, 'hex', 'utf-8');

    return decryptedSessionCredentials;    
}

function getDate() {
    let today = new Date();
    //let hh = today.getHours()
    let dd = today.getDate();
    let mm = today.getMonth()+1; //January is 0!
    let yyyy = today.getFullYear();

    if(dd<10) {
        dd = '0'+dd
    } 

    if(mm<10) {
        mm = '0'+mm
    } 

    let today = mm + ' ' + dd + ' ' + yyyy;
    return today
}

module.exports = {
    generateRandomStr,
    getCookie,
    checkIfCredentialsMatching,
    getDate
}
