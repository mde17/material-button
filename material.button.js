;(function ( $, window, document, undefined ) {

    var pluginName = 'mbutton',
        defaults = {
            
        };

    // The actual plugin constructor
    function Plugin( element, options ) {
        this.element = $(element);
        this.options = $.extend( {}, defaults, options);
        this._defaults = defaults;
        this._name = pluginName;
        
        this.init();
    }

    Plugin.prototype = {
    	init:function(){
    		this.bindUiButtons();
    	},
    	bindUiButtons:function(){
    		this.element.on('mousedown',$.proxy(this.displayMaterialEffect,this));
    	},
    	displayMaterialEffect:function(e){
    		var elem = this.element,
			offset = elem.offset(),
			effect_elem = 'circle-effect',
			px = 'px',
			circle_color = elem.data('color'),
			elem_clone = elem.clone(),
			content_clone;
		
			if(elem.children('.material-btn').length == 0){
				elem.html('<div class="material-btn"><div class="a-html-content">' +elem_clone.html()+ '</div></div>');
			}else{
				content_clone = $('.a-html-content').clone();
				$('.material-btn').html("");
				$('.material-btn').html(content_clone);
			}
			
			var size = 0;
			var material_btn = elem.find('.material-btn');
			
			if(elem.width() > elem.height()){
				size = elem.width();
			}else{
				size = elem.height();
			}
			
			elem.css({
				position:'relative',
				display:'block',
				padding:0
			});
			
			material_btn.css({
				position:'absolute',
				top:0,
				left:0,
				overflow:'hidden',
				width: elem.width() + px,
				height: elem.height() + px
			});
			
			material_btn.append('<div class="'+effect_elem+'"></div>');
			
			$('.'+effect_elem).css({
				position:'absolute',
				width: 0,
				height: 0,
				'background-color':circle_color,
				top: e.pageY - offset.top,
				left: e.pageX - offset.left,
				opacity:0,
				'border-radius': (size) + 'px'
			});
			
			$('.'+effect_elem)
				.animate({
					opacity:0.8,
					position:'absolute',
					width: (size * 2) + 'px',
					height: (size * 2) + 'px',
					'background-color':circle_color,
					top: ( (e.pageY - offset.top) - size ),
					left: ( (e.pageX - offset.left) - size )
				},300,"easeOutQuad").animate({opacity:0},500,"easeOutQuad",function(){
					$(this).remove();
				});
		
    	}
    };

    $.fn[pluginName] = function ( options ) {
        return this.each(function () {
            if (!$.data(this, 'plugin_' + pluginName)) {
                $.data(this, 'plugin_' + pluginName, 
                new Plugin( this, options ));
            }
        });
    };

})( jQuery, window, document );
