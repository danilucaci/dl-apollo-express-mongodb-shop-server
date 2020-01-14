const firebaseAdmin = require("firebase-admin");
const config = require("../config/config");
const db = require("../models/index");

firebaseAdmin.initializeApp({
  credential: firebaseAdmin.credential.cert(config.firebase.certConfig),
  databaseURL: config.firebase.databaseURL,
});

module.exports = {
  firebaseAdmin,
  auth: firebaseAdmin.auth(),
};

function verifyApiAuthHeaders(req, res, next) {
  if (
    !req.headers.authorization ||
    !req.headers.authorization.startsWith("Bearer ")
  ) {
    console.error("No Bearer token found in the Authorization header.");

    return res.status(401).send({
      data: null,
      error: "Unauthorized",
    });
  }

  next();
}

async function getApiFirebaseUserClaims(req, res) {
  try {
    const idToken = req.headers.authorization.split("Bearer ")[1];

    return firebaseAdmin.auth().verifyIdToken(idToken);
  } catch (error) {
    console.error("No Bearer token found in the Authorization header.", error);

    return res.status(401).send({
      data: null,
      error: "Unauthorized",
    });
  }
}

async function getApiFirebaseUser(req, res, next) {
  try {
    const userClaims = await getApiFirebaseUserClaims(req, res).catch(
      (error) => {
        console.error("Failed to fetch the Firebase user claims: ", error);

        return res.status(401).send({
          data: null,
          error: "Unauthorized",
        });
      },
    );

    const user = await firebaseAdmin
      .auth()
      .getUser(userClaims.uid)
      .catch((error) => {
        console.error("Failed to fetch the Firebase User: ", error);

        return res.status(401).send({
          data: null,
          error: "Unauthorized",
        });
      });

    req.user = user;

    next();
  } catch (error) {
    console.error("Failed to fetch the Firebase User: ", error);

    return res.status(401).send({
      data: null,
      error: "Unauthorized",
    });
  }
}

async function getGraphQLFirebaseUser(req) {
  if (
    !req.headers.authorization ||
    !req.headers.authorization.startsWith("Bearer ")
  ) {
    console.error("No Bearer token found in the Authorization header.");

    return null;
  }

  try {
    const idToken = req.headers.authorization.split("Bearer ")[1];

    const userClaims = await firebaseAdmin.auth().verifyIdToken(idToken);

    const user = await firebaseAdmin.auth().getUser(userClaims.uid);

    return user;
  } catch (error) {
    return null;
  }
}

async function apiSignup(req, res, next) {
  const { id, displayName, email, role, photoURL } = req.body;

  const currentUser = await db.User.findById({ _id: id })
    .select("-__v")
    .lean({ virtuals: true })
    .exec()
    .catch(next);

  if (currentUser) {
    return res.status(200).send({
      data: currentUser,
      error: null,
    });
  } else {
    const newUser = await db.User.create({
      _id: id,
      displayName,
      email,
      role,
      photoURL,
    }).catch(next);

    return res.status(200).send({
      data: newUser,
      error: null,
    });
  }
}

module.exports = {
  apiSignup,
  verifyApiAuthHeaders,
  getApiFirebaseUser,
  getGraphQLFirebaseUser,
  auth: firebaseAdmin.auth(),
};
