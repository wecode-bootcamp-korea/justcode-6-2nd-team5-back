const { myDataSource } = require("./typeorm-client");

const createUser = async (
  name,
  birth,
  phoneNumber,
  gender,
  email,
  hashedPw
) => {
  console.log("START createUserDao");
  const users = await myDataSource.query(
    `
        INSERT INTO USERS(name, birth, phoneNumber, gender, email, password)
        VALUES (?, ?, ?, ?, ?, ?)
      `,
    [name, birth, phoneNumber, gender, email, hashedPw]
  );
  console.log("END createUserDao");
  return users;
};

const checkEmailDuplicate = async (email) => {
  const [userEmail] = await myDataSource.query(
    `
      SELECT
        email
      FROM users
      WHERE email = ?
    `,
    [email]
  );
  return userEmail;
};
/** 
const sendUserName = async id => {
  const userId = await myDataSource.query(
    `
    SELECT
    name
    FROM users
    WHERE id = ?
    `,
    [id]
  );
  return userId;
};*/

module.exports = {
  createUser,
  checkEmailDuplicate,
  //sendUserName,
};
