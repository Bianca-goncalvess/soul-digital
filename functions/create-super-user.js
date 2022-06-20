const admin = require("firebase-admin"); // import admin from "firebase-admin"
const credentials = require("./credentials.json");

admin.initializeApp({
  credential: admin.credential.cert(credentials),
});

// CLI - COMMAND LINE INTERFACE
const args = process.argv.slice(2);
const auth = admin.auth();

// IIFE - Immediately-invoked function expression
(async () => {
  try {
    const [email, password, displayName] = args;
    const user = await auth.createUser({
      email: email,
      password: password,
      displayName: displayName,
    });

    await auth.setCustomUserClaims(user.uid, { super: true, admin: true });

    console.log(`Super usuário [${user.email}] criado.`);
  } catch (err) {
    console.log(err);
  }
})();
