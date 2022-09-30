const restaurantDao = require('../models/restaurantDao')
const jwt = require('jsonwebtoken')
const dotenv = require('dotenv')
dotenv.config()

const restaurant = async (id) => {
    console.log('START restaurantService')
    const restaurants = await restaurantDao.restaurant(id)
    const restaurant = restaurants[0]
    restaurant.photo = JSON.parse(restaurant.photo)

    const restaurantLike = await restaurantDao.restaurantLike(id)
    restaurant.totalLike = restaurantLike.length
    restaurant.hashTag = JSON.parse(restaurant.hashTag)
    console.log('END restaurantService');
    return restaurant
}

const restaurantMenu = async (id) => {
    console.log('START restaurantMenuService')
    const restaurantMenu = await restaurantDao.restaurantMenu(id)
    console.log('END restaurantMenuService');
    return restaurantMenu
}

const restaurantList = async (category, hashtag, facility, address, sort, offset, limit) => {
    console.log('START restaurantListService')
    if(category==undefined){
        category='null'
    }
    if(hashtag==undefined){
        hashtag='null'
    }
    if(facility==undefined){
        facility='null'
    }
    if(address==undefined){
        address='null'
    }
    if(address=='전체'){
        address='null'
    }
    if(sort==undefined){
        sort=null
    }
    if(offset==undefined){
        offset=0
    }else{
        offset = Number(offset)
    }
    if(limit==undefined){
        limit=10000
    }else{
        limit = Number(limit)
    }
    const restaurantList = await restaurantDao.restaurantList(category, hashtag, facility, address, sort, offset, limit)

    for (let i = 0; i < restaurantList.length; i++) {
        restaurantList[i].category = JSON.parse(restaurantList[i].category)
        restaurantList[i].hashTag = JSON.parse(restaurantList[i].hashTag)
        restaurantList[i].facility = JSON.parse(restaurantList[i].facility)
    }
    console.log('END restaurantListService')
    return restaurantList
}

const restaurantAdd = async (name, intro, businessHour, phoneNumber, closedDay) => {
    console.log('START restaurantAddService')
    const restaurantAdd = await restaurantDao.restaurantAdd(name, intro, businessHour, phoneNumber, closedDay)

    console.log('END restaurantAddService')
    return restaurantAdd
}

const restaurantReview = async (id,category) => {
    console.log('START restaurantReivewService')
    if(category==undefined){
        category='null'
    }
    const restaurantReview = await restaurantDao.restaurantReview(id,category)
    console.log('END restaurantReviewService')
    return restaurantReview
}

const restaurantReviewWrite = async (token, restaurantId, review, tastePoint, servicePoint, moodPoint, photo) => {
    console.log('START restaurantReviewWriteService')
    const key = process.env.SECRET_KEY
    const tokenId = jwt.verify(token, key)
    const userId = tokenId.userId
    const reviewPoint = (tastePoint + servicePoint + moodPoint) / 3

    if(photo!=undefined){
        category = 'photo'
    }else{
        category = 'null'
    }
    
    const restaurantReviewWrite = await restaurantDao.restaurantReviewWrite(userId, restaurantId, category, review, tastePoint, servicePoint, moodPoint, reviewPoint)

    const reviewList = await restaurantDao.restaurantReview(restaurantId)
    if (photo != undefined) {
        for (let i = 0; i < reviewList.length; i++) {
            if (reviewList[i].userId == userId && reviewList[i].restaurantId == restaurantId && reviewList[i].review == review) {
                await restaurantDao.restaurantReviewPhotoWrite(reviewList[i].id, photo)
            }
        }
    }

    const restaurantReview = await restaurantDao.restaurantReview(restaurantId, "null", "null")
    console.log(restaurantReview)
    let averageReviewPoint = 0
    for(let i=0; i<restaurantReview.length;i++){
        averageReviewPoint = averageReviewPoint+restaurantReview[i].reviewPoint
    }
    console.log(averageReviewPoint)
    let reviewCount = restaurantReview.length
    averageReviewPoint = averageReviewPoint/restaurantReview.length
    console.log(averageReviewPoint)
    
    const restuarantaverageReviewPoint = await restaurantDao.restuarantaverageReviewPoint(averageReviewPoint, reviewCount, restaurantId)

    console.log('END restaurantReviewWirteService')
    return restaurantReviewWrite
}
const restuarantReviewDelete = async (reviewId, token, restaurantId) => {
    const key = process.env.SECRET_KEY
    const tokenId = jwt.verify(token, key)
    const userId = tokenId.userId

    const restuarantReviewDelete = await restaurantDao.restuarantReviewDelete(reviewId, userId)
    
    const restaurantReview = await restaurantDao.restaurantReview(restaurantId)
    let averageReviewPoint = 0
    for(let i=0; i<restaurantReview.length;i++){
        averageReviewPoint = averageReviewPoint+restaurantReview[i].reviewPoint
    }
    let reviewCount = restaurantReview.length
    averageReviewPoint = averageReviewPoint/restaurantReview.length

    const restuarantaverageReviewPoint = await restaurantDao.restuarantaverageReviewPoint(averageReviewPoint, reviewCount, restaurantId)

    return restuarantReviewDelete
}

const restaurantLike = async (token, restaurantId) => {
    const key = process.env.SECRET_KEY
    const tokenId = jwt.verify(token, key)
    const userId = tokenId.userId

    const restaurantLikeInsert = await restaurantDao.restaurantLikeInsert(userId, restaurantId)
    const restaurantLike = await restaurantDao.restaurantLike(restaurantId)
    let totalLike = restaurantLike.length
    const restuarantTotalLike = await restaurantDao.restuarantTotalLike(totalLike, restaurantId)
    return
}

const restaurantBookMark = async (token, restaurantId) => {
    const key = process.env.SECRET_KEY
    const tokenId = jwt.verify(token, key)
    const userId = tokenId.userId

    const restaurantBookMark = await restaurantDao.restaurantLikeInsert(userId, restaurantId)
    return restaurantBookMark
}



module.exports = {
    restaurant,
    restaurantMenu,
    restaurantList,
    restaurantAdd,
    restaurantReview,
    restaurantReviewWrite,
    restuarantReviewDelete,
    restaurantLike,
    restaurantBookMark
};