var routes = require('express').Router();
var db = require('../db/db');
var authorDao = require('../dao/authorDao');

routes.get('/authors',function(req,res){
    authorDao.getAllAuthors(function(error, result){
      if(error) throw error;
      res.setHeader('Content-Type', 'application/json');
      res.send(result);
    });
});

routes.post('/authors', function(req, res){
  var author = req.body;
  authorDao.addAuthor(author, function(err, result){
    if(err){
      res.status(400);
      res.send('Add Author Failed!');
    }
    res.status(201);
    res.send('Add Author Successful!');
  });

});

routes.put('/authors/:id', function(req, res){
  var author = req.body;
  authorDao.updateAuthor(req.params.id, author, function(err, result){
    if(err){
      res.status(400);
      res.send('Update Author Failed!');
    }
    res.send('Update Author Successful!');
  });
});


routes.delete('/authors/:id', function(req, res){
  authorDao.removeAuthor(req.params.id, function(err, result){
    if(err){
      res.status(400);
      res.send('Delete Author Failed!');
    }
    res.send('Delete Author Successful!');
  });
});

module.exports = routes;
