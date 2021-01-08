const express = require("express");
const jwt = require('jsonwebtoken');
const User = require('./schemas/User');
const authorize = require('./middlewares/authorize');
const Post = require("./schemas/Post");
const { SECRET_KEY } = require("./config/keys");
const router = express.Router();

router.get("/", (req, res) => {
    res.send("Hello World!");
});

// POST method for log in
router.post("/sign-in", (req, res) => {
    
    const {email, password} = req.body;

    if(!email || !password){
        return res.status(400).json({"error" : "Please add all the fields!"});
    }

    //Check if the email exists or not
    User.findOne({email}, (err, doc) => {
        if(err || !doc){
            return res.status(401).json({"error" : "Invalid username or password!"});
        }

        if(doc.password !== password){
            return res.status(401).json({"error" : "Invalid username or password!"});
        }

        const token = jwt.sign({_id: doc._id}, SECRET_KEY);
        console.log(token);
        res.cookie('token', token, {
            httpOnly: true
        });
        res.json({'success' : 'login successful!',
                    'user' : doc._id
                });
    });
});

//POST method for sign up
router.post("/sign-up", (req, res) => {
    //Extract the name,  password and email
    const {name, email, password} = req.body;
    console.log(name, email, password);
    if(!name || !email || !password){
        res.status(400).json({"error" : "Please add all the fields!"});
    }

    // Check if the given email already exists
    User.findOne({email}, (err, doc) =>{
        if(doc){
            res.status(422).json({"error": "Email already exists!"});
        }

        const user = new User({
            name,
            email,
            password
        });

        user.save().then((doc) => {
            console.log(doc);
            res.json({"success" : "Saved successfully!"});
        }).catch(err => {
            console.log(`Error : ${err}`);
            res.status(422).json({"error" : "Oops! something went wrong!"});
        });
    });

});

//POST method for making a new post
router.post('/new-post', authorize, (req, res) => {
    const postedBy = req.user;
    const {body, image} = req.body;

    if(!body || !postedBy){
        res.status(400).json({"error" : "Please type something!"});
    }

    const post = new Post({
        body,
        postedBy,
        image
    });

    post.save().then((doc) => {
        console.log(doc);
        res.json({"success" : "Posted successfully!"});
    }).catch(err => {
        console.log(`Error : ${err}`);
        res.status(422).json({"error" : "Oops! something went wrong!"});
    });
});

//GET method to the 'all-posts' endpoint
router.get("/all-posts", authorize, (req, res) =>{
    //Find all the posts
    Post.find({}).
    populate("postedBy", "name")
    .then(docs => {
        console.log("All posts : \n" + docs);
        res.json(docs);
    }, err => {
        console.log("All posts error : \n" + err);
        return res.status(422).json({"error" : "Oops! something went wrong!"});
    });
});

router.get("/my-posts", authorize, (req, res) => {
    const {_id} = req.user;
    Post.find({postedBy : _id}, (err, docs) => {
        if(err){
            console.log("My posts error : "+ err);
            return res.status(422).json({'error' : 'Oops! something went wrong!'});
        }

        console.log("My posts : "+ docs);
        res.json(docs);
    })
});


module.exports = router;