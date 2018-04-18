/**
 * Created by proteux on 4/15/18.
 */

const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const morgan =  require('morgan');

const app = express();
app.use(express.json());

const Users = require('./routes/users');

mongoose.connect('mongodb://localhost/finderapp')
    .then(()=>{
    console.log('Server Successfully Connected')
    }).catch(err => {
        console.log(err)
});

require('./models/Users');
const User = mongoose.model('users');

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());


app.get('/', (req, res)=>{
   res.send('server connected');
});

app.use(morgan('dev'));
app.use('/user', Users);



const port = 5200;

app.listen(port, (req, res)=>{
   console.log('Successfully Connected');
});
