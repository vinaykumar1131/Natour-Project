const mytour = require('../models/model');
const catchasnc = require('../utils/catcherror');
const AppError = require('../utils/apperror');
const booking = require('../models/bookingModel');
exports.getOverview = catchasnc(async (req, res) => {
  const tour = await mytour.find();
  console.log(tour.length);
  res.status(200).render('overview', {
    title: 'overview',
    tour,
  });
});
exports.getTour = catchasnc(async (req, res, next) => {
  const data = await mytour.findOne({ slug: req.params.slug }).populate({
    path: 'review',
    fields: 'review rating user',
  });
  if (!data) {
    return next(new AppError('There is no tour with that name.', 404));
  }
  console.log(data);
  res.status(200).render('tour', {
    title: 'The bname ',
    data,
  });
});

exports.LoginUser = catchasnc(async (req, res, next) => {
  res.status(200).render('login');
});
exports.signuser = catchasnc(async (req, res, next) => {
  res.status(200).render('signup');
});
exports.getaccount = (req, res) => {
  console.log('i call the get me');
  res.status(200).render('accounttemplate', {
    title: 'Your Account',
  });
};
exports.updateuser = catchasnc(async (req, res, next) => {
  console.log(req.body);
});

exports.getMyTour = catchasnc(async (req, res) => {
  const tours = await booking.find({ user: req.user._id });
  const ids = tours.map((el) => el.tour._id);
  const tour = await mytour.find({ _id: { $in: ids } });
  res.status(200).render('overview', {
    title: 'My tour',
    tour,
  });
});
