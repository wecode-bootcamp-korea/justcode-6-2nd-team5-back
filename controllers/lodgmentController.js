const lodgmentService = require('../services/lodgmentService')

const lodgment = async (req, res) => {
    console.log('START lodgmentController')
    const {id} = req.params
    console.log(id)
    const lodgment = await lodgmentService.lodgment(id)
    const lodgmentRoom = await lodgmentService.lodgmentRoom(id)
    const lodgmentReview = await lodgmentService.lodgmentReview(id)

    console.log('END lodgmentController')
    res.status(200).json({lodgment: lodgment , room: lodgmentRoom, review: lodgmentReview})
}
const lodgmentReviewWrite = async(req,res) => {
    console.log('START lodgmentReviewWriteController')
    const {token, lodgmentId, review, cleanPoint, facilityPoint, servicePoint, costperformancePoint, photo} = req.body
    const lodgmentReviewWrite = await lodgmentService.lodgmentReviewWrite(token, lodgmentId, review, cleanPoint, facilityPoint, servicePoint, costperformancePoint, photo)
    
    console.log('END lodgmentReviewWriteController')
    res.status(200).json({message: 'review Written'})
}

module.exports = {
    lodgment,
    lodgmentReviewWrite,
};