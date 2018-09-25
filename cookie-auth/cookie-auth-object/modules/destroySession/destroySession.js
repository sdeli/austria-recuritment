const {getCookie, checkIfCredentialsMatching} = require('../../utils/utils.js');

function destroySession(req, cookieName) {
    let encrCredentialsFromCookie = getCookie(req, cookieName);

    if (encrCredentialsFromCookie) {
        let matchingSessionsIndex = getMatchingSessionsIndex.call(this, encrCredentialsFromCookie);
        let isIndex = typeof matchingSessionsIndex === 'number';

        if (isIndex) {
            let cookieToDestroyOnFrontEnd = eraseSessionFromRegisteredSessionssArr.call(this, matchingSessionsIndex);
            return cookieToDestroyOnFrontEnd;
        } else {
            return isIndex;
        }
    } else {
        return false;
    }
}

function getMatchingSessionsIndex(encrCredentialsFromCookie) {
    let maybeMatchingSessionsIndex = this.registeredSessionsArr.findIndex(registeredSession => {
        return registeredSession.encryptedCredentials === encrCredentialsFromCookie;
    });

    let maybeMatchingSession = this.registeredSessionsArr[maybeMatchingSessionsIndex];

    let areCredentialsMatching = checkIfCredentialsMatching(encrCredentialsFromCookie, maybeMatchingSession)

    if (areCredentialsMatching) {
        return maybeMatchingSessionsIndex
    } else {
        return 'active sessions credentials are not matching credentials in cookie';
    }
}

function eraseSessionFromRegisteredSessionssArr(matchingSessionsIndex) {
    let cookieToDestroyOnFrontEnd = this.registeredSessionsArr.splice(matchingSessionsIndex, 1)[0];
    return cookieToDestroyOnFrontEnd;
}

module.exports = destroySession;