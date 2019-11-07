
var db = require('../db/db');

exports.getAllBorrowers = function(cb){
    db.query('select * from library.tbl_borrower', function(err, result) {
        cb(err, result);
      });
};

exports.addBorrower = function(borrower, cb){
  db.beginTransaction(function(err){
      if(err) cb(err, null);
  
      db.query('insert into library.tbl_borrower(name, address, phone) values(?,?,?)', 
      [borrower.name, borrower.address, borrower.phone], function(err, res){
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


  exports.updateBorrower = function(cardNo, borrower, cb){
    db.beginTransaction(function(err){
        if(err) cb(err, null);
    
        db.query('update library.tbl_borrower set name=?,address=?,phone=? where cardNo=?',
        [borrower.name, borrower.address, borrower.phone,cardNo], function(err, res){
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


exports.removeBorrower = function(cardNo, cb){
  db.beginTransaction(function(err){
      if(err) cb(err, null);
  
      db.query('delete from library.tbl_borrower where cardNo = ?', [cardNo], function(err, res){
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