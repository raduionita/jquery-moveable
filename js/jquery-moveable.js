(function($) {
  $.fn.moveable = function(options) {
    options = $.extend({ 
      VERSION: '0.2b1',
      lock   : null,
      onMove : function(position) { }
    }, options);
    var $objs = this;
    $objs.addClass('ui-moveable').css({ position: 'absolute' });
    return $objs.each(function(i) {
      var $obj = $(this);
      var moving = false;
      var difX = difY = oldX = oldY = 0, pos = null;
      $obj.on('mousedown', function(evt) {
        evt.preventDefault();
        evt.stopPropagation();
        moving = true;
        $obj.addClass('ui-moving');
        oldX = evt.pageX;
        oldY = evt.pageY;
        $objs.css({'z-index': 1});
        $obj.css({'z-index': 2});
      });
      $obj.parent().on('mousemove', function(evt) {
        if(moving) {
          evt.preventDefault();
          evt.stopPropagation();
          
          difX = options.lock == 'x' ? 0 : evt.pageX - oldX;
          difY = options.lock == 'y' ? 0 : evt.pageY - oldY;
          
          pos = $obj.offset();
          
          $obj.css({left: (pos.left + difX) + 'px', top: (pos.top + difY) +'px'});
          
          oldX = evt.pageX;
          oldY = evt.pageY;
          
          options.onMove.call(this, { left: pos.left + difX, top: pos.top + difY });
        }
      }).on('mouseup mouseleave', function(evt) {
        if(moving) {
          evt.preventDefault();
          evt.stopPropagation();
          moving = false;
          difX = difY = oldX = oldY = 0;
          $obj.removeClass('ui-moving');
        }
      })
    });
  };
  // $('.box').moveable({ lock: 'y' });
})(jQuery);
