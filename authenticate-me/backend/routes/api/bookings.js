const express = require('express')

const { setTokenCookie, restoreUser, requireAuth } = require('../../utils/auth');
const { User, Spot, SpotImage, Review, ReviewImage, Booking } = require('../../db/models');
const { check } = require('express-validator');
const { handleValidationErrors } = require('../../utils/validation');

const router = express.Router();

router.get('/current', restoreUser, requireAuth, async (req, res, next) => {
    const userId = req.user.id;
    const bookings = await Booking.findAll({ where: { userId }, include: { model: Spot } });

    return res.json({ Bookings: bookings })
})
router.delete('/:bookingId', restoreUser, requireAuth, async (req, res) => {
    const { bookingId } = req.params;
    const booking = await Booking.findByPk(bookingId);

    if (!booking) {
        res.status(404);
        return res.json({
            message: 'Booking with that id does not exist',
            statusCode: 404
        })
    };

    if (booking.startDate.getTime() < new Date().getTime()) {
        res.status(400);
        return res.json({
            message: 'Cannot delete current or past bookings',
            statusCode: 400
        })
    }

    const spot = await Booking.findByPk(booking.spotId);

    if (booking.userId !== req.user.id && spot.ownerId !== req.user.id) {
        return res.json({ message: "Must be the owner of the booking or spot to delete a booking" })
    }

    await booking.destroy();

    return res.json({ message: 'Successfully deleted' })
})

router.put('/:bookingId', requireAuth, async (req, res) => {
    const { startDate, endDate } = req.body;

    const {bookingId} = req.params;

    const booking = await Booking.findByPk(bookingId);

    if(!booking) {
        res.status(404);
        return res.json({
            message: 'Booking could not be found',
            statusCode: 404
        })
    }

    if(booking.userId !== req.user.id) {
        return res.json({
            message: 'Only the owner of a booking can edit a booking'
        })
    };

    const spotId = booking.spotId;

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

    if(booking.endDate.getTime() < new Date().getTime()) {
        res.status(400);
        return res.json({
            message: 'No editing of past bookings',
            statusCode: 400
        })
    }

    booking.startDate = startDate;
    booking.endDate = endDate;

    await booking.save();

    return res.json(booking);
})
module.exports = router;
