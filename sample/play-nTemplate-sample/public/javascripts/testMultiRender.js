(function($,NS){
	window.MR = window.MR || {};
	window[NS].TestMulti = $.extend({},{
		init : function() {
			this.bindAjaxAware();
		},
		bindAjaxAware : function() {
			$(".ajaxAware").each(function(){
				var $this = $(this);
				$this.ajaxAware( $.extend({'dataType' : 'json'}, $this.data('cfg')));
			});
		}
	});
	$(function(){
		window[NS].TestMulti.init();
	});
})(jQuery,'MR');