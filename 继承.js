//继承 2017/07/19 15:28:46
var SuperClass = function(){
	console.log(1111)
	this.name = 'superclass';
	this.colors = [1,2];
}

SuperClass.prototype.say = function(){
	console.log('super say');
};

var ChildClass = function(){

	SuperClass.call(this);
}

//类式继承

function inheritObject(obj){
	var F = function(){};
	F.prototype = obj;
	return new F();
}

//原型继承
function inheritPrototype(subClass,parentClass){
	var p = inheritObject(parentClass);
	subClass.prototype = p;
	p.constructor = subClass;
}

inheritPrototype(ChildClass,Superclass);

ChildClass.prototype.say = function(){
	console.log('child say');
};

var child1 = new ChildClass();
child1.colors.push(4);

var child2 = new ChildClass();
console.log(child2.colors)
