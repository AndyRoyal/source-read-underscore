//underscore  2017-7-11  

/**
 * [规则]
 * [原子函数封装]
 * [合理粒度]
 * [容错处理]
 * [?? 代表问题]
 */
var _=(function(){
	//辅助函数
	var isArray = function (x){
		return Object.prototype.toString.call(x) === '[object Array]';
	};
	var isObject = function (x){
		return Object.prototype.toString.call(x) === '[object Object]';
	};

	//************集合函数 (数组 或对象)***********//
	/**
	 * [遍历list中的所有元素，按顺序用遍历输出每个元素,最终输出的是处理前的List]
	 * @param  {arr || obj }   list 
	 * @param  {Function} fn   [list中成员的处理函数]
	 * @param  {object}  [可选]
	 * @return {arr || obj }  
	 */
	var each = function(list,fn,context){
		if(isArray(list)){
			for(var i=0;i<list.length;i++){
				fn.call(context || null,list[i]);
				//fn(list[i]);
			};
		}else if(isObject(list)){
			for(prop in list){
				fn.call(context || null,list[prop]);
			};
		}else{
			return 
		}	
		return list;
	}; 
	//each 最终返回的还是输入的list
	//_.each([1,2,3],function(x){alert(x+1)})
	//_.each({x:1,y:2},function(x){alert(x+1)});

	
	/**
	 * [map description 最终输出的是处理过的List]
	 * @param  [] || {}   list [arr || obj ]
	 * @param  {Function} fn   [list中成员的处理函数]
	 * @param {[context]}  [可选]
	 * @return [] || {}
	 * ??二维数组不支持
	 */
	 var map = function(list,fn,context){
	 	var r = [];
	 	if(isArray(list)){
	 		for(var i=0;i<list.length;i++){
	 			r.push(fn.call(context || null,list[i]));
	 			//fn(list[i]);
	 		};
	 	}else if(isObject(list)){
	 		for(prop in list){
	 			r.push(fn.call(context || null,list[prop]));
	 		};
	 	}else{
	 		return 
	 	}	
	 	return r;
	 }; 
	 //_.map([1,2,3],function(a){return a*20});
	 //_.map({x:1,y:2,z:3},function(a){return a*20});


	 /**
	  * [别名为 inject 和 foldl, reduce方法把list中元素归结为一个单独的数值]
	  * @param  [] || {}
	  * @param  {Function} fn   [list中成员的处理函数]
	  * @param {[context]}  [可选]
	  * @return  num
	  */
	 var reduce= function(list,fn,init,context){
	 	var n=0;
	 	if(isArray(list)){
	 		for(var i=0;i<list.length;i++){
	 			n +=(fn.call(context || null,list[i],init));
	 			//n += fn(list[i]);
	 		};
	 	}else if(isObject(list)){
	 		for(prop in list){
	 			n += (fn.call(context || null,list[prop],init));
	 		};
	 	}else{
	 		return 
	 	}
	 	return n+init;
	 }
	
	//reduce({x:1,y:2,z:3},function(x){return x+10},100);//在控制台输出不了??
	//reduce([1,2,3],function(x){return x+10},100);


	/**
	 * [reducRight是从右侧开始组合的元素的reduce函数]
	 * @param  [] || {}
	 * @param  {Function} fn   [reduce的每一步都需要由iteratee返回]
	 * @param  {[type]}   init [reduce函数的初始值]
	 * @param {[context]}  [可选]
	 * @return []
	 * ??不支持对象
	 */
	var reduceRight= function(list,fn,init,context){
		var r = [];
		var arr_handler= function(){
			for(var i=list.length;i--;i>=0){
				r.push(fn.call(context || null,list[i],init));
			}
			return r.push(init);
		};
		var obj_handler= function(){
			for(prop in list){
				r.push(fn.call(context || null,list[prop],init));
			}
			return r.push(init);
		};
		isArray(list) ? arr_handler() : isObject(list) ?  obj_handler() : ''
	};



	//var list = [[0, 1], [2, 3], [4, 5]];
	//var flat = reduceRight(list, function(a, b) { return a.concat(b); }, []);


	/**find    detect 探测函数
	 * [在list中逐项查找，返回第一个通过predicate迭代函数真值检测的元素值, 
	 * 如果没有值传递给测试迭代器将返回undefined]
	 * @param  []
	 * @param  () fn   [返回第一个通过predicate迭代函数真值检测的元素值]
	 * @param  [改变上下文][可选]
	 * @return num ||  undefined        
	 * ??不支持对象  如果找到匹配的元素，函数将立即返回，不会遍历整个list
	 */
	var find = function(list,predicate,context){
		for(var i=0;i<list.length;i++){
			if( predicate.call(context||null,list[i]) ){
				return list[i]
			}else{
				return undefined
			}
		}
	};
	//find([1, 2, 3, 4, 5, 6], function(num){ return num % 2 == 0; });
	
	/**
	 * [filter 遍历list中的每个值，返回包含所有通过predicate真值检测的元素值 ] select 选择函数 
	 * @param  [] list     [] 
	 * @param  () predicate [检测函数]
	 * @param  {} context    [可选]
	 * @return num ||  undefined           
	 */
	var filter = function(list,predicate,context){
		var r=[];
		for(var i=0;i<list.length;i++){
			if( predicate(list[i]) ){
				r.push(list[i]);
			}
		}
		return r;
	};
	filter([1, 2, 3, 4, 5, 6], function(num){ return num % 2 == 0; });

	/**key value 对比
	 * [where 遍遍历list中的每一个值，返回一个数组，这个数组包含properties所列出的属性的所有的 键 - 值对 ]
	 * @param  {} 
	 * @param  {} properties 
	 * @return []     
	 */
	var where = function(list,prop){
		var r=[];
		for(var prop in list){
			return
		}
	};
	var list= {{x:1,y:2,z:3},{x:10,y:26,z:3},{x1:1,y1:2,z1:3}};
	where(list,{x:1,y:2});

	/**key value 查找
	 * [遍历整个list，返回匹配 properties参数所列出的所有 键 - 值 对的第一个值，.
	 * 如果没有找到匹配的属性，或者list是空的，那么将返回undefined]
	 * @param  {} 
	 * @param  {} properties 
	 * @return []     
	 */
	var findWhere = function(list,prop){
		var r=[];
		for(var prop in list){
			return
		}
	};
	var list= {{x:1,y:2,z:3},{x:10,y:26,z:3},{x1:1,y1:2,z1:3}};
	findWhere(list,{x:1,y:2});

	/**
	 * [reject 遍历list中的每个值，返回包含所有通过predicate真值检测的元素值 ] select 选择函数 
	 * @param  [] list     [] 
	 * @param  () predicate [检测函数]
	 * @param  {} context    [可选]
	 * @return [] ||  undefined           
	 */
	var reject = function(list,predicate,context){
		var r=[];
		for(var i=0;i<list.length;i++){
			if( !predicate(list[i]) ){
				r.push(list[i]);
			}
		}
		return r;

	}
	reject([1, 2, 3, 4, 5, 6], function(num){ return num % 2 == 0; });



	/**
	 * [every 如果list中的所有元素都通过predicate的真值检测就返回true]
	 * @param  [] list     [] 
	 * @param  () predicate [检测函数]
	 * @param  {} context    [可选]
	 * @return  Boolean           
	 */
	var every = function(list,predicate,context){
		var booleanList = [];
		for(var i=0;i<list.length;i++){
			if(predicate(list[i])){
				booleanList.push(list[i]);
			}
		}
		(booleanList.length === list.length) ? console.info(true) : console.info(false)
	};
	var identity = function(val){
		return val;
	};
	every([true, 1, null, 'yes'], identity)

	/**
	 * [some 如果list中有任何一个元素通过 predicate 的真值检测就返回true。
	 * 一旦找到了符合条件的元素, 就直接中断对list的遍历.]
	 * @param  [] list     [] 
	 * @param  () predicate [检测函数]
	 * @param  {} context    [可选]
	 * @return  Boolean           
	 */
	 var some = function(list,predicate,context){
	 	var booleanList = [];
	 	for(var i=0;i<list.length;i++){
			predicate(list[i])?console.info(true):console.info(false)
			//这里不简易此写法，用分支写法return出去，因三目不能return
	 	}
	 
	 };
	 var identity = function(val){
	 	return val;
	 };
	 some([true, 1, null, 'yes'], identity)


	 /**
	  * [如果list包含指定的value则返回true]  使用===检测
	  * 如果list 是数组，内部使用indexOf判断。使用fromIndex来给定开始检索的索引位置。
	  * @param  [] 
	  * @param  Number  
	  * @param  Number    [可选]
	  * @return  Boolean           
	  */
	 var contains = function(list,val,fromIndex){
	 	var list = ( list.slice(fromIndex) || list );
	 	for(var i=0;i<list.length;i++){
	 		if(list[i] === val){
	 			return true
	 		}
	 	}
	 };
	 contains([1, 2, 3], 3);


	 /**
	  * [在list的每个元素上执行methodName方法。 
	  * 任何传递给invoke的额外参数，invoke都会在调用methodName方法的时候传递给它]
	  * @param  [] 
	  * @param  () 
	  * @return  []           
	  */
	  var invoke = function(list,fn){
	  	 return 
	  };
	  invoke([[5, 1, 7], [3, 2, 1]], 'sort');
	  //=> [[1, 5, 7], [1, 2, 3]]


	  /**
	   * [pluck也许是map最常使用的用例模型的简化版本，即萃取数组对象中某属性值，返回一个数组]
	   * @param  [] 
	   * @param  propertyName  
	   * @return  []           
	   */
	  var pluck = function(list,propertyName){
	  	 for(var prop in list){
	  	 	return 
	  	 }
	  };
	  var stooges = [{name: 'moe', age: 40}, {name: 'larry', age: 50}, {name: 'curly', age: 60}];
	  pluck(stooges, 'name');
	  //=> ["moe", "larry", "curly"]

	  /**
	   * [返回list中的最大值。如果传递iteratee参数，iteratee将作为list中每个值的排序依据。
	   * 如果list为空，将返回-Infinity，所以你可能需要事先用isEmpty检查 list]
	   * @param  [] list     [] 
	   * @param  () fn [处理函数]
	   * @param  {} context    [可选]
	   * @return  {}       
	   */
	   var max = function(list,fn,context){
	   	/*	if(isEmpty(list)){
	   			for(var i=0;i<list.length;i++){
	   				fn.call(context || null,list);
	   			}
	   		}else{
	   			return '-Infinity'
	   		}*/
	   };

	   var stooges = [{name: 'moe', age: 40}, {name: 'larry', age: 50}, {name: 'curly', age: 60}];
	   max(stooges, function(stooge){ return stooge.age; });
	   //=> {name: 'curly', age: 60};

	   /**
	    * [返回list中的最小值。如果传递iteratee参数，iteratee将作为list中每个值的排序依据。
	    * 如果list为空，将返回-Infinity，所以你可能需要事先用isEmpty检查 list 。]
	    * @param  [] list     [] 
	    * @param  () fn [处理函数]
	    * @param  {} context    [可选]
	    * @return  {}       
	    */
	    var min = function(list,fn,context){
	    /*	return a-b*/
	    };


	    /**
	     * [排序一个列表组成一个组，并且返回各组中的对象的数量的计数。
	     * 类似groupBy，但是不是返回列表的值，而是返回在该组中值的数目]
	     * @param  [] list     [] 
	     * @param  () fn [处理函数]
	     * @param  {} context    [可选]
	     * @return  {}       
	     */
	    var countBy = function(){
	    	return 
	    };	
	    countBy();
	//************数组函数（Array Functions）***********//
	/**
	 * [返回array（数组）的第一个元素。传递 n参数将返回数组中从第一个元素开始的n个元素]
	 * @param  [] list     [] 
	 * @param  Number    [可选]
	 * @return   []        
	 */
	var first = function(list,n){
		if(n){
			return list.slice(0,n)
		}else{
			return list[0]
		}
		//return  list.slice(0,n) ||list[0]
	};
	first([5, 4, 3, 2, 1],3);

	/**
	 * [返回数组中除了最后一个元素外的其他全部元素。 在arguments对象上特别有用。
	 * 传递 n参数将从结果中排除从最后一个开始的n个元素]
	 * @param  [] list     [] 
	 * @param  Number    [可选]
	 * @return   []        
	 */
	var initial = function(list,n){
		if(n){
			return list.slice(0,list.length-n)
		}else{
			return list.slice(0,list.length-1)
		}
	};
	initial([5, 4, 3, 2, 1]);

	/**
	 * [返回array（数组）的最后一个元素。
	 * 传递 n参数将返回数组中从最后一个元素开始的n个元素（愚人码头注：返回数组里的后面的n个元素）]
	 * @param  [] list     [] 
	 * @param  Number    [可选]
	 * @return  []      
	 */
	var last = function(list,n){
		if(n){
			return list.slice(list.length-n)
		}else{
			return list.slice(list.length-1,list.length)
		}
	};
	last([5, 4, 3, 2, 1]);


	/**
	 * [返回数组中除了第一个元素外的其他全部元素。传递 index 参数将返回从index开始的剩余所有元素]
	 * @param  [] 
	 * @param  Number    [可选]
	 * @return  []        
	 */
	 var rest = function(list,n){
	 	if(n){
	 		return list.slice(n)
	 	}else{
	 		return list.slice(1)
	 	}
	 };
	 var l = [5, 4, 3, 2, 1];
	 rest(l);
	 console.info(l);//输入数据没有被改变


	 /**
	  * [返回一个除去所有false值的 array副本。 在javascript中, false, null, 0, "", undefined 和 NaN 都是false值.]
	  * @param  [] 
	  * @return  []        
	  */
	  var compact= function(arr){
	  	 var r=[];
	  	 for(var i=0;i<arr.length;i++){
		  	if(arr[i]){
		  		r.push(arr[i])
		  	} 
	  	 }
	  	 return r;
	  };
	  compact([0, 1, false, 2, '', 3]);
	  //[1, 2, 3]


	   /**
	    * [将一个嵌套多层的数组 array（数组） 
	    * (嵌套可以是任何层数)转换为只有一层的数组。 如果你传递 shallow参数，数组将只减少一维的嵌套。]
	    * @param  [[][][[]]] 
	    * @return  []        
	    */
	    var flatten= function(arr,shallow){
	    	 /*var r=[];
	    	 for(var i=0;i<arr.length;i++){
	  	  		//if(arr[i].indexOf('[') || arr[i].indexOf(']')  ){
	  	  		arr[i].replace()
	  	  		//} 
	    	 }
	    	 return r;*/
	    };
	    flatten([1, [2], [3, [[4]]]]);//[1, 2, 3, 4];

	    /**
	     * [返回一个删除所有values值后的 array副本]
	     * @param  [] 
	     * @param  value
	     * @return  []        
	     */
	     var without= function(arr,shallow){
	     	 var r=[];
	     	 for(var i=0;i<arr.length;i++){
	   	  		if(arr[i] !=shallow){
	   	  			r.push(arr[i]);
	   	  		}
	     	 }
	     	 return r;
	     };
	    without([1, 2, 1, 0, 3, 1, 4], 0, 1);// [2, 3, 4]


	     /**
	      * [返回传入的 arrays（数组）并集：按顺序返回，返回数组的元素是唯一的，可以传入一个或多个 arrays]
	      * @param  [] 
	      * @return  []        
	      */
	      var union= function(arr){
	      	 var r=[];
	      	 
	      	 return r;
	      };
	      union([1, 2, 3], [101, 2, 1, 10], [2, 1]);
	      // [1, 2, 3, 101, 10]






	//************实用功能(Utility Functions)***********//
	/**
	 * 返回与传入参数相等的值. 相当于数学里的: f(x) = x
	 * 这个函数看似无用, 但是在Underscore里被用作默认的迭代器iterator
	 * @param  string number ..
	 * @return Boolean
	 */
	var identity = function(val){
		return val;
	};
	identity("xy");
	'xy' ===identity("xy");//true


	/**
	 * 如果object 不包含任何值(没有可枚举的属性)，返回true。 
	 * 对于字符串和类数组（array-like）对象，如果length属性为0，那么_.isEmpty检查返回true
	 * @param  {}
	 * @return Boolean
	 */
	var isEmpty = function(o){
		if(o.length ===0 || !o){
			return true
		}else{
			return false
		}
	};
	//isEmpty([1, 2, 3]);
	//isEmpty({});
	//isEmpty('');
	//isEmpty(null);
	//isEmpty(undefined);

	/**
	 * 返回undefined，不论传递给它的是什么参数。 可以用作默认可选的回调参数。
	 * @param  *
	 * @return undefined
	 */
	
	 var noop = function(x){
	 	return x = undefined;
	 };
	 noop(111);

	return {
		each:each
		,map:map
		,reduce:reduce
		,reduceRight:reduceRight
		,find:find
		,filter:filter
		,where:where
		,findWhere:findWhere
		,reject:reject
		,every:every
		,some:some
		,contains:contains
		,invoke:invoke
		,pluck:pluck
		,max:max
		,min:min
		,countBy:countBy
		,isEmpty:isEmpty
		,identity:identity
		,first:first
		,initial:initial
		,last:last
		,rest:rest
		,compact:compact
		,flatten:flatten
		,without:without
		,union:union
		,noop:noop
	};
})(); 


