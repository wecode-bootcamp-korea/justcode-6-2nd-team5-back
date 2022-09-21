const { myDataSource } = require("./typeorm-client");

const loginUsingEmail = async (email) => {
  const [user] = await myDataSource.query(
    `
      SELECT
        id,
        email,
        password
      FROM users
      WHERE email = ?
    `,
    [email]
  );
  return user;
};

module.exports = {
  loginUsingEmail,
};
