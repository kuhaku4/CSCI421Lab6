var express = require('express');
var router = express.Router();
var jwt = require('express-jwt');
var ctrlBlogs = require('../controllers/blogs');
var ctrlAuth = require('../controllers/authentication');
require('dotenv').config();
var auth = jwt({
    secret: process.env.JWT_SECRET,
    userProperty: 'payload'
  });

router.get('/blogs', ctrlBlogs.blogsList);

router.post('/blogs/add', auth, ctrlBlogs.blogsCreate);

router.get('/blogs/:blogid', ctrlBlogs.blogsReadOne);

router.put('/blogs/:blogid', auth, ctrlBlogs.blogsUpdate);

router.delete('/blogs/:blogid', auth, ctrlBlogs.blogsDelete);

router.post('/register', ctrlAuth.register);

router.post('/login', ctrlAuth.login);

module.exports = router;