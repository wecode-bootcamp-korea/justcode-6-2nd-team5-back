const { DataSource } = require('typeorm');

const myDataSource = new DataSource({
  type: process.env.TYPEORM_CONNECTION,
  host: process.env.TYPEORM_HOST,
  port: process.env.TYPEORM_PORT,
  username: process.env.TYPEORM_USERNAME,
  password: process.env.TYPEORM_PASSWORD,
  database: process.env.TYPEORM_DATABASE,
});

myDataSource
  .initialize()
  .then(() => {
    console.log('userDao has been initialized!');
  })
  .catch(() => {
    console.log('Database initiate fail');
  });

const createUser = async (name, birth, phoneNumber, gender, email, hashedPw) => {
  console.log('START createUserDao');
  const users = await myDataSource.query(
    `
        INSERT INTO USERS(name, birth, phoneNumber, gender, email, password)
        VALUES (?, ?, ?, ?, ?, ?)
      `,
    [name, birth, phoneNumber, gender, email, hashedPw]
  );
  console.log('END createUserDao');
  return users;
};

const checkEmailDuplicate = async email => {
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

const userProfileImg = async (profileImg) => {
  const userProfileImg = await myDataSource.query(
    `
    INSERT INTO USERS(profileImg)
    VALUES (?)
    `,
    [profileImg]
  )
}

module.exports = {
  createUser,
  checkEmailDuplicate
  //sendUserName,
};
