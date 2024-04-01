var express = require('express');
var router = express.Router();
var ctrlBlogs = require('../controllers/blogs');
var ctrlAuth = require('../controller/authentication');
require('dotenv').config();
var jwt = require('express-jwt');

var auth = jwt({
    secret: process.env.JWT_SECRET,
    userProperty: 'payload'
});


router.get('/blogs', ctrlBlogs.blogsList);

router.post('/blogs/add', ctrlBlogs.blogsCreate);

router.get('/blogs/:blogid', ctrlBlogs.blogsReadOne);

router.put('/blogs/:blogid', ctrlBlogs.blogsUpdate);

router.delete('/blogs/:blogid', ctrlBlogs.blogsDelete);

module.exports = router;