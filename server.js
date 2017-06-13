const express = require('express');
const morgan         = require('morgan');
const expressLayouts = require('express-ejs-layouts');
const bodyParser = require('body-parser');
const methodOverride = require('method-override');
const authenticateUser = require('./lib/authenticateUser');
const mongoose       = require('mongoose');
mongoose.Promise     = require('bluebird');
const routes         = require('./config/routes');
const session        = require('express-session');
const flash          = require('express-flash');


const { port, dbURI, secret} = require('./config/environment');



const app = express();
app.set('view engine', 'ejs');
app.set('views', `${__dirname}/views`);


mongoose.connect(dbURI);


app.use(morgan('dev'));
app.use(expressLayouts);
app.use(express.static(`${__dirname}/public`));
app.use(bodyParser.urlencoded({ extended: true }));

app.use(session({
  secret,
  resave: false,
  saveUninitialized: false
}));

app.use(flash());

app.use(methodOverride(function (req) {
  if (req.body && typeof req.body === 'object' && '_method' in req.body) {
    const method = req.body._method;
    delete req.body._method;
    return method;
  }
}));

app.use(authenticateUser);

// app.get('/', (req, res) => res.render('index'));

app.use(routes);
app.listen(port, () => console.log(`Express is listening on port ${port}`));
