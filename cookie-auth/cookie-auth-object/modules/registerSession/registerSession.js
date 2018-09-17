const crypto = require('crypto');
const {generateRandomStr} = require('../../utils/utils.js');

function registerSession(email, password) {
    let ecnryptionKey = generateRandomStr(Math.floor((Math.random() * 10) + 5));
    let encryptedCredentials = getEncryptedCredentials(email, password, ecnryptionKey);

    this.registeredSessionsArr.push({
        encryptedCredentials,
        email,
        password,
        ecnryptionKey
    });

    return encryptedCredentials;
}

function getEncryptedCredentials(email, password, ecnryptionKey){
    const key = ecnryptionKey;
    const credentialsToEncrypt = `${email},${password}`;

    const encryptedCredentials = crypto.createCipher('aes-256-ctr', key).update(credentialsToEncrypt, 'utf-8', 'hex');
    return encryptedCredentials;
}

module.exports = registerSession;