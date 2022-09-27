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

const getRentCar = async () => {
  const data = await myDataSource.query(
    `
    select rentcompanycar.id rentCompanyCarId, minpricebytype.carType, rentcarinfo.carPhoto, rentcarinfo.intro, minpricebytype.minprice as price
    from (select any_value(rentcompanycar.id) as rentCompanyCarId, rentcarinfo.carType, min(rentcarprice.price) as minprice
        from rentcarinfo
        join rentcompanycar on rentcarinfo.id = rentcompanycar.rentCarInfoId
        join rentcarprice on rentcompanycar.id = rentcarprice.rentCompanyCarId
        group by rentcarinfo.carType) as minpricebytype
              join rentcompanycar on rentcompanycar.id = minpricebytype.rentCompanyCarId
              join rentcarinfo on rentcarinfo.id = rentcompanycar.rentCarInfoId
              order by price;
  `
  );
  return data;
};

const test = async (params) => {
  console.log(params);

  const testdata = await myDataSource.query(
    `
    with a as(
      select rentcarinfo.id, rentcarinfo.carname, rentcarinfo.carPhoto, rentcarinfo.ridePeopleNumber, rentcarinfo.oilType
        from rentcarinfo
    ),
    b as(
      select rentcarinfo.id,
        json_arrayagg(
          json_object(
            "rentCompanyCarId",rentcarprice.rentcompanycarId, 
            "totalReview",rentcompanycar.totalreview, 
            "reviewPoint",rentcompanycar.reviewpoint, 
            "totalReverve",rentcompanycar.totalreserve, 
            "companyName",rentcarcompany.rentcarcompany, 
            "rentCarYear",rentcaryearinfo.yearinfo, 
            "insurance",rentcardriveinsurance.insurance, 
            "driverAge",rentcardriveage.age, 
            "driverExperience",rentcardriveexperience.experience, 
            "price",rentcarprice.price
          )
        ) companyandprice

        from rentcompanycar

        left join rentcarinfo on rentcompanycar.rentcarinfoid = rentcarinfo.id
        left join rentcarprice on rentcompanycar.id = rentcarprice.rentcompanycarid
        left join rentcarcompany on rentcompanycar.rentcarcompanyid = rentcarcompany.id
        left join rentcardriveage on rentcarprice.ageId = rentcardriveage.id
        left join rentcardriveexperience on rentcarprice.experienceId = rentcardriveexperience.id
        left join rentcardriveinsurance on rentcarprice.insuranceId = rentcardriveinsurance.id
        left join rentcaryearinfo on rentcompanycar.rentcaryearinfo = rentcaryearinfo.id

        where rentcarprice.insuranceid = ? and rentcarprice.ageid in (?) and rentcarprice.experienceid in (?) and rentcarinfo.carType in (?)
        group by rentcarinfo.id
    ),

    c as(
      select rentcarinfo.id, rentcarprice.options
        from rentcarprice
        left join rentcompanycar on rentcarprice.rentcompanycarid = rentcompanycar.id
        left join rentcarinfo on rentcompanycar.rentcarinfoid = rentcarinfo.id
        left join rentcardriveage on rentcarprice.ageId = rentcardriveage.id
        left join rentcardriveexperience on rentcarprice.experienceId = rentcardriveexperience.id
        left join rentcardriveinsurance on rentcarprice.insuranceId = rentcardriveinsurance.id
        left join rentcaryearinfo on rentcompanycar.rentcaryearinfo = rentcaryearinfo.id
        where rentcarprice.insuranceid = ? and rentcarprice.ageid in (?) and rentcarprice.experienceid in (?) and rentcarinfo.carType in (?)
    ),

    d as(
      select 
        json_object(
          'id', 0,
          'type', '가격 범위',
          'slideList', json_array(min(rentcarprice.price), max(rentcarprice.price)) 
        ) as filterPrice
      from rentcarprice
      left join rentcompanycar on rentcarprice.rentcompanycarid = rentcompanycar.id
      left join rentcarinfo on rentcompanycar.rentcarinfoid = rentcarinfo.id
      where rentcarprice.insuranceid = ? and rentcarprice.ageid in (?) and rentcarprice.experienceid in (?) and rentcarinfo.carType in (?) 
    ),

    e as(
      select json_object(
        'id', 1,
        'type', '연식',
        'checkList', json_arrayagg(rentcaryearinfo.yearinfo) ) as filterYear
        from rentcaryearinfo
    ),
    
    f as(
      select json_object(
        'id', 2,
        'type', '옵션',
        'checkList', json_arrayagg(rentcaroption.optionname) ) as filterOption
        from rentcaroption
    ),

    g as(
      select json_object(
        'id', 3,
        'type', '누적예약',
        'slideList', json_array(min(rentcompanycar.totalReserve), max(rentcompanycar.totalReserve))) as filterReserve
        from rentcompanycar
        join rentcarprice on rentcompanycar.id = rentcarprice.rentcompanycarId
        join rentcarinfo on rentcompanycar.rentcarinfoid = rentcarinfo.id
        where rentcarprice.insuranceid = ? and rentcarprice.ageid in (?) and rentcarprice.experienceid in (?) and rentcarinfo.carType in (?)
    ),

    h as(
      select distinct carList.carname, carList.carphoto, carList.ridepeoplenumber, carList.oiltype, carList.companyandprice, carList.options
        from (select a.carname, a.carphoto, a.ridepeoplenumber, a.oiltype, b.companyandprice, c.options from a join b on a.id = b.id join c on a.id = c.id) as carList
    ),

    i as(
      select json_array(filterList.filterPrice, filterList.filterYear, filterList.filterOption, filterList.filterReserve) filterTypes
      from (select d.filterPrice, e.filterYear, f.filterOption, g.filterReserve from d join e join f join g) as filterList
    )
    
    select i.filterTypes, json_arrayagg(json_object("carName",h.carname,"carPhoto", h.carphoto, "ridePeopleNumber",h.ridepeoplenumber, "oilType",h.oiltype, "rentCarCompanyList",h.companyandprice, "option",h.options)) carList
      from h
      join i
      group by i.filterTypes;
    `,
    [
      params.get("insurance"),
      params.get("age"),
      params.get("experience"),
      params.get("carType"),
      params.get("insurance"),
      params.get("age"),
      params.get("experience"),
      params.get("carType"),
      params.get("insurance"),
      params.get("age"),
      params.get("experience"),
      params.get("carType"),
      params.get("insurance"),
      params.get("age"),
      params.get("experience"),
      params.get("carType"),
    ]
  );
  return testdata;
};

const rentcarfiltereddata = async (params) => {
  let param = [];
  let query = `with a as(
    select rentcarinfo.id, rentcarinfo.carname, rentcarinfo.carPhoto, rentcarinfo.ridePeopleNumber, rentcarinfo.oilType
      from rentcarinfo
  ),
  b as(
    select rentcarinfo.id, min(rentcarprice.price) minprice, max(rentcompanycar.totalReserve) maxreserve, max(rentcompanycar.reviewPoint) maxreview,
      json_arrayagg(
        json_object(
          "rentCompanyCarId",rentcarprice.rentcompanycarId, 
          "totalReview",rentcompanycar.totalreview, 
          "reviewPoint",rentcompanycar.reviewpoint, 
          "totalReverve",rentcompanycar.totalreserve, 
          "companyName",rentcarcompany.rentcarcompany, 
          "rentCarYear",rentcaryearinfo.yearinfo, 
          "insurance",rentcardriveinsurance.insurance, 
          "driverAge",rentcardriveage.age, 
          "driverExperience",rentcardriveexperience.experience, 
          "price",rentcarprice.price
        )
      ) companyandprice

      from rentcompanycar

      left join rentcarinfo on rentcompanycar.rentcarinfoid = rentcarinfo.id
      left join rentcarprice on rentcompanycar.id = rentcarprice.rentcompanycarid
      left join rentcarcompany on rentcompanycar.rentcarcompanyid = rentcarcompany.id
      left join rentcardriveage on rentcarprice.ageId = rentcardriveage.id
      left join rentcardriveexperience on rentcarprice.experienceId = rentcardriveexperience.id
      left join rentcardriveinsurance on rentcarprice.insuranceId = rentcardriveinsurance.id
      left join rentcaryearinfo on rentcompanycar.rentcaryearinfo = rentcaryearinfo.id
      
      where rentcarprice.insuranceid = ? and rentcarprice.ageid in (?) and rentcarprice.experienceid in (?) and rentcarinfo.carType in (?)`;

  param.push(
    params.get("insurance"),
    params.get("age"),
    params.get("experience"),
    params.get("carType")
  );

  if (params.get("priceRange")) {
    query += ` and rentcarprice.price between ? and ?`;
    param.push(params.get("priceRange")[0], params.get("priceRange")[1]);
  }

  if (params.get("option")) {
    query += ` and rentcarprice.options regexp ?`;
    param.push(params.get("option"));
  }

  if (params.get("rentCarYearInfo")) {
    query += ` and rentcompanycar.rentcaryearinfo in (?)`;
    param.push(params.get("rentCarYearInfo"));
  }

  if (params.get("bookedRange")) {
    query += ` and rentcompanycar.totalreserve between ? and ?`;
    param.push(params.get("bookedRange")[0], params.get("bookedRange")[1]);
  }
  query += `
  group by rentcarinfo.id
  `;

  query += `),
  c as(
    select rentcarinfo.id, rentcarprice.options
      from rentcarprice
      left join rentcompanycar on rentcarprice.rentcompanycarid = rentcompanycar.id
      left join rentcarinfo on rentcompanycar.rentcarinfoid = rentcarinfo.id
      left join rentcardriveage on rentcarprice.ageId = rentcardriveage.id
      left join rentcardriveexperience on rentcarprice.experienceId = rentcardriveexperience.id
      left join rentcardriveinsurance on rentcarprice.insuranceId = rentcardriveinsurance.id
      left join rentcaryearinfo on rentcompanycar.rentcaryearinfo = rentcaryearinfo.id
      where rentcarprice.insuranceid = ? and rentcarprice.ageid in (?) and rentcarprice.experienceid in (?) and rentcarinfo.carType in (?)`;
  param.push(
    params.get("insurance"),
    params.get("age"),
    params.get("experience"),
    params.get("carType")
  );

  if (params.get("priceRange")) {
    query += ` and rentcarprice.price between ? and ?`;
    param.push(params.get("priceRange")[0], params.get("priceRange")[1]);
  }

  if (params.get("option")) {
    query += ` and rentcarprice.options regexp ?`;
    param.push(params.get("option"));
  }

  if (params.get("rentCarYearInfo")) {
    query += ` and rentcompanycar.rentcaryearinfo in (?)`;
    param.push(params.get("rentCarYearInfo"));
  }

  if (params.get("bookedRange")) {
    query += ` and rentcompanycar.totalreserve between ? and ?`;
    param.push(params.get("bookedRange")[0], params.get("bookedRange")[1]);
  }

  query += `),
  h as(
    select distinct carList.carname, carList.carphoto, carList.ridepeoplenumber, carList.oiltype, carList.companyandprice, carList.options, carList.minprice, carList.maxreview, carList.maxreserve
      from (select a.carname, a.carphoto, a.ridepeoplenumber, a.oiltype, b.companyandprice, c.options, b.minprice, b.maxreserve, b.maxreview from a join b on a.id = b.id join c on a.id = c.id) as carList
      
  )
  select json_arrayagg(json_object("carName",h.carname,"carPhoto", h.carphoto, "ridePeopleNumber",h.ridepeoplenumber, "oilType",h.oiltype, "rentCarCompanyList",h.companyandprice, "option",h.options)) carList
  from h;
  `;
  const filtereddata = await myDataSource.query(query, param);
  return filtereddata;
};

const rentcarReview = async (
  userId,
  rentcarId,
  review,
  reviewPhoto,
  kindPoint,
  cleanPoint,
  conveniencePoint,
  newreviewpoint
) => {
  await myDataSource.query(
    `
      insert into rentedcarreview (userId, rentcarid, review, reviewPhoto, kindPoint, cleanPoint, conveniencePoint, reviewPoint)
        values(?,?,?,?,?,?,?,?);
    `,
    [
      userId,
      rentcarId,
      review,
      reviewPhoto,
      kindPoint,
      cleanPoint,
      conveniencePoint,
      newreviewpoint,
    ]
  );
  const point = await myDataSource.query(
    `
      select
        sum(rentedcarreview.reviewPoint) reviewpoint , count(rentedcarreview.rentcarid) totalreview
        from rentedcarreview
        join rentcompanycar on rentcompanycar.id = rentedcarreview.rentcarid
        where rentcompanycar.id = ?;
    `,
    [rentcarId]
  );

  console.log("total point: ", point[0].reviewpoint);
  console.log("total review count: ", point[0].totalreview);

  console.log(point[0].reviewpoint);
  await myDataSource.query(
    `
      update rentcompanycar set reviewPoint = ?, totalReview = ? where id = ?;
    `,
    [
      point[0].reviewpoint / point[0].totalreview,
      point[0].totalreview,
      rentcarId,
    ]
  );
  // data.insertId;
};

const rentcarReviewDelete = async (userId, reviewid) => {
  const correctUser = await myDataSource.query(
    `
      select exists (select * from rentedcarreview where userid = ? and id = ?) as success;
    `,
    [userId, reviewid]
  );
  if (correctUser[0].success === "0") {
    const err = new Error("리뷰 작성자가 아닙니다!");
    err.status = 404;
    throw err;
  }
  const rentcarId = await myDataSource.query(
    `
      select rentcarid from rentedcarreview where id = ?;
    `,
    [reviewid]
  );
  console.log(rentcarId[0].rentcarid);
  await myDataSource.query(
    `
      delete from rentedcarreview where id = ?;
    `,
    [reviewid]
  );

  const point = await myDataSource.query(
    `
      select
        sum(rentedcarreview.reviewPoint) reviewpoint , count(rentedcarreview.rentcarid) totalreview
        from rentedcarreview
        join rentcompanycar on rentcompanycar.id = rentedcarreview.rentcarid
        where rentcompanycar.id = ?;
    `,
    [rentcarId[0].rentcarid]
  );

  console.log("total point: ", point[0].reviewpoint);
  console.log("total review count: ", point[0].totalreview);

  console.log(point[0].reviewpoint);
  await myDataSource.query(
    `
      update rentcompanycar set reviewPoint = ?, totalReview = ? where id = ?;
    `,
    [
      point[0].reviewpoint / point[0].totalreview,
      point[0].totalreview,
      rentcarId[0].rentcarid,
    ]
  );
};

const getRentCarDetail = async (rentCompanyCarId) => {
  const rentcarDetail = await myDataSource.query(
    `
      with review as(
        select 
        rentcompanycar.id,
        json_arrayagg( json_object("reviewId",rentedcarreview.id, "userName", users.name, "userPhoto",users.profileImg, "review", rentedcarreview.review, "reviewPhoto", rentedcarreview.reviewphoto, "reviewPoint", rentedcarreview.reviewpoint, "created_at", rentedcarreview.created_at) ) reviewList
          from rentcompanycar
          left join rentedcarreview on rentcompanycar.id = rentedcarreview.rentcarid
          left join users on rentedcarreview.userid = users.id
          left join rentcarprice on rentcompanycar.id = rentcarprice.rentcompanycarid
          where rentcarprice.id = ?
      )
      select 
        rentcarinfo.carName, rentcarinfo.carPhoto, rentcarinfo.ridePeopleNumber, rentcarinfo.oilType, rentcaryearinfo.yearinfo,
        rentcardriveexperience.experience, rentcardriveage.age, rentcardriveinsurance.insurance, rentcarprice.price, rentcarprice.options,
        rentcarcompany.rentCarCompany, rentcarcompany.rentCarCompanyAddress, rentcarcompany.rentCarCompanyPhoneNumber, rentcarcompany.mapaddress,
        rentcarcompany.rentPlace, rentcarcompany.shuttlePlace, rentcarcompany.shuttleSchedule, rentcarcompany.shuttleInterval, rentcarcompany.shuttleRequiredTime,
        review.reviewList

        from rentcompanycar
        left join rentedcarreview on rentcompanycar.id = rentedcarreview.rentcarid
        left join rentcarinfo on rentcompanycar.rentcarinfoid = rentcarinfo.id
        left join rentcarcompany on rentcompanycar.rentcarcompanyid = rentcarcompany.id
        left join rentcarprice on rentcompanycar.id = rentcarprice.rentcompanycarid
        left join rentcardriveexperience on rentcarprice.experienceid = rentcardriveexperience.id
        left join rentcardriveage on rentcarprice.ageid = rentcardriveage.id
        left join rentcardriveinsurance on rentcarprice.insuranceid = rentcardriveinsurance.id
        left join rentcaryearinfo on rentcompanycar.rentcaryearinfo = rentcaryearinfo.id
        left join users on rentedcarreview.userId = users.id
        left join review on rentcompanycar.id = review.id
        where rentcarprice.id = ?
        group by review.reviewList, rentcarinfo.carname, rentcarinfo.carphoto, rentcarinfo.ridePeopleNumber, rentcarinfo.oilType, rentcompanycar.rentcaryearinfo, rentcardriveexperience.experience, rentcardriveage.age, rentcardriveinsurance.insurance, rentcarprice.price, rentcarprice.options, rentcarcompany.rentCarCompany, rentcarcompany.rentCarCompanyAddress, rentcarcompany.rentCarCompanyPhoneNumber;
    `,
    [rentCompanyCarId, rentCompanyCarId]
  );
  return rentcarDetail;
};

module.exports = {
  registeRentCar,
  registeRentCarCompany,
  getRentCar,
  test,
  rentcarReview,
  getRentCarDetail,
  rentcarfiltereddata,
  rentcarReviewDelete,
};
