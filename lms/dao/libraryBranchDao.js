
var db = require('../db/db');

exports.getAllBranches = function(cb){
    db.query('select * from library.tbl_library_branch', function(err, result) {
        cb(err, result);
      });
};

exports.addBranch = function(branch, cb){
  db.beginTransaction(function(err){
      if(err) cb(err, null);
  
      db.query('insert into library.tbl_library_branch(branchName, branchAddress) values(?, ?)', 
      [branch.branchName, branch.branchAddress], function(err, res){
        if(err){
          db.rollback(function(err, res){
            cb(err, res);
          });
        } 
        db.commit(function(err, res){
          cb(err, res);
        });
      });
    });
};


  exports.updateBranch = function(branchId, branch, cb){
    db.beginTransaction(function(err){
        if(err) cb(err, null);
    
        db.query('update library.tbl_library_branch set branchName=?, branchAddress=? where branchId=?',
        [branch.branchName,branch.branchAddress, branchId], function(err, res){
          if(err){
            db.rollback(function(err, res){
              cb(err, res);
            });
          } 
          db.commit(function(err, res){
            cb(err, res);
          });
        });
      });
  };


exports.removeBranch = function(branchId, cb){
  db.beginTransaction(function(err){
      if(err) cb(err, null);
  
      db.query('delete from library.tbl_library_branch where branchId = ?', [branchId], function(err, res){
        if(err){
          db.rollback(function(err, res){
            cb(err, res);
          });
        } 
        db.commit(function(err, res){
          cb(err, res);
        });
      });
    });
};