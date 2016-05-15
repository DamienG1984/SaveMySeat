var express = require('express');
var controller = require('./rests.controller');

var router = express.Router();

router.get('/', controller.index);
router.get('/:id', controller.show);
router.post('/', controller.create);
router.post('/:id/upvotes', controller.update_upvotes);
router.post('/:id/downvotes', controller.update_downvotes);
router.post('/:id/reviews', controller.add_review);
router.post('/:id/bookings', controller.add_booking);
router.put('/:id/UpdateSpaces', controller.updateRestTables);
router.post('/:rest_id/Reviews/:review_id/upvotes', controller.update_review_upvotes);
router.post('/:rest_id/Reviews/:review_id/downvotes', controller.update_review_downvotes);
router.delete('/:rest_id/bookings/:booking_id', controller.destroy);

module.exports = router;