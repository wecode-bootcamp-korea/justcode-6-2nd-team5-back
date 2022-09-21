const rentCarDao = require("../models/rentCarDao");

const registeRentCar = async (params) => {
  await rentCarDao.registeRentCar(params);
};

const registeRentCarCompany = async (params) => {
  await rentCarDao.registeRentCarCompany(params);
};

const getRentCarList = async (params) => {
  let rentCarList = await rentCarDao.getRentCarList(params);
  rentCarList.map((el, idx) => {
    if (el.rentCarCompany === null || el.options === null) {
      // console.log(el.rentCarCompany);
      rentCarList.splice(idx, 1);
    }
    console.log(el);
    el.options = JSON.parse(el.options);
    el.rentCarCompany = JSON.parse(el.rentCarCompany);
  });
  return rentCarList;
};

const getRentCar = async () => {
  return await rentCarDao.getRentCar();
};

module.exports = {
  registeRentCar,
  registeRentCarCompany,
  getRentCarList,
  getRentCar,
};
