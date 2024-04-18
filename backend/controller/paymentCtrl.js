// const Razorpay = require ('razorpay');
const stripe = require("stripe")(
  "sk_test_51NLkxLJPJ5wzoJzUWJs6LpTkgNT2l0QrKOU3lI6Wxu1iXWMDIHsQLHvAySErbEmyrFDFRqNBSkFJWkiu0obdlbMB00RhYyL4Ho"
);
/*const instance = new Razorpay({
   key_id:"", key_secret:""
})*/
// SECRET_KEY = sk_test_51NHL7pLcJt15HlXsKtLQESaXOeOX0TJ79UT513OuvOuyAhrCNUOMs9iPeXG1axUHvuTAxnLoEufTiqhCgIUNJSQy00r5kdw1n0
//l
const checkout = async (req, res) => {
  const { amount } = req.body;
  const amountInCents = amount * 100; // Convert amount from dollars to cents
  const option = {
    amount: amountInCents,
    currency: "usd",
  };
  const session = await stripe.checkout.sessions.create({
    line_items: [
      {
        price_data: {
          currency: option.currency,
          product_data: {
            name: "Glow it all Checkout",
          },
          unit_amount: option.amount,
        },
        quantity: 1,
      },
    ],
    mode: "payment",
    success_url: `http://localhost:3000/payment-success?session_id={CHECKOUT_SESSION_ID}`,
    cancel_url: `http://localhost:3000/payment-reject?session_id={CHECKOUT_SESSION_ID}`,
  });
  res.status(200).json({
    success: true,
    url: session.url,
    session: session,
    amount: amountInCents,
    currency: option.currency,
  });
};
const paymentVerification = async (req, res) => {
  // const{razorpayOrderId, razorpayPaymentId} = req.body;
  // res.json({
  //     razorpayOrderId, razorpayPaymentId
  // })
};

module.exports = {
  checkout,
  paymentVerification,
  
};
