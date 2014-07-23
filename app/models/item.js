
'use strict';

var cItem = global.mongodb.collection('items');
var _ = require('lodash');

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

Item.value = function(query, cb){
  Item.find(query, function(items){
    var sum = 0;
    var item;
    for(var i = 0; i < items.length; i++){
      //console.log(items[i]);
      item = items[i];
      item = _.create(Item.prototype, item);
      sum += item.value();
    }
    cb(sum);
  });
};

Item.prototype.value = function(){
  return this.costEach * this.count;
};

module.exports = Item;
