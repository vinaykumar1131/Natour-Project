const path = require('path');
const express = require('express');
const dotenv = require('dotenv');
const helmet = require('helmet');
const mongose = require('mongoose');
const route = require('./routes/tourroute');
const users = require('./routes/userroutes');
const BookingRoutes = require('./routes/bookingroutes');
const compression = require('compression');

const revs = require('./routes/reviewRoutes');
const Apperror = require('./utils/apperror');
const senitize = require('express-mongo-sanitize');
const globalerror = require('./control/error');
const viewRoute = require('./routes/viewRoutes');
// var bodyParser = require('body-parser')
const cookieparser = require('cookie-parser');
const cors = require('cors');
dotenv.config({ path: './config.env' });
const app = express();
mongose
  .connect(
    'mongodb://mongodbuse236:mongodbuse236@ac-mg9nnqs-shard-00-00.h3bssxo.mongodb.net:27017,ac-mg9nnqs-shard-00-01.h3bssxo.mongodb.net:27017,ac-mg9nnqs-shard-00-02.h3bssxo.mongodb.net:27017/?ssl=true&replicaSet=atlas-rcaia6-shard-0&authSource=admin&retryWrites=true&w=majority',
    { useNewUrlParser: true, useunifiedtopology: true }
  )
  .then((con) => {
    console.log('yes you connected');
  });
app.set('view engine', 'pug');
app.set('views', path.join(__dirname, 'views'));
const corsOptions = {
  origin: 'http://127.0.0.1:3000',
  credentials: true, //access-control-allow-credentials:true
  optionSuccessStatus: 200,
  exposedHeaders: ['set-cookie'],
};
app.use(express.urlencoded({ extended: true, limit: '10kb' }));

app.use(express.static(path.join(__dirname, 'public')));
app.use(cors(corsOptions));
// app.use(bodyParser.urlencoded({ extended: false }))
// app.use(bodyParser.json())
app.use(cookieparser());
app.use(senitize());
app.use(express.json());
//middleware

//routes
app.use(
  helmet({
    contentSecurityPolicy: false,
    crossOriginEmbedderPolicy: false,
  })
);
app.use(compression());
app.use('/', viewRoute);
app.use('/api/v1/tours', route);
app.use('/api/v1/user', users);
app.use('/api/v1/review', revs);
app.use('/api/v1/booking', BookingRoutes);

app.all('*', (req, res, next) => {
  next(new Apperror(`Can't find ${req.originalUrl} on this server!`, 404));
});
app.use(globalerror);

app.listen(3000, () => {
  console.log('listing...');
});
