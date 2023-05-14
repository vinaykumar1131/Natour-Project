/*eslint-disable*/
import axios from 'axios';
const stripe = Stripe(process.env.stripePublishKey);
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
