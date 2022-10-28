const express = require('express')

const { setTokenCookie, restoreUser, requireAuth } = require('../../utils/auth');
const { User, Spot, SpotImage, Review, ReviewImage, Booking } = require('../../db/models');
const { check } = require('express-validator');
const { handleValidationErrors } = require('../../utils/validation');

const router = express.Router();

router.delete('/:imageId', requireAuth, async(req, res, next) => {
    const {imageId} = req.params;
    const image = await ReviewImage.findByPk(imageId);
    if(!image) {
        res.status(404);
        return res.json({
            message: "Spot Image couldn't be found",
            statusCode: 404
        })
    };

    const review = await Review.findByPk(image.reviewId);

    if(review.userId !== req.user.id) {
        return res.json({message: "Only the owner of the spot can delete images"});
    }

    image.destroy();

    res.json({message: 'Successfully deleted'})
});

module.exports = router;
