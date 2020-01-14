module.exports = {
  apollo: {
    port: process.env.APOLLO_PORT || 4000,
  },
  mongo: {
    port: process.env.DB_PORT,
    host: process.env.DB_HOST,
    name: process.env.DB_NAME,
  },
  cors: {
    frontend: ["http://localhost:3000", "http://localhost:3001"],
  },
  firebase: {
    databaseURL: process.env.FIREBASE_DATABASE_URL,
    certConfig: {
      type: process.env.FIREBASE_TYPE,
      project_id: process.env.FIREBASE_PROJECT_ID,
      private_key_id: process.env.FIREBASE_PRIVATE_KEY_ID,
      private_key: process.env.FIREBASE_PRIVATE_KEY,
      client_email: process.env.FIREBASE_CLIENT_EMAIL,
      client_id: process.env.FIREBASE_CLIENT_ID,
      auth_uri: process.env.FIREBASE_AUTH_URI,
      token_uri: process.env.FIREBASE_TOKEN_URI,
      auth_provider_x509_cert_url:
        process.env.FIREBASE_AUTH_PROVIDER_X_509_CERT_URL,
      client_x509_cert_url: process.env.FIREBASE_CLIENT_X_509_CERT_URL,
    },
  },
};
