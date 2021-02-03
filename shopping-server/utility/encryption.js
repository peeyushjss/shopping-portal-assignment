let Config = require('../config/config'),
    crypto = require('crypto'),
    algorithm = 'aes-256-ctr';

let privateKey = Config.key.privateKey;


exports.decrypt = (password) => {
    return decrypt(password);
};

exports.encrypt = (password) => {
    return encrypt(password);
};

/* method to decrypt data(password)  */
const decrypt = (password) => {
    try {
        let decipher = crypto.createDecipher(algorithm, privateKey),
            dec = decipher.update(password, 'hex', 'utf8');
        dec += decipher.final('utf8');
        return dec;
    } catch (ex) {
        console.log('failed');
        return;
    }
}

/* method to encrypt data(password) */
const encrypt = (password) => {
    let cipher = crypto.createCipher(algorithm, privateKey),
        crypted = cipher.update(password, 'utf8', 'hex');
    crypted += cipher.final('hex');
    return crypted;
}