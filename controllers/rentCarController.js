const rentCarService = require("../services/rentCarService");
const {
  rentCarVo,
  rentCarCompanyVo,
  getRentCarListVo,
} = require("../vo/rentCarVo");
const asyncWrap = require("./async-wrap");

const registeRentCar = asyncWrap(async (req, res) => {
  const params = rentCarVo(req.body);

  try {
    await rentCarService.registeRentCar(params);
    res.status(201).json({ message: "차량 등록을 성공했습니다." });
  } catch (err) {
    console.log(err);
    res.status(err.status || 500).json(err.message);
  }
});

const registeRentCarCompany = asyncWrap(async (req, res) => {
  const params = rentCarCompanyVo(req.body);

  try {
    await rentCarService.registeRentCarCompany(params);
    res.status(201).json({ message: "렌트카 업체 등록을 성공했습니다." });
  } catch (err) {
    console.log(err);
    res.status(err.status || 500).json(err.message);
  }
});

const getRentCarList = asyncWrap(async (req, res) => {
  const { insurance, age, experience } = req.query;
  const { startPrice, endPrice, rentCarYearInfo, option } = req.body;
  const parameters = {
    insurance,
    age,
    experience,
    startPrice,
    endPrice,
    rentCarYearInfo,
    option,
  };
  const params = getRentCarListVo(parameters);
  try {
    const rentCarList = await rentCarService.getRentCarList(params);
    res.status(200).json(rentCarList);
  } catch (err) {
    console.log(err);
    res.status(err.status || 500).json(err.message);
  }
});

const getRentCar = asyncWrap(async (req, res) => {
  try {
    const data = await rentCarService.getRentCar();
    res.status(200).json(data);
  } catch (err) {
    console.log(err);
    res.status(err.status || 500).json(err.message);
  }
});

module.exports = {
  registeRentCar,
  registeRentCarCompany,
  getRentCarList,
  getRentCar,
};
