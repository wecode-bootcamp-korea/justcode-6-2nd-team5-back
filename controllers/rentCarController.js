const rentCarService = require("../services/rentCarService");
const {
  rentCarVo,
  rentCarCompanyVo,
  getRentCarListVo,
  rentcarfiltereddataVo,
} = require("../vo/rentCarVo");
const asyncWrap = require("./async-wrap");

/** 차량 등록 */
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

/** 업체등록 */
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

/** 검색 필터데이터 및 차량 업체 정보*/
const getRentCarList = asyncWrap(async (req, res) => {
  const params = getRentCarListVo(req.query);
  try {
    const carList = await rentCarService.getRentCarList(params);
    res.status(200).json(carList);
  } catch (err) {
    console.log(err);
    res.status(err.status || 500).json(err.message);
  }
});

/** 추천최저가차량 */
const getRentCar = asyncWrap(async (req, res) => {
  try {
    const data = await rentCarService.getRentCar();
    res.status(200).json(data);
  } catch (err) {
    console.log(err);
    res.status(err.status || 500).json(err.message);
  }
});

/** 리뷰 작성 */
const rentcarReview = asyncWrap(async (req, res) => {
  const { token, rentcarid, review, kindPoint, cleanPoint, conveniencePoint } =
    req.body;
  try {
    const reviewdata = await rentCarService.rentcarReview(
      token,
      rentcarid,
      review,
      kindPoint,
      cleanPoint,
      conveniencePoint
    );
    res.status(201).json(reviewdata);
  } catch (err) {
    console.log(err);
    res.status(err.status || 500).json(err.message);
  }
});

/** 리뷰 삭제 */
const rentcarReviewDelete = asyncWrap(async (req, res) => {
  const { token, reviewid } = req.body;
  try {
    const reviewdata = await rentCarService.rentcarReviewDelete(
      token,
      reviewid
    );
    res.status(201).json(reviewdata);
  } catch (err) {
    console.log(err);
    res.status(err.status || 500).json(err.message);
  }
});

/** 상세페이지 */
const getRentCarDetail = asyncWrap(async (req, res) => {
  const { rentCompanyCarId } = req.query;
  try {
    const rentcarDetail = await rentCarService.getRentCarDetail(
      rentCompanyCarId
    );
    res.status(200).json(rentcarDetail);
  } catch (err) {
    console.log(err);
    res.status(500).json(err.message);
  }
});

/** 필터링 후 데이터 */
const rentcarfiltereddata = asyncWrap(async (req, res) => {
  const params = rentcarfiltereddataVo(req.query);
  try {
    const filtereddata = await rentCarService.rentcarfiltereddata(params);
    res.status(200).json(filtereddata);
  } catch (err) {
    console.log(err);
    res.status(err.status || 500).json(err.message);
  }
});

/** 렌터카 예약 */
const rentCarReserve = asyncWrap(async (req, res) => {
  const {
    token,
    rentcompanycarid,
    rentStartDate,
    rentEndDate,
    rentStartTime,
    rentEndTime,
    price,
  } = req.body;

  const params = {
    token,
    rentcompanycarid,
    rentStartDate,
    rentEndDate,
    rentStartTime,
    rentEndTime,
    price,
  };

  try {
    await rentCarService.rentCarReserve(params);
    res.status(201).json({ message: "렌터카 예약 완료되었습니다." });
  } catch (err) {
    console.log(err);
    res.status(err.status || 500).json(err.message);
  }
});

const getMyRentCarReview = asyncWrap(async (req, res) => {
  const { token } = req.body;
  try {
    const reviewData = await rentCarService.getMyRentCarReview(token);
    res.status(200).json(reviewData);
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
  rentcarReview,
  getRentCarDetail,
  rentcarfiltereddata,
  rentcarReviewDelete,
  rentCarReserve,
  getMyRentCarReview,
};
