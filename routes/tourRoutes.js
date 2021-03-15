const express = require('express');
const tourController = require('../controllers/tourController');
const authcontroller = require('../controllers/authController');
const { route } = require('./userRoutes');
const {
  createTour,
  getAllTours,
  getTour,
  updateTour,
  deleteTour,
  aliasTop5Tours,
} = tourController;
const router = express.Router();

// router.param('id', checkId);

//create checkbody middleware
//check for the name and price

//if not, send 404 error
//chain the middleware to the createTour
router.route('/').post(createTour).get(authcontroller.protect, getAllTours);
router.route('/:id').get(getTour).patch(updateTour).delete(deleteTour);
router.route('/top-5-tours').get(aliasTop5Tours, getAllTours);
// router.route('/').get(getAllTours).post(createTour);
// router.route('/:id').get(getTour).put(updateTour).delete(deleteTour);

module.exports = router;
