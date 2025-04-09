import express from "express";

const router = express.Router();

/* GET home page. */
router.get('/', function (req, res, next) {
    res.render('index', {title: 'Express', users: [{name: 'Timmy', age: 5}, {name: 'Jimmy', age: 6}]});
});

export = router;
