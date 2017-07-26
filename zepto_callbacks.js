//     Zepto.js
//     (c) 2010-2015 Thomas Fuchs
//     Zepto.js may be freely distributed under the MIT license.
 
/**
 * 回调函数管理：添加add() 移除remove()、触发fire()、锁定lock()、禁用disable()回调函数。它为Deferred异步队列提供支持
 * 原理：通过一个数组保存回调函数，其他方法围绕此数组进行检测和操作
 *
 *
 *  标记：
 *      once： 回调只能触发一次
 *      memory 记录上一次触发回调函数列表时的参数，之后添加的函数都用这参数立即执行
 *      unique  一个回调函数只能被添加一次
 *      stopOnFalse 当某个回调函数返回false时中断执行
 */
;(function($){
  // Create a collection of callbacks to be fired in a sequence, with configurable behaviour
  // Option flags:
  //   - once: Callbacks fired at most one time.
  //   - memory: Remember the most recent context and arguments
  //   - stopOnFalse: Cease iterating over callback list
  //   - unique: Permit adding at most one instance of the same callback
  $.Callbacks = function(options) {
    options = $.extend({}, options)
 
    var memory, // Last fire value (for non-forgettable lists)
        fired,  //是否回调过
        firing,  //回调函数列表是否正在执行中
        firingStart, // First callback to fire (used internally by add and fireWith) //第一回调函数的下标
        firingLength, // End of the loop when firing   //回调函数列表长度？
        firingIndex, // Index of currently firing callback (modified by remove if needed)
        list = [], // Actual callback list     //回调数据源： 回调列表
        stack = !options.once && [], // Stack of fire calls for repeatable lists//回调只能触发一次的时候，stack永远为false
 
        /**
         * 回调底层函数
         */
        fire = function(data) {
          memory = options.memory && data   //记忆模式，触发过后，再添加新回调，也立即触发。
          fired = true
          firingIndex = firingStart || 0
          firingStart = 0
          firingLength = list.length
          firing = true      //标记正在回调
 
            //遍历回调列表
          for ( ; list && firingIndex < firingLength ; ++firingIndex ) {
              //如果 list[ firingIndex ] 为false，且stopOnFalse（中断）模式
              //list[firingIndex].apply(data[0], data[1])  这是执行回调
            if (list[firingIndex].apply(data[0], data[1]) === false && options.stopOnFalse) {
              memory = false  //中断回调执行
              break
            }
          }
          firing = false //回调执行完毕
          if (list) {
              //stack里还缓存有未执行的回调
            if (stack) stack.length && fire(stack.shift())  //执行stack里的回调
            else if (memory) list.length = 0 //memory 清空回调列表    list.length = 0清空数组的技巧
            else Callbacks.disable()             //其他情况如  once 禁用回调
          }
        },
 
        Callbacks = {
          //添加一个或一组到回调列表里
          add: function() {
            if (list) {        //回调列表已存在
              var start = list.length,   //位置从最后一个开始
                  add = function(args) {
                    $.each(args, function(_, arg){
                      if (typeof arg === "function") {    //是函数
                          //非unique，或者是unique，但回调列表未添加过
                        if (!options.unique || !Callbacks.has(arg)) list.push(arg)
                      }
                      //是数组/伪数组，添加，重新遍历
                      else if (arg && arg.length && typeof arg !== 'string') add(arg)
                    })
                  }
 
                //添加进列表
              add(arguments)
 
                //如果列表正在执行中，修正长度，使得新添加的回调也可以执行
              if (firing) firingLength = list.length
              else if (memory) {
                  //memory 模式下，修正开始下标，
                firingStart = start
                fire(memory)         //立即执行所有回调
              }
            }
            return this
          },
 
            //从回调列表里删除一个或一组回调函数
          remove: function() {
            if (list) {       //回调列表存在才可以删除
                //_作废参数
                //遍历参数
              $.each(arguments, function(_, arg){
                var index
 
                  //如果arg在回调列表里
                while ((index = $.inArray(arg, list, index)) > -1) {
                  list.splice(index, 1)                                //执行删除
                  // Handle firing indexes
                    //回调正在执行中
                  if (firing) {
                      //避免回调列表溢出
                    if (index <= firingLength) --firingLength  //在正执行的回调函数后，递减结尾下标
                    if (index <= firingIndex) --firingIndex     //在正执行的回调函数前，递减开始下标
                  }
                }
              })
            }
            return this
          },
 
            /**
             * 检查指定的回调函数是否在回调列表中
             * @param fn
             * @returns {boolean}
             */
          has: function(fn) {
              //
            return !!(list && (fn ? $.inArray(fn, list) > -1 : list.length))
          },
 
            /**
             * 清空回调函数
             * @returns {*}
             */
          empty: function() {
            firingLength = list.length = 0
            return this
          },
 
            //禁用回调函数
          disable: function() {
            list = stack = memory = undefined
            return this
          },
 
            /**
             * 是否已禁用回调函数
             * @returns {boolean}
             */
          disabled: function() {
            return !list
          },
            /**
             * 锁定回调函数
             * @returns {*}
             */
          lock: function() {
            stack = undefined;   //导致无法触发
 
             //非memory模式下，禁用列表
            if (!memory) Callbacks.disable()
            return this
          },
            /**
             * 是否是锁定的
             * @returns {boolean}
             */
          locked: function() {
            return !stack
          },
 
            /**
             * 用上下文、参数执行列表中的所有回调函数
             * @param context
             * @param args
             * @returns {*}
             */
          fireWith: function(context, args) {
                // 未回调过，非锁定、禁用时
            if (list && (!fired || stack)) {
 
              args = args || []
              args = [context, args.slice ? args.slice() : args]
              if (firing) stack.push(args)  //正在回调中  ，存入static
 
              else fire(args) //否则立即回调
            }
            return this
          },
 
            /**
             * 用参数执行列表中的所有回调函数
             * @param context
             * @param args
             * @returns {*}
             */
          fire: function() {
                //执行回调
            return Callbacks.fireWith(this, arguments)
          },
 
            /**
             * 回调列表是否被回调过
             * @returns {boolean}
             */
          fired: function() {
            return !!fired
          }
        }
 
    return Callbacks
  }
})(Zepto)