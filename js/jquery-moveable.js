(function($)
  $.fn.moveable = function(settings) {
    settings = $.extend({ }, settings);
    var $objs = this;
    $objs.addClass('moveable');
    return $objs.each(function(i) {
      var $obj = $(this);
      var moving = false;
      var difX = 0, difY = 0, oldX = 0, oldY = 0;
      $obj.on('mousedown', function(evt) {
        evt.preventDefault();
        evt.stopPropagation();
        moving = true;
        $obj.addClass('moving');
        oldX = evt.pageX;
        oldY = evt.pageY;
        $objs.css({'z-index': 1});
        $obj.css({'z-index': 2});
      });
      $obj.parent().on('mousemove', function(evt) {
        if(moving) {
          evt.preventDefault();
          evt.stopPropagation();
          
          difX = evt.pageX - oldX;
          difY = evt.pageY - oldY;
          
          $obj.css({left: '+='+ difX + 'px', top: '+='+ difY +'px'});
          
          oldX = evt.pageX;
          oldY = evt.pageY;
        }
      }).on('mouseup', function(evt) {
        if(moving) {
          evt.preventDefault();
          evt.stopPropagation();
          moving = false;
          difX = difY = oldX = oldY = 0;
          $obj.removeClass('moving');
          // release obj
        }
      });
    });
  };
)(jQuery);

// $('.box').moveable();