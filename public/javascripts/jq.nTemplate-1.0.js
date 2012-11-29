/*
 * jq.nTemplate-1.0.js is a jQuery plug-in that provides two utility methods for handling the
 * json response from a server. The json consists of keys - DOM element ids and values - the html
 * that we will render there.
 * author Ionut David
 */
(function($){
	$.extend({
		nTemplateHandler : function(data) {
			$.each(data, function(key, value){
				$("#" + key).html(value);
			});
		},
		nTemplateLoad : function (cfg) {
			var def = {
					url : '',
					postData : null
			}, opts = $.extend({}, def, cfg), data=[], urlQuery=[];
			if (cfg.postData) {
				$.each(cfg.postData, function(key,value){
					data.push(key + "=" + value);
				});
				urlQuery.push(data.join("&"));
			}
			if (cfg.templates) {
				urlQuery.push("templates=" + cfg.templates.join(","));
			}
			return $.ajax({
				'url' : opts.url,
				'type' : 'POST',
				'contentType' : 'application/x-www-form-urlencoded',
				'data' : urlQuery.join("&"),
				'dataType' : 'json'
			});
		}
	});
}(jQuery));