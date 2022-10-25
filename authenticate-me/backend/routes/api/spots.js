const express = require('express')

const { setTokenCookie, restoreUser, requireAuth } = require('../../utils/auth');
const { User, Spot, SpotImage } = require('../../db/models');
const { check } = require('express-validator');
const { handleValidationErrors } = require('../../utils/validation');

const router = express.Router();

const validatePost = [
    check('address')
        .exists({checkFalsy: true})
        .withMessage('Please provide a valid address'),
    handleValidationErrors
];
router.get('/', async(req, res, next) => {
    const spots = await Spot.findAll();

    res.json(spots);
})

router.post('/', restoreUser, requireAuth, validatePost, async(req, res, next) => {
    const {address, city, state, country, lat, lng, name, description, price} = req.body;
    const ownerId = req.user.id;
    const newSpot = await Spot.build({ownerId, address, city, state, country, lat, lng, name, description, price});
    newSpot.save();
    return res.json(newSpot);
})

router.get('/current', restoreUser, requireAuth, async (req, res, next) => {
    const ownerId = req.user.id;
    console.log(req.user.id)
    const spots = await Spot.findAll({
        where: {ownerId}
    })
    return res.json(spots);
})

router.post('/:spotId/images', restoreUser, requireAuth, async (req, res, next) => {
    const {spotId} = req.params;
    const {url, preview} = req.body;
    const spot = await Spot.findByPk(spotId)
    if(!spot) {
        res.status(404)
        return res.json({
            message: "Spot couldn't be found",
            statusCode: 404
        })
    }
    if(spot.ownerId === req.user.id) {
        const newSpotImage = await SpotImage.build({url, preview, spotId});
        newSpotImage.save();
        return res.json(newSpotImage);
    } else res.json({message: "Must be the owner of the spot to add an image"})
})

router.get('/:spotId', async (req, res, next) => {
    const {spotId} = req.params;
    const spot = await Spot.findByPk(spotId, {
        include: [{
            model: User,
            attributes: ['firstName', 'lastName']
        },
        {model: SpotImage}
    ]
    })
    if(!spot) {
        res.status(404)
        return res.json({
            message: "Spot couldn't be found",
            statusCode: 404
        })
    }
    res.json(spot);
})

module.exports = router;
