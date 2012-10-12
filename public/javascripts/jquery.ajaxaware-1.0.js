(function($){
	$.extend($.fn,{
		ajaxAware : function(options) {
			/*
			 * Default plugin configurations
			 */
			var def = {
					url : '', // Entry point
					target : '#target', // Indicates where the response from server will be appended to DOM 
					postData : null, // The data to be posted to server. Can be null or empty
					events : [], // After successful ajax response trigger custom events(Think of observer listener pattern) 
					dataType : 'html', // Default respons data type. Possible values: json, xml, jsonp
					onSuccess : function(data) {
						if (opts.dataType === 'html') {
							$(target).html(data);
						} else if (opts.dataType === 'json') {
							var json = $.parseJSON(data);
							$.each(json, function(key, value){
								$("#" + key).html(value);
							});
						}
					},
					onError : function(xhr,status,error){
						alert("Something went wrong! Try again later!");
					},					
					onBefore : null, // Method to be executed before ajax call. If method return false then the ajax call is skiped.
					onAfter : null // Method to be called after ajax call. For example you need to rebind events after a ajax call.
			},
			opts = $.extend({},def,options),
			/**
			 * Compute the post data.
			 * @returns Returns a string like this ex: criteria="{"id": "criteriaId"...}&user={"id":"userId"}" 
			 */
			computePostData = function(inputData) {
				var tmp = [];
				$.each(inputData, function(key,value){
					tmp.push(key + "=" + value);
				});
				return tmp.join("&");
			},
			ajaxCall = function(cfg) {
				if ($.isFunction(cfg.onBefore)) {
					/* Call onBefore. Think of a expandable section:
					 * - on expand: do ajax call
					 * - on collapse: just collapse the section 
					 */
					if (!cfg.onBefore.call(cfg.element)) {
						return false;
					}
				}
				// continue call
				var data = "";
				if (cfg.postData) {
					data = computePostData(cfg.postData);
				}
				var $elem = $(cfg.element);
				//window.history.pushState({page: $elem.index()}, $elem.html(), $elem.attr("href") + "?" + data);
				if (cfg.templates) {
					data += "&templates=" 
					$.each(cfg.templates, function(key, value) {
						data += value + ",";
					});
				};
				$.ajax({
					'url' : cfg.url,
					'type' : 'POST',
					'contentType' : 'application/x-www-form-urlencoded',
					'data' : data,
					'dataType' : cfg.dataType,
					'success' : function(response, status, xhr) {
						if ($.isFunction(cfg.onSuccess)) {
							var data = xhr.responseText;
							cfg.onSuccess(data);
						}
						if (cfg.events && !$.isEmptyObject(cfg.events)) {
							$.each(cfg.events,function(key,value){
								$(cfg.element).trigger(value);
							});
						}
					},
					'error' : function(xhr,status,error) {
						if($.isFunction(cfg.onError)) {
							cfg.onError(xhr,status,error);
						}
					},
					'complete' : function(xhr, status){
						if ($.isFunction(cfg.onAfter)) {
							cfg.onAfter(cfg.element);
						}
					}
				});
			};
			return this.each(function(){
				$(this).bind('click', function(e){
					if (!$(e.target).is("input[type=checkbox]")) { // checkboxes should remain checked/unchecked when clicked 
						e.preventDefault();
					}
					ajaxCall($.extend(opts,{element : e.target}));
				});
			});
		}
	});
}(jQuery))