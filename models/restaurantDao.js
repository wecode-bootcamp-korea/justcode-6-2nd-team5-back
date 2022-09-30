const { DataSource } = require('typeorm');

const myDataSource = new DataSource({
    type: process.env.TYPEORM_CONNECTION,
    host: process.env.TYPEORM_HOST,
    port: process.env.TYPEORM_PORT,
    username: process.env.TYPEORM_USERNAME,
    password: process.env.TYPEORM_PASSWORD,
    database: process.env.TYPEORM_DATABASE,
});

myDataSource
    .initialize()
    .then(() => {
        console.log('restaurantDao has been initialized!');
    })
    .catch(() => {
        console.log('Database initiate fail');
    });

const restaurant = async (id) => {
    const restaurant = await myDataSource.query(
        `SELECT
        restaurant.id, restaurant.name, restaurant.intro,
        restaurant.businessHour, restaurant.phoneNumber,
        restaurant.closedDay, restaurant.reviewPoint,
        regionAddress, fullAddress, googleAddress,
        JSON_ARRAYAGG(photo)as photo,
        hashTag

    FROM restaurant
    LEFT JOIN restaurantPhoto ON restaurant.id = restaurantPhoto.restaurantId
    LEFT JOIN restaurantAddress ON restaurant.id = restaurantAddress.restaurantId
    INNER JOIN (
        SELECT 
            restaurantHashTagid.restaurantId, 
            JSON_ARRAYAGG(hashTag)as hashTag 
        FROM restaurantHashTagId 
        LEFT JOIN restaurantHashTag ON restaurantHashTagid.restaurantHashTagid=restaurantHashTag.id
        GROUP BY restaurantHashTagid.restaurantId
        )as restaurantHashTag ON restaurant.id = restaurantHashTag.restaurantId
    WHERE restaurant.id in (?)
        `,
        [id]
    )
    return restaurant
}

const restaurantMenu = async (id) => {
    console.log('menuDao')
    const restaurantMenu = await myDataSource.query(
        `SELECT
        restaurantMenu.id, 
        restaurantMenu.menu, 
        restaurantMenu.price, 
        restaurantMenu.photo
    FROM restaurantMenu
    WHERE restaurantMenu.restaurantId in (?)
        `,
        [id]
    )
    return restaurantMenu
}

const restaurantList = async (category, hashtag, facility, address, sort, offset, limit) => {
    const restaurantList = await myDataSource.query(
        `SELECT
        restaurant.id, restaurant.name, restaurant.intro,
        restaurant.reviewPoint, (restaurant.reviewCount)as totalReview,
        restaurant.totalLike,
        category,
        hashTag,
        facility,
        (regionAddress)as address,
        photo
    FROM restaurant
    LEFT JOIN (
		SELECT
			restaurantphoto.restaurantId,
            photo
		FROM restaurantphoto
		GROUP BY restaurantphoto.restaurantId
    )as restaurantphoto ON restaurant.id = restaurantphoto.restaurantId
    
    INNER JOIN (
        SELECT 
            restaurantCategoryid.restaurantId, 
            JSON_ARRAYAGG(category)as category 
        FROM restaurantCategoryId 
        LEFT JOIN restaurantCategory ON restaurantCategoryid.restaurantCategoryid=restaurantCategory.id
        WHERE 1=1 AND ((('null' in (?))AND(category=category))OR(category in (?)))
        GROUP BY restaurantcategoryid.restaurantId
        )as restaurantCategory ON restaurant.id = restaurantCategory.restaurantId
        
	INNER JOIN (
        SELECT 
            restaurantHashTagid.restaurantId, 
            JSON_ARRAYAGG(hashTag)as hashTag 
        FROM restaurantHashTagId 
        LEFT JOIN restaurantHashTag ON restaurantHashTagid.restaurantHashTagid=restaurantHashTag.id
        WHERE 1=1 AND ((('null' in (?))AND(hashTag=hashTag))OR(HashTag in (?)))
        GROUP BY restaurantHashTagid.restaurantId
        )as restaurantHashTag ON restaurant.id = restaurantHashTag.restaurantId

    INNER JOIN (
        SELECT 
            restaurantFacilityid.restaurantId, 
            JSON_ARRAYAGG(Facility)as Facility
        FROM restaurantFacilityId 
        LEFT JOIN restaurantFacility ON restaurantFacilityid.restaurantFacilityid=restaurantFacility.id
        WHERE 1=1 AND ((('null' in (?))AND(facility=facility))OR(facility in (?)))
        GROUP BY restaurantFacilityid.restaurantId
        )as restaurantFacility ON restaurant.id = restaurantFacility.restaurantId        

    INNER JOIN (
        SELECT 
            restaurantAddress.restaurantId, 
            restaurantAddress.regionAddress,
            restaurantAddress.fullAddress
        FROM restaurantAddress
        WHERE 1=1 AND ((('null' in (?))AND(regionAddress=regionAddress))OR(regionAddress in (?)))
        )as restaurantAddress ON restaurant.id = restaurantAddress.restaurantId        
    
    ORDER BY CASE ? 
        WHEN '좋아요' THEN totalLike 
        WHEN '별점' THEN reviewPoint END ASC
    
    LIMIT ?,?
        `,
        [category, category, hashtag, hashtag, facility, facility, address, address, sort, offset, limit]
    )
    return restaurantList
}
const restaurantAdd = async (name, intro, businessHour, phoneNumber, closedDay) => {
    const restaurantAdd = await myDataSource.query(
        `INSERT INTO restaurant
        (name,intro,businessHour,phoneNumber,closedDay)
        VALUES(?,?,?,?,?)
        `
        [name, intro, businessHour, phoneNumber, closedDay]
    )
    return restaurantAdd
}

//특정 식당 리뷰
const restaurantReview = async (id, category) => {
    const restaurantReview = await myDataSource.query(
        `SELECT
            restaurantreview.id, restaurantreview.restaurantId, restaurantreview.category,
            restaurantreview.userId, restaurantreview.review, restaurantreview.tastePoint, restaurantreview.servicePoint,
            restaurantreview.moodPoint, restaurantreview.reviewPoint, DATE_FORMAT(created_at,'%Y-%m-%d')AS created_at,
            photo, (name)as userName
        FROM restaurantreview
        LEFT JOIN (SELECT restaurantreviewphoto.restaurantreviewid, restaurantreviewphoto.photo FROM restaurantreviewphoto GROUP BY restaurantreviewid)as restaurantreviewphoto ON restaurantreview.id=restaurantreviewphoto.restaurantreviewid
        LEFT JOIN (SELECT users.id, users.name FROM users)as users ON users.id = restaurantreview.userId
        WHERE 1=1 AND (restaurantreview.restaurantId=?) AND ((('null' in (?))AND(category=category))OR(category in (?)))
        `,
        [id, category, category]
    )
    return restaurantReview
}
//특정 식당 리뷰 쓰기
const restaurantReviewWrite = async (userId, restaurantId, category, review, tastePoint, servicePoint, moodPoint, reviewPoint) => {
    const restaurantReviewWrite = await myDataSource.query(
        `INSERT INTO restaurantReview(
            userId, restaurantId, category, review, tastePoint,
            servicePoint, moodPoint, reviewPoint
        )
        VALUES(?,?,?,?,?,?,?,?)
        `,
        [userId, restaurantId, category, review, tastePoint, servicePoint, moodPoint, reviewPoint]
    )
    return restaurantReviewWrite
}
//특정 식당 리뷰쓸때 사진추가
const restaurantReviewPhotoWrite = async (restaurantReviewId, photo) => {
    const restaurantReviewPhotoWrite = await myDataSource.query(
        `INSERT INTO restaurantReviewPhoto(restaurantReviewId,photo)
        VALUES(?,?)
        `,
        [restaurantReviewId, photo]
    )
    return restaurantReviewPhotoWrite
}
//리뷰쓸때 평균점과 리뷰갯수 입력
const restuarantaverageReviewPoint = async (averageReviewPoint, reviewCount, restaurantId) => {
    const restuarantaverageReviewPoint = await myDataSource.query(
        `UPDATE restaurant
        SET reviewPoint = ?, reviewCount = ?
        WHERE id = ?
        `,
        [averageReviewPoint, reviewCount, restaurantId]
    )
    return restuarantaverageReviewPoint
}
//리뷰삭제
const restuarantReviewDelete = async (reviewId, userId) => {
    const restuarantReviewDelete = await myDataSource.query(
        `DELETE FROM restaurantReview
        WHERE id = ? AND userId = userId`,
        [reviewId, userId]
    )
    return restuarantReviewDelete
}


//좋아요 불러오기
const restaurantLike = async (restaurantId) => {
    const restaurantLike = await myDataSource.query(
        `SELECT
            restaurantLike.id
        FROM restaurantLike
        WHERE restaurantLike.restaurantId=?
        `,
        [restaurantId]
    )
    return restaurantLike
}
//좋아요 총갯수 넣기
const restuarantTotalLike = async (totalLike, restaurantId) => {
    const restuarantTotalLike = await myDataSource.query(
        `UPDATE restaurant
        SET totalLike = ?
        WHERE id = ?
        `,
        [totalLike, restaurantId]
    )
    return restuarantTotalLike
}
const restaurantLikeInsert = async (userId, restaurantId) => {
    const restaurantLikeInsert = await myDataSource.query(
        `INSERT INTO restaurantLike(userId, restaurantId)
        VALUES(?,?)
        `,
        [userId, restaurantId]
    )
    return restaurantLikeInsert
}

const restaurantBookMarkInsert = async (userId, restaurantId) => {
    const restaurantBookMarkInsert = await myDataSource.query(
        `INSERT INTO restaurantBookMark(userId, restaurantId)
        VALUES(?,?)
        `,
        [userId, restaurantId]
    )
    return restaurantBookMarkInsert
}

const restaurantTotalInsert = async (
    name, intro, businessHour, phoneNumber, closedDay,
    facility, hashtag, category,
    regionAddress, fullAddress, googleAddress,
    photo) => {

    const restaurantInsert = await myDataSource.query(
        `INSERT INTO restaurant(name, intro, businessHour, phoneNumber, closedDay, reviewPoint, totalLike, reviewCount)
        VALUES(?,?,?,?,?,?,?,?)
        `,
        [name, intro, businessHour, phoneNumber, closedDay,2.5,0,0]
    )
    const restaurantIdCheck = await myDataSource.query(
        `SELECT * FROM restaurant
        WHERE name=? AND intro=? AND businessHour=? AND phoneNumber=? AND closedDay=?
        `,
        [name, intro, businessHour, phoneNumber, closedDay]
    )
    const id = restaurantIdCheck[0].id

    for (let i = 0; i < facility.length; i++) {
        var restaurantFacilityInsert = await myDataSource.query(
            `INSERT INTO restaurantFacilityId(restaurantId, restaurantFacilityId)
            VALUES(?,?)
            `,
            [id, facility[i]]
        )
    }
    for (let i = 0; i < hashtag.length; i++) {
        var restaurantHashTagInsert = await myDataSource.query(
            `INSERT INTO restaurantHashTagId(restaurantId, restaurantHashTagId)
            VALUES(?, ?)
            `,
            [id, hashtag[i]]
        )
    }
    for (let i = 0; i < category.length; i++) {
        var restaurantcategoryInsert = await myDataSource.query(
            `INSERT INTO restaurantcategoryId(restaurantId, restaurantcategoryId)
            VALUES(?, ?)
            `,
            [id, category[i]]
        )
    }
    const restaurantAddressInsert = await myDataSource.query(
        `INSERT INTO restaurantAddress(restaurantId, regionAddress, fullAddress, googleAddress)
        VALUES(?,?,?,?)
        `,
        [id, regionAddress, fullAddress, googleAddress]
    )

    const restaurantPhotoInsert = await myDataSource.query(
        `INSERT INTO restaurantPhoto(restaurantId, photo)
                VALUES(?,?)
                `,
        [id, photo]
    )

    return
}

const restaurantMenuInsert = async (restaurantId, menu, photo, price) => {
    const restaurantMenuInsert = await myDataSource.query(
        `INSERT INTO restaurantMenu(restaurantId, menu, photo, price)
        VALUES(?,?,?,?)
        `,
        [restaurantId, menu, photo, price]
    )
    return
}


module.exports = {
    restaurant,
    restaurantMenu,
    restaurantList,
    restaurantAdd,
    restaurantReview,
    restaurantReviewWrite,
    restaurantReviewPhotoWrite,
    restuarantaverageReviewPoint,
    restuarantReviewDelete,
    restaurantLike,
    restuarantTotalLike,
    restaurantLikeInsert,
    restaurantBookMarkInsert,
    restaurantTotalInsert,
    restaurantMenuInsert,
};