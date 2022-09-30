const rentCarDao = require("../models/rentCarDao");
const jwt = require("jsonwebtoken");
require("dotenv").config();

const registeRentCar = async (params) => {
  await rentCarDao.registeRentCar(params);
};

const registeRentCarCompany = async (params) => {
  await rentCarDao.registeRentCarCompany(params);
};

const getRentCarList = async (params) => {
  let carList = await rentCarDao.searchCarList(params);

  if (carList.length === 0) {
    carList = [
      {
        filterTypes: [
          {
            id: 0,
            type: "가격 범위",
            slideList: [0, 0],
          },
          {
            id: 1,
            type: "연식",
            checkList: [
              "2014~16년",
              "2015~16년",
              "2015~17년",
              "2015~18년",
              "2017~18년",
              "2018~19년",
              "2017~19년",
              "2018~20년",
              "2019~20년",
              "2019~21년",
              "2020~22년",
              "2021~22년",
              "2022~23년",
              "2016~17년",
              "2016~18년",
              "2020~21년",
            ],
          },
          {
            id: 2,
            type: "옵션",
            checkList: [
              "블루투스",
              "후방센서",
              "후방카메라",
              "블랙박스",
              "열선시트",
              "열선핸들",
              "통풍시트",
              "네비게이션",
              "금연차량",
            ],
          },
          {
            id: 3,
            type: "누적예약",
            slideList: [0, 0],
          },
        ],
        carList: [],
      },
    ];
  } else {
    carList[0].filterTypes = JSON.parse(carList[0].filterTypes);
    carList[0].carList = JSON.parse(carList[0].carList);

    if (carList[0].filterTypes[0].slideList)
      if (carList[0].carList[0].rentCarCompanyList == undefined) {
        carList[0].carList = [];
      } else {
        carList.map((el) => {
          el.carList.map((options) => {
            let optionid = [];
            options.option.split(",").forEach((element) => {
              if (element === "1") {
                optionid.push("블루투스");
              } else if (element === "2") {
                optionid.push("후방센서");
              } else if (element === "3") {
                optionid.push("후방카메라");
              } else if (element === "4") {
                optionid.push("블랙박스");
              } else if (element === "5") {
                optionid.push("열선시트");
              } else if (element === "6") {
                optionid.push("열선핸들");
              } else if (element === "7") {
                optionid.push("통풍시트");
              } else if (element === "8") {
                optionid.push("네비게이션");
              } else if (element === "9") {
                optionid.push("금연차량");
              }
            });
            options.option = optionid;
          });
        });
      }
  }
  return carList;
};

const getRentCar = async () => {
  return await rentCarDao.getRentCar();
};

const rentcarReview = async (
  token,
  rentcarId,
  review,
  kindPoint,
  cleanPoint,
  conveniencePoint
) => {
  const key = process.env.SECRET_KEY;
  const tokenId = jwt.verify(token, key);
  const userId = tokenId.userId;
  const newreviewpoint = (kindPoint + cleanPoint + conveniencePoint) / 3;

  const reviewdata = await rentCarDao.rentcarReview(
    userId,
    rentcarId,
    review,
    kindPoint,
    cleanPoint,
    conveniencePoint,
    newreviewpoint
  );
  reviewdata[0].review = JSON.parse(reviewdata[0].review);
  return reviewdata;
};

const rentcarReviewDelete = async (token, reviewid) => {
  const key = process.env.SECRET_KEY;
  const tokenId = jwt.verify(token, key);
  const userId = tokenId.userId;

  const reviewdata = await rentCarDao.rentcarReviewDelete(userId, reviewid);
  reviewdata[0].review = JSON.parse(reviewdata[0].review);
  return reviewdata;
};

const getRentCarDetail = async (rentCompanyCarId) => {
  if (!rentCompanyCarId) {
    const err = new Error("필수 값이 입력되지 않았습니다.");
    err.status = 400;
    throw err;
  }
  const rentcarDetail = await rentCarDao.getRentCarDetail(rentCompanyCarId);
  let optionname = [];
  rentcarDetail[0].options.split(",").forEach((el) => {
    if (el === "1") {
      optionname.push("블루투스");
    } else if (el === "2") {
      optionname.push("후방센서");
    } else if (el === "3") {
      optionname.push("후방카메라");
    } else if (el === "4") {
      optionname.push("블랙박스");
    } else if (el === "5") {
      optionname.push("열선시트");
    } else if (el === "6") {
      optionname.push("열선핸들");
    } else if (el === "7") {
      optionname.push("통풍시트");
    } else if (el === "8") {
      optionname.push("네비게이션");
    } else if (el === "9") {
      optionname.push("금연차량");
    }
  });

  rentcarDetail[0].options = optionname;
  if (rentcarDetail[0].reviewList === undefined) {
    rentcarDetail[0].reviewList = [];
    rentcarDetail[0].kindPoint = "0";
    rentcarDetail[0].cleanPoint = "0";
    rentcarDetail[0].conveniencePoint = "0";
    rentcarDetail[0].reviewPoint = "0";
  } else {
    rentcarDetail[0].reviewList = JSON.parse(rentcarDetail[0].reviewList);
  }
  if (
    (rentcarDetail[0].reviewList[0].review ||
      rentcarDetail[0].reviewList[0].userName ||
      rentcarDetail[0].reviewList[0].userPhoto ||
      rentcarDetail[0].reviewList[0].created_at ||
      rentcarDetail[0].reviewList[0].reviewPoint) == null
  ) {
    rentcarDetail[0].reviewList = [];
    rentcarDetail[0].kindPoint = "0";
    rentcarDetail[0].cleanPoint = "0";
    rentcarDetail[0].conveniencePoint = "0";
    rentcarDetail[0].reviewPoint = "0";
  }
  return rentcarDetail;
};

const rentcarfiltereddata = async (params) => {
  let data = await rentCarDao.rentcarfiltereddata(params);
  console.log(data);
  const newdata = {};
  const newnewdata = [];
  console.log(typeof data);
  if (data.length === 0) {
    data.totalCount = 0;
    data.carList = [];
    data.filterTypes = [];
    newdata.totalCount = 0;
    newdata.carList = [];
    newdata.filterTypes = [];
    data = newdata;
    newnewdata.push(data);
    data = newnewdata;
  } else {
    data[0].filterTypes = JSON.parse(data[0].filterTypes);
    data[0].carList = JSON.parse(data[0].carList);
    if (data[0].carList === null) {
      data[0].totalCount = 0;
      data[0].carList = [];
      data[0].filterTypes = [];
    } else {
      data[0].carList.forEach((el) => {
        let optionid = [];
        el.option.split(",").forEach((element) => {
          if (element === "1") {
            optionid.push("블루투스");
          } else if (element === "2") {
            optionid.push("후방센서");
          } else if (element === "3") {
            optionid.push("후방카메라");
          } else if (element === "4") {
            optionid.push("블랙박스");
          } else if (element === "5") {
            optionid.push("열선시트");
          } else if (element === "6") {
            optionid.push("열선핸들");
          } else if (element === "7") {
            optionid.push("통풍시트");
          } else if (element === "8") {
            optionid.push("네비게이션");
          } else if (element === "9") {
            optionid.push("금연차량");
          }
        });
        el.option = optionid;
      });
    }
  }
  return data;
};

const rentCarReserve = async (params) => {
  const key = process.env.SECRET_KEY;
  const tokenId = jwt.verify(params.token, key);
  const userId = tokenId.userId;
  const rentdate = params.rentStartDate + " " + params.rentStartTime;
  const returndate = params.rentEndDate + " " + params.rentEndTime;
  console.log(rentdate);
  console.log(returndate);
  const { token, ...newparams } = params;
  newparams["userId"] = userId;
  newparams["rentdate"] = rentdate;
  newparams["returndate"] = returndate;
  console.log("newparams: ", newparams);
  await rentCarDao.rentCarReserve(newparams);
};

const getMyRentCarReview = async (token) => {
  const key = process.env.SECRET_KEY;
  const tokenId = jwt.verify(token, key);
  const userId = tokenId.userId;

  const reviewData = await rentCarDao.getMyRentCarReview(userId);
  // reviewData[0].review = JSON.parse(reviewData[0].review);
  return reviewData;
};

const getMyRentCarReserve = async (token, reservationid) => {
  const key = process.env.SECRET_KEY;
  const tokenId = jwt.verify(token, key);
  const userId = tokenId.userId;

  const reservedata = await rentCarDao.getMyRentCarReserve(
    userId,
    reservationid * 1
  );
  reservedata.forEach((el) => {
    el.userinfo = JSON.parse(el.userinfo);
    el.reserveinfo = JSON.parse(el.reserveinfo);
    el.carinfo = JSON.parse(el.carinfo);
    el.companyinfo = JSON.parse(el.companyinfo);
  });
  return reservedata;
};

const insertreview = async () => {
  await rentCarDao.insertreview();
};

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
  getMyRentCarReserve,
  insertreview,
};
