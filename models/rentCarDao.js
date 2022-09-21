const { myDataSource } = require("./typeorm-client.js");

const registeRentCar = async (params) => {
  await myDataSource.query(
    `
  INSERT INTO rentCarInfo (carName, carPhoto, ridePeopleNumber, oilType) VALUES (?,?,?,?);
  `,
    [
      params.get("carName"),
      params.get("carPhoto"),
      params.get("ridePeopleNumber"),
      params.get("oilType"),
    ]
  );
};

const registeRentCarCompany = async (params) => {
  await myDataSource.query(
    `
    INSERT INTO rentCarCompany (rentCarCompany, rentCarCompanyAddress) VALUES (?, ?);
    `,
    [params.get("rentCarCompany"), params.get("rentCarCompanyAddress")]
  );
};

const getRentCarList = async (params) => {
  let query = `
    SELECT 
      rentCarInfo.id AS carId,
      rentCarInfo.carName,
      rentCarInfo.carphoto AS carPhoto,
      rentCarInfo.ridePeopleNumber,
      rentCarInfo.oilType,
      (
        SELECT 
          JSON_ARRAYAGG(
            JSON_OBJECT(
              "optionName", rentCarOption.option,
              "optionId", rentCarOption.id
              )
            ) AS options
            FROM rentCompanyCar
            JOIN rentCarOptionId ON rentCarInfo.id = rentCarOptionId.rentCarId
            JOIN rentCarOption ON rentCarOptionId.optionId = rentCarOption.id
            WHERE rentCompanyCar.id = rentCarInfo.id
          ) AS options,
      (
        SELECT
          JSON_ARRAYAGG(
            JSON_OBJECT(
              "CompanyId", rentCarCompany.id,
              "CompanyName", rentCarCompany.rentCarCompany,
              "TotalReserve", rentCompanyCar.totalReserve,
              "ReviewPoint", rentCompanyCar.reviewPoint,
              "Experience", rentCarDriveExperience.experience,
              "Age", rentCarDriveAge.age,
              "Insurance", rentCarDriveInsurance.insurance,
              "Price", rentCarPrice.price,
              "rentCarYearInfo", rentCompanyCar.rentCarYearInfo
              )
            ) AS rentCarCompany
            FROM rentCarCompany
            JOIN rentCompanyCar ON rentCarCompany.id = rentCompanyCar.rentCarCompanyId
            JOIN rentCarPrice ON rentCompanyCar.id = rentCarPrice.rentCarCompanyId
            JOIN rentCarDriveExperience ON rentCarPrice.experienceId = rentCarDriveExperience.id
            JOIN rentCarDriveAge ON rentCarPrice.ageId = rentCarDriveAge.id
            JOIN rentCarDriveInsurance ON rentCarPrice.insuranceId = rentCarDriveInsurance.id
            WHERE rentCarInfo.id = rentCompanyCar.rentCarInfoId AND rentCarPrice.insuranceId = ? AND rentCarPrice.experienceId = ? AND rentCarPrice.ageId = ? `;

  let param = [];
  param.push(params.get("insurance"));
  param.push(params.get("experience"));
  param.push(params.get("age"));

  if (params.get("startPrice") && params.get("endPrice")) {
    query += `AND rentCarPrice.price BETWEEN ? AND ? `;
    param.push(params.get("startPrice"), params.get("endPrice"));
  }

  if (params.get("rentCarYearInfo")) {
    let yearArr = params.get("rentCarYearInfo").split(",");
    yearArr.forEach((el) => String(el));
    query += `AND rentCompanyCar.rentCarYearInfo IN (?) `;
    param.push(yearArr);
  }

  query += `) AS rentCarCompany
      FROM rentCarInfo 
      JOIN rentCarOptionId ON rentCarOptionId.rentCarId = rentCarInfo.id
      JOIN rentCompanyCar ON rentCompanyCar.rentCarInfoId = rentCarInfo.id
      JOIN rentCarPrice ON rentCarPrice.rentCarCompanyId = rentCompanyCar.id
      JOIN rentCarCompany ON rentCarCompany.id = rentCompanyCar.rentCarCompanyid
      JOIN rentCarOption ON rentCarOption.id = rentCarOptionId.optionId
      JOIN rentCarDriveExperience ON rentCarDriveExperience.id = rentCarPrice.experienceId
      JOIN rentCarDriveAge ON rentCarDriveAge.id = rentCarPrice.ageId
      JOIN rentCardriveInsurance ON rentCardriveInsurance.id = rentCarPrice.insuranceId
      WHERE rentCarPrice.insuranceId = ? AND rentCarPrice.experienceId = ? AND rentCarPrice.ageId = ?
  `;
  param.push(params.get("insurance"));
  param.push(params.get("experience"));
  param.push(params.get("age"));

  // if (params.get("rentCarYearInfo")) {
  //   let yearArr = params.get("rentCarYearInfo").split(",");
  //   yearArr.forEach((el) => String(el));
  //   query += `AND rentCompanyCar.rentCarYearInfo IN (?) `;
  //   param.push(yearArr);
  // }

  if (params.get("option")) {
    let optionArr = params.get("option").split(",");
    optionArr.forEach((el) => Number(el));
    query += "AND rentCarOptionId.optionId IN (?) ";
    param.push(optionArr);
  }
  const carList = await myDataSource.query(
    query + `GROUP BY rentCarInfo.id ORDER BY carId;`,
    param
  );

  return carList;
};

const getRentCar = async () => {
  const data = await myDataSource.query(
    `
  select rentcarinfo.id, rentcarinfo.carType, rentcarinfo.carPhoto, rentcarinfo.Intro, rentcarprice.price
	from (select rentcarinfo.carType, min(rentcarprice.price) as minprice
		from rentcarinfo
		join rentcompanycar on rentcarinfo.id = rentcompanycar.rentCarInfoId
		join rentcarprice on rentcompanycar.id = rentcarprice.rentCarCompanyId
		group by rentcarinfo.carType) as car 
			inner join rentcarinfo on rentcarinfo.carType = car.carType
            inner join rentcompanycar on rentcompanycar.rentCarInfoId = rentcarinfo.id
            inner join rentcarprice on rentcarprice.rentCarCompanyId = rentCompanyCar.id
            where rentcarprice.price = car.minprice order by rentcarprice.price;
  `
  );
  return data;
};

module.exports = {
  registeRentCar,
  registeRentCarCompany,
  getRentCarList,
  getRentCar,
};
