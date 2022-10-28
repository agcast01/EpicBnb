const express = require('express')

const { setTokenCookie, restoreUser, requireAuth } = require('../../utils/auth');
const { User, Spot, SpotImage, Review, ReviewImage, Booking } = require('../../db/models');
const { check } = require('express-validator');
const { handleValidationErrors } = require('../../utils/validation');
const { start } = require('repl');
const { Op } = require('sequelize')
const router = express.Router();

const validatePost = [
    check('address')
        .exists({ checkFalsy: true })
        .withMessage('Please provide a valid address'),
    handleValidationErrors
];
router.get('/', async (req, res, next) => {
    const {page, size, minLat, maxLat, minLng, maxLng, minPrice, maxPrice} = req.query;

    const where = {};

    if(minLat) where.lat = {[Op.gte]: minLat};
    if(maxLat) where.lat = {[Op.lte]: maxLat};
    if(minLng) where.lng = {[Op.gte]: minLng};
    if(maxLng) where.lng = {[Op.lte]: maxLng};
    if(minPrice) where.price = {[Op.gte]: minPrice};
    if(maxPrice) where.price = {[Op.lte]: maxPrice};

    const pagination = {};
    let pageInt, sizeInt;
    if(page) {pageInt = parseInt(page)};
    if(size) {sizeInt = parseInt(size)};

    if(!pageInt || pageInt < 1) pageInt = 1;
    else if(pageInt > 10) pageInt = 10

    if(!sizeInt || sizeInt > 20) sizeInt = 20;
    else if(sizeInt < 1) sizeInt = 1;

    pagination.limit = sizeInt;

    pagination.offset = sizeInt * (pageInt - 1);

    const spots = await Spot.findAll({where, pagination});

    res.json({ Spots: spots });
})

router.post('/', requireAuth, validatePost, async (req, res, next) => {
    const { address, city, state, country, lat, lng, name, description, price } = req.body;
    const ownerId = req.user.id;
    const newSpot = await Spot.create({ ownerId, address, city, state, country, lat, lng, name, description, price });

    return res.json(newSpot);
})

router.get('/current', requireAuth, async (req, res, next) => {
    const ownerId = req.user.id;
    console.log(req.user.id)
    const spots = await Spot.findAll({
        where: { ownerId }
    })
    return res.json(spots);
})

router.post('/:spotId/images', requireAuth, async (req, res, next) => {
    const { spotId } = req.params;
    const { url, preview } = req.body;
    const spot = await Spot.findByPk(spotId)
    if (!spot) {
        res.status(404)
        return res.json({
            message: "Spot couldn't be found",
            statusCode: 404
        })
    }
    if (spot.ownerId === req.user.id) {
        const newSpotImage = await SpotImage.create({ url, preview, spotId });

        return res.json(newSpotImage);
    } else res.json({ message: "Must be the owner of the spot to add an image" })
})

router.get('/:spotId', async (req, res, next) => {
    const { spotId } = req.params;
    const spot = await Spot.findByPk(spotId, {
        include: [{
            model: User,
            attributes: ['firstName', 'lastName', 'id']
        },
        { model: SpotImage }
        ]
    })
    if (!spot) {
        res.status(404)
        return res.json({
            message: "Spot couldn't be found",
            statusCode: 404
        })
    }
    res.json(spot);
});

router.put('/:spotId',
    requireAuth,
    async (req, res, next) => {
        const { spotId } = req.params;
        const { address, city, state, country, lat, lng, name, description, price } = req.body;

        const spot = await Spot.findByPk(spotId);
        
        if (!spot) {
            res.status(404);
            res.json({
                message: "Spot couldn't be found",
                statusCode: 404
            });
        };

        if (req.user.id != spot.ownerId) return res.json({ message: "must own spot to edit" })

        if (address) spot.address = address;
        if (city) spot.city = city;
        if (state) spot.state = state;
        if (country) spot.country = country;
        if (lat) spot.lat = lat;
        if (lng) spot.lng = lng;
        if (name) spot.name = name;
        if (description) spot.description = description;
        if (price) spot.price = price;

        return res.json(spot)
    })

router.delete('/:spotId',
    requireAuth,
    async (req, res, next) => {
        const { spotId } = req.params;

        const spot = await Spot.findByPk(spotId);

        if (!spot) return res.json({
            message: "Spot couldn't be found",
            statusCode: 404
        })

        spot.destroy()
        return res.json({ message: "successfully deleted", statusCode: 200 });
    }
)

router.post('/:spotId/reviews', requireAuth, async (req, res, next) => {
    const { spotId } = req.params;
    const { review, stars } = req.body;
    const spot = await Spot.findByPk(spotId);
    if (!spot) {
        return res.json({
            message: "Spot couldn't be found",
            statusCode: 404
        })
    }
    if (await Review.findOne({ where: { spotId, userId: req.user.id } })) {
        res.status(403);
        return res.json({
            message: 'User already has a review for this spot',
            statusCode: 403
        })
    }
    const newReview = await Review.create({ review, stars, spotId, userId: req.user.id });

    return res.json(newReview)
})

router.get('/:spotId/reviews', async (req, res, next) => {
    const { spotId } = req.params;
    const reviews = await Review.findAll({
        where: { spotId },
        include: {
            model: ReviewImage
        }
    })

    if (!(await Spot.findByPk(spotId))) {
        return res.json({
            message: "Spot couldn't be found",
            statusCode: 404
        })
    }

    res.json({ Reviews: reviews })
})

router.post('/:spotId/bookings', requireAuth, async (req, res, next) => {
    const { spotId } = req.params;
    const spot = await Spot.findByPk(spotId)
    if (!spot) {
        res.status(404);
        return res.json({
            message: "Spot couldn't be found",
            statusCode: 404
        })
    }

    if (spot.ownerId === req.user.id) {
        return res.json({ message: "Must not own the spot to make a booking" })
    };

    const { startDate, endDate } = req.body;

    const spotBookings = await Booking.findAll({where: {spotId}});

    const startTime = new Date(startDate).getTime()

    const endTime = new Date(endDate).getTime()


    let err;
    spotBookings.forEach(booking => {
        if((startTime <= booking.endDate.getTime() && startTime >= booking.endDate.getTime()) || (endTime <= booking.endDate.getTime() && endTime >= booking.endDate.getTime())) {
            res.status(403);
            err = true;
            return res.json({
                message: 'Sorry, this spot is already booked for the specified dates',
                statusCode: 403,
                errors: {
                    startDate: 'Start date conflicts with an existing booking',
                    endDate: 'End date conflicts with a current booking'
                }
            })
        }        
    })
    if(err) return
    const newBooking = await Booking.create({ startDate, endDate, spotId, userId: req.user.id })


    return res.json(newBooking);
})

router.get('/:spotId/bookings', requireAuth, async (req, res) => {
    const {spotId} = req.params;

    const spot = await Spot.findByPk(spotId);
    if(!spot) {
        res.status(404);
        return res.json({
            message: "Spot couldn't be found",
            statusCode: 404
        })
    }

    const userId = req.user.id;
    let Bookings;
    if(spot.ownerId !== userId) {
       Bookings = await Booking.findAll({where: {spotId}, attributes: ['spotId', 'startDate', 'endDate']}); 
    } else {
        Bookings = await Booking.findAll({where: {spotId}, include: {model: User}})
    }

    res.json({Bookings});
})

module.exports = router;
