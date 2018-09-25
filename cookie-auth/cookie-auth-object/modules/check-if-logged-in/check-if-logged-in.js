const {getCookie, checkIfCredentialsMatching} = require('../../utils/utils.js');

function checkIfLoggedIn(req, cookieName) {
    let encrSessionCredentials = getCookie(req, cookieName);

    if (encrSessionCredentials) {
        let matchingSessionObj = getMatchingSession.call(this, encrSessionCredentials);

        return matchingSessionObj;
    } else {
        return false;
    }
}

function getMatchingSession(encrCredentials) {
    let maybeMatchingSession = this.registeredSessionsArr.find(registeredSession => {
        return registeredSession.encryptedCredentials === encrCredentials;
    });

    if (maybeMatchingSession) {
        isMatchingSession = checkIfCredentialsMatching(encrCredentials, maybeMatchingSession);

         if (isMatchingSession) {
            return maybeMatchingSession;
         } else {
            return 'active sessions credentials are not matching credentials in cookie';
         }
    } else {
        return 'no matching session'
    }
}


module.exports = checkIfLoggedIn;