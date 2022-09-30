const userService = require('../services/userService');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const pong = async (req, res) => {
  res.status(200).json({ message: 'pong' });
};

const userCheck = async (req,res) => {
  console.log('START userCheckEmail')
  const {email} = req.params
  const userEmail = await userService.checkEmailDuplicate(email);
  
  if (userEmail) {
    res.status(400).json({ message: '이미 사용중인 이메일입니다.' });
    return;
  }else {
    res.status(200).json({ message: '사용 가능한 이메일입니다'})
    return;
  }
}

const createUser = async (req, res) => {
  console.log('START createUserController');

  const { name, birth, phoneNumber, gender, email, password } = req.body;

  const hasKey = { name: false, birth: false, phoneNumber: false, gender: false, email: false, password: false};

  /** 받아온 데이터에 키 + 벨류 값이 존재하는지 확인하는 코드 */
  const requireKey = Object.keys(hasKey);

  Object.entries(req.body).forEach(keyValue => {
    const [key, value] = keyValue;
    if (requireKey.includes(key) && value) {
      hasKey[key] = true;
    }
  });

  /** 받아온 데이터에 키 + 벨류 값이 없을때 에러를 표시해주는 코드*/
  const hasKeyArray = Object.entries(hasKey);
  for (let i = 0; i < hasKeyArray.length; i++) {
    const [key, value] = hasKeyArray[i];
    if (!value) {
      res.status(400).json({ message: `${key}이/가 없습니다.` });
      return;
    }
  }
  /** 이름 형식 체크하는 함수 
  const nameCheck = /^[가-힣a-zA-Z\s]+$/;
  if (nameCheck.test(user) == false) {
    res.status(400).json({ message: '이름 형식이 올바르지 않습니다.' });
    return;
  }*/

  /** 이메일 형식 체크하는 함수 
  const emailCheck =
    /^[0-9a-zA-Z]([-_.]?[0-9a-zA-Z])*@[0-9a-zA-Z]([-_.]?[0-9a-zA-Z])*.[a-zA-Z]{2,3}$/i;
  if (emailCheck.test(email) == false) {
    res.status(400).json({ message: '이메일 형식이 올바르지 않습니다.' });
    return;
  }*/

  /** 이메일 중복 여부 확인하는 함수 */
  const userEmail = await userService.checkEmailDuplicate(email);
  if (userEmail) {
    res.status(400).json({ message: '이미 사용중인 이메일입니다.' });
    return;
  }

  /** 비밀번호 형식 체크하는 함수 
  const pwCheck =
    /^(?=.*[A-Z])(?=.*[a-z])(?=.*\d)(?=.*[$@$!%*#?&])[A-Za-z0-9\W]{8,}$/;
  if (pwCheck.test(pwd) == false) {
    res.status(400).json({ message: '비밀번호 형식이 올바르지 않습니다.' });
    return;
  }*/

  const users = await userService.createUser(name, birth, phoneNumber, gender, email, password);

  /** 
  try {
    if (!(pwd.length > 7)) {
      res.status(400).json({ message: '비밀번호를 다시 입력해주세요.' });
      return;
    }
  } catch {
    res.status(500).json({ message: '회원가입 도중 문제가 발생하였습니다.' });
  }*/

  console.log('END createUserController');

  res.status(201).json({ message: '회원가입 성공!' });
};

/** 
const sendUserName = async (req, res) => {
  const { token } = req.body;
  if (!token) {
    res.status(400).json({ message: '토큰값을 입력해주세요' });
  }

  try {
    const userName = await userService.sendUserName(token);
    res.status(200).json({ message: '이름 가져오기 성공', userName });
    console.log(userName);
  } catch (err) {
    console.log(err);
    if (err.name === 'TokenExpiredError') {
      return res.status(419).json({
        code: 419,
        message: '토큰이 만료되었습니다.',
      });
    }
    // 토큰의 비밀키가 일치하지 않는 경우
    if (err.name === 'JsonWebTokenError') {
      return res.status(401).json({
        code: 401,
        message: '유효하지 않은 토큰입니다.',
      });
    }
    res.status(500);
  }
}; */

module.exports = {
  createUser,
  pong,
  userCheck,
  //sendUserName,
};
