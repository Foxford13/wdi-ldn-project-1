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
    image: 'https://indiereader.com/wp-content/uploads/2013/07/gatsby-original2.jpg',
    title: '1984',
    author: 'George Orwell',
    description: 'In George Orwell\'s 1984, Winston Smith wrestles with oppression in Oceania, a place where the Party scrutinizes human actions with ever-watchful Big Brother. Defying a ban on individuality, Winston dares to express his thoughts in a diary and pursues a relationship with Julia. These criminal deeds bring Winston into the eye of the opposition, who then must reform the nonconformist. George Orwell\'s 1984 introduced the watchwords for life without freedom: BIG BROTHER IS WATCHING YOU.',
    locationDesc: 'in a galxy far far away',
    locations: [{lat: 50 , lng: 40 } ],
    createdBy: users[0],
    googleBookId: 'uyr8BAAAQBAJ'

  },{
    image: 'https://indiereader.com/wp-content/uploads/2013/07/gatsby-original2.jpg',
    title: 'the black Company',
    author: 'Glen Cook',
    description: 'The Black Company is a series of fantasy novels written by American author Glen Cook. The series combines elements of epic fantasy and dark fantasy as it follows an elite mercenary unit, The Black Company, through roughly forty years of its approximately four hundred-year history.',
    locationDesc: 'in a galxy far far away',
    locations: [{lat: 50 , lng: 40 } ],
    createdBy: users[0],
    googleBookId: 'jesZhp-iIHQC'
  },{
    image: 'https://indiereader.com/wp-content/uploads/2013/07/gatsby-original2.jpg',
    title: 'The Great Gatsby',
    author: 'F. Scott Fitzgerald',
    description: 'The Great Gatsby is a 1925 novel written by American author F. Scott Fitzgerald that follows a cast of characters living in the fictional town of West Egg on prosperous Long Island in the summer of 1922.',
    locationDesc: 'in a galxy far far away',
    locations: [{lat: 50 , lng: 40 } ],
    createdBy: users[0],
    googleBookId: 'oowlPQAACAAJ'
  },{
    image: 'https://indiereader.com/wp-content/uploads/2013/07/gatsby-original2.jpg',
    title: 'The Great Gatsby',
    author: 'F. Scott Fitzgerald',
    description: 'The Great Gatsby is a 1925 novel written by American author F. Scott Fitzgerald that follows a cast of characters living in the fictional town of West Egg on prosperous Long Island in the summer of 1922.',
    locationDesc: 'in a galxy far far away',
    locations: [{lat: 50 , lng: 40 } ],
    createdBy: users[0],
    googleBookId: 'oowlPQAACAAJ'

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
