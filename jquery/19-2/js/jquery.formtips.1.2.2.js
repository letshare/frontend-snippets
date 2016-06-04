/*
 * jQuery Form Tips 1.2.2
 * By Manuel Boy (http://www.manuelboy.de)
 * Copyright (c) 2010 Manuel Boy
 * Licensed under the MIT License: http://www.opensource.org/licenses/mit-license.php
*/
jQuery.fn.formtips = function(options) {
	
	// handle options
	settings = jQuery.extend({
		tippedClass: "tipped"
	}, options);
	
	return this.each(function() {
		
		jQuery(this).each(function() {
			
			// prepare input elements an textareas
			var e = jQuery(this);
			
			// do not apply form tips to inputs of type file, radio or checkbox
			var type = jQuery(e).attr('type');
			if(type == 'file' || type == 'checkbox' || type == 'radio') { return false; }
			
			// handle focus event
			jQuery(e).bind('focus', function() {
				var lv = jQuery(this).attr('title');
				if(jQuery(this).val() == lv) {
					jQuery(this).val('').removeClass(settings.tippedClass);
				}
				return false;
			});
			
			// handle blur event
			jQuery(e).bind('blur', function() {
				var lv = jQuery(this).attr('title');
				if(jQuery(this).val() == '') {
					jQuery(this).val(lv).addClass(settings.tippedClass);
				}
				return false;
			});
			
			// handle initial text
			var lv = jQuery(e).attr('title');
			if(jQuery(e).val() == '' || jQuery(e).val() == jQuery(this).attr('title')) {
				jQuery(e).val(lv).addClass(settings.tippedClass);
			} else {
				jQuery(e).removeClass(settings.tippedClass);
			}
			
			// handle removal of default value
			jQuery(e).parentsUntil('form').parent().submit(function() {
				var lv = jQuery(e).attr('title');
				if(jQuery(e).val() == lv) {
					jQuery(e).val('').removeClass(settings.tippedClass);
				}
			});
			
		});
		
	});
};