//伪代码 
(function() {

  	var root = this;
    var previousUnderscore = root._;
    var _ = function(obj) {
      if (obj instanceof _) return obj;
      if (!(this instanceof _)) return new _(obj);
      this._wrapped = obj;
    };

    _.mixin = function(obj) {
      _.each(_.functions(obj), function(name) {
        var func = _[name] = obj[name];
        _.prototype[name] = function() {
          var args = [this._wrapped];
          push.apply(args, arguments);
          return result(this, func.apply(_, args));
        };
      });
    };
     _.mixin(_);

     _.prototype.value = function() {
       return this._wrapped;
     };

     //链式调用
     _.chain = function(obj) {
       var instance = _(obj);
       instance._chain = true;
       return instance;
     };
     var result = function(instance, obj) {
       return instance._chain ? _(obj).chain() : obj;
     };

     //模板
     _.template = function(){
     	var render = new Function(settings.variable || 'obj', '_', source);
     };
}.call(this));