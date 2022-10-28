const express = require('express')

const { setTokenCookie, restoreUser, requireAuth } = require('../../utils/auth');
const { User, Spot, ReviewImage, Review } = require('../../db/models');
const { check } = require('express-validator');
const { handleValidationErrors } = require('../../utils/validation');
const { off } = require('process');

const router = express.Router();

router.get('/current',
    requireAuth,
    async (req, res, next) => {
        const reviews = await Review.findAll({
            where: {
                userId: req.user.id,
            },
            include: [
                {
                    model: User,
                    attributes: ['id', 'firstName', 'lastName']
                },
                { model: Spot },
                { model: ReviewImage }
            ]
        });

        return res.json(reviews);
    }
)

router.post('/:reviewId/images', requireAuth, async (req, res, next) => {
    const { reviewId } = req.params;
    const { url } = req.body;
    const review = await Review.findByPk(reviewId)
    if (!review) {
        res.status(404);
        return res.json({
            message: "Review couldn't be found",
            statusCode: 404
        })
    };

    if ((await ReviewImage.findAll({ where: { reviewId } })).length >= 10) {
        res.status(403);
        return res.json({
            message: "Maximum number of images for this resource was reached",
            statusCode: 403
        })
    }

    if (review.userId !== req.user.id) {
        return res.json({ message: "Only the owner of the review can add images" })
    }
    const newImage = await ReviewImage.create({ url, reviewId });
    return res.json(newImage);
})

router.put('/:reviewId', requireAuth, async (req, res, next) => {
    const { reviewId } = req.params;
    const { review, stars } = req.body;

    const oldReview = await Review.findByPk(reviewId);


    if (!oldReview) {
        return res.json({
            message: "Review couldn't be found",
            statusCode: 404
        })
    }

    if (oldReview.userId !== req.user.id) return res.json({ message: "Must be the owner of the review to edit" })

    if (review) oldReview.review = review;
    if (stars) oldReview.stars = stars;

    await oldReview.save();
    
    return res.json(oldReview);
})

router.delete('/:reviewid', requireAuth, async (req, res, next) => {
    const { reviewId } = req.params;
    const review = await Review.findByPk(reviewId);
    if (!review) {
        return res.json({
            message: "Review couldn't be found",
            statusCode: 404
        })
    };

    if (review.userId !== req.user.id) return res.json({ message: "Must be the owner of the review to edit" })

    await review.destroy();

    return res.json({
        message: "Successfully deleted",
        statusCode: 200
    })
})
module.exports = router;
