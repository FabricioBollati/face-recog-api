const express = require('express');
const bodyParser = require('body-parser');
const bcrypt = require('bcrypt-nodejs');
const cors = require('cors');
const knex = require('knex');


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

const database = {
    users: [
        {
            id: '001',
            name: 'jhon',
            email: 'jhon@gmail.com',
            password: 'jhonpw',
            entries: 0,
            joined: new Date()
        },
        {
            id: '002',
            name: 'sally',
            email: 'sally@gmail.com',
            password: 'sallypw',
            entries: 0,
            joined: new Date()
        }
    ],
    // login: [
    //     {
    //         id: '004',
    //         hash: '',
    //         email: 'jhon@gmail.com'
    //     }
    // ]
}

app.get('/', (req, res) => {
    res.send(database.users);
})

app.post("/signin", (req, res) => {
    if (req.body.email === database.users[0].email && req.body.password === database.users[0].password) {
        res.json(database.users[0]);
    } else {
        res.status(400).json('error logging in');
    }
})

app.post('/register', (req, res) => {
    const {email, password, name} =  req.body;
    db('users')
        .returning('*')
        .insert({
            email: email,
            name: name,
            joined: new Date()
    })
    .then( user => {
        res.json(user)
    })
    .catch(err => res.status(404).json(err))
    
})

app.get('/profile/:id', (req, res) => {
    const { id } = req.params;
    db.select('*').from('users').where({id})
    .then( user => {
        if (user.length){
            res.json(user[0]);
        } else {
            res.status(400).json('user not found')
        }
    })  
    .catch(err => res.status(400).json('error getting user'))

})
    

    // if(!found){
    //     res.status(400).json('user not found')
    // }


app.put('/image', (req, res) => {
    const { id } = req.body;
    let found = false;
    database.users.forEach( user => {
        if(user.id === id){
            found = true;
            user.entries++
            return res.json(user.entries);
        }
    })
    if(!found){
        res.status(400).json('user not found')
    }
})



app.listen(3000, () => {
    console.log('app is running on port 3000')
})
