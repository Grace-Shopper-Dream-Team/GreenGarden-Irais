"use strict";

const {
  db,
  models: { User, Address },
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

  // creating addresses
  const addresses = await Promise.all([
    Address.create({
      street_address: "2245 Prospect Ave",
      city: "Brooklyn",
      state: "NY",
      zipcode: "11208",
      userId: 5
    }),
    Address.create({
      street_address: "123 New York Way",
      city: "Alphabet City",
      state: "NY",
      zipcode: "11207",
      userId: 4
    }),
    Address.create({
      street_address: "1234 Bay Bridge Parkway",
      city: "Bay Ridge",
      state: "NY",
      zipcode: "11207",
      userId: 3
    }),
    Address.create({
      street_address: "2278 Cali Way",
      city: "Los Angeles",
      state: "CA",
      zipcode: "32054",
      userId: 2
    }),
    Address.create({
      street_address: "2234 Palm Tree Drive",
      city: "Laguna Nigel",
      state: "CA",
      zipcode: "12345",
      userId: 1
    }),
  ]);
 console.log(addresses)
 console.log(`seeded ${addresses.length} addresses`);
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
      addresses5: addresses[4]
    }
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
