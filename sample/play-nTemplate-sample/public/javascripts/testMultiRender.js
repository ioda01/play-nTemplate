(function($){
	window.MR = window.MR || {};
	window.MR.TestMulti = $.extend({},{
		init : function() {
			this.bindAjaxAware();
		},
		bindAjaxAware : function() {
			$(".ajaxAware").bind('click', function(e){
				if (!$(e.target).is("input[type=checkbox]")) { // checkboxes should remain checked/unchecked when clicked 
					e.preventDefault();
				}
				var $this = $(this);
				$.when($.nTemplateLoad($this.data('cfg'))).done(function(data){$.nTemplateHandler(data)});
			});
		}
	});
	$(function(){
		window.MR.TestMulti.init();
	});
})(jQuery);