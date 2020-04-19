const express = require('express');
const bodyParser = require('body-parser');
const bcrypt = require('bcrypt');
const saltRounds = 10;
const cors = require('cors');
const knex = require('knex');

//controllers
const register = require('./controllers/register');
const signin = require('./controllers/signin');
const profile = require('./controllers/profile');
const image = require('./controllers/image');

//database connection
const db = knex({
  client: 'pg',
  connection: {
    connectionString: process.env.DATABASE_URL, //heroku
    ssl: true,
  }
});

const app = express();
app.use(bodyParser.json());
app.use(cors());

//End points
app.get('/', (req, res) => res.send(db.users))
app.post('/signin', signin.handleSignin( db, bcrypt))
app.post('/register', register.handleRegister(db, bcrypt, saltRounds))
app.get('/profile/:id', profile.handleProfile(db))
app.put('/image', image.handleImage(db))
app.post('/imageurl', image.handleAPICall())

const PORT = process.env.PORT
app.listen(PORT || 3000, () => {
    console.log(`App is running on port ${PORT}`);
})