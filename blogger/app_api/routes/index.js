var express = require('express');
var router = express.Router();
var ctrlBlogs = require('../controllers/blogs');

router.get('/blogs', ctrlBlogs.blogsList);

router.post('/blogs/add', ctrlBlogs.blogsCreate);

router.get('/blogs/:blogid', ctrlBlogs.blogsReadOne);

router.put('/blogs/:blogid', ctrlBlogs.blogsUpdate);

router.delete('/blogs/:blogid', ctrlBlogs.blogsDelete);

module.exports = router;