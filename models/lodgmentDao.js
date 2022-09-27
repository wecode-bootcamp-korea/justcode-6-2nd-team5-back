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

const lodgment = async (id) => {
    const lodgment = await myDataSource.query(
        `SELECT 
            lodgment.id, lodgment.name, lodgment.intro, lodgment.phoneNumber, lodgment.reviewPoint, lodgment.useInfo,
            bigAddress, regionAddress, fullAddress,
            JSON_ARRAYAGG(photo)as photo,
            facility, hashTag, tag
        FROM lodgment
        LEFT JOIN lodgmentaddress ON lodgment.id = lodgmentaddress.lodgmentId
        LEFT JOIN lodgmentphoto ON lodgment.id = lodgmentphoto.lodgmentId
        LEFT JOIN (SELECT lodgmentfacilityid.lodgmentId, JSON_ARRAYAGG(facility)as facility FROM lodgmentfacilityid LEFT JOIN lodgmentFacility ON lodgmentfacilityid.facilityid=lodgmentfacility.id)as lodgmentfacility ON lodgment.id = lodgmentfacility.lodgmentId
        LEFT JOIN (SELECT lodgmenthashtagid.lodgmentId, JSON_ARRAYAGG(hashTag)as hashTag FROM lodgmentHashTagId LEFT JOIN lodgmentHashTag ON lodgmentHashTagid.hashTagid=lodgmenthashtag.id)as lodgmenthashtag ON lodgment.id = lodgmenthashtag.lodgmentId
        LEFT JOIN (SELECT lodgmenttagid.lodgmentId, JSON_ARRAYAGG(tag)as tag FROM lodgmentTagId LEFT JOIN lodgmentTag ON lodgmenttagid.lodgmenttagid=lodgmenttag.id)as lodgmenttag ON lodgment.id = lodgmenttag.lodgmentId       
        WHERE lodgment.id=?
        `,
        [id]
    );
    return lodgment
}
const lodgmentRoom = async(id) => {
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
const lodgmentReview = async(id) => {
    const lodgmentReview = await myDataSource.query(
        `SELECT
            lodgmentreview.id, lodgmentreview.lodgmentId, lodgmentreview.userId, lodgmentreview.category, lodgmentreview.review, lodgmentreview.cleanPoint, lodgmentreview.facilityPoint,
            lodgmentreview.servicePoint, lodgmentreview.costperformancePoint, lodgmentreview.reviewPoint, lodgmentreview.created_at,
            photo
        FROM lodgmentreview
        LEFT JOIN (SELECT lodgmentreviewphoto.lodgmentreviewid, JSON_ARRAYAGG(lodgmentreviewphoto.photo)as photo FROM lodgmentreviewphoto GROUP BY lodgmentreviewid)as lodgmentreviewphoto ON lodgmentreview.id=lodgmentreviewphoto.lodgmentreviewid
        WHERE lodgmentreview.lodgmentId=?
        `,
        [id]
    )
    return lodgmentReview
}
const lodgmentReviewWrite = async(userId, lodgmentId, category, review, cleanPoint, facilityPoint, servicePoint, costperformancePoint, reviewPoint) => {
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
const lodgmentReviewPhotoWrite = async(lodgmentReviewId,photo) => {
    const lodgmentReviewPhotoWrite = await myDataSource.query(
        `INSERT INTO lodgmentReviewPhoto(lodgmentReviewId,photo)
        VALUES(?,?)
        `,
        [lodgmentReviewId,photo]
    )
    return lodgmentReviewPhotoWrite
}

const lodgmentLike = async(id) => {
    const lodgmentLike = await myDataSource.query(
        `SELECT
            lodgmentLike.id
        FROM lodgmentLike
        WHERE lodgmentLike.lodgmentId=?
        `,
        [id]
    )
    return lodgmentLike
}

module.exports = {
    lodgment,
    lodgmentRoom,
    lodgmentReview,
    lodgmentLike,
    lodgmentReviewWrite,
    lodgmentReviewPhotoWrite,
};