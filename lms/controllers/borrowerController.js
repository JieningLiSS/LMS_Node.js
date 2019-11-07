var routes = require('express').Router();
var db = require('../db/db');
var borrowerDao = require('../dao/borrowerDao');

routes.get('/borrowers',function(req,res){
    borrowerDao.getAllBorrowers(function(error, result){
      if(error) throw error;
      res.setHeader('Content-Type', 'application/json');
      res.send(result);
    });
});

routes.post('/borrowers', function(req, res){
  var borrower = req.body;
  borrowerDao.addBorrower(borrower, function(err, result){
    if(err){
      res.status(400);
      res.send('Add Borrower Failed!');
    }
    res.status(201);
    res.send('Add Borrower Successful!');
  });

});

routes.put('/borrowers/:id', function(req, res){
  var borrower = req.body;
  borrowerDao.updateBorrower(req.params.id, borrower, function(err, result){
    if(err){
      res.status(400);
      res.send('Update Borrower Failed!');
    }
    res.send('Update Borrower Successful!');
  });
});


routes.delete('/borrowers/:id', function(req, res){
    borrowerDao.removeBorrower(req.params.id, function(err, result){
    if(err){
      res.status(400);
      res.send('Delete Borrower Failed!');
    }
    res.send('Delete Borrower Successful!');
  });
});

module.exports = routes;
