const lodgmentService = require('../services/lodgmentService')
const lodgmentDao = require('../models/lodgmentDao')

const lodgmentList = async (req, res) => {
    console.log("START lodgmentListController")
    var {
        숙소유형, hashtag, facility, 지역검색, startDate, endDate, 
        adultCnt, childCnt, 호텔등급, 별점, sort, offset, 
        limit} = req.query

        address = 지역검색
        tag = 숙소유형
        reviewPoint = 별점
        starPoint = 호텔등급

    
    var lodgmentList = await lodgmentService.lodgmentList(tag, hashtag, facility, address, startDate, endDate, adultCnt, childCnt, starPoint, reviewPoint, sort, offset, limit)
    var lengthCheck = await lodgmentService.lodgmentList(tag, hashtag, facility, address, startDate, endDate, adultCnt, childCnt, starPoint, reviewPoint, sort, 0, 10000)
    var totalCount = lengthCheck.length
    console.log('END lodgmentListController')
    res.status(200).json({lodgmentList:lodgmentList, totalCount:totalCount})
}

const lodgment = async (req, res) => {
    console.log('START lodgmentController')
    const { id } = req.params
    console.log(id)
    let lodgment = await lodgmentService.lodgment(id)
    let lodgmentRoom = await lodgmentService.lodgmentRoom(id)
    const lodgmentReview = await lodgmentService.lodgmentReview(id)

    console.log('END lodgmentController')
    res.status(200).json({ lodgment: lodgment, room: lodgmentRoom, review: lodgmentReview })
}
const lodgmentReviewWrite = async (req, res) => {
    console.log('START lodgmentReviewWriteController')
    const { token, lodgmentId, review, cleanPoint, facilityPoint, servicePoint, costperformancePoint, photo } = req.body
    const lodgmentReviewWrite = await lodgmentService.lodgmentReviewWrite(token, lodgmentId, review, cleanPoint, facilityPoint, servicePoint, costperformancePoint, photo)

    console.log('END lodgmentReviewWriteController')
    res.status(200).json({ message: 'review Written' })
}

const lodgmentReviewDelete = async (req,res) => {
    const {token, reviewId, lodgmentId} = req.body
    const lodgmentReviewDelete =  await lodgmentService.lodgmentReviewDelete(reviewId, token, lodgmentId)
    res.status(200).json({ message: 'review Deleted'})
}

const lodgmentLike = async (req,res) => {
    console.log('')
    const {token, lodgmentId} = req.body
    const lodgmentLike = await lodgmentService.lodgmentLike(token, lodgmentId)
    console.log('')
    res.status(200).json({ message: 'like written'})
}

const lodgmentBookMark = async (req,res) => {
    console.log('')
    const {token, lodgmentId} = req.body
    const lodgmentBookMark = await lodgmentService.lodgmentBookMark(token, lodgmentId)
    console.log('')
    res.status(200).json({ message: 'bookMark written'})
}

const lodgmentTotalInsert = async(req,res) => {
    console.log('lodgmentTotalInsert')
    let {
        name, intro, phoneNumber, useInfo, starPoint,
        facility, hashtag, tag,
        regionAddress, fullAddress, googleAddress,
        photo
    } = req.body

    if(starPoint==''||starPoint==undefined){
        starPoint = 0
    }

    const lodgmentTotalInsert = await lodgmentDao.lodgmentTotalInsert(        
        name, intro, phoneNumber, useInfo, starPoint,
        facility, hashtag, tag,
        regionAddress, fullAddress, googleAddress,
        photo)
    
    var lodgmentId = lodgmentTotalInsert[0].id
    res.status(200).json({message:'created',lodgmentId:lodgmentId})
}

const lodgmentReview = async (req, res) => {
    console.log('START lodgmentController')
    const { id, category } = req.query
    const lodgmentReview = await lodgmentService.lodgmentReview(id, category)
    const lodgmentNameget = await lodgmentService.lodgment(id)
    let lodgmentName = lodgmentNameget.name

    let cleanAverage = 0
    let facilityAverage = 0
    let serviceAverage = 0
    let costperformanceAverage = 0
    let reviewAverage = 0
    for(let i=0; i<lodgmentReview.length;i++){
        cleanAverage = cleanAverage+lodgmentReview[i].cleanPoint
        facilityAverage = facilityAverage+lodgmentReview[i].facilityPoint
        serviceAverage = serviceAverage+lodgmentReview[i].servicePoint
        costperformanceAverage = costperformanceAverage+lodgmentReview[i].costperformancePoint
        reviewAverage = reviewAverage+lodgmentReview[i].reviewPoint
    }
    cleanAverage = cleanAverage/lodgmentReview.length
    facilityAverage = facilityAverage/lodgmentReview.length
    serviceAverage = serviceAverage/lodgmentReview.length
    costperformanceAverage = costperformanceAverage/lodgmentReview.length
    reviewAverage = reviewAverage/lodgmentReview.length

    console.log('END lodgmentController')
    res.status(200).json({totalAverage:reviewAverage,
        cleanAverage:cleanAverage,
        facilityAverage:facilityAverage,
        serviceAverage:serviceAverage,
        costperformanceAverage:costperformanceAverage,
        lodgmentName:lodgmentName,
        lodgmentReview:lodgmentReview
        })
}

const lodgmentRoomInsert = async(req,res) => {
    console.log('lodgmentRoomInsert')
    const {lodgmentId, roomName, peopleNumber, smoking, bedInfo, price} = req.body
    const lodgmentRoomInsert = await lodgmentDao.lodgmentRoomInsert(lodgmentId, roomName, peopleNumber, smoking, bedInfo, price)
    res.status(200).json({message:'created'})
}

module.exports = {
    lodgmentList,
    lodgment,
    lodgmentReviewWrite,
    lodgmentReviewDelete,
    lodgmentLike,
    lodgmentBookMark,
    lodgmentTotalInsert,
    lodgmentReview,
    lodgmentRoomInsert,
};