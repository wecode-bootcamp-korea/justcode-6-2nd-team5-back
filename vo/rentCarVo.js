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

  let {
    rentStartDate,
    rentEndDate,
    rentStartTime,
    rentEndTime,
    insurance,
    age,
    experience,
    carType,
  } = object;

  if (
    !(rentStartDate,
    rentEndDate,
    rentStartTime,
    rentEndTime,
    insurance,
    age,
    experience,
    carType)
  ) {
    const err = new Error("필수 값이 입력되지 않았습니다.");
    err.status = 400;
    throw err;
  }
  if (rentStartDate) {
    params.set("rentStartDate", rentStartDate);
  }
  if (rentEndDate) {
    params.set("rentEndDate", rentEndDate);
  }
  if (rentStartTime) {
    params.set("rentStartTime", rentStartTime);
  }
  if (rentEndTime) {
    params.set("rentEndTime", rentEndTime);
  }
  if (insurance) {
    if (insurance === "일반자차") {
      insurance = 1;
    } else if (insurance === "완전자차") {
      insurance = 2;
    } else if (insurance === "부분무제한") {
      insurance = 3;
    } else if (insurance === "슈퍼무제한") {
      insurance = 4;
    }
    params.set("insurance", insurance);
  }
  if (age) {
    if (age === "만 21세~25세") {
      age = [1, 2, 3];
    } else if (age === "만 26세 이상") {
      age = [1, 2, 3, 4];
    }
    params.set("age", age);
  }
  if (experience) {
    if (experience === "1년 미만") {
      experience = [1];
    } else if (experience === "2년 미만") {
      experience = [1, 2];
    } else if (experience === "2년 이상") {
      experience = [1, 2, 3, 4];
    }
    params.set("experience", experience);
  }
  if (carType) {
    if (carType !== "전체") {
      params.set("carType", carType);
    } else if (carType === "전체") {
      params.set("carType", [
        "경형",
        "소형",
        "준중형",
        "중형",
        "고급",
        "SUV/캠핑",
        "승합",
      ]);
    }
  }
  return params;
};

const rentcarfiltereddataVo = (object) => {
  let params = new Map();

  let {
    rentStartDate,
    rentEndDate,
    rentStartTime,
    rentEndTime,
    insurance,
    age,
    experience,
    carType,
    rentCarYearInfo,
    option,
    pricemin,
    pricemax,
    bookedmin,
    bookedmax,
    sort,
  } = object;

  if (
    !(rentStartDate,
    rentEndDate,
    rentStartTime,
    rentEndTime,
    insurance,
    age,
    experience)
  ) {
    const err = new Error("필수 값이 입력되지 않았습니다.");
    err.status = 400;
    throw err;
  }
  if (rentStartDate) {
    params.set("rentStartDate", rentStartDate);
  }
  if (rentEndDate) {
    params.set("rentEndDate", rentEndDate);
  }
  if (rentStartTime) {
    params.set("rentStartTime", rentStartTime);
  }
  if (rentEndTime) {
    params.set("rentEndTime", rentEndTime);
  }
  if (insurance) {
    if (insurance === "일반자차") {
      insurance = 1;
    } else if (insurance === "완전자차") {
      insurance = 2;
    } else if (insurance === "부분무제한") {
      insurance = 3;
    } else if (insurance === "슈퍼무제한") {
      insurance = 4;
    }
    params.set("insurance", insurance);
  }
  if (age) {
    if (age === "만 21세~25세") {
      age = [1, 2, 3];
    } else if (age === "만 26세 이상") {
      age = [1, 2, 3, 4];
    }
    params.set("age", age);
  }
  if (experience) {
    if (experience === "1년 미만") {
      experience = [1];
    } else if (experience === "2년 미만") {
      experience = [1, 2];
    } else if (experience === "2년 이상") {
      experience = [1, 2, 3, 4];
    }
    params.set("experience", experience);
  }
  if (carType) {
    if (carType !== "전체") {
      params.set("carType", carType);
    } else if (carType === "전체") {
      params.set("carType", [
        "경형",
        "소형",
        "준중형",
        "중형",
        "고급",
        "SUV/캠핑",
        "승합",
      ]);
    }
  }
  if (rentCarYearInfo) {
    if (rentCarYearInfo !== "전체") {
      let yearinfo = [];
      if (typeof rentCarYearInfo === "object") {
        rentCarYearInfo.forEach((el) => {
          if (el === "2014~16년") yearinfo.push(1);
          else if (el === "2015~16년") yearinfo.push(2);
          else if (el === "2015~17년") yearinfo.push(3);
          else if (el === "2015~18년") yearinfo.push(4);
          else if (el === "2017~18년") yearinfo.push(5);
          else if (el === "2018~19년") yearinfo.push(6);
          else if (el === "2017~19년") yearinfo.push(7);
          else if (el === "2018~20년") yearinfo.push(8);
          else if (el === "2019~20년") yearinfo.push(9);
          else if (el === "2019~21년") yearinfo.push(10);
          else if (el === "2020~22년") yearinfo.push(11);
          else if (el === "2021~22년") yearinfo.push(12);
          else if (el === "2022~23년") yearinfo.push(13);
          else if (el === "2016~17년") yearinfo.push(14);
          else if (el === "2016~18년") yearinfo.push(15);
          else if (el === "2020~21년") yearinfo.push(16);
        });
      } else {
        if (rentCarYearInfo === "2014~16년") yearinfo.push(1);
        else if (rentCarYearInfo === "2015~16년") yearinfo.push(2);
        else if (rentCarYearInfo === "2015~17년") yearinfo.push(3);
        else if (rentCarYearInfo === "2015~18년") yearinfo.push(4);
        else if (rentCarYearInfo === "2017~18년") yearinfo.push(5);
        else if (rentCarYearInfo === "2018~19년") yearinfo.push(6);
        else if (rentCarYearInfo === "2017~19년") yearinfo.push(7);
        else if (rentCarYearInfo === "2018~20년") yearinfo.push(8);
        else if (rentCarYearInfo === "2019~20년") yearinfo.push(9);
        else if (rentCarYearInfo === "2019~21년") yearinfo.push(10);
        else if (rentCarYearInfo === "2020~22년") yearinfo.push(11);
        else if (rentCarYearInfo === "2021~22년") yearinfo.push(12);
        else if (rentCarYearInfo === "2022~23년") yearinfo.push(13);
        else if (rentCarYearInfo === "2016~17년") yearinfo.push(14);
        else if (rentCarYearInfo === "2016~18년") yearinfo.push(15);
        else if (rentCarYearInfo === "2020~21년") yearinfo.push(16);
      }
      params.set("rentCarYearInfo", yearinfo);
    } else if (rentCarYearInfo === "전체") {
      params.set(
        "rentCarYearInfo",
        [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16]
      );
    }
  }
  if (option) {
    if (option !== "전체") {
      let optionId = "";
      if (typeof option === "object") {
        option.forEach((el) => {
          if (el === "블루투스") optionId += "|1";
          else if (el === "후방센서") optionId += "|2";
          else if (el === "후방카메라") optionId += "|3";
          else if (el === "블랙박스") optionId += "|4";
          else if (el === "열선시트") optionId += "|5";
          else if (el === "열선핸들") optionId += "|6";
          else if (el === "통풍시트") optionId += "|7";
          else if (el === "네비게이션") optionId += "|8";
          else if (el === "금연차량") optionId += "|9";
        });
      } else {
        console.log("option is not object");
        if (option === "블루투스") optionId += "1";
        else if (option === "후방센서") optionId += "2";
        else if (option === "후방카메라") optionId += "3";
        else if (option === "블랙박스") optionId += "4";
        else if (option === "열선시트") optionId += "5";
        else if (option === "열선핸들") optionId += "6";
        else if (option === "통풍시트") optionId += "7";
        else if (option === "네비게이션") optionId += "8";
        else if (option === "금연차량") optionId += "9";
      }
      params.set("option", optionId);
    } else if (option === "전체") {
      let optionId = "1|2|3|4|5|6|7|8|9";
      params.set("option", optionId);
    }
  }
  if (pricemin && pricemax) {
    params.set("priceRange", [Number(pricemin), Number(pricemax)]);
  }
  if (bookedmin && bookedmax) {
    params.set("bookedRange", [Number(bookedmin), Number(bookedmax)]);
  }
  if (sort) {
    if (sort === "가격순") {
      params.set("sort", "price");
    } else if (sort === "예약순") {
      params.set("sort", "reserve");
    } else if (sort === "리뷰평점순") {
      params.set("sort", "reserve");
    }
  }
  return params;
};

module.exports = {
  rentCarVo,
  rentCarCompanyVo,
  getRentCarListVo,
  rentcarfiltereddataVo,
};
