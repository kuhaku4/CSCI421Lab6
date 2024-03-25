var request = require('request');
//const { response } = require('express');
var apiOptions = {
  server : "http://localhost:80", //+process.env.PORT,
  uri: {
    blogapi: {
      add: "/api/blogs/add",
      list: "/api/blogs",
      listone: "/api/blogs/"
    }
  }
};

/* GET blogs lists */      
module.exports.list = function(req, res){
  var requestOptions, path;
  path = apiOptions.uri.blogapi.list;
  requestOptions = { 
      url : apiOptions.server + path,
      method : "GET",
      json : {},
      qs : {} 
      };
  request(
      requestOptions,
      function(err, response, body) {
          renderListPage(req, res, body);
      }
  );
};

/* Render the blog list page */
var renderListPage = function(req, res, responseBody){
  res.render('blogList', {
      title: 'Blog List',
      pageHeader: {
          title: 'Blog List'
      },
      blogs: responseBody
  });
};


/* Blog Show */
module.exports.edit = function(req, res) {
  var requestOptions, path;
  var blogid = req.params.blogid;
  path = apiOptions.uri.blogapi.listone + blogid;
  requestOptions = {
      url : apiOptions.server + path,
      method : "GET",
      json : {}
  }; 
  request(
      requestOptions,
      function(err, response, body) {
              renderEditPage(req, res, body);
    }
  );
};

/* Render the Blog edit page */
var renderEditPage = function(req, res, responseBody){
  res.render('blogEdit', {
      title: 'Blog Edit',
      pageHeader: {
          title: 'Blog Edit'
      },
      blog: responseBody
  });
};


/* Blog Edit Post */
module.exports.editBlog = function(req, res){
  var requestOptions, path, blogData;
  var blogid = req.params.blogid;
  path = apiOptions.uri.blogapi.listone + blogid;

  blogData = {
      blogtitle: req.body.blogtitle,
      blogtext: req.body.blogtext
  };

  requestOptions = {
      url : apiOptions.server + path,
      method : "PUT",
      json : blogData
  };

  request(
requestOptions,
      function(err, response, body) {
          if (!err) {
              res.redirect('/blogs');
          } else {
              res.status(response.statusCode).send('An error occurred');
          }
      }
  );
};

/* Blog Add */
module.exports.add = function(req, res) {
  res.render('addBlog', { title: 'Add Blog' });
};    

/* Blog Add Blog */
module.exports.addBlog = function(req, res){
  var requestOptions, path, blogData;
  path = apiOptions.uri.blogapi.add;

  blogData = {
      blogtitle: req.body.blogtitle,
      blogtext: req.body.blogtext
  };

  requestOptions = {
      url: apiOptions.server + path,
      method: "POST",
      json: blogData
  };
  
    request(
      requestOptions,
      function(err, response, body) {
        if (response.statusCode === 201) {
              res.redirect('/blogs');
        } else {
              res.status(response.statusCode).send('An error occurred');
        } 
      }
  );
}

/* Blog Delete */
module.exports.del = function(req, res) {
  var requestOptions, path;
  var blogid = req.params.blogid;
  path = apiOptions.uri.blogapi.listone + blogid;

  requestOptions = {
      url : apiOptions.server + path,
      method : "GET",
      json : {}
  };
  request(
requestOptions,
      function(err, response, body) {
          renderDeletePage(req, res, body);
      }
  );
};

/* Render the blook delete page */
var renderDeletePage = function(req, res, responseBody){
      res.render('deleteBlog', {
      title: 'Blog Delete',
      pageHeader: {
              title: 'blog Delete'
      },
      blog: responseBody
  });
};

/* Blog Delete Blog */
module.exports.deleteBlog = function(req, res){
  var requestOptions, path, blogid;
  blogid = req.params.blogid;
  path = apiOptions.uri.blogapi.listone + blogid;

  requestOptions = {
      url : apiOptions.server + path,
      method : "DELETE",
      json : {}
  };

  request(
      requestOptions,
      function(err, response, body) {
          if (response.statusCode === 204) {
              res.redirect('/blogs');
          } else {
            res.status(response.statusCode).send('An error occurred');
          }
      }
  );
};