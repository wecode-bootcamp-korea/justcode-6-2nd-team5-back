const restaurantService = require('../services/restaurantService')
const restaurantDao = require('../models/restaurantDao')


const restaurant = async (req, res) => {
    console.log('START restaurantController')
    const { id } = req.params
    console.log(id)
    const restaurant = await restaurantService.restaurant(id)
    const restaurantMenu = await restaurantService.restaurantMenu(id)
    const restaurantReview = await restaurantService.restaurantReview(id)

    console.log('END restaurantController')
    res.status(200).json({ restaurant: restaurant, menu: restaurantMenu, review: restaurantReview })
}

const restaurantList = async (req, res) => {
    console.log("START restaurantListController")
    const { 메뉴, 태그, 편의사항, 지역, 정렬, offset, limit } = req.query
    sort = 정렬
    address = 지역
    hashtag = 태그
    category = 메뉴
    facility = 편의사항
    var restaurantList = await restaurantService.restaurantList(category, hashtag, facility, address, sort, offset, limit)
    var lengthCheck = await restaurantService.restaurantList(category, hashtag, facility, address, sort, 0, 10000)
    var totalCount = lengthCheck.length
    console.log('END restaurantListController')
    res.status(200).json({restaurantList:restaurantList,totalCount:totalCount})
}

const restaurantReviewWrite = async (req, res) => {
    console.log('START restaurantReviewWriteController')
    const { token, restaurantId, review, tastePoint, servicePoint, moodPoint, photo } = req.body
    const restaurantReviewWrite = await restaurantService.restaurantReviewWrite(token, restaurantId, review, tastePoint, servicePoint, moodPoint, photo)

    console.log('END restaurantReviewWriteController')
    res.status(200).json({ message: 'review Written' })
}

const restuarantReviewDelete = async (req, res) => {
    const { token, reviewId, restaurantId } = req.body
    const restuarantReviewDelete = await restaurantService.restuarantReviewDelete(reviewId, token, restaurantId)
    res.status(200).json({ message: 'review Deleted' })
}

const restaurantLike = async (req, res) => {
    console.log('')
    const { token, restaurantId } = req.body
    const restaurantLike = await restaurantService.restaurantLike(token, restaurantId)
    console.log('')
    res.status(200).json({ message: 'like written' })
}

const restaurantBookMark = async (req, res) => {
    console.log('')
    const { token, restaurantId } = req.body
    const restaurantBookMark = await restaurantService.restaurantBookMark(token, restaurantId)
    console.log('')
    res.status(200).json({ message: 'bookMark written' })
}

const restaurantReview = async (req, res) => {
    console.log('START restaurantController')
    const { id, category } = req.query
    const restaurantReview = await restaurantService.restaurantReview(id,category)
    const restaurantNameget = await restaurantService.restaurant(id)
    let restaurantName = restaurantNameget.name
    
    let tasteAverage = 0
    let serviceAverage = 0
    let moodAverage = 0
    let reviewAverage = 0
    for(let i=0; i<restaurantReview.length;i++){
        tasteAverage = tasteAverage+restaurantReview[i].tastePoint
        serviceAverage = serviceAverage+restaurantReview[i].servicePoint
        moodAverage = moodAverage+restaurantReview[i].moodPoint
        reviewAverage = reviewAverage+restaurantReview[i].reviewPoint
    }
    tasteAverage = tasteAverage/restaurantReview.length
    serviceAverage = serviceAverage/restaurantReview.length
    moodAverage = moodAverage/restaurantReview.length
    reviewAverage = reviewAverage/restaurantReview.length

    console.log('END restaurantController')
    res.status(200).json({totalAverage:reviewAverage,
        tasteAverage:tasteAverage,
        serviceAverage:serviceAverage,
        moodAverage:moodAverage,
        restaurantName:restaurantName,
        restaurantReview:restaurantReview})
}


const restaurantAdd = async (req, res) => {
    console.log("START restaurantController")
    const { name, intro, businessHour, phoneNumber, closedDay } = req.body
    const restaurantAdd = await restaurantService.restaurantList(name, intro, businessHour, phoneNumber, closedDay)
    console.log('END restaurantController')
    res.status(200).json({ message: 'restaurantAdded' })
}

const restaurantTotalInsert = async(req,res) => {
    console.log('restaurantTotalInsert')
    const {
        name, intro, businessHour, phoneNumber, closedDay,
        facility, hashtag, category,
        regionAddress, fullAddress, googleAddress,
        photo
    } = req.body
    const restaurantTotalInsert = await restaurantDao.restaurantTotalInsert(        
        name, intro, businessHour, phoneNumber, closedDay,
        facility, hashtag, category,
        regionAddress, fullAddress, googleAddress,
        photo)
    res.status(200).json({message:'created'})
}
const restaurantMenuInsert = async(req,res) => {
    console.log('restaurantMenuInsert')
    const {restaurantId, menu, photo, price} = req.body
    const restaurantMenuInsert = await restaurantDao.restaurantMenuInsert(restaurantId, menu, photo, price)
    res.status(200).json({message:'created'})
}

module.exports = {
    restaurant,
    restaurantList,
    restaurantAdd,
    restaurantReviewWrite,
    restuarantReviewDelete,
    restaurantLike,
    restaurantBookMark,
    restaurantReview,
    restaurantTotalInsert,
    restaurantMenuInsert,
};