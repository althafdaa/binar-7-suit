const User = require("../models").user;
const bcrypt = require("bcryptjs");
const History = require("../models").history;

const format = (item) => {
  const { id, username, role } = item;
  return {
    id,
    username,
    role,
    accessToken: item.generateToken(),
  };
};

const registerAccount = async (req, res) => {
  const { username, password, role } = req.body;
  try {
    if (role !== "PlayerUser" && role !== "SuperAdmin") {
      return res.status(400).json({
        message: "Error, wrong role",
      });
    }

    const usernameCheck = await User.findOne({
      where: {
        username,
      },
    });

    if (usernameCheck) {
      return res.status(400).json({
        message: `Account with username: ${username}, already exist`,
      });
    }

    await User.create({
      username,
      password,
      role,
    });

    return res.status(200).json({
      message: `Account with username ${username} as ${role} successfully registered`,
    });
  } catch (error) {
    return res.status(500).json({
      message: `${error}`,
    });
  }
};

const loginAccount = async (req, res) => {
  const { username, password } = req.body;
  try {
    const usernameCheck = await User.findOne({
      where: {
        username,
      },
    });
    const checkHistory = await History.findOne({
      where: {
        user_id: usernameCheck.id,
      },
    });

    const isPasswordCorrect = bcrypt.compareSync(
      password,
      usernameCheck.password
    );

    if (!usernameCheck) {
      return res.status(400).json({
        message: `Account with username: ${username}, doesnt exist`,
      });
    } else if (!isPasswordCorrect) {
      return response(res, 400, false, "wrong password");
    } else {
      if (!checkHistory) {
        await History.create({
          user_id: usernameCheck.id,
          result: 0,
        });
      }

      const token = format(usernameCheck);

      return res.status(200).json({
        message: "Login success",
        data: token,
      });
    }
  } catch (error) {
    return res.status(500).json({
      error: `${error}`,
    });
  }
};

module.exports = { loginAccount, registerAccount };
