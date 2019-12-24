const db = require("../models/index");

async function currentUser(req, res) {
  try {
    const userId = req.params.userId;

    const user = await db.User.findById({ _id: userId })
      .lean()
      .exec();

    console.log(user);

    return res.status(200).send({
      data: user,
      errors: null,
    });
  } catch (error) {
    console.log("User not found ", error.message);
    return res.status(400).end();
  }
}

module.exports = {
  currentUser,
};
