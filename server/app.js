// loads are enviornemnt vars
// require('dotenv').config()
const path = require("path");
const express = require("express");
const morgan = require("morgan");
const app = express();
module.exports = app;

// const stripe = require('stripe')(process.env.STRIPE_PRIVATE_KEY)
// logging middleware
app.use(morgan("dev"));

// body parsing middleware
app.use(express.json());

// auth and api routes
app.use("/auth", require("./auth"));
app.use("/api", require("./api"));

app.get("/", (req, res) =>
  res.sendFile(path.join(__dirname, "..", "public/index.html"))
);

// Health check
app.get("/healthy", (req, res) => res.sendStatus(200));

// static file-serving middleware
app.use(express.static(path.join(__dirname, "..", "public")));

// any remaining requests with an extension (.js, .css, etc.) send 404
app.use((req, res, next) => {
  if (path.extname(req.path).length) {
    const err = new Error("Not found");
    err.status = 404;
    next(err);
  } else {
    next();
  }
});

// sends index.html
app.use("*", (req, res) => {
  res.sendFile(path.join(__dirname, "..", "public/index.html"));
});

// app.post('/create-checkout-session', async (req, res) => {
//   try {
//     const session = await stripe.checkout.sessions.create({
//       payment_method_types: ['card'],
//       mode: 'payment',
//       // line_items: req.body.items.map(item => {
//       //   const store
//       // }),
//       success_url: `${process.env.SERVER_URL}/sucess.html`,
//       cancel_url: `${process.env.SERVER_URL}/cancel.html`
//     })
//     res.json({ url: session.url })
//   } catch (e) {
//     res.status(500).send(e.message)
//   }
// })

// error handling endware
app.use((err, req, res, next) => {
  console.error(err);
  console.error(err.stack);
  res.status(err.status || 500).send(err.message || "Internal server error.");
});
