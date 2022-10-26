const express = require('express')

const { setTokenCookie, restoreUser, requireAuth } = require('../../utils/auth');
const { User, Spot, SpotImage } = require('../../db/models');
const { check } = require('express-validator');
const { handleValidationErrors } = require('../../utils/validation');

const router = express.Router();

const validatePost = [
    check('address')
        .exists({ checkFalsy: true })
        .withMessage('Please provide a valid address'),
    handleValidationErrors
];
router.get('/', async (req, res, next) => {
    const spots = await Spot.findAll();

    res.json(spots);
})

router.post('/', restoreUser, requireAuth, validatePost, async (req, res, next) => {
    const { address, city, state, country, lat, lng, name, description, price } = req.body;
    const ownerId = req.user.id;
    const newSpot = await Spot.build({ ownerId, address, city, state, country, lat, lng, name, description, price });
    newSpot.save();
    return res.json(newSpot);
})

router.get('/current', restoreUser, requireAuth, async (req, res, next) => {
    const ownerId = req.user.id;
    console.log(req.user.id)
    const spots = await Spot.findAll({
        where: { ownerId }
    })
    return res.json(spots);
})

router.post('/:spotId/images', restoreUser, requireAuth, async (req, res, next) => {
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
        const newSpotImage = await SpotImage.build({ url, preview, spotId });
        newSpotImage.save();
        return res.json(newSpotImage);
    } else res.json({ message: "Must be the owner of the spot to add an image" })
})

router.get('/:spotId', async (req, res, next) => {
    const { spotId } = req.params;
    const spot = await Spot.findByPk(spotId, {
        include: [{
            model: User,
            attributes: ['firstName', 'lastName']
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
    restoreUser,
    requireAuth,
    async (req, res, next) => {
        const { spotId } = req.params;
        const { address, city, state, country, lat, lng, name, description, price } = req.body;

        const spot = await Spot.findByPk(spotId);
        if (req.user.id != spot.ownerId) return res.json({ message: "must own spot to edit" })
        if (!spot) {
            res.status(404);
            res.json({
                message: "Spot couldn't be found",
                statusCode: 404
            });
        };

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
    restoreUser,
    requireAuth,
    async (req, res, next) => {
        const {spotId} = req.params;
        
        const spot = await Spot.findByPk(spotId);

        if(!spot) return res.json({
            message: "Spot couldn't be found",
            statusCode: 404
        } )

        spot.destroy()
        return res.json({ message: "successfully deleted", statusCode: 200});
    }
)
module.exports = router;
