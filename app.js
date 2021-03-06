const env = require('dotenv').config();
const helmet = require('helmet');
const createError = require('http-errors');
const express = require('express');
const csurf = require('csurf');
const mongoose = require('mongoose');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');


const indexRouter = require('./routes/index');
const announcementRouter = require('./routes/announcement');

const app = express();


// Setup and connect to MongoDB
mongoose.set('useNewUrlParser', true);
mongoose.set('useUnifiedTopology', true);
mongoose.set('useFindAndModify', false);
mongoose.set('useCreateIndex', true);

mongoose.connect(process.env.mongoDBUrl)
    .then(() => console.log('Connected to MongoDB...'))
    .catch(err => console.error('Could not connect to MongoDB...'));





// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

app.use(helmet());
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));


// const csrfMiddleware = csurf({
//   cookie: true,
// });



const csrfMiddleware = csurf({cookie: {
    httpOnly: true,
  }});

app.use(csrfMiddleware);

app.use('/', indexRouter);
app.use('/api/announcement', announcementRouter);


// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function (err, req, res, next) {

  // Check if json is invalid
  if (err instanceof SyntaxError && err.status === 400 && 'body' in err) {
    return res.status(400).send({error: 'Bad JSON'});
  }

  // If request path starts with /api, then it must be an api call
  if (req.path.startsWith('/api')) {
    return res.status(404).send({error: err});
  }

  const devEnv = req.app.get('env') === 'development';

  // if (devEnv) {
  //     res.locals.message = err.message;
  //     res.locals.error = devEnv ? err : {};
  //     // render the error page
  //     res.status(err.status || 500);
  //     return res.render('error');
  // }

  res.status(404).redirect('/create');


});

module.exports = app;
