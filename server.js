const express = require('express');
const bodyParser = require('body-parser');
const bcrypt = require('bcrypt-nodejs');

const app = express();

app.use(bodyParser.json());

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
    login: [
        {
            id: '004',
            hash: '',
            email: 'jhon@gmail.com'
        }
    ]
}

app.get('/', (req, res) => {
    res.send(database.users);
})

app.post("/signin", (req, res) => {
    bcrypt.compare("annpw", '$2a$10$cGiqqAU3XV2Hp6Bjm/S1Ruc0HXJtpi5sHW0/dliUh8IDDM8r12yHe', function(err, res) {
        console.log('first', res)
    });
    bcrypt.compare("veggies", '$2a$10$cGiqqAU3XV2Hp6Bjm/S1Ruc0HXJtpi5sHW0/dliUh8IDDM8r12yHe', function(err, res) {
        console.log('second', res)
    });
    if (req.body.email === database.users[0].email && req.body.password === database.users[0].password) {
        res.json('success');
    } else {
        res.status(400).json('error logging in');
    }
    res.json('signin')
})

app.post('/register', (req, res) => {
    const {email, password, name} =  req.body;
    // bcrypt.hash(password, null, null, function(err, hash) {
    //     console.log(hash)
    // });
    database.users.push({
        id: '003',
            name: name,
            email: email,
            password: password,
            entries: 0,
            joined: new Date()
    })
    res.json(database.users[database.users.length-1])
})

app.get('/profile/:id', (req, res) => {
    const { id } = req.params;
    let found = false;
    database.users.forEach( user => {
        if(user.id === id){
            found = true;
            return res.json(user);
        }
    })
    if(!found){
        res.status(400).json('user not found')
    }
})

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
