/*eslint-disable*/
import axios from 'axios';
const stripe = Stripe(
  'pk_test_51MV7sESDULNH0Z1DlS3LSZtDQkGc3Er9MTpWQJBlO4rN7CXck75p0lMoDC4kDf9oYPN8xCrNcCxLLtci4mut3PH0005DlT4gTX'
);
export const bookTour = async (tourId) => {
  try {
    const session = await axios(`/api/v1/booking/checkout-session/${tourId}`);

    await stripe.redirectToCheckout({
      sessionId: session.data.session.id,
    });
  } catch (err) {
    console.log();
  }
};
