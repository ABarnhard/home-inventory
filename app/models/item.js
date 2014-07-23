
'use strict';

var cItem = global.mongodb.collection('items');

function Item(name, room, dateAcquired, count, costEach){
  this.name = name;
  this.room = room;
  this.dateAcquired = new Date(dateAcquired);
  this.count = parseInt(count);
  this.costEach = parseFloat(costEach);
}

Item.prototype.save = function(cb){
  cItem.save(this, function(err, object){
    cb();
  });
};

Item.find = function(search, cb){
  cItem.find(search).toArray(function(err, items){
    cb(items);
  });
};

Item.prototype.value = function(){
  return this.costEach * this.count;
};
module.exports = Item;
