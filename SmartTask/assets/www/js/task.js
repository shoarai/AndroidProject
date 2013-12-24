/**
 * task.js 
 */


/**
 * 
 * @param {Object} name
 */
var Task = function(name) {
  this.name = name;
  this.check = false;
};

Task.prototype.toggleCheck = function() {
  this.check = !this.check;
};

Task.prototype.view = function() {
  return {name: this.name};
};


/**
 * 
 * @param {Object} name
 */
var Tasks = function(name) {
  this.name = name;
};

Tasks.prototype.add = function() {
  
};
