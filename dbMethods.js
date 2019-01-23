const MongoClient = require('mongodb').MongoClient;
const url = 'mongodb://localhost:27017/';

// MongoClient.connect(url, function (err, client) {
// 	if (err) throw err;
// 	const db = client.db('usersdb');
// 	const query = { address: /^O/ };
// 	const mysort = { name: -1 };
// 	db.collection('users').find(query).sort(mysort).toArray(function (err, result) {
// 		if (err) throw err;
// 		// eslint-disable-next-line no-console
// 		console.log(result);
// 		client.close();
// 	});
// });

// eslint-disable-next-line no-console
async function getConnection(dbUrl) {
  const client = await MongoClient.connect(dbUrl, { useNewUrlParser: true });
  return client;
}

async function simpleQuery() {
  const client = await getConnection(url);
  const db = await client.db('usersdb');
  const query = { address: /^O/ };
  const mysort = { name: 1 };
  const result = await db.collection('users').find(query).sort(mysort).toArray();
  // eslint-disable-next-line no-console
  console.log(await result);
  await client.close();
  return result;
}

async function dropAllTables() {
  const client = await getConnection(url);
  const db = await client.db('usersdb');
  await db.collection('contacts').drop();
  await db.collection('orders').drop();
  await db.collection('products').drop();
  client.close();
}

async function fillDatabase() {
  const client = await getConnection(url);
  const db = await client.db('usersdb');
  let collection = db.collection('contacts');
  const contacts = [
    { _id: 1, userId: 1, name: 'John', address: 'Highway 71', phone: '78373125', cardID: '3567' },
    { _id: 2, userId: 2, name: 'Peter', address: 'Lowstreet 4', phone: '5648252', cardID: '3474' },
    { _id: 3, userId: 3, name: 'Amy', address: 'Apple st 652', phone: '3245523', cardID: '1245' },
    { _id: 4, userId: 4, name: 'Hannah', address: 'Mountain 21', phone: '78964567', cardID: '8796' },
    { _id: 5, userId: 5, name: 'Michael', address: 'Valley 345', phone: '1351599', cardID: '5013' },
    { _id: 6, userId: 6, name: 'Sandy', address: 'Ocean blvd 2', phone: '123515', cardID: '9237' },
    { _id: 7, userId: 7, name: 'Betty', address: 'Green Grass 1', phone: '425636', cardID: '1904' },
    { _id: 8, userId: 8, name: 'Richard', address: 'Sky st 331', phone: '341627', cardID: '1111' },
    { _id: 9, userId: 9, name: 'Susan', address: 'One way 98', phone: '7807584', cardID: '2211' },
    { _id: 10, userId: 10, name: 'Vicky', address: 'Yellow Garden 2', phone: '2346236', cardID: '7684' },
    { _id: 11, userId: 11, name: 'Ben', address: 'Park Lane 38', phone: '7680678', cardID: '9813' },
    { _id: 12, userId: 12, name: 'William', address: 'Central st 954', phone: '324523623', cardID: '6667' },
    { _id: 13, userId: 13, name: 'Chuck', address: 'Main Road 989', phone: '32463246', cardID: '2490' },
    { _id: 14, userId: 14, name: 'Viola', address: 'Sideway 1633', phone: '78907658', cardID: '4992' }
  ];
  const orders = [
    { _id: 1, userId: 5, productId: 0001 },
    { _id: 2, userId: 10, productId: 0005 },
    { _id: 3, userId: 3, productId: 0003 },
    { _id: 4, userId: 3, productId: 0004 },
    { _id: 5, userId: 8, productId: 0003 },
    { _id: 6, userId: 6, productId: 0003 },
    { _id: 7, userId: 13, productId: 0004 },
    { _id: 8, userId: 12, productId: 0002 },
    { _id: 9, userId: 11, productId: 0002 },
    { _id: 10, userId: 1, productId: 0007 },
    { _id: 11, userId: 12, productId: 0006 },
    { _id: 12, userId: 3, productId: 0002 },
    { _id: 13, userId: 5, productId: 0007 },
    { _id: 14, userId: 3, productId: 0006 },
    { _id: 15, userId: 12, productId: 0004 },
    { _id: 16, userId: 7, productId: 0001 },
    { _id: 17, userId: 6, productId: 0002 }
  ];
  const products = [
    { _id: 1, productId: 0001, description: 'TV' },
    { _id: 2, productId: 0002, description: 'Computer' },
    { _id: 3, productId: 0003, description: 'Usb flash' },
    { _id: 4, productId: 0004, description: 'Mobile phone' },
    { _id: 5, productId: 0005, description: 'Headphones' },
    { _id: 6, productId: 0006, description: 'Notebook' },
    { _id: 7, productId: 0007, description: 'Bag' },
  ];

  collection.insertMany(contacts, function (err, result) {
    if (err) {
      return console.log(err);
    }
    console.log(result.ops);
    client.close();
  });
  collection = db.collection('orders');

  collection.insertMany(orders, function (err, result) {
    if (err) {
      return console.log(err);
    }
    console.log(result.ops);
    client.close();
  });
  collection = db.collection('products');

  collection.insertMany(products, function (err, result) {
    if (err) {
      return console.log(err);
    }
    console.log(result.ops);
    client.close();
  });
}

module.exports = {
  simpleQuery,
  getConnection,
  fillDatabase,
  dropAllTables
}