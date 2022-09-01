const express = require('express');
const bodyParser = require('body-parser');
const bcrypt = require('bcrypt-nodejs');
const cors = require('cors');
const knex = require('knex');
const register = require('./controllers/register');
const signin = require('./controllers/signin');
const profile = require('./controllers/profile');
const image = require('./controllers/image');
const clarifai = require('clarifai');


const db = knex({
    client: 'pg',
    connection: {
      host : '127.0.0.1',
      port : 5432,
      user : 'postgres',
      password : '123',
      database : 'face_recog'
    }
  });


// console.log(db.select('*').from('users')); just an example on how to connect to the db

const app = express();

app.use(bodyParser.json());
app.use(cors());

// const database = {
//     users: [
//         {
//             id: '001',
//             name: 'jhon',
//             email: 'jhon@gmail.com',
//             password: 'jhonpw',
//             entries: 0,
//             joined: new Date()
//         },
//         {
//             id: '002',
//             name: 'sally',
//             email: 'sally@gmail.com',
//             password: 'sallypw',
//             entries: 0,
//             joined: new Date()
//         }
//     ],
//     // login: [
//     //     {
//     //         id: '004',
//     //         hash: '',
//     //         email: 'jhon@gmail.com'
//     //     }
//     // ]
// }

app.get('/', (req, res) => {
    res.send('success');
})

app.post("/signin", (req, res) => {signin.handleSignin(req, res, db, bcrypt) })
app.post('/register', (req, res) => {register.handleRegister(req, res, db, bcrypt) })
app.get('/profile/:id', (req, res) =>{profile.handleRegister(req, res, db) })
app.put('/image', (req, res) => {image.handleImage(req, res, db) })
app.post('/imageurl', (req, res) => {image.handleApiCall(req, res) })

app.listen(process.env.PORT || 3000, () => {
    console.log(`app is running on port ${process.env.PORT}`)
})
