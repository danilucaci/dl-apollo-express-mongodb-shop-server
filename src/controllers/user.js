const db = require("../models/index");

async function currentUser(req, res) {
  try {
    const userId = req.params.userId;

    const user = await db.User.findById({ _id: userId })
      .lean()
      .exec();

    return res.status(200).send({
      data: user,
      error: null,
    });
  } catch (error) {
    console.log("User not found ", error.message);
    return res.status(400).end();
  }
}

async function updateUser(req, res, next) {
  const user = req.user;

  const { displayName, photoURL } = req.body;

  await db.User.findByIdAndUpdate(
    { _id: user.uid },
    { displayName, photoURL },
    { new: true, omitUndefined: true },
  )
    .lean({ virtuals: true })
    .exec()
    .catch(next);

  res.status(204).end();
}

module.exports = {
  currentUser,
  updateUser,
};
