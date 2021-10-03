const express = require('express')
const cors = require('cors')
const bodyParser = require('body-parser')
const session = require('express-session');
const webpush = require('web-push')
const path = require('path')
const Subscription = require('./models/Subscription')
const { v4: uuidv4 } = require('uuid');
const mongoose = require('mongoose');
const MongoStore = require('connect-mongo');

const app = express()

app.use(cors())
app.use(bodyParser.json())
app.use(express.urlencoded({ extended: true }));

if (process.env.NODE_ENV === "production") {
  app.use(express.static(path.join(__dirname, '/frontend/build')));
}

const dbUrl = process.env.DB_URL

mongoose.connect(dbUrl);

const db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', () => {
    console.log('Database connected');
});

const secret = process.env.SECRET

const store = MongoStore.create({
  mongoUrl: dbUrl,
  crypto: {
    secret
  }
});

store.on('error', function(e){
  console.log('SESSION STORE ERROR', e);
})

const sessionConfig = {
  name: 'session',
  store,
  secret,
  resave: false,
  saveUninitialized: true,
  cookie: {
    httpOnly: true,
    expires: Date.now() + 1000 * 60 * 60 * 24 * 7,
    maxAge: 1000 * 60 * 60 * 24 * 7
  }
}

app.use(session(sessionConfig));

app.post('/save-subscription', async (req, res) => {
  const subscription = new Subscription(req.body)
  const id = uuidv4()
  subscription.token = id
  await subscription.save()
  req.session.token = id
  req.session.save()
  res.json('Successful');
})

const vapidKeys = {
  publicKey:
    'BF_OuAQ0A-_ap93NGudbMn84ZoGJHmEn1VfLn0J9MI7apPBz4cMFo1bCXfrWDdTcL278vBxBbZjc8GfJHqWgzqU',
  privateKey: process.env.KEY
}

webpush.setVapidDetails(
  'mailto:myuserid@email.com',
  vapidKeys.publicKey,
  vapidKeys.privateKey
)

const sendNotification = (subscription, dataToSend) => {
  webpush.sendNotification(subscription, dataToSend)
}

app.get('/send-notification', async (req, res) => {
  const token = req.session.token
  const subscription = await Subscription.find({token: token})
  const subscriptionObj = subscription[0]
  const message = 'Book your slot before it fills out.'
  sendNotification(subscriptionObj, message)
})

const port = process.env.PORT || 3001;

app.listen(port, () => console.log(`Listening on port ${port}!`))