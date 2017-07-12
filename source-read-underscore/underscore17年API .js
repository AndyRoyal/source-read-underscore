//underscore  2017-7-11  
//辅助函数

/**
 * [原子函数封装]
 * [合理粒度]
 * [容错处理]
 * []
 */
function isArray(x){
	return Object.prototype.toString.call(x) === '[object Array]';
};
function isObject(x){
	return Object.prototype.toString.call(x) === '[object Array]';
};
//each 最终返回的还是输入的list
var each = function(list,fn){
	if(isArray(list)){
		for(var i=0;i<list.length;i++){
			fn(list[i])
		};
	}else{
		var prop;
		for(prop in list){
			fn(list[prop])
		};
	}	
	return list;
}; 
each({x:1,y:2},function(x){alert(x+1)});
each([1,2,3],function(x){alert(x+1)})


//map  最终输出的是处理过的List
var map = function(list,fn){
	var r=[];
	for(var i=0;i<list.length;i++){
		fn(list[i])
	};
	return r;
}; 
each([1,2,3],function(x){alert(x+10)})

//reduce
var reduce= function(list,fn,init){
	var n=0;
	for(var i=0;i<list.length;i++){
		n += fn(list[i]);
	};
	return n+init;

}
reduce([1,2,3],function(x){return x+10},100);

//
