# orbitdb-nos-identity-provider
OrbitDB Identity Provider for nOS Network and other ARK Core-based blockchains.

How to use:

```
const NetworkIdentity = require('./identity').default;

OrbitDB.Identities.addIdentityProvider(NetworkIdentity);
const passphrase = "enter any bip39 mnemonic key here";
const identity = await OrbitDB.Identities.createIdentity({ type: `NetworkIdentityType`, passphrase });

const orbitdb = await OrbitDB.createInstance(ipfs, { identity });

// Only the wallet with the configured passphrase will be able to write to this db
const db = await orbitdb.log("hello");
await db.load();

// This will export the db address.
// Other services can sync the database with this address (db.load("/orbitdb/{root}/{path}")).
console.log(db.address);

// The database can only be written to by the owner of the passphrase.
// If another passphrase is entered above and the same db address is loaded, adding a db item will throw a permission error.
const hash = await db.add("world");
```
