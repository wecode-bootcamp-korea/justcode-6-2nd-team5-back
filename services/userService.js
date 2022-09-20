const userDao = require('../models/userDao');

const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const createUser = async (name, birth, phoneNumber, gender, email, password) => {
  console.log('START createUserService');

  const salt = bcrypt.genSaltSync(12);
  const hashedPw = bcrypt.hashSync(password, salt);
  const users = await userDao.createUser(name, birth, phoneNumber, gender, email, hashedPw);
  console.log('END createUserService');

  return users;
};

const checkEmailDuplicate = async email => {
  const userEmail = await userDao.checkEmailDuplicate(email);
  return userEmail;
};

/** 
const sendUserName = async token => {
  const key = process.env.SECRET_KEY;
  const userId = jwt.verify(token, key);
  const id = userId.userId;
  console.log(id);
  const userName = await userDao.sendUserName(id);
  return userName;
}; */

module.exports = {
  createUser,
  checkEmailDuplicate,
  //sendUserName,
};
