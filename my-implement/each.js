var _=(function(){
	//辅助函数
	var isArray = function (x){
		return Object.prototype.toString.call(x) === '[object Array]';
	};
	var isObject = function (x){
		return Object.prototype.toString.call(x) === '[object Object]';
	};
	var each = function(list,fn){
		if(isArray(list)){
			for(var i=0;i<list.length;i++){
				fn(list[i]);
			};
		}else if(isObject(list)){
			for(prop in list){
				fn(list[prop]);
			};
		}else{
			return 
		}	
		return list;
	}; 

	return {
		each:each

	};
})(); 