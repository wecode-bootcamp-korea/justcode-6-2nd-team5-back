const rentCarVo = (object) => {
  let params = new Map();

  const { carName, carPhoto, ridePeopleNumber, oilType } = object;

  if (!(carName && carPhoto && ridePeopleNumber && oilType)) {
    const err = new Error("필수 값이 입력되지 않았습니다.");
    err.status = 400;
    throw err;
  }

  if (carName) {
    params.set("carName", carName);
  }

  if (carPhoto) {
    params.set("carPhoto", carPhoto);
  }

  if (ridePeopleNumber) {
    params.set("ridePeopleNumber", ridePeopleNumber);
  }

  if (oilType) {
    params.set("oilType", oilType);
  }

  return params;
};

const rentCarCompanyVo = (object) => {
  let params = new Map();

  const { rentCarCompany, rentCarCompanyAddress } = object;

  if (!(rentCarCompany && rentCarCompanyAddress)) {
    const err = new Error("필수 값이 입력되지 않았습니다.");
    err.status = 400;
    throw err;
  }

  if (rentCarCompany) {
    params.set("rentCarCompany", rentCarCompany);
  }

  if (rentCarCompanyAddress) {
    params.set("rentCarCompanyAddress", rentCarCompanyAddress);
  }

  return params;
};

const getRentCarListVo = (object) => {
  let params = new Map();

  const {
    insurance,
    age,
    experience,
    startPrice,
    endPrice,
    rentCarYearInfo,
    option,
  } = object;

  if (!(insurance, age, experience)) {
    const err = new Error("필수 값이 입력되지 않았습니다.");
    err.status = 400;
    throw err;
  }

  if (insurance) {
    params.set("insurance", insurance);
  }
  if (age) {
    params.set("age", age);
  }
  if (experience) {
    params.set("experience", experience);
  }
  if (startPrice) {
    params.set("startPrice", startPrice);
  }
  if (endPrice) {
    params.set("endPrice", endPrice);
  }
  if (rentCarYearInfo) {
    params.set("rentCarYearInfo", rentCarYearInfo);
  }
  if (option) {
    params.set("option", option);
  }

  return params;
};

module.exports = { rentCarVo, rentCarCompanyVo, getRentCarListVo };
