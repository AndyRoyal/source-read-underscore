//underscore  2017-7-11  

//************与函数有关的函数 start ***********//
/**
 * [绑定函数 function 到对象 object 上, 也就是无论何时调用函数,
 *  函数里的 this 都指向这个 object]
 * @param  ()  function 
 * @param  {}  object
 * @param  arguments  [任意可选参数 arguments 可以传递给函数 function]
 * @return * 任意类型  
 */
var _={};
_.bind=function(fn,o,args){//形参若截取参数可不传
	var argArr = Array.prototype.slice.call(arguments,2);//转数组调slice
	return function(args2){//参数个数不限，JS可传参数经测试可以大于30个，上限不确定
		var argArr2 = Array.prototype.slice.call(arguments);
		return fn.apply(o,argArr.concat(argArr2));
	};
};
var func = function(greeting,pram2,pram3){ 
	return greeting + ': ' + this.name+"fn后面的参数"+pram2+"fn内部函数的参数也就是后传的参数"+pram3; 
};
func =_.bind(func, {name: 'moe'}, 'hi',"pram222");//'hi: moe'
func("pram333");
//var fn = function(greeting){ return greeting }; fn.apply(null,[1]);

//bind 功能 类似call
var _={};
_.call = function(fn,o,args){
	var argArr = Array.prototype.slice.apply(arguments,[2]);
	return function(args2){
		var argArr2 = Array.prototype.slice.apply(arguments);
		return fn.apply(o,argArr.concat(argArr2));
	};
};
var func = function(greeting,pram2,pram3){ 
	return greeting + ': ' + this.name+"fn后面的参数"+pram2+"fn内部函数的参数也就是后传的参数"+pram3; 
};
func =_.call(func, {name: 'moe'}, 'hi',"pram222");//'hi: moe'
func("pram333");

/**
 * [把methodNames参数指定的一些方法绑定到object上，这些方法就会在对象的上下文环境中执行
 * 绑定函数用作事件处理函数时非常便利，否则函数被调用时this一点用也没有]
 * @param  {}  object 
 * @param  {}  methodNames
 * @return * 任意类型  
 */
var _={};
_.bindAll=function(o,args){
	var argArr1 = Array.prototype.slice.call(arguments,1);//functions
	// 循环并将所有的函数上下本设置为obj对象本身
	_.each(argArr1, function(value,i,list) {
		//fn.apply(o,argArr.slice(2));
	    o[argArr1[i]] = _.bind(o[argArr1[i]], o);//方法重写，只为改变上下文
	});
	return o;
};
//方式2：装饰器模式，方法覆盖
/*_.bindAll = function(object) {
    var fns = [].slice.call(arguments, 1);
    for (var i = 0; i < fns.length; i++) {
        object[fns[i]] = _.bind(object[fns[i]], object);
    }
};*/
var buttonView = {
  label  : 'underscore',
  getData:function(){
  	jhjkk
  	return {};
  }

  onClick: function(){ alert('clicked: ' + this.getData); },
  onHover: function(){ console.log('hovering: ' + this.label); }
};

_.bindAll(buttonView, 'onClick', 'onHover');
jQuery('#underscore_button').bind('click', buttonView.onClick);
//解决此问题/*jQuery("#bindAll").css("background","pink").on('click', function(){
//	console.log(this);
//}.bind(buttonView));
//bind('click',function(event){event.stopPropagation();event.preventDefault(); alert(1)});






/**
 * [局部应用一个函数填充在任意个数的 arguments，不改变其动态this值。和bind方法很相近。
 * 你可以传递_ 给arguments列表来指定一个不预先填充，但在调用时提供的参数。]
 * @param  ()  function 
 * @param  arguments  [任意可选参数 arguments 可以传递给函数 function]
 * @return * 任意类型  
 */
//1>splice,直接修改原数组参数
//2>把字符串参数eval
var _={};
_.partial = function(fn,args){
	//var replaceArg;
	var argArr = Array.prototype.slice.call(arguments,0);
	return function(lastArg){
		//replaceArg =lastArg;
		for(var i=0;i<argArr.length;i++){
			if(argArr[i] ==='___'){
				var delArrEle = argArr.splice(i,1,lastArg);
				//argArr.join(",").replace('___',lastArg).split(',');//return外的话，最后一个还没有传入
				//这样转参数成为字符串["function (a, b) { return b - a; }",5,20]
			}
		}
		console.log(argArr+"  > " +delArrEle);
		return fn.apply(null,argArr.slice(1));
	};
};
var subtract = function(a, b) { return b - a; };
// Using a placeholder
var ___ = (function(){
	return '___';
})()
subFrom20 = _.partial(subtract, 10, 20);
subFrom20(5);
//=> 15

sub5 = _.partial(subtract, 5);
sub5(20);

//tips  splice(i,n,newadd,...)
var r =[1,2,3];
var r1 = r.splice(r[1],1,100);
r;//[1, 100, 3];//原数组直接被修改
r1;//[2],返回值是删除的元素
//__________________



/**
 * [Memoizes方法可以缓存某函数的计算结果。对于耗时较长的计算是很有帮助的]
 * @param  ()  function 
 * @param  [hashFunction]  [可选]
 * 如果传递了 hashFunction 参数，就用 hashFunction 的返回值作为key存储函数的计算结果。
 * hashFunction 默认使用function的第一个参数作为key。
 * @return  number  
 */
var _={};
_.memoize = function(fn) {
  var  cache = {};
  return function(n) {
    if (!cache[n])
       cache[n] = fn.apply(undefined, arguments);
   	   return cache[n]
  }
}
//取参数函数的参数
var  fibonacci = memoize(function(n) {
  return n < 2 ? n : fibonacci(n - 2) + fibonacci(n - 1);
});

fibonacci(6);

/**
 * [类似setTimeout，等待wait毫秒后调用function。如果传递可选的参数arguments，
 * 当函数function执行时， arguments 会作为参数传入。]
 * @param  ()  function 
 * @param  time  number 
 * @param  [*arguments]
 * @return  * 任意类型  
 */
//注意setTimeout的返回值 唯一标识
var _={};
_.delay = function(fn,wait,args){
	var argArr = Array.prototype.slice.call(arguments,2);//args
	return (function(argArr){
		setTimeout(fn.apply(null,argArr),wait);	
	})()
};
var log = function(){console.info(1)};
_.delay(log, 100000, 'logged later');

/**
 * [延迟调用function直到当前调用栈清空为止，类似使用延时为0的setTimeout方法]
 * @param  ()  function 
 * @param  [*arguments]
 * @return  * 任意类型  
 */
 var _={};
 _.delay = function(fn,args){
 	var argArr = Array.prototype.slice.call(arguments,1);//args
 	return (function(argArr){
 		var func = fn.apply(null,argArr);
 		setTimeout(func,0);	
 	})()
 };
_.delay(function(){ alert('deferred'); });

/**
 * [创建并返回一个像节流阀一样的函数，当重复调用函数的时候，
 * 至少每隔 wait毫秒调用一次该函数。对于想控制一些触发频率较高的事件有帮助。
 * 如果你想禁用第一次首先执行的话，传递{leading: false}，还有如果你想禁用最后一次执行的话，传递{trailing: false}]
 * @param  ()  function 
 * @param  time  number 
 * @param  {}object  [options] 
 * @return  * 任意类型  
 */


var _={};
_.throttle = function(fn,wait,options){
	var forbiddenFirst = false;//禁用第一次和最后一次暂不提供
	var forbiddenLast = false;
	var last=0;
	return function(){
 		var curr = +new Date();
 		if(curr-last>wait){//当前时间-上一次的时间 =  间隔时间
 			fn.apply(this,arguments);
 			last = curr;
 		}
 	};
};
.click(function(){

})
var num = 0;
function testFn() { console.log(num++); }
_.throttle(testFn, 2000)();
window.onresize = _.throttle(testFn, 2000)();

/**
 * [返回 function 函数的防反跳版本, 将延迟函数的执行(真正的执行)在函数最后一次调用时刻的 wait 毫秒之后. 
 * 对于必须在一些输入（多是一些用户操作）停止到达之后执行的行为有帮助,传参 immediate 为 true，
 *  debounce会在 wait 时间间隔的开始调用这个函数 。]
 * @param  ()  function 
 * @param  time  number 
 * @param  {}object  [options] 
 * @return  * 任意类型  
 */
 var _={};
 _.debounce = function(fn,wait,immediate){
 	var timer= null;
 	if(immediate){
 		fn.apply(null,arguments);
 	}
 	return function(){
 		var that  = this;
 		args = arguments;
 		clearTimeout(last);
 		last = setTimeout(function(){
 			fn.apply(that,args);
 		},wait)
 	};

 };

var testfn = function(){
	console.info("testfn");
};
_.debounce(testfn,1000,false)();


//简版 不支持返回函数参数的传递
var _={};
_.debounce = function(fn,wait,immediate){
	var timer=null;
	return function(){
		clearTimeout(timer);
		timer = setTimeout(function(){
			fn();
		},wait)
	}
};
var testfn = function(){
	console.info("testfn");
};
_.debounce(testfn,4000,false)();
 /**
  * [创建一个只能调用一次的函数。重复调用改进的方法也没有效果，
  * 只会返回第一次执行时的结果。 作为初始化函数使用时非常有用, 不用再设一个boolean值来检查是否已经初始化完成.]
  * @param  ()  function 
  * @param  time  number 
  * @param  {}object  [options] 
  * @return  * 任意类型  
  */
var _={};
_.once = function(fn){
	var flag = true;
	if(flag){
		fn();
		flag = false;
	}else{
		throw new TypeError("Application is only created once");
	}

};

function a(){
	console.info("aa");
};
_.once(a);

/**
 * [创建一个函数, 只有在运行了 count 次之后才有效果. 在处理同组异步请求返回结果时, 
 * 如果你要确保同组里所有异步请求完成之后才 执行这个函数, 这将非常有用]
 * @param  number
 * @param  ()  function 
 * @return  * 任意类型  
 */
 var _={};
 _.after = function(count,fn){
 	var num=0;num++;
 	if(num ===count ){
 		fn.apply(null,[])
 	}

 };

 function a(){
 	console.info("aa");
 };
 _.after(2,a);

//************与函数有关的函数 end ***********//
//************集合函数 (数组 或对象) ***********//

/**
 * [规则]
 * [原子函数封装]
 * [合理粒度]
 * [容错处理]
 * [输入-->输出]
 * [?? 代表问题]
 */
var __=(function(){
	//辅助函数
	var type = (function () {
	    var r = {},
	        types = ['Arguments', 'Function', 'String', 'Number', 'Date', 
	        'RegExp', 'Error', 'Null', 'Array','Object'];
	    for (var i = 0, t; t = types[i++];) {
	        ! function (t) {
	            r['is' + t] = function (obj) {
	                return Object.prototype.toString.call(obj) === '[object ' + t + ']';
	            }
	        }(t)
	    }
	    return r;
	})();

	//转成数组的通用函数
	var toArray  = function(s){
		try{
			return Array.prototype.slice.call(s);
		}catch(e){
			var r = [];
			for(var i=0;i<s.length;i++){
				r[i] = s[i];
			}
			return r;
		}
	};
	//slice for(var i=start;i<end;i++)
	var _slice = function(list,start,end){
		var r = [];
		start = start || 0;
		end = end || list.length;
		for(var i = start;i<end;i++){
			r.push(list[i]);
		};
		return r;
	};
	_slice([0,1,2,3,4,5,6,7],2,5);//[2,3,4]
	

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
	 			r.push(fn.call(context || null,i,list[i]));//map使用时，方便回调函数使用key,value, 参数i非必传
	 			//fn(list[i]);
	 		};
	 	}else if(isObject(list)){
	 		for(prop in list){
	 			r.push(fn.call(context || null,i,list[prop]));
	 		};
	 	}else{
	 		return 
	 	}	
	 	return r;
	 }; 
	 //map([[5, 1, 7], [3, 2, 1]], sort);map实现不了这个 Invoke可以 
	 map([3,4,5],function(key,value){return value*20});//合理使用传入函数的参数
	 map({x:1,y:2,z:3},function(key,value){return key*20});


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
	  	 return function(){
	  	 	var args =Array.prototype.slice.call(arguments);
	  	 	for(var i=0;i<list.length;i++){
	  	 		fn.apply(null,list[i].concat(args));
	  	 	}
	  	 };
	  };
	  function sort(a,b){
	  	return a>b;
	  };
	  sort(3,4);
	  invoke([[5, 1, 7], [3, 2, 1]], sort);
	  invoke([[5, 1, 7], [3, 2, 1]], 'sort');
	  //=> [[1, 5, 7], [1, 2, 3]]


	  //方式二
	  var map = function(list,fn,context){
	 	var r = [];
	 	if(isArray(list)){
	 		for(var i=0;i<list.length;i++){
	 			r.push(fn.call(context || null,i,list[i]));//map使用时，方便回调函数使用key,value, 参数i非必传
	 			//fn(list[i]);
	 		};
	 	}else if(isObject(list)){
	 		for(prop in list){
	 			r.push(fn.call(context || null,i,list[prop]));
	 		};
	 	}else{
	 		return 
	 	}	
	 	return r;
	 }; 
	  var  invoke = function(list, fn, args ) {
	      var isFunction = (fn.constructor === Function) ? true : false;
	      return map(list, function(key,val) {
	          var func = isFunction ? fn : val[fn];
	          return !func ? func : func.apply(val, args);
	      })
	  };
	  var newList = invoke([[5, 1, 7], [3, 2, 1]], 'sort');
	  console.log(newList);
	  var newList = invoke({a:[5, 1, 7], b:[3, 2, 1]}, 'sort');
	  console.log(newList);

	

	  //tap
	  [2,1,33].sort();//[1, 2, 33]
	  [2,1,33]['sort']();//[1,2,33]
	  //方式三
	  var invoke = function(list, methodName, arguments) {
	  	for(var i=0;i<list.length;i++){
	  		Array.prototype[methodName].apply(list[i],arguments);
	  	}
	  	console.log(list);
	  	return list;
	  };
	  invoke([[5, 1, 7], [3, 2, 1]], 'sort',[9,100]);

	  invoke([[5, 1, 7], [3, 2, 1]], 'sort',['bb','cc']);



	  //方式四
	 //用map 来实现invoke
	 var _map=function(list,fn){
	 	 var r=[];
	 	 for(var i=0;i<list.length;i++){
	 	 	r.push( (list[i])[fn]() );
	 	 }
	 	 return r;
	 };

	 _map([[5, 1, 7], [3, 2, 1]],'sort');//[[1,5,7],[1,2,3]]

	 //sort 冒泡排序
	 var _sort = function(list){
	 	//暂时不展开
	 };


	  /**
	   * [pluck也许是map最常使用的用例模型的简化版本，即萃取数组对象中某属性值，返回一个数组]
	   * @param  [] 
	   * @param  propertyName  
	   * @return  []           
	   */
	  var pluck = function(list,propertyName){
	  	var r=[];
	  	for(var i=0;i<list.length;i++){
	  		//for(var prop in list[i]){
	  		if(){
	  			r.push((list[i])[propertyName]);
	  		}
	  		//}
	  	};
	  	return r;
	  };
	  var stooges = [{name: 'moe', age: 40}, {name: 'larry', age: 50}, {name: 'curly', age: 60}];
	  pluck(stooges, 'name');
	  //=> ["moe", "larry", "curly"]
	  //方式二
	 var pluck = function(list, propertyName ) {
	      //var _this = this;
	      //return _this.map(list, function(val) {
	      return map(list, function(key,val) {
	          for(var i in val) {
	              if(i === propertyName) {
	                  return val[i];
	              }
	          }
	      })
	  };
	  var stooges = [{name: 'moe', age: 40}, {name: 'larry', age: 50}, {name: 'curly', age: 60}];
	  console.log(pluck(stooges, 'name'));
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




~(function(){})()

	//************实用功能(Utility Functions)***********//
	/**
	 * 返回与传入参数相等的值. 相当于数学里的: f(x) = x
	 * 这个函数看似无用, 但是在Underscore里被用作默认的迭代器iterator
	 * @param  string number ..
	 * @return Boolean
	 */
	var ___= window._;
	_.noConflict = function(){
	};


	(function(window) {  
	    // 保存之前数据  
	    var _$E = window.$E;  
	  
	    var myplugin = {"name":"aty"};  
	    myplugin.noConflict = function(){  
	        window.$E = _$E;  
	        return myplugin;  
	    };  
	      
	    // 向全局对象注册$E  
	    window.$E = myplugin;  
	})(window);  


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






//************对象函数Object Functions***********//
/**
 * 检索object拥有的所有可枚举属性的名称
 * @param  {}
 * @return []
 */
var keys = function(o){
	var r=[];
	for(var key in o){
		if(o.hasOwnProperty(key)){
			r.push(key);
		}
	}
	return r;
};
keys({one: 1, two: 2, three: 3});
//["one", "two", "three"]

/**
 * 检索object拥有的和继承的所有属性的名称
 * @param  {}
 * @return []
 */

var allKeys = function(o){
	var r=[];
	for(var key in o){
		r.push(key);
	}
	return r;
};

function Stooge(name) {
  this.name = name;
}
Stooge.prototype.silly = true;
allKeys(new Stooge("Moe"));
//["name", "silly"]

/**
 * 返回object对象所有的属性值。
 * @param  {}
 * @return []
 */
var values = function(o){
	var r= [];
	for(var key in o){
		r.push(o[key])
	}
	return r;
};

values({one: 1, two: 2, three: 3});
//[1, 2, 3]

/**
 * 它类似于map，但是这用于对象。转换每个属性的值。
 * @param  {}
 * @param  fn
 * @param  context  可选
 * @return []
 */
var mapObject = function(o,fn,context){
	for(var key in o){
		console.info(o[key]);
		o[key] = fn.call(undefined ||context,o[key]);//key本身就是字符串
	}
	return o;
};
mapObject({start: 5, end: 12}, function(val, key) {
  return val + 5;
});
//{start: 10, end: 17}

/**
 * 把一个对象转变为一个[key, value]形式的数组
 * @param  {}
 * @return []
 */

var pairs = function(o){
	var r=[];
	for(var key in o){
		r.push([key,o[key]]);
	}
	return r;
};

pairs({one: 1, two: 2, three: 3});
//[["one", 1], ["two", 2], ["three", 3]]


/**
 * 返回一个object副本，使其键（keys）和值（values）对换。
 * 对于这个操作，必须确保object里所有的值都是唯一的且可以序列号成字符串.
 * @param  {}
 * @return []
 */

var invert = function(o){//判断唯一只能通过索引
	var ro = {};
	//var rKeys = [];//如果r中已经有了这个key就不往ro中放
	//var rValues = [];//
	for(var key in o){
		//if(!rKeys[key] && !rValues){
			//r.push(key);
			ro[o[key]] = key;
		//}	
	};
	return ro;
};
invert({Moe: "Moses", Larry: "Louis", Curly: "Jerome"});
//{Moses: "Moe", Louis: "Larry", Jerome: "Curly"};

/**
 * 创建具有给定原型的新对象， 可选附加props 作为 own的属性
 * 基本上，和Object.create一样， 但是没有所有的属性描述符。
 * @param  prototype
 * @param  props
 * @return []
 */
var create = function(prototype,props){
	var o={};
	o.prototype = prototype;
	for(var key in props){
		o[key] = props[key];
	}
	return o;
};
function Stooge(name) {
  this.name = name;
}
var moe = create(Stooge.prototype, {name: "Moe"});


/**
 * 返回一个对象里所有的方法名, 而且是已经排序的 — 也就是说, 
 * 对象里每个方法(属性值是一个函数)的名称
 * @param  {}
 * @return []
 */

var functions = function(o){
	var r = [];
	for(var key in o){
		if(){//判断是方法
			r.push(key);
		}	
	}
	return r.sort();
};
functions(_);//133个多2属性
//["all", "any", "bind", "bindAll", "clone", "compact", "compose" ...

/**
 * 通过迭代器fn条件的或者是undefined的，都返回
 * @param  {}
 * @param  fn
 * @param  context  可选
 * @return []
 */

var findKey = function(o,fn,context){
	var r = [];
	for(var key in o){
		if(fn.call(null||context,key) || o[key] === undefined){//指的是value undefined
			r.push(key);
		}
	};
	return r;

};
var o={abc:1,defg:2,cabde:3,ccc:undefined};//
function fn(prop){
	if(prop.length > 3)return true
};
findKey(o,fn);
//["defg", "cabde","ccc"]

/**
 * 复制source对象中的所有属性覆盖到destination对象上，并且返回 destination 对象. 
 * 复制是按顺序的, 所以后面的对象属性会把前面的对象属性覆盖掉(如果有重复).
 * @param  {}  destination
 * @param  {}  sources
 * @return {}
 */
var extend = function(destination,sources){
	for(var key in sources){
		destination[key] = sources[key];
	}
	return destination;
};

extend({name: 'moe'}, {age: 50});
//{name: 'moe', age: 50}



/**
 * 类似于 extend, 但只复制自己的属性覆盖到目标对象
 * @param  {}  destination
 * @param  {}  sources
 * @return {}
 */
var extendOwn = function(destination,sources){
	for(var key in sources){
		if(!sources.hasOwnProperty(key)){
			destination[key] = sources[key];
		}
	}
	return destination;
};
var o = {age: 50};
o.prototype."a"=1;
extendOwn({name: 'moe'},o);
//{name: 'moe', age: 50}









/**
 * 对象是否包含给定的键吗？等同于object.hasOwnProperty(key)，
 * 但是使用hasOwnProperty 函数的一个安全引用，以防意外覆盖
 * @param  {}
 * @param  key
 * @return Boolean
 */
var has = function(o,key){
	return o.hasOwnProperty(key)
};
has({a: 1, b: 2, c: 3}, "b");

/**
 * 和_.property相反。需要一个对象，并返回一个函数,这个函数将返回一个提供的属性的值。
 * @param  {}
 * @param  key
 * @return Boolean
 */
var propertyOf = function(o){
	return function(key){
		return o[key]
	}
};
//var stooge = {name: 'moe'};
//propertyOf(stooge)('name');
//'moe'



/**
 * 如果object是一个DOM元素，返回true。
 * @param  {}
 * @return Boolean
 */
var isElement = function(o){
	return function(){
		return 
	}
};
//isElement(jQuery('body')[0]);//true


/**
 * @param  {}
 * @return Boolean
 */
var isArray = function(o){
	return Object.prototype.toString.call(o) == '[object Array]';
};
isArray([1,2,3]);

/**
 * @param  {}
 * @return Boolean
 */
var isObject = function(o){
	return Object.prototype.toString.call(o) == '[object Object]';
};
isObject({});

/**
 * @param  {}
 * @return Boolean
 */
/*var isArguments = function(o){
	return Object.prototype.toString.call(o) == '[object Object]';
};
isArguments([]);*/


/**
 * @param  {}
 * @return Boolean
 */
var isFunction = function(o){
	return Object.prototype.toString.call(o) == '[object Function]';
};
isFunction(function(){});

/**
 * @param  {}
 * @return Boolean
 */
var isString = function(o){
	return Object.prototype.toString.call(o) == '[object String]';
};
isString('');


/**
 * @param  {}
 * @return Boolean
 */
var isNumber = function(o){
	return Object.prototype.toString.call(o) == '[object Number]';
};
isNumber(123);

/**不带隐士转换
 * @param  {}
 * @return Boolean
 */
var isBoolean = function(o){
	return Object.prototype.toString.call(o) == '[object Boolean]';
};
isBoolean(false);AAy


/**
 * @param  {}
 * @return Boolean
 */
var isNull = function(o){
	return Object.prototype.toString.call(o) == '[object Null]';
};
isNull(null);

/**
 * @param  {}
 * @return Boolean
 */
var isUndefined = function(o){
	return Object.prototype.toString.call(o) == '[object Undefined]';
};
isUndefined(undefined);


var _slice = function(list,start,end){
  var r = [];
  start = start || 0;
  end = end || list.length; 
  for(var i = start; i < end; i++){
	r.push(list[i]);
  }
  return r;
};

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
		,has:has
		,propertyOf:propertyOf
		,isEmpty:isEmpty
		,isElement:isElement
		,isArray:isArray
		,isObject:isObject
		,isArguments:isArguments
		,isFunction:isFunction
		,isString:isString
		,isNumber:isNumber
		,isFinite:isFinite
		,isBoolean:isBoolean
		,isDate:isDate
		,isRegExp:isRegExp
		,isError:isError
		,isNaN:isNaN
		,isNull:isNull
		,isUndefined:isUndefined
		,_slice:_slice

	};
})(); 

//******underscore源码部分API解读*******//
var cb = function(value, context, argCount) {
  if (value == null) return _.identity;
  if (_.isFunction(value)) return optimizeCb(value, context, argCount);
  if (_.isObject(value)) return _.matcher(value);
  return _.property(value);
};
/**
 * 将 JavaScript 模板编译为可以用于页面呈现的函数, 对于通过JSON数据源生成复杂的HTML并呈现出来的操作非常有用
 * 模板函数可以使用 <%= … %>插入变量, 也可以用<% … %>执行任意的 JavaScript 代码。 如果您希望插入一个值, 
 * 并让其进行HTML转义,请使用<%- … %>。 当你要给模板函数赋值的时候，可以传递一个含有与模板对应属性的data对象 。
 *  如果您要写一个一次性的, 您可以传对象 data 作为第二个参数给模板 template 来直接呈现, 
 *  这样页面会立即呈现而不是返回一个模板函数. 参数 settings 是一个哈希表包含任何可以覆盖的设置 _.templateSettings.
 * @param  {}
 * @return Boolean
 */
 _.template(templateString, [settings]) 

 var compiled = _.template("hello: <%= name %>");
 compiled({name: 'moe'});
// "hello: moe"

 var template = _.template("<b><%- value %></b>");
 template({value: '<script>'});
 //"<b>&lt;script&gt;</b>"


//小技巧：
//1> 链式调用的实现 chain 返回true
//2> _上的静态方法(工具函数)，全部挂到了原型上(方便_实例使用)。
//3> 把常用的比如Array.prototype 存到变量里
//4> 

//编码小技巧
//1> void 0 等价于 void(0)
//void function fn(){}   相当于函数表达式
void function fn(a,b){
	console.log(1);
	return a+b;//return 不支持
}();
//fn(1,2); void 声明的表达式 不支持这样调

//2> 函数的调用方式有三种
//fn(a)    fn a   a.fn

//3> ~ 取反
"aaa".indexOf("a")>-1;//库中不这样写，尽量不要用到0 1
//这样写
if(~"aaa".indexOf("a")){console.log(111)};//111

//4> 
var noop = function(){
	return void 0
};
noop();//undefined