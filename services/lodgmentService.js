const lodgmentDao = require('../models/lodgmentDao')
const jwt = require('jsonwebtoken')
const dotenv = require('dotenv')
dotenv.config()

const lodgment = async (id) => {
    console.log('START lodgmentService')
    const lodgments = await lodgmentDao.lodgment(id)
    const lodgment = lodgments[0]
    lodgment.photo = JSON.parse(lodgment.photo)
    lodgment.facility = JSON.parse(lodgment.facility)

    const lodgmentLike = await lodgmentDao.lodgmentLike(id)
    lodgment.totalLike = lodgmentLike.length

    console.log('END createUserService');
    return lodgment
}

const lodgmentRoom = async (id) => {
    console.log('START lodgmentRoomService')
    const lodgmentRoom = await lodgmentDao.lodgmentRoom(id)
    for (let i = 0; i < lodgmentRoom.length; i++) {
        if (lodgmentRoom[i].photo != 'NULL') {
            lodgmentRoom[i].photo = JSON.parse(lodgmentRoom[i].photo)
        }
    }
    console.log('END lodgmentRoomService')
    return lodgmentRoom
}

const lodgmentReview = async (id) => {
    console.log('START lodgmentReivewService')
    const lodgmentReview = await lodgmentDao.lodgmentReview(id)
    for (let i = 0; i < lodgmentReview.length; i++) {
        if (lodgmentReview[i].photo != 'NULL') {
            lodgmentReview[i].photo = JSON.parse(lodgmentReview[i].photo)
        }
    }
    console.log('END lodgmentReviewService')
    return lodgmentReview
}

const lodgmentReviewWrite = async (token, lodgmentId, review, cleanPoint, facilityPoint, servicePoint, costperformancePoint, photo) => {
    console.log('START lodgmentReviewWriteService')
    const key = process.env.SECRET_KEY
    const tokenId = jwt.verify(token, key)
    const userId = tokenId.userId
    const reviewPoint = (cleanPoint + facilityPoint + servicePoint + costperformancePoint) / 4
    if (photo != undefined) {
        category = 'photo'
    }else{
        category = null
    }
    const lodgmentReviewWrite = await lodgmentDao.lodgmentReviewWrite(userId, lodgmentId, category, review, cleanPoint, facilityPoint, servicePoint, costperformancePoint, reviewPoint)

    const reviewList = await lodgmentReview(lodgmentId)
    if (photo != undefined) {
        for (let i = 0; i < reviewList.length; i++) {
            if (reviewList[i].userId == userId && reviewList[i].lodgmentId == lodgmentId && reviewList[i].review == review) {
                for (let j = 0; j < photo.length; j++) {
                    await lodgmentDao.lodgmentReviewPhotoWrite(reviewList[i].id, photo[j])
                }
            }
        }
    }

    console.log('END lodgmentReviewWirteService')
    return lodgmentReviewWrite
}

module.exports = {
    lodgment,
    lodgmentRoom,
    lodgmentReview,
    lodgmentReviewWrite,
};