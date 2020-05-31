const Identities = require('orbit-db-identity-provider')
const Crypto = require('@arkecosystem/crypto');

class CoreIdentityProvider extends Identities.IdentityProvider {
    static get type() { return 'CoreIdentityType' } // return type
    async getId(options) {
        const publicKey = Crypto.Identities.PublicKey.fromPassphrase(options.passphrase);
        return publicKey;
    } // return identifier of external id (eg. a public key)
    async signIdentity(data, options) {
        const signed = Crypto.Crypto.Message.sign(data, options.passphrase);
        return signed.signature;
    } //return a signature of data (signature of the OrbtiDB public key)
    static async verifyIdentity(identity) {
        const verified = Crypto.Crypto.Message.verify({ message: identity.publicKey + identity.signatures.id, signature: identity.signatures.publicKey, publicKey: identity.id });
        return verified;
    } //return true if identity.sigantures are valid
}


exports.default = CoreIdentityProvider;