(function($) {
	// Drastically modified from the function in the WordPress Twenty Fifteen theme
	// Original source: https://github.com/WordPress/WordPress/blob/master/wp-content/themes/twentyfifteen/js/functions.js
	$('.dropdown-toggle').click(function(e) {
		var _this = $(this);
		e.preventDefault();
		_this.toggleClass('toggle-on');
		_this.parent().next('.sub-menu').toggleClass('toggled-on');
		_this.attr('aria-expanded', _this.attr('aria-expanded') === 'false' ? 'true' : 'false');
		_this.html(_this.html() === '<span class="screen-reader-text">Expand child menu</span>' ? '<span class="screen-reader-text">Collapse child menu</span>' : '<span class="screen-reader-text">Expand child menu</span>');
	});

	// sidebar menu
  $('a.sidebar-left-toggle').click(function () {
    if (!$('.sidebar').hasClass('.sidebar-left')) {
      $('.sidebar').addClass('sidebar-left');
    }
  });
  
  $('a.sidebar-right-toggle').click(function () {
    if ($('.sidebar').hasClass('sidebar-left')) {
      $('.sidebar').removeClass('sidebar-left');
    }   
  });
  
  $('a.no-sidebar-toggle').click(function () {
    if (!$('.content').hasClass('no-sidebar')) {
      $('.content').addClass('no-sidebar');
    } else {
      $('.content').removeClass('no-sidebar');
    }
  });
  
  $('a.hide-sidebar-toggle').click(function() {
    if (!$('.sidebar').hasClass('hide')){
      $('.sidebar').addClass('hide');
    } else {
      $('.sidebar').removeClass('hide');  
    }
  });
})(jQuery);