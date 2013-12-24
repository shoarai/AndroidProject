/**
 *  flipsnap_custom.js
 */
var flipsnap_custom = function() {
  
};

//flipsnap_custom.prototype = {
var flipsnap_custom = {
  $flipsnap: $('.flipsnap'),
  $pointer: $('.pointer span'),
  flipsnap: 0,
  
  init: function() {
   this.flipsnap = Flipsnap('.flipsnap');
  },
  // アイテム数の変更
  updateItemNumber: function() {
    this.$flipsnap.width(this.$flipsnap.find(".item").width() * this.$flipsnap.find(".item").size());
    this.flipsnap.refresh();
  },  
  // サイズ拡大縮小
  updateWidth: function() {
    var width = $("body").width();
    $('.item').width(width);
    this.$flipsnap.width(width * this.$flipsnap.find(".item").size());
    this.flipsnap.refresh();
  },
  addEventListener: function() {
    this.flipsnap.element.addEventListener('fspointmove', function() {
      var $pointer = $('.pointer span');
      $pointer.filter('.current').removeClass('current');
      this.init();
      alert(this.flipsnap);
      $pointer.eq(this.flipsnap.currentPoint).addClass('current');
      alert("err");
    }, false);
  },
};

flipsnap_custom.init();
//flipsnap_custom.addEventListener();

$(document).on('pageshow', function() {
  flipsnap = Flipsnap('.flipsnap');
  flipsnap_custom.init();
  
  function updatePointer() {
    var $pointer = $('.pointer span');
    $pointer.filter('.current').removeClass('current');
    $pointer.eq(flipsnap.currentPoint).addClass('current');
  };
  flipsnap.element.addEventListener('fspointmove', updatePointer, false);
});