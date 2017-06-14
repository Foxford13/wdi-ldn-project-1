const mongoose   = require('mongoose');
mongoose.Promise = require('bluebird');
const databaseURL =  process.env.MONGODB_URI || 'mongodb://localhost/wdi-ldn-project-1';
mongoose.connect(databaseURL);
const Book = require('../models/book');
const User = require('../models/user');

User.collection.drop();
Book.collection.drop();

User
.create([{
  firstName: 'Jakub',
  lastName: 'Dziekan',
  username: 'foxford',
  email: 'foxford',
  password: 'password',
  passwordConfirmation: 'password'
}])
.then((users) => {
  console.log(`${users.length} users created!`);
  return Book
  .create([{
    title: '1984',
    author: 'George Orwell',
    description: 'In George Orwell\'s 1984, Winston Smith wrestles with oppression in Oceania, a place where the Party scrutinizes human actions with ever-watchful Big Brother. Defying a ban on individuality, Winston dares to express his thoughts in a diary and pursues a relationship with Julia. These criminal deeds bring Winston into the eye of the opposition, who then must reform the nonconformist. George Orwell\'s 1984 introduced the watchwords for life without freedom: BIG BROTHER IS WATCHING YOU.',
    createdBy: users[0]
  },{
    title: 'The Great Gatsby',
    author: 'F. Scott Fitzgerald',
    description: 'The Great Gatsby is a 1925 novel written by American author F. Scott Fitzgerald that follows a cast of characters living in the fictional town of West Egg on prosperous Long Island in the summer of 1922.',
    createdBy: users[0]

  }])
  .then((books) => {
    console.log(`${books.length} books created!`);
  })
  .catch((err) => {
    console.log(err);
  })
  .finally(() => {
    mongoose.connection.close();
  });
});
