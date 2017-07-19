//JQ源码架构 2017/07/19
(function(){
	//构造函数
	var $ = function(selector,context){
		return new $.fn.init(selector,context);
	};

	$.fn = $.prototype = {
		constructor:$;
		init:function(selector,context){
			this.selector = selector;
			this.dom = dom;
			this.context = context;
			return this;
		},
		attr:function(){

		},
		css:function(){}
	};

	$.fn.init.prototype = $.fn;

	function extend(){

	}
	$.extend = extend;
	$.fn.extend = extend;

	$.extend = $.fn.extend = function(){

	}

	$.extend({
		inArray:function(){

		},
		each:function(){

		},
	});

	$.fn.extends({
		each:function(){

		}
	});



	//工具方法
	jQuery.each = function(){};
	jQuery.extends = function(){};


	// $(selector).attr()
})();


(function(window,document,undefined){
	$.fn.extend({
		aPlugin:function(){

		},
		bPlugin:fucntion(){

		};
	});

	


	$.fn.xxPlugin = function(){
		return this.each(function(){
			this.attr(s)
		});
	}
})(window,document);

$('.selector').xxPlugin();
