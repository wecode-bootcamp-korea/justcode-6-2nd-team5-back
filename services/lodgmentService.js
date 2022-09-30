const lodgmentDao = require('../models/lodgmentDao')
const jwt = require('jsonwebtoken')
const dotenv = require('dotenv')
dotenv.config()

const lodgmentList = async (tag, hashtag, facility, address, startDate, endDate, adultCnt, childCnt, starPoint, reviewPoint, sort, offset, limit) => {
    console.log('START lodgmentListService')
    if (tag == undefined) {
        tag = 'null'
    }
    if (hashtag == undefined) {
        hashtag = 'null'
    }
    if (facility == undefined) {
        facility = 'null'
    }
    if (address == undefined) {
        address = 'null'
    }
    if (starPoint == undefined) {
        starPoint = 'null'
    }
    if (reviewPoint == undefined) {
        reviewPoint = 'null'
    }
    if (sort == undefined) {
        sort = 'null'
    }
    if (startDate == undefined || endDate == undefined) {
        startDate = '12345'
        endDate = '12345'
    } else {
        startDate = '%' + startDate + '%'
        endDate = '%' + endDate + '%'
    }
    if(offset==undefined||offset=='0'){
        offset=0
    }
    if(limit==undefined){
        limit=10000
    }
    if (adultCnt == undefined || childCnt == undefined) {
        peopleNumber = 'null'
    } else {
        peopleNumber = adultCnt + childCnt
    }

    const lodgmentList = await lodgmentDao.lodgmentList(tag, hashtag, facility, address, startDate, endDate, peopleNumber, starPoint, reviewPoint, sort, offset, limit)

    for (let i = 0; i < lodgmentList.length; i++) {
        lodgmentList[i].tag = JSON.parse(lodgmentList[i].tag)
        lodgmentList[i].hashTag = JSON.parse(lodgmentList[i].hashTag)
        lodgmentList[i].facility = JSON.parse(lodgmentList[i].facility)
        lodgmentList[i].photo = JSON.parse(lodgmentList[i].photo)
        lodgmentList[i].peopleNumber = JSON.parse(lodgmentList[i].peopleNumber)
    }
    console.log('END lodgmentListService')
    return lodgmentList
}

const lodgment = async (id) => {
    console.log('START lodgmentService')
    const lodgments = await lodgmentDao.lodgment(id)
    const lodgment = lodgments[0]
    lodgment.photo = JSON.parse(lodgment.photo)
    lodgment.facility = JSON.parse(lodgment.facility)
    lodgment.hashTag = JSON.parse(lodgment.hashTag)
    lodgment.tag = JSON.parse(lodgment.tag)

    const lodgmentLike = await lodgmentDao.lodgmentLike(id)
    lodgment.totalLike = lodgmentLike.length

    console.log('END lodgmentService');
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

const lodgmentReview = async (id, category) => {
    console.log('START lodgmentReivewService')
    if(category==undefined){
        category='null'
    }

    const lodgmentReview = await lodgmentDao.lodgmentReview(id, category)
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
    } else {
        category = 'null'
    }
    const lodgmentReviewWrite = await lodgmentDao.lodgmentReviewWrite(userId, lodgmentId, category, review, cleanPoint, facilityPoint, servicePoint, costperformancePoint, reviewPoint)

    const reviewList = await lodgmentReview(lodgmentId)
    if (photo != undefined) {
        for (let i = 0; i < reviewList.length; i++) {
            if (reviewList[i].userId == userId && reviewList[i].lodgmentId == lodgmentId && reviewList[i].review == review) {
                await lodgmentDao.lodgmentReviewPhotoWrite(reviewList[i].id, photo)
            }
        }
    }

    const lodgmentReview = await lodgmentDao.lodgmentReview(lodgmentId,"null","null")
    let averageReviewPoint = 0
    for (let i = 0; i < lodgmentReview.length; i++) {
        averageReviewPoint = averageReviewPoint + lodgmentReview[i].reviewPoint
    }
    let reviewCount = lodgmentReview.length
    averageReviewPoint = averageReviewPoint / lodgmentReview.length
    const lodgmentaverageReviewPoint = await lodgmentDao.lodgmentaverageReviewPoint(averageReviewPoint, reviewCount, lodgmentId)


    console.log('END lodgmentReviewWirteService')
    return lodgmentReviewWrite
}

const lodgmentReviewDelete = async (reviewId, token, lodgmentId) => {
    const key = process.env.SECRET_KEY
    const tokenId = jwt.verify(token, key)
    const userId = tokenId.userId

    const lodgmentReviewDelete = await lodgmentDao.lodgmentReviewDelete(reviewId, userId)

    const lodgmentReview = await lodgmentDao.lodgmentReview(lodgmentId)
    let averageReviewPoint = 0
    for (let i = 0; i < lodgmentReview.length; i++) {
        averageReviewPoint = averageReviewPoint + lodgmentReview[i].reviewPoint
    }
    let reviewCount = lodgmentReview.length
    averageReviewPoint = averageReviewPoint / lodgmentReview.length
    const lodgmentaverageReviewPoint = await lodgmentDao.lodgmentaverageReviewPoint(averageReviewPoint, reviewCount, lodgmentId)

    return lodgmentReviewDelete
}

const lodgmentLike = async (token, lodgmentId) => {
    const key = process.env.SECRET_KEY
    const tokenId = jwt.verify(token, key)
    const userId = tokenId.userId

    const lodgmentLikeInsert = await lodgmentDao.lodgmentLikeInsert(userId, lodgmentId)
    const lodgmentLike = await lodgmentDao.lodgmentLike(lodgmentId)
    let totalLike = lodgmentLike.length
    const lodgmentTotalLike = await lodgmentDao.lodgmentTotalLike(totalLike, lodgmentId)
    return
}

const lodgmentBookMark = async (token, lodgmentId) => {
    const key = process.env.SECRET_KEY
    const tokenId = jwt.verify(token, key)
    const userId = tokenId.userId

    const lodgmentBookMark = await lodgmentDao.lodgmentLikeInsert(userId, lodgmentId)
    return lodgmentBookMark
}


module.exports = {
    lodgmentList,
    lodgment,
    lodgmentRoom,
    lodgmentReview,
    lodgmentLike,
    lodgmentReviewWrite,
    lodgmentReviewDelete,
    lodgmentBookMark,
};