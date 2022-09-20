const userDao = require('../models/loginLogoutDao.js');

const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const loginUsingEmail = async (email, password) => {
  const user = await userDao.loginUsingEmail(email);

  if (user) {
    const isPwCorrect = bcrypt.compareSync(password, user.password);
    const token = jwt.sign({ userId: user.id }, process.env.SECRET_KEY, {
      expiresIn: '24h',
    });
    console.log("token: "+token);

    const userLoginData = {
      user: user,
      isPwCorrect: isPwCorrect,
      token: token,
    };
    return userLoginData;
  }
};

module.exports = {
  loginUsingEmail,
};
