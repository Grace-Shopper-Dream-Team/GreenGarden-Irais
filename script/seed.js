"use strict";

const {
  db,
  models: { User, Address, Product, LineItem, Order },
} = require("../server/db");

/**
 * seed - this function clears the database, updates tables to
 *      match the models, and populates the database.
 */

async function seed() {
  await db.sync({ force: true }); // clears db and matches models to tables
  console.log("db synced!");

  // Creating Users
  const users = await Promise.all([
    User.create({
      username: "cody",
      password: "123",
      firstName: "Cody",
      lastName: "Martin",
      email: "codym@email.com",
    }),
    User.create({
      username: "jimmie",
      password: "kfejk@*_",
      firstName: "Jimmie",
      lastName: "Kam",
      email: "jimmiek@email.com",
    }),
    User.create({
      username: "don",
      password: "ewedon",
      firstName: "Don",
      lastName: "Romer",
      email: "donr@email.com",
    }),
    User.create({
      username: "kevin",
      password: "kev09370",
      firstName: "Kevin",
      lastName: "Ryan",
      email: "kr@email.com",
    }),
    User.create({
      username: "john",
      password: "m4345@*_",
      firstName: "John",
      lastName: "Doe",
      email: "jd@email.com",
    }),
  ]);

  console.log(`seeded ${users.length} users`);
  console.log(`seeded successfully`);

  // Creating Addresses
  const addresses = await Promise.all([
    Address.create({
      street_address: "2245 Prospect Ave",
      city: "Brooklyn",
      state: "NY",
      zipcode: "11208",
      userId: 5,
    }),
    Address.create({
      street_address: "123 New York Way",
      city: "Alphabet City",
      state: "NY",
      zipcode: "11207",
      userId: 4,
    }),
    Address.create({
      street_address: "1234 Bay Bridge Parkway",
      city: "Bay Ridge",
      state: "NY",
      zipcode: "11207",
      userId: 3,
    }),
    Address.create({
      street_address: "2278 Cali Way",
      city: "Los Angeles",
      state: "CA",
      zipcode: "32054",
      userId: 2,
    }),
    Address.create({
      street_address: "2234 Palm Tree Drive",
      city: "Laguna Nigel",
      state: "CA",
      zipcode: "12345",
      userId: 1,
    }),
  ]);

  console.log(`seeded ${addresses.length} addresses`);
  console.log(`seeded successfully`);
  console.log("db synced!");

  // Creating Products
  const products = await Promise.all([
    Product.create({
      name: "Aloe Vera",
      imageUrl:
        "https://cdn.apartmenttherapy.info/image/upload/f_auto,q_auto:eco,c_fit,w_730,h_488/at%2Farchive%2F8a1ff3f2d8ccbee3918ad01b75417e5b59f19686",
      price: 12.99,
      desc: `Having an aloe vera plant around (and using it, should the need arise), can make even the most modern and high-tech of us feel like herbalist apothecaries. Snipping off a piece of an aloe vera’s leaf and applying the clear, cool gel on burns, cuts, rashes, and sunburns offers instant relief and can speed the healing process. Here's how to care for an aloe vera of your own.`,
    }),
    Product.create({
      name: "Croton",
      imageUrl:
        "https://cdn.apartmenttherapy.info/image/upload/f_auto,q_auto:eco,c_fit,w_730,h_487/at%2Farchive%2F25614fda9b9b6b3bd941877096b16dd9ce9350ab",
      price: 34.89,
      desc: `People love the dramatic yellow, orange, silver, red, white —or even black — multi-colored leaves of croton plants, but don’t know they can also be quite challenging to grow. When I asked about them at a local plant shop, they said that they don’t even carry them because they tend to drop their leaves during transport, so you may need to hunt around to find them. Once you do, you have to really know what you’re doing to keep this diva of a plant happy. But, if you think you’re up to the challenge, here’s a croton cheatsheet.`,
    }),
    Product.create({
      name: "Ficus",
      imageUrl:
        "https://cdn.apartmenttherapy.info/image/upload/f_auto,q_auto:eco,c_fit,w_730,h_1095/at%2Fhouse%20tours%2Farchive%2FSean%2Fbbb7d7dfb0d64427e59ff6aa1e7cb9c0cc10b206",
      price: 258.78,
      desc: `Ficus plants have been making dramatic statements in homes for decades. These are the same plants that we saw in our grandparents’ homes; but, with the resurgence of large, dramatic plants in the design world, it’s not surprising that everyone and their cousin now has—or desperately wants—some kind of ficus in their living space. Like some other popular trendy plants, there’s often more than meets the eye. To be honest, a ficus can be a total beast to care for. Here’s what you need to know.`,
    }),
    Product.create({
      name: "Jade",
      imageUrl:
        "https://cdn.apartmenttherapy.info/image/upload/f_auto,q_auto:eco,c_fit,w_730,h_487/stock%2Fshutterstock_773040514",
      price: 23.45,
      desc: `We mean well, of course. We forgetful water-ers bring home a new plant and have every intention of finding the perfect watering schedule for it and nurturing it along to booming growth and good health. And then reality sets in and before you know it, it’s sagging in the corner, prompting us to realize that it might be a few days (or weeks!) overdue for a long, cool drink. Sound familiar? If so,we have the perfect new plant for you…`,
    }),
    Product.create({
      name: "Lavender",
      imageUrl:
        "https://cdn.apartmenttherapy.info/image/upload/f_auto,q_auto:eco,c_fit,w_730,h_488/at%2Fart%2Fphoto%2F2019-05%2Fgrowing-lavender-indoors%2Flead",
      price: 23.87,
      desc: `Looking for a houseplant that will give back? Why not try lavender (Lavandula angustifolia)? Lavender calms you when you’re stressed and provides a stellar flavor profile in desserts and cocktails. What do you have to lose?`,
    }),
    Product.create({
      name: "Lemon Button Fern",
      imageUrl:
        "https://cdn.apartmenttherapy.info/image/upload/f_auto,q_auto:eco,c_fit,w_730,h_974/stock%2Fshutterstock_1130282816",
      price: 15.98,
      desc: `Many people find that they can’t keep ferns alive, and there are many many fern varieties out there. If you haven’t been able to keep a fern alive in your home but haven’t tried a lemon button fern yet, this plant is for you. The lemon button fern (Nephrolepis cordifolia “Duffii”) is a beautiful plant, suited for both a novice and a professional collector.`,
    }),
    Product.create({
      name: "Lemon Tree",
      imageUrl:
        "https://cdn.apartmenttherapy.info/image/upload/f_auto,q_auto:eco,c_fit,w_730,h_487/stock%2FGettyImages-1205903300",
      price: 101.99,
      desc: `Walk into a botanical conservatory at any time of year and you’re going to stumble upon a plethora of citrus trees ready to bear fruit for the masses. Even more specifically, you’re going to see a lot of lemon trees. It’s possible that you’ve just noticed the beauty of a potted Meyer Lemon tree, but keeping citrus trees indoors is far from a new fad. For hundreds of years, lemon trees have been making waves in gardens and homes across the world. Their fragrant blooms and delicious fruits keep them in high demand, whether you have a chateau in the French countryside or a studio apartment in Brooklyn. `,
    }),
    Product.create({
      name: "Money Tree",
      imageUrl:
        "https://cdn.apartmenttherapy.info/image/upload/f_auto,q_auto:eco,c_fit,w_730,h_486/project%20prism%2Fcolor%20search%20archive%2F95356a0830788aa37fa166d9d8818fbada3ebb89",
      price: 65.77,
      desc: `If you’ve ever noticed a little potted tree with an unusual braided trunk (that’s one on the far left in the photo above), you’ve encountered a money tree. The trunk braid and leaves have symbolism for many people who believe that they bring good luck and financial success.`,
    }),
    Product.create({
      name: "Rubber Plant",
      imageUrl:
        "https://cdn.apartmenttherapy.info/image/upload/f_auto,q_auto:eco,c_fit,w_730,h_487/project%20prism%2Fcolor%20search%20archive%2F89f5a8844ff040228052e92b31ca867051e36b01",
      price: 88.99,
      desc: `In recent years, the ubiquitous fiddle leaf fig has dominated all other entrants in the competition for most popular in-house tree-like plants. But we think it’s time to give this understated but stately tree — with its large, deep green leaves — a second look and another chance. Here’s how to maintain a rubber plant as a striking part of your home decor for years to come.`,
    }),
    Product.create({
      name: "String of Pearls",
      imageUrl:
        "https://cdn.apartmenttherapy.info/image/upload/f_auto,q_auto:eco,c_fit,w_730,h_487/project%20prism%2Fcolor%20search%20archive%2F5e06e150da339f84d1b4b795655e524f485c7679",
      price: 22.56,
      desc: `Not to throw shade at other succulents, but the string of pearls (Senecio rowleyanus) succulent is a show-stopper. With its overflowing vines and bubbly pearl-like leaves, it’s an eye catcher that looks beautiful trailing across a desk or bookshelf or even hanging in a sunny window, where the vines can trail down for interest. Although these plants look delicate, they’re part of the succulent family—a generally easy-to-care-for group of plants. This one in particular is a sure winner for a special space by your window. Read on for tips for growing and caring for this special plant.`,
    }),
  ]);

  console.log(`seeded ${products.length} products`);
  // Creating Line Items (Products in cart & purchased, organized by user)
  const lineItems = await Promise.all([
    LineItem.create({
      productId: 5,
      orderId: 1,
      price: 12.99,
      qty: 1,
    }),
    LineItem.create({
      productId: 2,
      orderId: 2,
      price: 34.89,
      qty: 2,
    }),
    LineItem.create({
      productId: 6,
      orderId: 2,
      price: 15.98,
      qty: 8,
    }),
    LineItem.create({
      productId: 3,
      orderId: 2,
      price: 258.78,
      qty: 3,
    }),
    LineItem.create({
      productId: 9,
      orderId: 3,
      price: 88.99,
      qty: 1,
    }),
    LineItem.create({
      productId: 10,
      orderId: 3,
      price: 22.56,
      qty: 5,
    }),
  ]);

  // Creating Orders
  const orders = await Promise.all([
    Order.create({
      userId: 1,
      email: "codym@email.com",
      status: "In Cart",
      orderDate: "11/3/22",
    }),
    Order.create({
      userId: 2,
      email: "jimmiek@email.com",
      status: "In Cart",
      orderDate: "11/3/22",
    }),
    Order.create({
      userId: 3,
      email: "donr@email.com",
      status: "In Cart",
      orderDate: "11/2/22",
    }),
    Order.create({
      userId: 4,
      email: "kr@email.com",
      status: "In Cart",
      orderDate: "11/2/22",
    }),
    Order.create({
      userId: 5,
      email: "jd@email.com",
      status: "In Cart",
      orderDate: "11/2/22",
    }),
    Order.create({
      userId: 1,
      email: "codym@email.com",
      status: "In Cart",
      orderDate: "11/1/22",
    }),
    Order.create({
      userId: 2,
      email: "jimmiek@email.com",
      status: "Purchased",
      orderDate: "10/31/22",
    }),
    Order.create({
      userId: 3,
      email: "donr@email.com",
      status: "Purchased",
      orderDate: "10/31/22",
    }),
    Order.create({
      userId: 4,
      email: "kr@email.com",
      status: "Purchased",
      orderDate: "10/31/22",
    }),
    Order.create({
      userId: 5,
      email: "jd@email.com",
      status: "Purchased",
      orderDate: "10/28/22",
    }),
  ]);

  console.log(`seeded ${users.length} users`);
  console.log(`seeded ${products.length} products`);
  console.log(`seeded ${lineItems.length} lineItems`);
  console.log(`seeded ${orders.length} orders`);
  console.log(`seeded successfully`);

  return {
    users: {
      cody: users[0],
      jimmie: users[1],
      don: users[2],
      kevin: users[3],
      john: users[4],
    },
    addresses: {
      address1: addresses[0],
      address2: addresses[1],
      address3: addresses[2],
      addresses4: addresses[3],
      addresses5: addresses[4],
    },
    products: {
      aloe: products[0],
      croton: products[1],
      ficus: products[2],
      jade: products[3],
      lavender: products[4],
      lemonButtonFern: products[5],
      lemonTree: products[6],
      moneyTree: products[7],
      rubberPlant: products[8],
      stringOfPearls: products[9],
    },
    lineItems: {
      lavenderLI: lineItems[0],
      crotonLI: lineItems[1],
      lemonButtonFernLI: lineItems[2],
      ficusLI: lineItems[3],
      rubberPlantLI: lineItems[4],
      stringOfPearlsLI: lineItems[5],
    },
    orders: {
      codyOrder: orders[0],
      jimmieOrder: orders[1],
      donOrder: orders[2],
      kevinOrder: orders[3],
      johnOrder: orders[4],
      codyOrder: orders[5],
      jimmieOrder: orders[6],
      donOrder: orders[7],
      kevinOrder: orders[8],
      johnOrder: orders[9],
    },
  };
}

/*
 We've separated the `seed` function from the `runSeed` function.
 This way we can isolate the error handling and exit trapping.
 The `seed` function is concerned only with modifying the database.
*/
async function runSeed() {
  console.log("seeding...");
  try {
    await seed();
  } catch (err) {
    console.error(err);
    process.exitCode = 1;
  } finally {
    console.log("closing db connection");
    await db.close();
    console.log("db connection closed");
  }
}

/*
  Execute the `seed` function, IF we ran this module directly (`node seed`).
  `Async` functions always return a promise, so we can use `catch` to handle
  any errors that might occur inside of `seed`.
*/
if (module === require.main) {
  runSeed();
}

// we export the seed function for testing purposes (see `./seed.spec.js`)
module.exports = seed;
