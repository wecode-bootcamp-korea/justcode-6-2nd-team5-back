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
        console.log('lodgmentDao has been initialized!');
    })
    .catch(() => {
        console.log('Database initiate fail');
    });

//숙박업소 리스트
const lodgmentList = async (tag, hashtag, facility, address, startDate, endDate, peopleNumber, starPoint, reviewPoint, sort, offset, limit) => {
    const lodgmentList = await myDataSource.query(
        `SELECT 
            lodgment.id, lodgment.name, lodgment.intro, lodgment.phoneNumber, 
            lodgment.reviewPoint, lodgment.totalLike, lodgment.starPoint,
            price,
            (regionAddress)as address,
            tag,hashTag,facility,
            photo,
            peopleNumber
        FROM lodgment
        
        LEFT JOIN (
            SELECT 
                lodgmentRoom.price,
			    lodgmentroom.lodgmentId
			FROM lodgmentRoom
			ORDER BY price asc
			limit 1
            )as lodgmentroom ON lodgment.id = lodgmentroom.lodgmentId
        
        LEFT JOIN (
            SELECT
                lodgmentphoto.lodgmentId,
                JSON_ARRAYAGG(photo)as photo
            FROM lodgmentphoto
            GROUP BY lodgmentphoto.lodgmentId
        )as lodgmentphoto ON lodgment.id = lodgmentphoto.lodgmentId

        INNER JOIN (
            SELECT 
                lodgmenttagid.lodgmentId, 
                JSON_ARRAYAGG(tag)as tag 
            FROM lodgmenttagId 
            LEFT JOIN lodgmenttag ON lodgmenttagid.lodgmenttagid=lodgmenttag.id
            WHERE 1=1 AND ((('null' in (?))AND(tag=tag))OR(tag in (?)))
            GROUP BY lodgmenttagid.lodgmentId
            )as lodgmenttag ON lodgment.id = lodgmenttag.lodgmentId
            
        INNER JOIN (
            SELECT 
                lodgmentHashTagid.lodgmentId, 
                JSON_ARRAYAGG(hashTag)as hashTag 
            FROM lodgmentHashTagId 
            LEFT JOIN lodgmentHashTag ON lodgmentHashTagid.lodgmentHashTagid=lodgmentHashTag.id
            WHERE 1=1 AND ((('null' in (?))AND(hashTag=hashTag))OR(HashTag in (?)))
            GROUP BY lodgmentHashTagid.lodgmentId
            )as lodgmentHashTag ON lodgment.id = lodgmentHashTag.lodgmentId
    
        INNER JOIN (
            SELECT 
                lodgmentFacilityid.lodgmentId, 
                JSON_ARRAYAGG(Facility)as Facility
            FROM lodgmentFacilityId 
            LEFT JOIN lodgmentFacility ON lodgmentFacilityid.lodgmentFacilityid=lodgmentFacility.id
            WHERE 1=1 AND ((('null' in (?))AND(facility=facility))OR(facility in (?)))
            GROUP BY lodgmentFacilityid.lodgmentId
            )as lodgmentFacility ON lodgment.id = lodgmentFacility.lodgmentId        
    
        INNER JOIN (
            SELECT 
                lodgmentAddress.lodgmentId,
                lodgmentAddress.regionAddress,
                lodgmentAddress.fullAddress
            FROM lodgmentAddress
            WHERE 1=1 AND ((('null' in (?))AND(fullAddress=fullAddress))OR(fullAddress in (?)))
            )as lodgmentAddress ON lodgment.id = lodgmentAddress.lodgmentId

        INNER JOIN (
            SELECT 
                lodgmentroom.lodgmentId,
                rentedDate,
                JSON_ARRAYAGG(peopleNumber)as peopleNumber
            FROM lodgmentroom
            LEFT JOIN (
			    SELECT 
                    lodgmentroomrenteddate.roomId,
                    JSON_ARRAYAGG(rentedDate)as rentedDate
                FROM lodgmentroomrenteddate
                GROUP BY lodgmentroomrenteddate.roomId
                )as lodgmentroomrenteddate ON lodgmentroom.id = lodgmentroomrenteddate.roomId
		    WHERE 1=1 AND (rentedDate NOT LIKE ? OR ?) AND ((('null' in (?))AND(peopleNumber=peopleNumber))OR(peopleNumber in (?)))
            GROUP BY lodgmentroom.lodgmentId
            )as lodgmentrooms ON lodgment.id = lodgmentrooms.lodgmentId

        WHERE 1=1 
            AND ((('null' in (?))AND(starPoint=starPoint))OR(starPoint in (?)))
            AND ((('null' in (?))AND(reviewPoint=reviewPoint))OR(reviewPoint in (?)))

        GROUP BY lodgment.id  

        ORDER BY 
            CASE ? 
                WHEN '좋아요' THEN totalLike 
                WHEN '별점' THEN reviewPoint
                WHEN '성급' THEN starPoint
                WHEN '고가' THEN price END DESC,
            CASE ?
                WHEN '저가' THEN price END ASC

        LIMIT ?,?
        `,
        [tag, tag, hashtag, hashtag, facility, facility, address, address, startDate, endDate, peopleNumber, peopleNumber, starPoint, starPoint, reviewPoint, reviewPoint, sort, sort, offset, limit]
    )

    return lodgmentList
}

//특정 숙박업소
const lodgment = async (id) => {
    const lodgment = await myDataSource.query(
        `SELECT 
            lodgment.id, lodgment.name, lodgment.intro, lodgment.phoneNumber, lodgment.reviewPoint, lodgment.useInfo,
            bigAddress, regionAddress, fullAddress, googleAddress,
            JSON_ARRAYAGG(photo)as photo,
            facility, hashTag, tag
        FROM lodgment
        LEFT JOIN lodgmentaddress ON lodgment.id = lodgmentaddress.lodgmentId
        LEFT JOIN lodgmentphoto ON lodgment.id = lodgmentphoto.lodgmentId
        LEFT JOIN (SELECT lodgmentfacilityid.lodgmentId, JSON_ARRAYAGG(facility)as facility FROM lodgmentfacilityid LEFT JOIN lodgmentFacility ON lodgmentfacilityid.lodgmentfacilityid=lodgmentfacility.id GROUP BY lodgmentfacilityid.lodgmentId)as lodgmentfacility ON lodgment.id = lodgmentfacility.lodgmentId
        LEFT JOIN (SELECT lodgmenthashtagid.lodgmentId, JSON_ARRAYAGG(hashTag)as hashTag FROM lodgmentHashTagId LEFT JOIN lodgmentHashTag ON lodgmentHashTagid.lodgmentHashTagid=lodgmenthashtag.id GROUP BY lodgmenthashtagid.lodgmentId)as lodgmenthashtag ON lodgment.id = lodgmenthashtag.lodgmentId
        LEFT JOIN (SELECT lodgmenttagid.lodgmentId, JSON_ARRAYAGG(tag)as tag FROM lodgmentTagId LEFT JOIN lodgmentTag ON lodgmenttagid.lodgmenttagid=lodgmenttag.id GROUP BY lodgmenttagid.lodgmentId)as lodgmenttag ON lodgment.id = lodgmenttag.lodgmentId       
        WHERE lodgment.id in (?)
        `,
        [id]
    );
    return lodgment
}
//특정 숙박업소 방
const lodgmentRoom = async (id) => {
    const lodgmentRoom = await myDataSource.query(
        `SELECT 
            lodgmentroom.id, 
            lodgmentroom.lodgmentId, 
            lodgmentroom.roomName, 
            lodgmentroom.peopleNumber, 
            lodgmentroom.smoking, 
            lodgmentroom.bedInfo, 
            lodgmentroom.price,
            photo
        FROM lodgmentroom
        LEFT JOIN (SELECT lodgmentroomphoto.lodgmentroomid, JSON_ARRAYAGG(lodgmentroomphoto.photo)as photo FROM lodgmentroomphoto GROUP BY lodgmentroomid)as lodgmentroomphoto ON lodgmentroom.id=lodgmentroomphoto.lodgmentroomid
        WHERE lodgmentroom.lodgmentId=?
        `,
        [id]
    )
    return lodgmentRoom
}
//특정 숙박업소 리뷰
const lodgmentReview = async (id, category) => {
    const lodgmentReview = await myDataSource.query(
        `SELECT
            lodgmentreview.id, lodgmentreview.lodgmentId, lodgmentreview.userId, lodgmentreview.category, lodgmentreview.review, lodgmentreview.cleanPoint, lodgmentreview.facilityPoint,
            lodgmentreview.servicePoint, lodgmentreview.costperformancePoint, lodgmentreview.reviewPoint, DATE_FORMAT(created_at,'%Y-%m-%d')AS created_att,
            photo
        FROM lodgmentreview
        LEFT JOIN (SELECT lodgmentreviewphoto.lodgmentreviewid, lodgmentreviewphoto.photo FROM lodgmentreviewphoto GROUP BY lodgmentreviewid)as lodgmentreviewphoto ON lodgmentreview.id=lodgmentreviewphoto.lodgmentreviewid
        LEFT JOIN (SELECT users.id, users.name FROM users)as users ON users.id = lodgmentreview.userId
        WHERE 1=1 AND (lodgmentreview.lodgmentId=?) AND ((('null' in (?))AND(category=category))OR(category in (?)))
        `,
        [id, category, category]
    )
    return lodgmentReview
}
//특정 숙박업소 리뷰 쓰기
const lodgmentReviewWrite = async (userId, lodgmentId, category, review, cleanPoint, facilityPoint, servicePoint, costperformancePoint, reviewPoint) => {
    const lodgmentReviewWrite = await myDataSource.query(
        `INSERT INTO lodgmentReview(
            userId, lodgmentId, category, review, cleanPoint,
            facilityPoint, servicePoint, costperformancePoint,
            reviewPoint
        )
        VALUES(?,?,?,?,?,?,?,?,?)
        `,
        [userId, lodgmentId, category, review, cleanPoint, facilityPoint, servicePoint, costperformancePoint, reviewPoint]
    )
    return lodgmentReviewWrite
}
//특정 숙박업소 리뷰쓸때 사진추가
const lodgmentReviewPhotoWrite = async (lodgmentReviewId, photo) => {
    const lodgmentReviewPhotoWrite = await myDataSource.query(
        `INSERT INTO lodgmentReviewPhoto(lodgmentReviewId,photo)
        VALUES(?,?)
        `,
        [lodgmentReviewId, photo]
    )
    return lodgmentReviewPhotoWrite
}

//리뷰쓸때 평균점과 리뷰갯수 입력
const lodgmentaverageReviewPoint = async (averageReviewPoint, reviewCount, lodgmentId) => {
    const lodgmentaverageReviewPoint = await myDataSource.query(
        `UPDATE lodgment
        SET reviewPoint = ?, reviewCount = ?
        WHERE id = ?
        `,
        [averageReviewPoint, reviewCount, lodgmentId]
    )
    return lodgmentaverageReviewPoint
}
//리뷰삭제
const lodgmentReviewDelete = async (reviewId, userId) => {
    const lodgmentReviewDelete = await myDataSource.query(
        `DELETE FROM lodgmentReview
        WHERE id = ? AND userId = userId`,
        [reviewId, userId]
    )
    return lodgmentReviewDelete
}


//좋아요 불러오기
const lodgmentLike = async (lodgmentId) => {
    const lodgmentLike = await myDataSource.query(
        `SELECT
            lodgmentLike.id
        FROM lodgmentLike
        WHERE lodgmentLike.lodgmentId=?
        `,
        [lodgmentId]
    )
    return lodgmentLike
}
//좋아요 총갯수 넣기
const lodgmentTotalLike = async (totalLike, lodgmentId) => {
    const lodgmentTotalLike = await myDataSource.query(
        `UPDATE lodgment
        SET totalLike = ?
        WHERE id = ?
        `,
        [totalLike, lodgmentId]
    )
    return lodgmentTotalLike
}
const lodgmentLikeInsert = async (userId, lodgmentId) => {
    const lodgmentLikeInsert = await myDataSource.query(
        `INSERT INTO lodgmentLike(userId, lodgmentId)
        VALUES(?,?)
        `,
        [userId, lodgmentId]
    )
    return lodgmentLikeInsert
}

const lodgmentBookMarkInsert = async (userId, lodgmentId) => {
    const lodgmentBookMarkInsert = await myDataSource.query(
        `INSERT INTO lodgmentBookMark(userId, lodgmentId)
        VALUES(?,?)
        `,
        [userId, lodgmentId]
    )
    return lodgmentBookMarkInsert
}

const lodgmentTotalInsert = async (
    name, intro, phoneNumber, useInfo, starPoint,
    facility, hashtag, tag,
    regionAddress, fullAddress, googleAddress,
    photo) => {

    const lodgmentInsert = await myDataSource.query(
        `INSERT INTO lodgment(name,intro,phoneNumber,useInfo,starPoint,reviewPoint)
        VALUES(?,?,?,?,?,?)
        `,
        [name, intro, phoneNumber, useInfo, starPoint, 0]
    )
    const lodgmentIdCheck = await myDataSource.query(
        `SELECT * FROM lodgment
        WHERE name=? AND intro=? AND phoneNumber=? AND useInfo=? AND starPoint=?
        `,
        [name, intro, phoneNumber, useInfo, starPoint]
    )
    const id = lodgmentIdCheck[0].id

    for (let i = 0; i < facility.length; i++) {
        var lodgmentFacilityInsert = await myDataSource.query(
            `INSERT INTO lodgmentFacilityId(lodgmentId, lodgmentFacilityId)
            VALUES(?,?)
            `,
            [id, facility[i]]
        )
    }
    for (let i = 0; i < hashtag.length; i++) {
        var lodgmentHashTagInsert = await myDataSource.query(
            `INSERT INTO lodgmentHashTagId(lodgmentId, lodgmentHashTagId)
            VALUES(?, ?)
            `,
            [id, hashtag[i]]
        )
    }
    for (let i = 0; i < tag.length; i++) {
        var lodgmentTagInsert = await myDataSource.query(
            `INSERT INTO lodgmentTagId(lodgmentId, lodgmentTagId)
            VALUES(?, ?)
            `,
            [id, tag[i]]
        )
    }
    const lodgmentAddressInsert = await myDataSource.query(
        `INSERT INTO lodgmentAddress(lodgmentId, regionAddress, fullAddress, googleAddress)
        VALUES(?,?,?,?)
        `,
        [id, regionAddress, fullAddress, googleAddress]
    )
    if (photo != undefined) {
        for (let i = 0; i < photo.length; i++) {
            var lodgmentPhotoInsert = await myDataSource.query(
                `INSERT INTO lodgmentPhoto(lodgmentId, photo)
                VALUES(?,?)
                `,
                [id, photo[i]]
            )
        }
    }
    return lodgmentIdCheck
}

const lodgmentRoomInsert = async (lodgmentId, roomName, peopleNumber, smoking, bedInfo, price) => {
    const lodgmentRoomInsert = await myDataSource.query(
        `INSERT INTO lodgmentRoom(lodgmentId, roomName, peopleNumber, smoking, bedInfo, price)
        VALUES(?,?,?,?,?,?)
        `,
        [lodgmentId, roomName, peopleNumber, smoking, bedInfo, price]
    )
    const roomIdCheck = await myDataSource.query(
        `SELECT * FROM lodgmentroom
        WHERE lodgmentId=? AND roomName=? AND peopleNumber=? AND smoking=? AND bedInfo=?
        `,
        [lodgmentId, roomName, peopleNumber, smoking, bedInfo]
    )
    const id = roomIdCheck[0].id
    
    const lodgmentRoomDateInsert = await myDataSource.query(
        `INSERT INTO lodgmentRoomRentedDate(roomId, rentedDate)
        VALUES(?,?)
        `,
        [id,'1111-11-11']
    )
    return
}

module.exports = {
    lodgmentList,
    lodgment,
    lodgmentRoom,
    lodgmentReview,
    lodgmentLike,
    lodgmentReviewWrite,
    lodgmentReviewPhotoWrite,
    lodgmentaverageReviewPoint,
    lodgmentReviewDelete,
    lodgmentLikeInsert,
    lodgmentBookMarkInsert,
    lodgmentTotalLike,
    lodgmentTotalInsert,
    lodgmentRoomInsert,
};