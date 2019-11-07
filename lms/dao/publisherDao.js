var db = require('../db/db');

exports.getAllPublishers = function(cb){
    db.query('select * from library.tbl_publisher', function(err, result) {
        cb(err, result);
      });
};

exports.addPublisher = function(publisher, cb){
  db.beginTransaction(function(err){
      if(err) cb(err, null);
  
      db.query('insert into library.tbl_publisher(publisherName,publisherAddress,publisherPhone) values(?,?,?)', 
      [publisher.publisherName, publisher.publisherAddress, publisher.publisherPhone], function(err, res){
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


  exports.updatePublisher = function(publisherId, publisher, cb){
    db.beginTransaction(function(err){
        if(err) cb(err, null);
    
        db.query('update library.tbl_publisher set publisherName=?,publisherAddress=? ,publisherPhone=?  where publisherId=?',
        [publisher.publisherName, publisher.publisherAddress, publisher.publisherPhone, publisherId], function(err, res){
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

exports.removePublisher = function(publisherId, cb){
  db.beginTransaction(function(err){
      if(err) cb(err, null);
  
      db.query('delete from library.tbl_publisher where publisherId = ?', [publisherId], function(err, res){
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