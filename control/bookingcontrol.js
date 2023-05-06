const stripe = require('stripe')(
  'sk_test_51MV7sESDULNH0Z1DmROtwl9yfTCQLwUrt6PzU4dyGKirGMbKz1O8TNM70WZNtkQa3sEEPSuKsqflToWr92oFxZ3W00avc3vyBV'
);
const Tour = require('../models/model');
const catchAsync = require('../utils/catcherror');
const booking = require('./../models/bookingModel');
const useremail = require('../control/booking');
const users = require('../models/makeuser');
exports.getCheckoutSession = catchAsync(async (req, res, next) => {
  // 1) Get the currently booked tour
  const tour = await Tour.findById(req.params.tourid);
  // console.log(tour);
  // 2) Create checkout session
  const session = await stripe.checkout.sessions.create({
    payment_method_types: ['card'],
    // success_url: `${req.protocol}://${req.get('host')}/my-tours/?tour=${
    //   req.params.tourId
    // }&user=${req.user.id}&price=${tour.price}`,
    success_url: `${req.protocol}://${req.get('host')}/?tour=${tour._id}&user=${
      req.user._id
    }&price=${tour.price}`,
    cancel_url: `${req.protocol}://${req.get('host')}/tour/${tour.slug}`,
    customer_email: req.user.email,
    client_reference_id: req.params.tourId,
    line_items: [
      {
        price_data: {
          currency: 'usd',
          unit_amount: tour.price * 100,

          product_data: {
            name: `${tour.name} Tour`,
            description: tour.summary,
            images: [
              `${req.protocol}://${req.get('host')}/img/tours/${
                tour.imageCover
              }`,
            ],
          },
        },
        quantity: 1,
      },
    ],

    mode: 'payment',
  });

  res.status(200).json({
    status: 'success',
    message: 'reted datav us very ,ych',
    session,
  });
});

exports.createBookingCheckOut = async (req, res, next) => {
  const { tour, user, price } = req.query;
  if (!tour && !user && !price) return next();
  await booking.create({ tour, user, price });
  const data = await users.findById({ _id: user });
  await useremail.bookingemail(data.email, tour);
  res.redirect(req.originalUrl.split('?')[0]);
};
