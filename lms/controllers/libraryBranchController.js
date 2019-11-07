var routes = require('express').Router();
var db = require('../db/db');
var libraryBranchDao = require('../dao/libraryBranchDao');

routes.get('/branches',function(req,res){
    libraryBranchDao.getAllBranches(function(error, result){
      if(error) throw error;
      res.setHeader('Content-Type', 'application/json');
      res.send(result);
    });
});

routes.post('/branches', function(req, res){
  var branch = req.body;
  libraryBranchDao.addBranch(branch, function(err, result){
    if(err){
      res.status(400);
      res.send('Add Branch Failed!');
    }
    res.status(201);
    res.send('Add Branch Successful!');
  });

});

routes.put('/branches/:id', function(req, res){
  var branch = req.body;
  libraryBranchDao.updateBranch(req.params.id, branch, function(err, result){
    if(err){
      res.status(400);
      res.send('Update Branch Failed!');
    }
    res.send('Update Branch Successful!');
  });
});


routes.delete('/branches/:id', function(req, res){
    libraryBranchDao.removeBranch(req.params.id, function(err, result){
    if(err){
      res.status(400);
      res.send('Delete Branch Failed!');
    }
    res.send('Delete Branch Successful!');
  });
});

module.exports = routes;
