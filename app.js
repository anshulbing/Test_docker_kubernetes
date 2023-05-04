const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors');
const app = express();
const User = require('./user');

app.use(cors());
app.use(bodyParser.json());
//Connect to Mongo DB
//mongoose.connect('mongodb://0.0.0.0:27017/myapp', {useNewUrlParser: true});

mongoose.connect(process.env.MONGO_URI, {useNewUrlParser: true});
console.log('Connected to MongoDB…' + 'mongodb://localhost:27017/myApp');
app.listen(3000);
// POST : save User user
app.post('/saveuser', async(req, res) => {
    const user = new User ({
    userName : req.body.userName,
    userType : req.body.userType,
    userPassword : req.body.userPassword,
    userTelNo : req.body.userTelNo,
    userEmail : req.body.userEmail,
    city : req.body.city
    });
    try {
    const savedUser = await user.save()
    res.json(savedUser);
    } catch(err) {
    console.log("ERROR : " + res.json({message : err}));
    }
    });
    // GET : show all users
    app.get('/users', async(req, res) => {
    try {
    const findAll = await User.find();
    res.json(findAll);
    } catch(err) {
    console.log("ERROR : " + res.json({message : err}));
    }
    });
    // GET : find by ID
    app.get('/users/:userId', async(req, res) => {
    try {
    const findById = await User.findById(req.params.userId);
    res.json(findById);
    } catch(err) {
    console.log("ERROR : " + res.json({message : err}));
    }
    });
    // UPDATE : update by ID
    app.patch('/users/:userId', async(req, res) => {
    try {
    const updateById = await User.updateOne({ _id: req.params.userId } , { $set : { userName : req.body.userName} } );
    res.json(updateById);
    } catch(err) {
    console.log("ERROR : " + res.json({message : err}));
    }
    });
    // DELETE : delete by ID
    app.delete('/users/:userId', async(req, res) => {
    try {
    const deleteById = await User.remove( { _id: req.params.userId } );
    res.json(deleteById);
    } catch(err) {
    console.log("ERROR : " + res.json({message : err}));
    }
    });