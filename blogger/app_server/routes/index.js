var express = require('express');
var router = express.Router();
var ctrlHome = require('../controllers/homepage');
var ctrlBlog = require('../controllers/blog');

/* GET home page. */
router.get('/', ctrlHome.home);

/* GET blogs lists */
router.get('/blogs', ctrlBlog.list);

/* Blog Edit */
router.get('/blogs/:blogid/edit', ctrlBlog.edit);

/* Blog Edit Post */
router.post('/blogs/:blogid/edit', ctrlBlog.editBlog);

/* Blog Add */
router.get('/blogs/add', ctrlBlog.add);

/* Blog Add Post */
router.post('/blogs/add', ctrlBlog.addBlog);

/* Blog Delete */
router.get('/blogs/:blogid/delete', ctrlBlog.del);

/* Blog Delete Post */
router.post('/blogs/:blogid/delete', ctrlBlog.deleteBlog);

module.exports = router;